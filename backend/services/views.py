from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import ServiceCategory, Service, ServiceRequest
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceRequestSerializer
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

from core.permissions import IsAdminOrReadOnly

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Service Categories']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Service Categories']))
class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['name']

from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Services']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Services']))
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['category']
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def perform_create(self, serializer): 
        serializer.save(created_by=self.request.user)

from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ServiceRequestStatusUpdateSerializer

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
    filterset_fields = ['status', 'service', 'user']

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        return [permission() for permission in self.permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Handle case where request may not be available (during schema generation, etc.)
        if not hasattr(self, 'request') or not self.request.user.is_authenticated:
            return ServiceRequest.objects.none()

        # Check if user has role attribute
        if hasattr(self.request.user, 'role') and self.request.user.role == 'ADMIN':
            return ServiceRequest.objects.all()
        else:
            # For non-admin users, return only their own service requests
            return ServiceRequest.objects.filter(user=self.request.user)

    @action(detail=True, methods=['patch'], url_path='update-status')
    @swagger_auto_schema(
        operation_summary="Update the status of a service request",
        operation_description="Allows updating only the status field of a service request.",
        request_body=ServiceRequestStatusUpdateSerializer,
        responses={200: ServiceRequestSerializer},
        tags=['Service Requests']
    )
    def update_status(self, request, pk=None):
        """
        Custom action to update only the status of a ServiceRequest
        """
        service_request = self.get_object()

        # Allow status updates by the request creator, or admins
        # You can customize this logic based on your business rules
        # For example, service providers might also be able to update certain statuses
        if (request.user.role != 'ADMIN' and
            service_request.user != request.user):
            # Additional permission logic could go here
            # For example, if the service has a provider field, you might allow the provider to update status
            from rest_framework.permissions import PermissionDenied
            raise PermissionDenied("You do not have permission to update this service request status.")

        serializer = ServiceRequestStatusUpdateSerializer(
            service_request,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

