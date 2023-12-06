//서버로부터 카테고리 가져와서 보여주는 곳.
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import "../Home.css";
import "./Admin.css";
import "./AddCategories.css";

export default function AddCategories() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]); // 카테고리를 저장할 상태

    // 카테고리 선택 핸들러
    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        // 서버에서 카테고리를 가져오는 함수
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/manager/get-category/`);
                setCategories(response.data); // 받아온 데이터를 상태에 저장
                console.log(response.data);
            } catch (error) {
                console.error('카테고리를 가져오는데 실패했습니다:', error);
            }
        };

        fetchCategories(); // 함수 호출
    }, []); // 컴포넌트가 마운트 될 때 한 번만 실행

    // 다음 페이지로 이동하는 핸들러
    const goToNextPage = () => {
        if (selectedCategory !== null) { 
            navigate('/AddOptions', { 
                state: { 
                    selectedCategoryId: selectedCategory.id, 
                    selectedCategoryName: selectedCategory.menucategory_name 
                } 
            });
        }
        else
        {
            alert('카테고리를 하나 선택해주세요!');
        }
    };

    //뒤로 가는 함수
    function herf_back() {
        navigate('/Admin');
    }
    
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
                    className={`category-btn ${selectedCategory && selectedCategory.id === category.id ? 'selected' : ''}`}
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