from rest_framework import viewsets, permissions
from .models import ServiceCategory, Service, ServiceRequest
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceRequestSerializer
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Service Categories']))
class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.AllowAny]

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Services']))
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['category']

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Service Requests']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Service Requests']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Service Requests']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Service Requests']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Service Requests']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Service Requests']))
class ServiceRequestViewSet(viewsets.ModelViewSet):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return ServiceRequest.objects.none()
        if self.request.user.role == 'ADMIN':
            return ServiceRequest.objects.all()
        return ServiceRequest.objects.filter(user=self.request.user)

