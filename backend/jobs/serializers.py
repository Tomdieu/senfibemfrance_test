from rest_framework import serializers
from .models import JobOffer, JobApplication

class JobOfferSerializer(serializers.ModelSerializer):
    recruiter_name = serializers.CharField(source='recruiter.username', read_only=True)

    class Meta:
        model = JobOffer
        fields = '__all__'
        read_only_fields = ('recruiter', 'created_at')

class JobApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job_offer.title', read_only=True)
    candidate_name = serializers.CharField(source='candidate.username', read_only=True)

    class Meta:
        model = JobApplication
        fields = '__all__'
        read_only_fields = ('candidate', 'applied_at', 'status')
