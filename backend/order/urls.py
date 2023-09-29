from django.urls import path
from . import views
app_name = 'order'

urlpatterns = [
    path('',views.test,name='test'),
    path('menus',views.MenulistView.as_view(),name='menu'),
    path('menus/<int:id>/',views.OptionView.as_view(),name='option'),
]