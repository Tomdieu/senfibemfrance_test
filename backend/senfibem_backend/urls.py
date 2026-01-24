from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="SEN FIBEM API",
        default_version='v1',
        description="API for SEN FIBEM FRANCE Platform",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@senfibem.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth (Social + Local)

    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('accounts/', include('django.contrib.auth.urls')), # For login/logout template 

    # Apps (Removed v1 prefix)
    path('api/auth/', include('users.urls')),
    path('api/services/', include('services.urls')),
    path('api/billing/', include('billing.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/store/', include('store.urls')),
    path('api/core/', include('core.urls')),

    # Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
