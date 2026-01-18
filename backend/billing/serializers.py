from rest_framework import serializers
from .models import Quote, Invoice, CreditNote

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = '__all__'
        read_only_fields = ('user', 'reference', 'created_at')

class InvoiceSerializer(serializers.ModelSerializer):
    quote_reference = serializers.CharField(source='quote.reference', read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ('reference', 'issued_date')

class CreditNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditNote
        fields = '__all__'
        read_only_fields = ('reference', 'created_at')
