from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, OrderViewSet, SubscriptionPlanViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'plans', SubscriptionPlanViewSet)
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
