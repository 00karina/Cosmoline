from django.contrib import admin
from django.urls import path,include

from .views import *
from rest_framework import routers
from backend import views


router = routers.DefaultRouter()
router.register('cart',MyCart,basename="MyCart")
router.register("orders",OrderViewset,basename="Order")
router.register('category',CatagoryViewset,basename="CatagoryViewset")
router.register('productreview',ProductReviewViewset, basename='todo')

urlpatterns = [
     path("",include(router.urls)),
     path('users/', UserList.as_view()),
     path('create-checkout-session', StripeCheckoutView.as_view()),
     path('postreview/',ReviewView.as_view(),name="PostReview"),
     
     path('categoryProduct/',CategoryProductView.as_view()),
     path('tagsProduct/',TagsProductView.as_view()),
     path('discountProduct/',DiscountListView.as_view()),
     path('AllProduct/',AllProductView.as_view()),
     path('addtocart/',AddtoCartView.as_view()),
     path("product/<int:id>/",ProductView.as_view(),name="productdetal"),
     path("tags/<int:id>/",TagsProductView.as_view(),name="productdetal"),
     path('updatecart/',UpdateCartProduct.as_view(),name='updatecart'),
     path('editcart/',EditCartProduct.as_view(),name='editcart'),
     path('deletecart/',Deletecartproduct.as_view(),name='deletecart'),
     path("register/",RegisterView.as_view(),name="register"),
     path("search/<str:q>/",SearchView.as_view(),name="search"),
     path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
     
   
    
]