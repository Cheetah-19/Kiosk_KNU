from django.urls import path
from . import views
app_name = 'menu'

urlpatterns = [
    path('',views.MenulistView.as_view(),name='menu'),
    path('option/', views.OptionView.as_view(),name='option'),
]