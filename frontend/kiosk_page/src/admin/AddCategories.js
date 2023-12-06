//서버로부터 카테고리 가져와서 보여주는 곳.
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import "../Home.css";
import "../Common.css";
import "./Admin.css";

export default function AddCategories() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);

    // 카테고리 선택 핸들러
    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    // 다음 페이지로 이동하는 핸들러
    const goToNextPage = () => {
        if (selectedCategory !== null) {
            navigate('/AddOptions', { state: { selectedCategory } });
        }
    };

    //뒤로 가는 함수
    function herf_back() {
        navigate('/Admin');
    }

    const categories = [
        {
            "id": 1,
            "menucategory_name": "라면류"
        },
        {
            "id": 2,
            "menucategory_name": "국수류"
        },
        {
            "id": 4,
            "menucategory_name": "사이드"
        },
        {
            "id": 5,
            "menucategory_name": "추천메뉴"
        },
        {
            "id": 6,
            "menucategory_name": "신동혁"
        },
        {
            "id": 8,
            "menucategory_name": "신영재"
        },
        {
            "id": 10,
            "menucategory_name": "추가한거"
        },
        {
            "id": 11,
            "menucategory_name": "신용재"
        }
    ];
    return (
        <div id = "pay_page">
            <div id="top_bar_back" onClick={herf_back}></div>
            <header>KIOSK Admin</header>
            <div className='rect1'>
              <div className='txt1'>카테고리를 선택하세요</div>
              <div className='rect2'>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className='category-button'
                        style={selectedCategory === category ? { backgroundColor: '#FF7400', color: '#FFFFFF' } : null}
                        onClick={() => selectCategory(category)}
                    >
                        {category.menucategory_name}
                    </div>
                ))}
              </div>
              <div className='prev-btn' onClick={herf_back}>이전으로</div>
              <div className='next-btn' onClick={goToNextPage}>다음으로</div>
            </div>
        </div>
    );
}