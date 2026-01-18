from django.db import models
from django.conf import settings

class Quote(models.Model):
    STATUS_CHOICES = (
        ('DRAFT', 'Brouillon'),
        ('SENT', 'Envoyé'),
        ('ACCEPTED', 'Accepté'),
        ('REJECTED', 'Refusé'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quotes')
    reference = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=200)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    validity_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    items = models.JSONField(default=list)  # Storing line items as JSON for flexibility

    def __str__(self):
        return self.reference

class Invoice(models.Model):
    STATUS_CHOICES = (
        ('UNPAID', 'Impayé'),
        ('PARTIALLY_PAID', 'Partiellement payé'),
        ('PAID', 'Payé'),
        ('OVERDUE', 'En retard'),
    )

    quote = models.OneToOneField(Quote, on_delete=models.SET_NULL, null=True, blank=True, related_name='invoice')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='invoices')
    reference = models.CharField(max_length=20, unique=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UNPAID')
    issued_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    
    def __str__(self):
        return self.reference

class CreditNote(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='credit_notes')
    reference = models.CharField(max_length=20, unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reference
