from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#swagger 관련
router = routers.DefaultRouter()
#swagger 관련
schema_view = get_schema_view(
    openapi.Info(
        title="KIOSK_KNU",
        default_version='1.1.1',
        description="KIOSK_KNU API 문서",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="optimuslove0223@icloud.com"),
        license=openapi.License(name="Cheetah-19"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', include('signup.urls')),
    path('login/', include('login.urls')),
    path('order/',include('order.urls')),
    path('menu/', include('menu.urls')),
    path('recommendation/', include('recommendation.urls')),
    path('manager/',include('manager.urls')),
] +static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)