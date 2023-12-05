from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .serializers import *
from recommendation.models import *
from gensim.models import Word2Vec
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer


class TF_IDF_View(APIView):
    def get(self, request, user_id):
        # 메뉴와 재료
        # menus = {
        #     '불닭 국수': '밀 양파 고추 닭고기 밀가루 계란',
        #     '싸이버거': '치즈 양파 닭고기 ',
        #     '불고기버거': '양파 돼지고기 밀 치즈',
        #     '소고기 샐러드': '토마토 양파 소고기 대두 계란',
        #     '새우 초밥': '쌀 새우',
        #     '연어 초밥': '연어 쌀',
        #     '쌀국수': '쌀 양파 계란',
        #     '불닭볶음면': '밀 계란 양파',
        #     '칼국수': '밀 양파',
        #     '파송송 라면': '밀 파',
        #     '닭가슴살 샐러드': '닭가슴살 양상추 토마토',
        #     '양상추 샐러드': '토마토 양파 양상추'
        # }

        # # 주문 데이터: {주문번호: {'user': 사용자 ID, 'menus': [주문한 메뉴 리스트]}}
        # orders = {
        #     '10000080': {'user': '00000000003', 'menus': ['닭가슴살 샐러드']},
        #     '10000082': {'user': '00000000003', 'menus': ['쌀국수', '불닭볶음면']}
        # }

        # 메뉴와 재료
        menus_db = Menu.objects.all()
        user_instance = User.objects.get(user_phonenum = user_id)             #유저 인스턴스 가져오기

        try:
            user_preprocessed_data = PreprocessedData.objects.get(user=user_instance)
            exclude_ingredient_str = user_preprocessed_data.excluded_ingredients
        except PreprocessedData.DoesNotExist:
            exclude_ingredient_str = ""

        #String 을 Set 으로 변경하는 과정
        # 중괄호 제거 후 쉼표로 분할
        exclude_ingredient_list = exclude_ingredient_str[1:-1].split(',')
        #문자열 -> 정수 변환 후 set 제작
        excluded_ingredients = set(int(item.strip()) for item in exclude_ingredient_list)


        menus = {}
        for menu in menus_db:
            ingredients = [ingredient.id for ingredient in menu.menu_ingredient.all()]
            # 제외 재료가 포함된 메뉴는 건너뛰기
            if any(ingredient in excluded_ingredients for ingredient in ingredients):
                continue
            ingredients_str = " ".join([ingredient.ingredient_name for ingredient in menu.menu_ingredient.all()])
            menus[menu.menu_name] = ingredients_str
        
        print(menus)

        # 주문 데이터: {주문번호: {'user': 사용자 ID, 'menus': [주문한 메뉴 리스트]}}
        orders_db = Order.objects.filter(user=user_instance)
        print(orders_db)
        orders = {}
        for order in orders_db:
            ordered_items = Ordered_Item.objects.filter(order=order)
            orders[order.order_num] = {'user': order.user.user_phonenum, 'menus': [item.menu.menu_name for item in ordered_items]}

        print(orders)

        # TF-IDF 변환
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(menus.values())
        tfidf_features = np.array(tfidf_matrix.todense())

        # 코사인 유사도 계산
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # 사용자의 과거 주문에서 메뉴 추출
        past_orders = []
        for order in orders.values():
            if order['user'] == user_id:
                past_orders.append(order['menus'])

        past_menus = []
        for order in past_orders:
            for menu in order:
                past_menus.append(menu)

        # 과거에 주문한 메뉴와 유사한 메뉴 찾기
        similar_menus = np.zeros(len(menus))
        for menu in past_menus:
            index = list(menus.keys()).index(menu)
            similar_menus += cosine_sim[index]

        # 유사도 계산을 위한 인덱스를 얻는 함수
        def get_index(menu):
            menu_keys = list(menus.keys())
            index = menu_keys.index(menu)
            return similar_menus[index]

        # 메뉴 리스트를 생성
        menu_list = list(menus.keys())

        # 유사도가 높은 순서대로 메뉴를 정렬
        sorted_menus = []
        for menu in menu_list:
            sorted_menus.append((menu, get_index(menu)))

        sorted_menus.sort(key=lambda x: x[1], reverse=True)

        # 메뉴 이름만 추출
        sorted_menus = [menu[0] for menu in sorted_menus]
        # # 유사도가 높은 순서대로 메뉴 정렬
        # sorted_menus = sorted(list(menus.keys()), key=lambda x: similar_menus[list(menus.keys()).index(x)], reverse=True)

        # 과거에 주문한 메뉴는 추천 목록에서 제외
        recommended_menus = []
        for menu in sorted_menus:
            if menu not in past_menus:
                recommended_menus.append(menu)

        return Response({'recommended_menus': recommended_menus})
    

