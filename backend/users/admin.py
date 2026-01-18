from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile, CandidateProfile, CompanyProfile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

class CandidateProfileInline(admin.StackedInline):
    model = CandidateProfile
    can_delete = False
    verbose_name_plural = 'Candidate Profile'

class CompanyProfileInline(admin.StackedInline):
    model = CompanyProfile
    can_delete = False
    verbose_name_plural = 'Company Profile'

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'role', 'first_name', 'last_name', 'is_staff']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Role', {'fields': ('role',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name', 'role'),
        }),
    )
    inlines = [ProfileInline, CandidateProfileInline, CompanyProfileInline]
