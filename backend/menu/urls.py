from django.urls import path
from . import views
app_name = 'menu'

urlpatterns = [
    path('',views.MenulistView.as_view(),name='menu'),
    path('option/', views.OptionView.as_view(),name='option'),
    path('addmenu/',views.InsertMenuView.as_view(),name='menuAdd'),
    path('addoption/',views.InsertMenuOptionView.as_view(),name='optionAdd'),
    path('addmenucategory/',views.InsertMenuCategoryView.as_view(),name='menucategoryAdd'),
    path('addoptioncategory/',views.InsertOptionCategoryView.as_view(),name='optioncategoryAdd'),
]