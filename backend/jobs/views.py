from rest_framework import viewsets, permissions
from .models import JobOffer, JobApplication
from .serializers import JobOfferSerializer, JobApplicationSerializer
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Job Offers']))
class JobOfferViewSet(viewsets.ModelViewSet):
    queryset = JobOffer.objects.filter(is_active=True)
    serializer_class = JobOfferSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [permissions.IsAuthenticated()] # Ideally recruiter permission
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Job Applications']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Job Applications']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Job Applications']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Job Applications']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Job Applications']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Job Applications']))
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)

    def get_queryset(self):
        # Candidates see their applications, Recruiters see applications to their jobs
        if not self.request.user.is_authenticated:
             return JobApplication.objects.none()
        user = self.request.user

        if user.role in ['ADMIN', 'PRO', 'PARTENAIRE']: # Simplification
             return JobApplication.objects.filter(job_offer__recruiter=user)
        return JobApplication.objects.filter(candidate=user)
