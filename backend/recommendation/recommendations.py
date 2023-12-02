
#TfidfVectorizer -> 문서 집합에서 단어의 중요도를 계산하고 벡터로 변환하는 라이브러리
from sklearn.feature_extraction.text import TfidfVectorizer
#OneHotEncoder -> 범주형 데이터를 벡터로 변환하는 라이브러리
from sklearn.preprocessing import OneHotEncoder
import numpy as np

# 메뉴 이름을 벡터화하는 함수
def vectorize_menu_name(menu):
    vectorizer = TfidfVectorizer()
    menu_name_vector = vectorizer.fit_transform([menu.menu_name])
    return menu_name_vector.toarray()

# 메뉴 카테고리를 벡터화하는 함수
def vectorize_menu_category(menu):
    encoder = OneHotEncoder()
    menu_category_vector = encoder.fit_transform([[menu.menucategory.menucategory_name]])
    return menu_category_vector.toarray()

# 메뉴 재료를 벡터화하는 함수
def vectorize_menu_ingredient(menu):
    ingredients = [ingredient.ingredient_name for ingredient in menu.menu_ingredient.all()]
    encoder = OneHotEncoder()
    menu_ingredient_vector = encoder.fit_transform([ingredients])
    return menu_ingredient_vector.toarray()

# 메뉴를 벡터화하는 함수
def vectorize_menu(menu):
    name_vector = vectorize_menu_name(menu)
    category_vector = vectorize_menu_category(menu)
    ingredient_vector = vectorize_menu_ingredient(menu)

    # 각 특성 벡터를 결합합니다.
    menu_vector = np.concatenate([name_vector, category_vector, ingredient_vector], axis=1)

    return menu_vector