class Word2VecView(APIView):
    def get(self, request):
        menus = {
            '불닭 국수': {
                'ingredients': ['쌀', '양파', '닭고기', '밀', '계란'],
                'description': '매운 닭고기와 채소가 들어간 국수입니다.'
            },
            '싸이버거': {
                'ingredients': ['토마토', '치즈', '양파', '닭고기', '밀'],
                'description': '치킨, 치즈, 신선한 채소가 들어간 버거입니다.'
            },
            '소고기 샐러드': {
                'ingredients': ['토마토', '양파', '소고기', '대두', '계란'],
                'description': '소고기와 토마토, 양파, 콩, 계란이 들어간 샐러드입니다.'
            },
            '새우 초밥': {
                'ingredients': ['쌀', '새우'],
                'description': '초밥으로 즐기는 새우와 밥의 조합입니다.'
            },
            '연어 초밥': {
                'ingredients': ['연어', '쌀'],
                'description': '초밥으로 즐기는 연어와 밥의 조합입니다.'
            },
            '쌀국수': {
                'ingredients': ['쌀', '양파', '계란'],
                'description': '양파와 계란이 들어간 쌀국수입니다.'
            },
            '불닭볶음면': {
                'ingredients': ['밀', '계란', '양파'],
                'description': '매운 닭고기와 계란이 들어간 볶음면입니다.'
            },
            '칼국수': {
                'ingredients': ['밀', '양파'],
                'description': '양파와 소면이 들어간 칼국수입니다.'
            }
        }

        # Word2Vec 모델 학습
        model = Word2Vec([[menu] + menu_info['ingredients'] + menu_info['description'].split() for menu, menu_info in menus.items()], vector_size=100, window=3, min_count=1)
        # 현재 메뉴와 가장 유사한 메뉴를 찾기
        current_menu = '김치'
        similar_menus = model.wv.most_similar(positive=current_menu, topn=len(menus))
        print(similar_menus)
        # 자신을 제외한 메뉴들을 추천 리스트에 포함
        recommended_menus = [{'menu': menu, 'description': menus[menu]['description']} for menu, similarity in similar_menus if menu != current_menu]

        return Response({'recommended_menus': recommended_menus})
    

