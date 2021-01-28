from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models
import hashlib


class QrURL(models.Model):
    url = models.CharField(max_length=3000, unique=True)

class UserProfile(models.Model):  
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    BLOOD_TYPE_CHOICES = [
        ("A+","A+"),
        ("A-","A-"),
        ("B+","B+"),
        ("B-","B-"),        
        ("0+","0+"),
        ("0-","0-"), 
        ("AB+","AB+"),
        ("AB-","AB-"),               
    ]
    blood_type = models.CharField(max_length=3,choices=BLOOD_TYPE_CHOICES)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    dni = models.IntegerField(null=True, blank=True)
    prepaid_health = models.CharField(max_length=200, null = True, blank = True)
    emergency_number = models.CharField(max_length=200, null = True, blank = True)
    comment = models.TextField( null = True, blank = True)
    img = models.ImageField(null = True, blank = True, upload_to='face')
    prepaidId = models.CharField(null=True, blank=True, max_length=200)
    qr_url = models.OneToOneField(QrURL, related_name="user", null=True, blank=True,on_delete=models.DO_NOTHING)
    important_type_disease = models.CharField(null=True, blank=True, max_length=200)
    def __str__(self):  
          return "%s's profile" % self.user  

def create_user_profile(sender, instance, created, **kwargs):  
    if created:  
       #aca voy a crear la url con un hasheo
       string = str(instance.first_name)+str(instance.id)
       print(string)
       hash_object = hashlib.md5(string.encode())
       qr_url = QrURL(url = hash_object.hexdigest())
       instance.qr_url = qr_url
       qr_url.save()
       instance.save()
       
post_save.connect(create_user_profile, sender=UserProfile) 

class ChronicDisease(models.Model):
    name = models.CharField(max_length=200)
    medication = models.CharField(max_length=200)
    comment = models.TextField()
    user = models.ForeignKey(UserProfile, related_name="chronic_disease", on_delete=models.CASCADE)

class Allergy(models.Model):
    name = models.CharField(max_length=200)
    comment = models.TextField()
    medication = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(UserProfile, related_name="allergy", on_delete=models.CASCADE)
