from django.urls import path
from . import views
app_name = 'order'

urlpatterns = [
    path('',views.test,name='test'),
    path('menu',views.MenulistView.as_view(),name='menu'),
    path('menu/<int:id>/',views.OptionView.as_view(),name='option'),
]