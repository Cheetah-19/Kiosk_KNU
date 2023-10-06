"""
URL configuration for django_react_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
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
    # path('menu/',include('api.urls')),   
    # path('user/', include('signup.urls')),
    # path('api/', include('rest_framework.urls')),
    #swagger
    # path('api/', include('api.urls')),
    # re_path('.*', TemplateView.as_view(template_name='index.html')),
]

#swagger 관련
if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]