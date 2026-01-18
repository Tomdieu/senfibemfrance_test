from rest_framework import viewsets, permissions
from .models import Quote, Invoice, CreditNote
from .serializers import QuoteSerializer, InvoiceSerializer, CreditNoteSerializer
import uuid
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Billing Quotes']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Billing Quotes']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Billing Quotes']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Billing Quotes']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Billing Quotes']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Billing Quotes']))
class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        reference = f"DEV-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(user=self.request.user, reference=reference)

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Quote.objects.none()
        if self.request.user.role == 'ADMIN':
            return Quote.objects.all()
        return Quote.objects.filter(user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Billing Invoices']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Billing Invoices']))
class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
             return Invoice.objects.none()
        if self.request.user.role == 'ADMIN':
            return Invoice.objects.all()
        return Invoice.objects.filter(user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Billing Credits']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Billing Credits']))
class CreditNoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CreditNote.objects.all()
    serializer_class = CreditNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
