  
from django.contrib import admin
from .models import ChronicDisease, Allergy, UserProfile, QrURL

admin.site.site_header = "SOS DB";
admin.site.site_title = "SOS DB";

class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name']
    list_filter = ('first_name', 'last_name')

admin.site.register(UserProfile,UserAdmin)
admin.site.register(ChronicDisease)
admin.site.register(Allergy)
admin.site.register(QrURL)

