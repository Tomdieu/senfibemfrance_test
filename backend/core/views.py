from rest_framework import viewsets, permissions
from .models import Notification, Document
from .serializers import NotificationSerializer, DocumentSerializer

from .serializers import NotificationSerializer, DocumentSerializer
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Notifications']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Notifications']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Notifications']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Notifications']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Notifications']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Notifications']))
class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
             return Notification.objects.none()
        return Notification.objects.filter(user=self.request.user)


@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Documents']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Documents']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Documents']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Documents']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Documents']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Documents']))
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
