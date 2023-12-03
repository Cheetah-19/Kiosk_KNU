from django.urls import path
from . import views

urlpatterns = [
    # 여기에 URL 패턴을 추가합니다.
    # path('your-url/', views.your_view_function, name='your-view-name'),
    path('1/<str:user_id>',views.TF_IDF_View.as_view(),name='recommendation'),
    path('2',views.Word2VecView.as_view(),name='recommendation2'),
    path('3',views.Doc2VecView.as_view(),name='recommendation3'),
    path('4',views.BOWView.as_view(),name='recommendation4'),

]
