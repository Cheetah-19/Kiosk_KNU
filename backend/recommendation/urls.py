from django.urls import path
from . import views

urlpatterns = [
    # 여기에 URL 패턴을 추가합니다.
    # path('your-url/', views.your_view_function, name='your-view-name'),
    path('',views.LoginView.as_view(),name='recommendation'),

]
