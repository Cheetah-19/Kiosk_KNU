from django.urls import path
from . import views
app_name = 'manager'

urlpatterns = [
    path('manage-menu/',views.manage_menu.as_view(),name='manage-menu'),
    path('manage-category/',views.manage_category.as_view(),name='manage-categroy'),
    path('manage-option/',views.manage_option.as_view(), name='manage-option'),
    path('manage-ingredient/',views.manage_ingredient.as_view(), name='manage-ingredient'),
    path('add-menu/',views.add_menu.as_view(),name='add-menu'),
]   
