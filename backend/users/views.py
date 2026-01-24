from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer, CandidateProfileSerializer, CompanyProfileSerializer
from .models import Profile, CandidateProfile, CompanyProfile

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
    filterset_fields = ['role', 'email', 'is_active']

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

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['User Profiles']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['User Profiles']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['User Profiles']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['User Profiles']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['User Profiles']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['User Profiles']))
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['city']

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return Profile.objects.all()
        return Profile.objects.filter(user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Candidate Profiles']))
class CandidateProfileViewSet(viewsets.ModelViewSet):
    queryset = CandidateProfile.objects.all()
    serializer_class = CandidateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['title']

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return CandidateProfile.objects.all()
        return CandidateProfile.objects.filter(user=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Company Profiles']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Company Profiles']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Company Profiles']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Company Profiles']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Company Profiles']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Company Profiles']))
class CompanyProfileViewSet(viewsets.ModelViewSet):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['company_name']

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return CompanyProfile.objects.all()
        return CompanyProfile.objects.filter(user=self.request.user)
