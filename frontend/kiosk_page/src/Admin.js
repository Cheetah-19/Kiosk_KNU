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

    // 모달 상태 변수 및 함수 추가
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        // 모달을 닫을 때 이미지와 메뉴 이름 초기화
        setImage(null);
        setMenuName('');
        setShowModal(false);
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
            formData.append('menuName', menuName);
            formData.append('image', image);
            //Debug용 console log
            console.log('메뉴 이름', menuName);
            console.log('이미지:',image);
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>카테고리</div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            id="fileInput"
                            style={{ display: 'none' }} // 파일 입력 필드 숨기기
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
