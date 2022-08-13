from itertools import product
from logging import raiseExceptions
from pickletools import int4
from django.conf  import settings
from urllib import response
from django.contrib import messages
from django.core.mail import send_mail
from django.forms import IntegerField
from fyp.settings import STRIPE_SECRET_KEY
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *;
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from tkinter import IntVar
from django.db.models import Q;
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import views,viewsets,generics,mixins
from django.contrib.auth.models import User
from rest_framework import status
import stripe
from django.shortcuts import redirect

from django.conf import settings

class UserList(APIView):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get(self, request):
        categoris_obj = User.objects.all()
        category_serializer = UserSerializer(
            categoris_obj, many=True, context={'request': request}).data
        return Response(category_serializer)



class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductSerializer
    lookup_field = "id"

    def get(self,request,id=None):
        

        data = []
        
        if id:
            
            return self.retrieve(request)
            
        else:
            return self.list(request)
    
 




class CategoryProductView(APIView):
    def get(self, request):
        category_obj = Category.objects.all()
        category_serializer = CategorySerializer(category_obj, many=True).data
        data = []
        for cata in category_serializer:
            product_obj = Product.objects.filter(category=cata['id'])
            cata['products'] = ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(cata)
        return Response(data)


class TagsProductView(APIView):
    def get(self, request):
        Tagss_obj = Tagss.objects.all()
        tags_serializer = TagSerializer(Tagss_obj, many=True).data
        data = []
        for tags in tags_serializer:
            product_obj = Product.objects.filter(tags=tags['id'])
            tags['products'] = ProductSerializer(
                product_obj, many=True, context={'request': request}).data
            data.append(tags)
        return Response(data)

class DiscountListView(generics.ListAPIView):
    queryset = Product.objects.all().filter(discount__isnull=False).order_by('discount')
    serializer_class = ProductSerializer


        
class CategorisView(APIView):
    def get(self, request):
        categoris_obj = Category.objects.all()
        category_serializer = CategorySerializer(
            categoris_obj, many=True, context={'request': request}).data
        return Response(category_serializer)


        
class AllProductView(APIView):
    def get(self, request):
        categoris_obj = Product.objects.all()
        category_serializer = ProductSerializer(
            categoris_obj, many=True, context={'request': request}).data
        return Response(category_serializer)

class CatagoryViewset(viewsets.ViewSet):
    def list(self,request):
        query = Category.objects.all()
        serializer = CategorySerializer(query,many=True,context= {'request': request})
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        query = Category.objects.get(id=pk)
        serializer = CategorySerializer(query)
        data_data = serializer.data
        all_data = []
        catagory_product = Product.objects.filter(category_id=data_data['id'])
        catagory_product_serilazer = ProductSerializer(catagory_product,many=True,context= {'request': request})
        data_data['category_product'] = catagory_product_serilazer.data
        all_data.append(data_data)
        return Response(all_data)

class ProductReviewViewset(viewsets.ViewSet):
    def list(self,request):
        query = Product.objects.all()
        serializer = ProductSerializer(query,many=True,context= {'request': request})
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        query = Product.objects.get(id=pk)
        serializer = ProductSerializer(query)
        data_data = serializer.data
        reviews = []
        review_product = ProductReview.objects.filter(product_id=data_data['id'])
        review_product_serilazer = ProductReviewSerializer(review_product,many=True,context= {'request': request})
        data_data['review_product'] = review_product_serilazer.data
        reviews.append(data_data)
        return Response(reviews)

    def create(self,request):
        
        product_id = request.data["productid"]
        cart_obj = Product.objects.get(id=product_id)
        text= request.data["text"]
        rating = request.data["mobile"]
        user_id = request.data["userid"]
        user_obj = User.objects.get(id=user_id)
        
  
        cart_obj.save()
        user_obj.save()
        ProductReview.objects.create(
                product=cart_obj,
                user=user_obj,
                review_rating=rating,
                review_text=text,
              
            )
        

        return Response({"message":"order Resebed"})


        
	    
	  

class MyCart(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def list(self,request):
        query = Cart.objects.filter(customer=request.user)
        serializers = CartSerializer(query,many=True,context= {'request': request})
        all_data=[]
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product,many=True,context= {'request': request})
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(serializers.data)



