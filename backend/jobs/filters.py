import django_filters
from django.db.models import Q
from .models import JobOffer, JobApplication


class JobOfferFilter(django_filters.FilterSet):
    contract_type = django_filters.CharFilter(field_name='contract_type', lookup_expr='iexact')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    company_name = django_filters.CharFilter(field_name='company_name', lookup_expr='icontains')
    recruiter = django_filters.NumberFilter(field_name='recruiter_id')
    is_active = django_filters.BooleanFilter(field_name='is_active')

    # Search filter that looks across multiple fields
    search = django_filters.CharFilter(method='filter_search', label='Search')

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(location__icontains=value) |
            Q(company_name__icontains=value) |
            Q(contract_type__icontains=value)
        )

    class Meta:
        model = JobOffer
        fields = ['contract_type', 'location', 'company_name', 'recruiter', 'is_active']


class JobApplicationFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')
    job_offer = django_filters.NumberFilter(field_name='job_offer_id')
    candidate = django_filters.NumberFilter(field_name='candidate_id')

    class Meta:
        model = JobApplication
        fields = ['status', 'job_offer', 'candidate']