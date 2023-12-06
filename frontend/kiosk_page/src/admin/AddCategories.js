import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import { Modal } from 'react-bootstrap';
import "../Home.css";
import "./Admin.css";
import "./AddCategories.css";

export default function AddCategories() {
    
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menucategory_name, setMenucategoryName] = useState(''); 

    const selectCategory = category => setSelectedCategory(category);

    // 카테고리를 가져오는 함수를 useEffect 밖으로 빼냄
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/manager/manage-category/`);
            setCategories(response.data.category);
        } catch (error) {
            console.error('카테고리를 가져오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setMenucategoryName('');
    }
    const handleMenucategoryNameChange = (event) => {
        setMenucategoryName(event.target.value);
    };

    const addCategory = async () => {
        try {
            const sendData = { categories: { menucategory_name } };  // 보낼 데이터를 수정
            console.log(sendData); // 보낼 데이터 출력
            await axios.post(`${BASE_URL}/manager/manage-category/`, sendData); // 데이터 전송 
        } catch (error) {
            console.error('카테고리 추가에 실패했습니다:', error);
            alert("카테고리 추가 실패!");
        } finally {
            setIsModalOpen(false);
            setMenucategoryName('');
            await fetchCategories(); 
        }
    };
    
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
              <div className='prev-btn' onClick={openModal}>카테고리 추가</div>
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">카테고리 추가</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4 className="selected_menu">추가할 카테고리 이름 입력</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div id="ingName-inner-container">
                            <input id="ingName-input" type="text" value={menucategory_name} placeholder="카테고리 이름을 입력해 주세요" onChange={handleMenucategoryNameChange} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={addCategory}>
                        <div className="add_menu_btn_text">카테고리 추가하기</div>
                    </div>
                </Modal.Footer>
              </Modal>
              <div className='next-btn' onClick={goToNextPage}>다음으로</div>
            </div>
        </div>
    );
}
