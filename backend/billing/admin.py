from django.contrib import admin
from .models import Quote, Invoice, CreditNote

class InvoiceInline(admin.StackedInline):
    model = Invoice
    extra = 0

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ('reference', 'user', 'total_amount', 'status', 'created_at')
    list_filter = ('status',)
    inlines = [InvoiceInline]

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('reference', 'user', 'total_amount', 'status', 'due_date')
    list_filter = ('status', 'issued_date')

@admin.register(CreditNote)
class CreditNoteAdmin(admin.ModelAdmin):
    list_display = ('reference', 'invoice', 'amount', 'created_at')
