from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, CandidateProfile, CompanyProfile

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ('user',)

class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = '__all__'
        read_only_fields = ('user',)

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = '__all__'
        read_only_fields = ('user',)

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    candidate_profile = CandidateProfileSerializer(read_only=True)
    company_profile = CompanyProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'role', 'phone', 'profile', 'candidate_profile', 'company_profile')
        read_only_fields = ('email', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'role', 'phone')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Create empty profiles based on role
        Profile.objects.create(user=user)
        if user.role in ['CANDIDAT', 'STAGIAIRE']:
            CandidateProfile.objects.create(user=user)
        elif user.role in ['PRO', 'PARTENAIRE', 'FREELANCE']:
            CompanyProfile.objects.create(user=user)
        return user
