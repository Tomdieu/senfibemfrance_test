from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, CandidateProfileViewSet, CompanyProfileViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'candidate-profiles', CandidateProfileViewSet)
router.register(r'company-profiles', CompanyProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
