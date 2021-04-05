from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db import models
import hashlib

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
    weight = models.FloatField(null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    pin = models.IntegerField('Pin')
    def __str__(self):  
          return "%s's profile" % self.user  

class QrURL(models.Model):
    url = models.CharField(max_length=3000, unique=True)
    user = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, related_name="qr_url", null=True, blank=True)

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