class Doc2VecView(APIView):
    def get(self, request):
        menus = {
            '불닭 국수': {
                'ingredients': ['Rice', 'Onion', 'Chicken', 'Wheat', 'Egg'],
                'description': '매운 닭고기와 채소가 들어간 국수입니다.'
            },
            '싸이버거': {
                'ingredients': ['Tomato', 'Cheese', 'Onion', 'Chicken'],
                'description': '치킨, 치즈, 신선한 채소가 들어간 버거입니다.'
            },
            '소고기 샐러드': {
                'ingredients': ['Tomato', 'Onion', 'Beef', 'Soybean', 'Egg'],
                'description': '소고기와 토마토, 양파, 콩, 계란이 들어간 샐러드입니다.'
            },
            '새우 초밥': {
                'ingredients': ['Rice', 'Shrimp'],
                'description': '초밥으로 즐기는 새우와 밥의 조합입니다.'
            },
            '연어 초밥': {
                'ingredients': ['Salmon', 'Rice'],
                'description': '초밥으로 즐기는 연어와 밥의 조합입니다.'
            },
            '쌀국수': {
                'ingredients': ['Rice', 'Onion', 'Egg'],
                'description': '양파와 계란이 들어간 쌀국수입니다.'
            },
            '불닭볶음면': {
                'ingredients': ['Wheat', 'Egg', 'Onion'],
                'description': '매운 닭고기와 계란이 들어간 볶음면입니다.'
            },
            '칼국수': {
                'ingredients': ['Wheat', 'Onion'],
                'description': '양파와 소면이 들어간 칼국수입니다.'
            }
        }

        # 각 메뉴를 하나의 문서로 취급하고, 이를 바탕으로 Doc2Vec 모델 학습
        documents = [TaggedDocument(words=menu_info['ingredients'] + menu_info['description'].split(), tags=[menu]) for menu, menu_info in menus.items()]
        model = Doc2Vec(documents, vector_size=100, window=3, min_count=1, workers=4)
        print(model.wv.key_to_index)
        # 현재 메뉴와 가장 유사한 메뉴를 찾기
        current_menu = '불닭 국수'
        similar_menus = model.docvecs.most_similar(positive=[model.docvecs[current_menu]], topn=len(menus))
        
        # 유사도가 높은 순으로 정렬
        similar_menus.sort(key=lambda x: x[1], reverse=True)
        print(similar_menus)
        # 자신을 제외한 메뉴들을 추천 리스트에 포함
        recommended_menus = [{'menu': menu, 'description': menus[menu]['description']} for menu, similarity in similar_menus if menu != current_menu]

        return Response({'recommended_menus': recommended_menus})
    

class BOWView(APIView):
    def get(self, request):
        menus = {
            '불닭 국수': {
                'ingredients': ['Rice', 'Onion', 'Chicken', 'Wheat', 'Egg'],
                'description': '매운 닭고기와 채소가 들어간 국수입니다.'
            },
            '싸이버거': {
                'ingredients': ['Tomato', 'Cheese', 'Onion', 'Chicken'],
                'description': '치킨, 치즈, 신선한 채소가 들어간 버거입니다.'
            },
            '소고기 샐러드': {
                'ingredients': ['Tomato', 'Onion', 'Beef', 'Soybean', 'Egg'],
                'description': '소고기와 토마토, 양파, 콩, 계란이 들어간 샐러드입니다.'
            },
            '새우 초밥': {
                'ingredients': ['Rice', 'Shrimp'],
                'description': '초밥으로 즐기는 새우와 밥의 조합입니다.'
            },
            '연어 초밥': {
                'ingredients': ['Salmon', 'Rice'],
                'description': '초밥으로 즐기는 연어와 밥의 조합입니다.'
            },
            '쌀국수': {
                'ingredients': ['Rice', 'Onion', 'Egg'],
                'description': '양파와 계란이 들어간 쌀국수입니다.'
            },
            '불닭볶음면': {
                'ingredients': ['Wheat', 'Egg', 'Onion'],
                'description': '매운 닭고기와 계란이 들어간 볶음면입니다.'
            },
            '칼국수': {
                'ingredients': ['Wheat', 'Onion'],
                'description': '양파와 소면이 들어간 칼국수입니다.'
            }
        }

        # 각 메뉴를 하나의 문서로 취급하고, 이를 바탕으로 BOW 벡터 생성
        vectorizer = CountVectorizer()
        documents = [' '.join(menu_info['ingredients'] + menu_info['description'].split()) for menu_info in menus.values()]
        X = vectorizer.fit_transform(documents)

        # 현재 메뉴와 가장 유사한 메뉴를 찾기
        current_menu_index = list(menus.keys()).index('새우 초밥')
        similarities = cosine_similarity(X[current_menu_index], X).flatten()
        
        # 유사도가 높은 순으로 메뉴들을 정렬
        sorted_menu_indexes = similarities.argsort()[::-1]

        # 자신을 제외한 메뉴들을 추천 리스트에 포함
        recommended_menus = [{'menu': list(menus.keys())[i], 'description': list(menus.values())[i]['description']} for i in sorted_menu_indexes if i != current_menu_index]

        return Response({'recommended_menus': recommended_menus})