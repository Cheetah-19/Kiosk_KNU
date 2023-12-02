from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from recommendation.models import *


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class LoginView(APIView):
    def get(self, request):
        # 메뉴와 재료, 메뉴 설명
        menus = {
            '불닭 국수': 'Rice Onion Pepper Chicken Wheat Egg',
            '싸이버거': 'Tomato Cheese Onion Chicken',
            '소고기 샐러드': 'Tomato Onion Beef Soybean Egg',
            '새우 초밥': 'Rice Shrimp',
            '연어 초밥': 'Salmon Rice',
            '쌀국수': 'Rice Onion Egg',
            '불닭볶음면': 'Wheat Egg Onion',
            '칼국수': 'Wheat Onion'
        }

        # TF-IDF 변환
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(menus.values())
        tfidf_features = np.array(tfidf_matrix.todense())
        print(tfidf_features)   #row -> 문서의 수 , columns -> 단어의 수

        # 코사인 유사도 계산
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)      #모든 메뉴 간의 유사도 계산 

        # 가장 유사한 메뉴 찾기
        index = list(menus.keys()).index('불닭 국수')                    #찾고자 하는 메뉴의 index 찾기 -> 딕셔너리의 키인 메뉴 이름들을 리스트로 변환  
        
        #유사도가 높은 순서대로 정렬된 메뉴들의 인덱스와 ㅉ유사도를 담은 리스트
        similar_menus = sorted(list(enumerate(cosine_sim[index])), key=lambda x: x[1], reverse=True)    #x[1] 은 유사도
        
        print(similar_menus) #형태 -> (0, 1.0000000) 인덱스 , 유사도 순

        # 결과를 Response로 반환
        recommended_menus = [list(menus.keys())[i[0]] for i in similar_menus[1:]]  # 자기 자신을 제외한 메뉴들
        return Response({'recommended_menus': recommended_menus})


