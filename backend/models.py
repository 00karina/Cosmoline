
from django.db import models
from embed_video.fields import EmbedVideoField
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail 
User = get_user_model()

# Create your models here
class Tagss(models.Model):
    """Tag for data. Every tag has unique text.
    """
    text = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return 'Tagss[id: {id}, text: {text}]'.format(
            id=self.id, text=self.text)


class Category(models.Model):
    name = models.CharField(max_length=50)
    
    
    def __str__(self):
        return self.name



class Product(models.Model):
    ProductName=models.CharField(max_length=500)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    Price=models.IntegerField()
    discount = models.IntegerField(blank=True, null=True, verbose_name='discounts')
    Create_at=models.DateTimeField(auto_now_add=True)
    Description=models.TextField()
    Image=models.ImageField(upload_to='upload/images',null=False,blank=False)
    Video = EmbedVideoField()
    ShadeImage=models.ImageField(upload_to='upload/shades',null=False,blank=False)
    Detail=models.TextField(default=ProductName)
    ShadeName=models.TextField()
    WeightProduct=models.CharField(max_length=500)
    Tips=models.TextField()
    tags = models.ManyToManyField(Tagss, related_name='Product')
    time = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return 'Product[id: {id}]'.format(
            id=self.id)



class Cart(models.Model):
    customer = models.OneToOneField(User,on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()
    def __str__(self):
        return f"Cart=={self.cart.id}<==>CartProduct:{self.id}==Qualtity=={self.quantity}"

ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)
class Order(models.Model):
    cart  = models.OneToOneField(Cart,on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    mobile = models.CharField(max_length=16)
    email = models.CharField(max_length=200)
    total = models.PositiveIntegerField()
    order_status = models.CharField(max_length=100,choices=ORDER_STATUS,default="Order Received")
    date = models.DateField(auto_now_add=True)
    payment_complit = models.BooleanField(default=False,blank=True, null=True)

RATING=(
    (1,'1'),
    (2,'2'),
    (3,'3'),
    (4,'4'),
    (5,'5'),
)
class ProductReview(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    review_text=models.TextField()
    review_rating=models.IntegerField(choices=RATING,max_length=150)

    class Meta:
        verbose_name_plural='Reviews'

    def get_review_rating(self):
        return self.review_rating

class Review(models.Model):
    people=models.CharField(max_length=16)
    review_text=models.TextField()

    def __str__(self):
        return self.people
    

    

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )