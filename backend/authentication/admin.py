from django.contrib import admin
from .models import User, Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'image', 'verified']
