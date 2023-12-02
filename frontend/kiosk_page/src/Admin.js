import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { BASE_URL } from "./constants/Url";
import "./Home.css";
import "./Common.css";
import "./Admin.css";

export default function Admin() {
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [menuName, setMenuName] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [category, setCategory] = useState(null);

    // 모달 상태 변수 및 함수 추가
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // 모달을 닫을 때 이미지와 메뉴 이름 초기화
        setImage(null);
        setMenuName('');
        setShowModal(false);
    };

    const handleCategoryClick = (category) => {
        setCategory(category);
        setSelectedCategory(category);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleMenuNameChange = (e) => {
        setMenuName(e.target.value);
    };

    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
    }

    function delHandle() {
        navigate('/Delete');
    }

    async function addMenu() {
        try {
            const formData = new FormData();
            formData.append('menu_name', menuName);
            formData.append('menu_pic', image);
            formData.append('menucategory', selectedCategory);
            //Debug용 console log
            console.log('메뉴 이름', menuName);
            console.log('이미지:',image);
            console.log('선택된 카테고리:', selectedCategory);
            const response = await axios.post(`${BASE_URL}/서버URL`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.status === 200) {
                alert('메뉴 추가 완료');
                closeModal();
            } else {
                alert('메뉴 추가 실패');
            }
        } catch (error) {
            console.error('메뉴 추가 실패:', error);
        }
    }
    return(
        <div id = "pay_page">
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>KIOSK Admin</header>
            <div className='rect1'>
              <div className='txt1'>어떤일을 하시겠어요?</div>
              <div className='add-menubtn' onClick={openModal}>메뉴추가</div>
              <div className='del-menubtn' onClick={delHandle}>메뉴/옵션 삭제</div>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">메뉴 추가</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4 className="selected_menu">카테고리 선택</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginBottom: '5px' // 첫 번째 줄에 마진 추가
                        }}>
                            <div className="categories_btn" 
                                onClick={() => handleCategoryClick(1)}
                                style={{ 
                                    backgroundColor: selectedCategory === 1 ? '#FF7A00' : '#E8E8E8', 
                                    marginRight: '5px'
                                }}
                            >
                                <span className="categories_btn_text" 
                                    style={{ color: selectedCategory === 1 ? '#FFF' : '#000' }}
                                >
                                    라면류
                                </span>
                            </div>
                            <div className="categories_btn" 
                                onClick={() => handleCategoryClick(2)}
                                style={{ 
                                    backgroundColor: selectedCategory === 2 ? '#FF7A00' : '#E8E8E8', 
                                    marginLeft: '5px'
                                }}
                            >
                                <span className="categories_btn_text" 
                                    style={{ color: selectedCategory === 2 ? '#FFF' : '#000' }}
                                >
                                    국수류
                                </span>
                            </div>
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginTop: '5px' // 두 번째 줄에 마진 추가
                        }}>
                            <div className="categories_btn" 
                                onClick={() => handleCategoryClick(3)}
                                style={{ 
                                    backgroundColor: selectedCategory === 3 ? '#FF7A00' : '#E8E8E8',
                                    marginRight: '5px'
                                }}
                            >
                                <span className="categories_btn_text" 
                                    style={{ color: selectedCategory === 3 ? '#FFF' : '#000' }}
                                >
                                    사이드 메뉴
                                </span>
                            </div>
                            <div className="categories_btn" 
                                onClick={() => handleCategoryClick(4)}
                                style={{ 
                                    backgroundColor: selectedCategory === 4 ? '#FF7A00' : '#E8E8E8',
                                    marginLeft: '5px'
                                }}
                            >
                                <span className="categories_btn_text" 
                                    style={{ color: selectedCategory === 4 ? '#FFF' : '#000' }}
                                >
                                    추천메뉴
                                </span>
                            </div>
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            id="fileInput"
                            style={{ display: 'none' }} 
                        />
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>이미지 업로드(터치)</label>
                        {image && <img src={image} alt="Selected" style={{ width: '230px', height: '160px', objectFit: 'cover' }} />}
                        <input type="text" value={menuName} placeholder="메뉴 이름을 입력해 주세요." onChange={handleMenuNameChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={addMenu}>
                        <div className="add_menu_btn_text">메뉴 추가하기</div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
