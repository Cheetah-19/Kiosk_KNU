from signup.models import *
from .serializers import *
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 사용자의 과거 주문 정보와 메뉴 내의 재료 정보를 바탕으로 사용자에게 메뉴를 추천하는 기능 
# 사용자가 못 먹는 재료는 추천하지 않음
def get_recommended(user_id, excluded_ingredients):
    # 메뉴와 재료
    menus_db = Menu.objects.all()
    #유저 인스턴스 가져오기
    user_instance = User.objects.get(user_phonenum = user_id)

    menus = {}
    for menu in menus_db:
        ingredients = [ingredient.id for ingredient in menu.menu_ingredient.all()]
        # 제외 재료가 포함된 메뉴는 건너뛰기
        if any(ingredient in excluded_ingredients for ingredient in ingredients):
            continue
        ingredients_str = " ".join([ingredient.ingredient_name for ingredient in menu.menu_ingredient.all()])
        menus[menu.menu_name] = ingredients_str

    # 주문 데이터: {주문번호: {'user': 사용자 ID, 'menus': [주문한 메뉴 리스트]}}
    orders_db = Order.objects.filter(user=user_instance)

    orders = {}
    for order in orders_db:
        ordered_items = Ordered_Item.objects.filter(order=order)
        orders[order.order_num] = {'user': order.user.user_phonenum, 'menus': [item.menu.menu_name for item in ordered_items]}

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
            past_menus.append(menu)           # ex) ['연어 샐러드', '연어 샐러드', '싸이버거', '쌀국수', '쌀국수']  로 나오는데, 두 번 나오는 게 더 가중치가 높아진다
    

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
    recommended_menus = []
    for recom in sorted_menus:
        this_menu = Menu.objects.get(menu_name=recom)
        this_serial = MenuSerializer(this_menu)
        recommended_menus.append(this_serial.data)
    # # 유사도가 높은 순서대로 메뉴 정렬
    # sorted_menus = sorted(list(menus.keys()), key=lambda x: similar_menus[list(menus.keys()).index(x)], reverse=True)

    # 과거에 주문한 메뉴는 추천 목록에서 제외
    #  recommended_menus = []
    #  for menu in sorted_menus:
    #      if menu not in past_menus:
    #         recommended_menus.append(menu)
    recommended_menus = recommended_menus[0:3]
    return recommended_menus