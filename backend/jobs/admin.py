from django.contrib import admin
from .models import JobOffer, JobApplication

@admin.register(JobOffer)
class JobOfferAdmin(admin.ModelAdmin):
    list_display = ('title', 'company_name', 'contract_type', 'recruiter', 'is_active')
    list_filter = ('contract_type', 'is_active', 'created_at')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('job_offer', 'candidate', 'status', 'applied_at')
    list_filter = ('status', 'applied_at')
