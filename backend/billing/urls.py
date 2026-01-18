from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuoteViewSet, InvoiceViewSet, CreditNoteViewSet

router = DefaultRouter()
router.register(r'quotes', QuoteViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'credit-notes', CreditNoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
