from django.urls import path
from . import views
app_name = 'order'

urlpatterns = [
    path('',views.test,name='test'),
    # path('menu',views.MenulistView.as_view(),name='menu'),
    # path('menu/option/', views.OptionView.as_view(),name='option'),
    # path('menu/<int:id>/',views.OptionView.as_view(),name='option'),
    path('menu/orderpost/', views.OrderView.as_view(),name='order'),
    path('<str:userphonenum>/orderdetail/', views.user_OrderDetailView.as_view(), name='orderdetail')
]