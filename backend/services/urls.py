from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceCategoryViewSet, ServiceViewSet, ServiceRequestViewSet

router = DefaultRouter()
router.register(r'categories', ServiceCategoryViewSet)
router.register(r'', ServiceViewSet)
router.register(r'requests', ServiceRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