class OrderViewset(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self,request):
        query = Order.objects.filter(cart__customer = request.user)
        serializers = OrderSerializer(query,many=True)
        all_data = []
        for order in serializers.data:
            cartproduct = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            order['cartproduct'] = cartproduct_serializer.data
            all_data.append(order)
        return Response(all_data)
    def retrieve(self,request,pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data = serializers.data
            all_date=[]
            cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            data['cartproduct'] = cartproduct_serializer.data
            all_date.append(data)
            response_message = {"error":False,"data":all_date}
        except:
            response_message = {"error":True,"data":"No data Found for This id"}

        return Response(response_message)
        

    def destroy(self,request,pk=None):
        try:
            order_obj=Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            responsemessage = {"erroe":False,"message":"Order deleted","order id":pk}
        except:
            responsemessage = {"erroe":True,"message":"Order Not Found"}
        return Response(responsemessage)

    
    
    
    def create(self,request):
        
        cart_id = request.data["cartId"]
        cart_obj = Cart.objects.get(id=cart_id)
        address = request.data["address"]
        mobile = request.data["mobile"]
        email = request.data["email"]
        cart_obj.complit=True
        cart_obj.save()
        Order.objects.create(
                cart=cart_obj,
                address=address,
                mobile=mobile,
                email=email,
                total=cart_obj.total
            )
        subject='Order Recived'
        message="Thank you for ordering from Cosmoline!      We're excited for you to receive your order #203331624626024 and will notify you once it's on its way. If you have ordered from multiple sellers, your items will be delivered in separate packages. We hope you had a great shopping experience! You can check your order status here."
        send_mail(subject,message, settings.EMAIL_HOST_USER, [email ], fail_silently=False)
        messages.success(request, 'Success!')

       

        return Response({"message":"order Resebed"})

       
        

stripe.api_key = 'sk_test_51KlaFFH0GFst5SpOT0Vj0FZer7tRKvRGR9us9AmcEY55dKFdr6hkpupgI0ExuTTe5ca1rRWO1sSgLxTupAwKr1W500vKOrB9CY'
class StripeCheckoutView(APIView):
    
    def post(self,pk=None, *args,**kwargs):
           
        
            checkout_session = stripe.checkout.Session.create(
                

           line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "unit_amount":4700,
                        "product_data": {
                            "name": 'Cosmoline',
                             'images': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAox1hKAXyKt019EtsAAHsiRN3PdZAg5oK7dBs8MOwjGawIPMb9g2H7Ey50uB0Ntx_zmc&usqp=CAU'],
                        },
                    },
                    "quantity": 1,
                },
            ],

                payment_method_types=['card',],
                mode='payment',
                success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )
            
            return redirect(checkout_session.url)
        
class SearchView(APIView):
    def get(self, request, q):
        data = {}
        posts_lookup = (Q(ProductName__icontains=q) |
                        Q(Description__icontains=q) )
        prod_obj = Product.objects.filter(
            time__lte=timezone.now()).filter(posts_lookup)
        data['products'] = ProductSerializer(
            prod_obj, many=True, context={'request': request}).data
        category_lookup = (Q(name__icontains=q) | Q(id__icontains=q))
        category_obj = Category.objects.filter(
            name__lte=timezone.now()).filter(category_lookup)
        data['category'] = CategorySerializer(
            category_obj, many=True, context={'request': request}).data

        brand_lookup = (Q(ProductName__icontains=q) | Q(Description__icontains=q))
        return Response(data)

class AddtoCartView(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    
    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        # print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user).filter(complit=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complit=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.Price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.Price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.Price,
                        quantity = 1,
                        subtotal = product_obj.Price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.Price
                    cart_cart.save()
            else:
                # print(cart_cart)
                # print("NEW CART CREATED")
                Cart.objects.create(customer=request.user,total=0,complit=False)
                new_cart = Cart.objects.filter(customer=request.user).filter(complit=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  =product_obj.Price,
                        quantity = 1,
                        subtotal = product_obj.Price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total +=product_obj.Price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wrong"}

        return Response(response_mesage)


class UpdateCartProduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity +=1
        cp_obj.subtotal += cp_obj.price
        cp_obj.save()

        cart_obj.total += cp_obj.price
        cart_obj.save()
        return Response({"message":"CartProduct Add Update","product":request.data['id']})

class EditCartProduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data["id"])
        cart_obj = cp_obj.cart

        cp_obj.quantity -=1
        cp_obj.subtotal -= cp_obj.price
        cp_obj.save()

        cart_obj.total -= cp_obj.price
        cart_obj.save()
        if(cp_obj.quantity==0):
            cp_obj.delete()   
        return Response({"message":"CartProduct Add Update","product":request.data['id']})



class Deletecartproduct(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
    def post(self,request):
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cp_obj.delete()        
        return Response({"message":"CartProduct Deleted","product":request.data['id']})

class RegisterView(views.APIView):
    def post(self,request):
        serializers =UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"user is created for '{serializers.data['username']}' ","data":serializers.data})
        return Response({"error":True,"message":"A user with that username already exists! Try Another Username"})


class ReviewView(views.APIView):
    def get(self, request, format=None):
        snippets = Review.objects.all()
        serializer = ReviewSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request):
        
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response.status_code(500)
            
class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)