"""
Views for Job Offers and Job Applications.

Expected User Model Attributes:
- User.role: Expected to be one of 'ADMIN', 'PROFESSIONNEL', 'RECRUTEUR', 'CANDIDAT', etc.
  (Used for permission checks in various viewset actions)
"""

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import JobOffer, JobApplication
from .serializers import JobOfferSerializer, JobApplicationSerializer
from .filters import JobOfferFilter, JobApplicationFilter
from drf_yasg.utils import swagger_auto_schema

from django.utils.decorators import method_decorator

@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Job Offers']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Job Offers']))
class JobOfferViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Job Offers.

    Includes a custom action 'get_applications' to retrieve all applications for a specific job offer.
    """
    serializer_class = JobOfferSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = JobOfferFilter
    search_fields = ['title', 'description', 'location', 'company_name', 'contract_type']

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [permissions.IsAuthenticated()] # Ideally recruiter permission
        return [permissions.AllowAny()]

    def get_queryset(self):
        # If user is authenticated and is a recruiter, return only their job offers
        # Otherwise return all active job offers
        if self.request.user.is_authenticated and hasattr(self.request.user, 'role'):
            user = self.request.user
            # Using the actual role names from the User model
            if user.role in ['RECRUTEUR', 'ADMIN', 'PROFESSIONNEL']:  # Actual role values
                return JobOffer.objects.select_related('recruiter').filter(
                    is_active=True,
                    recruiter=user
                )

        # For anonymous users or non-recruiters, return all active job offers
        return JobOffer.objects.select_related('recruiter').filter(is_active=True)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

    @swagger_auto_schema(
        method='get',
        tags=['Job Offers'],
        responses={200: JobApplicationSerializer(many=True)},
        operation_summary="Get applications for a specific job offer",
        operation_description="Returns all job applications associated with the specified job offer."
    )
    @action(detail=True, methods=['get'], url_path='applications', permission_classes=[permissions.IsAuthenticated])
    def get_applications(self, request, pk=None):
        """
        Custom action to get all applications for a specific job offer
        """
        job_offer = self.get_object()  # Gets the JobOffer instance based on pk

        # Check if the requesting user is authorized to view applications for this job
        if not (hasattr(request.user, 'role') and request.user.role in ['ADMIN', 'PROFESSIONNEL', 'RECRUTEUR']) and job_offer.recruiter != request.user:
            return Response({'detail': 'You do not have permission to view applications for this job offer.'},
                          status=status.HTTP_403_FORBIDDEN)

        applications = JobApplication.objects.filter(job_offer=job_offer)
        serializer = JobApplicationSerializer(applications, many=True, context={'request': request})
        return Response(serializer.data)

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
    filter_backends = [DjangoFilterBackend]
    filterset_class = JobApplicationFilter
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)

    def get_queryset(self):
        # Candidates see their applications, Recruiters see applications to their jobs
        if not self.request.user.is_authenticated:
             return JobApplication.objects.none()
        user = self.request.user

        if user.role in ['ADMIN', 'PROFESSIONNEL', 'RECRUTEUR']: # Simplification
             return JobApplication.objects.filter(job_offer__recruiter=user)
        return JobApplication.objects.filter(candidate=user)

    @swagger_auto_schema(
        method='get',
        responses={200: JobApplicationSerializer(many=True)},
        operation_summary="Get all applications for jobs posted by the authenticated recruiter",
        operation_description="Returns all job applications associated with job offers created by the authenticated recruiter."
    )
    @action(detail=False, methods=['get'], url_path='my-applications', permission_classes=[permissions.IsAuthenticated])
    def my_applications(self, request):
        """
        Custom action to get all applications for jobs posted by the authenticated recruiter
        """
        user = request.user

        # Check if the user is a recruiter or has appropriate permissions
        if not (hasattr(user, 'role') and user.role in ['ADMIN', 'PROFESSIONNEL', 'RECRUTEUR']):
            return Response(
                {'detail': 'You do not have permission to view applications for your job offers.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get all applications for job offers posted by this recruiter
        applications = JobApplication.objects.filter(job_offer__recruiter=user)
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)

    def _check_application_permission(self, application):
        """Helper method to check if user has permission to modify an application"""
        user = self.request.user
        if not user.is_authenticated:
            return False

        # Allow admin/professional/recruiter to modify any application for their jobs
        if hasattr(user, 'role') and user.role in ['ADMIN', 'PROFESSIONNEL', 'RECRUTEUR']:
            return application.job_offer.recruiter == user

        # Allow the job offer recruiter to modify the application
        return application.job_offer.recruiter == user

    @swagger_auto_schema(
        method='patch',
        manual_parameters=[],  # No request body needed
        tags=['Job Applications'],
        responses={200: JobApplicationSerializer, 403: "Permission denied", 400: "Invalid status"},
        operation_summary="Accept a job application",
        operation_description="Updates the status of a job application to ACCEPTED. No request body required - application ID is taken from URL."
    )
    @action(detail=True, methods=['patch'], url_path='accept', permission_classes=[permissions.IsAuthenticated])
    def accept_application(self, request, pk=None):
        """
        Custom action to accept a job application
        """
        application = self.get_object()

        # Check if user has permission to modify this application
        if not self._check_application_permission(application):
            return Response(
                {'detail': 'You do not have permission to accept this application.'},
                status=status.HTTP_403_FORBIDDEN
            )

        application.status = 'ACCEPTED'
        application.save()
        serializer = self.get_serializer(application)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[],  # No request body needed
        tags=['Job Applications'],
        method='patch',
        responses={200: JobApplicationSerializer, 403: "Permission denied", 400: "Invalid status"},
        operation_summary="Review a job application",
        operation_description="Updates the status of a job application to REVIEWING. No request body required - application ID is taken from URL."
    )
    @action(detail=True, methods=['patch'], url_path='review', permission_classes=[permissions.IsAuthenticated])
    def review_application(self, request, pk=None):
        """
        Custom action to set a job application to reviewing status
        """
        application = self.get_object()

        # Check if user has permission to modify this application
        if not self._check_application_permission(application):
            return Response(
                {'detail': 'You do not have permission to review this application.'},
                status=status.HTTP_403_FORBIDDEN
            )

        application.status = 'REVIEWING'
        application.save()
        serializer = self.get_serializer(application)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[],  # No request body needed
        tags=['Job Applications'],
        method='patch',
        responses={200: JobApplicationSerializer, 403: "Permission denied", 400: "Invalid status"},
        operation_summary="Reject a job application",
        operation_description="Updates the status of a job application to REJECTED. No request body required - application ID is taken from URL."
    )
    @action(detail=True, methods=['patch'], url_path='reject', permission_classes=[permissions.IsAuthenticated])
    def reject_application(self, request, pk=None):
        """
        Custom action to reject a job application
        """
        application = self.get_object()

        # Check if user has permission to modify this application
        if not self._check_application_permission(application):
            return Response(
                {'detail': 'You do not have permission to reject this application.'},
                status=status.HTTP_403_FORBIDDEN
            )

        application.status = 'REJECTED'
        application.save()
        serializer = self.get_serializer(application)
        return Response(serializer.data)
