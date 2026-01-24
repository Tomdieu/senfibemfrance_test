from django.db import models
from django.conf import settings

class JobOffer(models.Model):
    CONTRACT_TYPES = (
        ('CDI', 'CDI'),
        ('CDD', 'CDD'),
        ('STAGE', 'Stage'),
        ('FREELANCE', 'Freelance'),
        ('INTERIM', 'Intérim'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    contract_type = models.CharField(max_length=20, choices=CONTRACT_TYPES)
    location = models.CharField(max_length=100)
    salary_range = models.CharField(max_length=100, blank=True)
    company_name = models.CharField(max_length=100)
    num_of_place = models.IntegerField(default=1)  # Number of positions available
    recruiter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_jobs')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'En attente'),
        ('REVIEWING', 'En cours d\'examen'),
        ('ACCEPTED', 'Retenu'),
        ('REJECTED', 'Refusé'),
    )

    candidate = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    job_offer = models.ForeignKey(JobOffer, on_delete=models.CASCADE, related_name='applications')
    cv_file = models.FileField(upload_to='cvs/')
    cover_letter = models.FileField(upload_to='cover_letters/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate.username} - {self.job_offer.title}"
