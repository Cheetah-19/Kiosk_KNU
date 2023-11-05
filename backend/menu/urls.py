from django.urls import path
from . import views
app_name = 'menu'

urlpatterns = [
    path('option/', views.OptionView.as_view(),name='option'),
    path('<str:userphonenum>/',views.member_MenulistView.as_view(),name='member_menu'),
    path('',views.nonmember_MenulistView.as_view(),name='nonmember_menu'),
]