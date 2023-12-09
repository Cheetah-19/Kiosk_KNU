from django.urls import path
from . import views
app_name = 'manager'

urlpatterns = [
    path('delete-menu/', views.delete_menu.as_view(),name='delete_menu'),
    path('manage-category/',views.manage_category.as_view(),name='get-categroy'),
    path('manage-option/',views.manage_option.as_view(), name='get-option'),
    path('manage-ingredient/',views.manage_ingredient.as_view(), name='get-ingredient'),
    path('add-menu/',views.add_menu.as_view(),name='add-menu'),
]   
