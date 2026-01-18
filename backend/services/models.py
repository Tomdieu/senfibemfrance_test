from django.db import models
from django.conf import settings

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # Name of icon to use

    class Meta:
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name

class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    description = models.TextField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='services/', blank=True, null=True)

    def __str__(self):
        return self.name

class ServiceRequest(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'En attente'),
        ('ACCEPTED', 'Accepté'),
        ('IN_PROGRESS', 'En cours'),
        ('COMPLETED', 'Terminé'),
        ('CANCELLED', 'Annulé'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='service_requests')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.service.name}"
