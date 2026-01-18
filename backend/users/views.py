from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

User = get_user_model()

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Users']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Users']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Users']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Users']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Users']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Users']))
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return RegisterSerializer
        return UserSerializer

    @swagger_auto_schema(tags=['Users'])
    @action(detail=False, methods=['get'])
    def me(self, request):
        if request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({'detail': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
