from django.db import models
from django.conf import settings

class Notification(models.Model):
    TYPES = (
        ('INFO', 'Information'),
        ('WARNING', 'Attention'),
        ('SUCCESS', 'Succès'),
        ('ERROR', 'Erreur'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=TYPES, default='INFO')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Document(models.Model):
    TYPES = (
        ('PDF', 'PDF'),
        ('IMAGE', 'Image'),
        ('OTHER', 'Autre'),
    )

    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='documents/')
    document_type = models.CharField(max_length=20, choices=TYPES, default='OTHER')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
