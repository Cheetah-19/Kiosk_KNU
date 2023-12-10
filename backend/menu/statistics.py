from django.db import models
from django.db.models import Count
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
#signup의 models들을 다 가져옴 , 나중에 필요한 파일만 가져오도록 고칠 예정
from signup.models import *
# 전체 주문 메뉴 top 5 - for 회원 및 비회원





def get_popular_menus(top_n):
    # Ordered_Item에서 각 메뉴의 빈도를 집계하고 상위 N개를 가져옵니다.
    popular_menus = Ordered_Item.objects.values('menu__menu_name').annotate(menu_count=Count('menu')).order_by('-menu_count')[:top_n]
    return popular_menus

# 전체 주문 메뉴 top 5 - for 회원 
# ( 알러지 , 종교, 비건 에 따라 제한되는 재료를 사용하는 음식을 제외한 메뉴 랭킹)
def get_popular_menus_exclude_ver(user, top_n):

    # 사용자가 제외할 재료를 리스트로 파싱
    excluded_ingredients = list(map(int, user.preprocesseddata.excluded_ingredients.strip('{}').split(',')))
    popular_menus_exclude_ver = (
        Ordered_Item.objects
        .values('menu__menu_name')                 # 전체 메뉴 중에서 메뉴 이름을 가져옴
        .annotate(menu_count=Count('menu'))        # 메뉴 이름 기준으로 그룹화 , 각 메뉴의 주문 횟수를 세어 menu_count 필드로 추가
        .exclude(menu__menu_ingredient__in=excluded_ingredients)  # 사용자가 제외할 재료가 포함된 메뉴는 제외
        .order_by('-menu_count')[:top_n]           # 주문 횟수 기준 내림차순 정렬 후 top_n 개의 메뉴 가져옴
    )

    return popular_menus_exclude_ver

# 회원별 주문 메뉴 top 5
def get_popular_menus_by_user(user, top_n):
    # 특정 사용자가 주문한 각 메뉴의 빈도를 집계하고 상위 N개를 가져옵니다.
    top_menus_by_user = (
        Ordered_Item.objects
        .filter(order__user=user)              # 해당 사용자가 주문한 항목들을 필터링
        .values('menu__menu_name')             # 주문 항목들 중에서 메뉴 이름을 가져옴
        .annotate(menu_count=Count('menu'))    # 메뉴 이름 기준으로 그룹화 , 각 메뉴의 주문 횟수를 세어 menu_count 필드로 추가
        .order_by('-menu_count')[:top_n]       # 주문 횟수 기준 내림차순 정렬 후 top_n 개의 메뉴 가져옴
    )

    return top_menus_by_user                   # 각 메뉴 이름 - 주문 횟수 담은 Queryset 반환    

    #QuertSet 예시
    #<QuerySet [{'menu__menu_name': '파송송 라면', 'menu_count': 1}, {'menu__menu_name': '치즈 폭탄 라면', 'menu_count': 1}, {'menu__menu_name': '연어 샐러드', 'menu_count': 1}, {'menu__menu_name': '쌀국수', 'menu_count': 1}, {'menu__menu_name': '불닭 국수', 'menu_count': 1}]>
