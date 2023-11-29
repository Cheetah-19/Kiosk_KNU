import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import "./Home.css";
import "./Common.css";
import "./Admin.css";

export default function Admin() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [menuName, setMenuName] = useState('');
    const [image, setImage] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    
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

    React.useEffect(() => {
        setPhoneNumber(location.state?.phone_number || ''); 
    }, []);

    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
    }

    return(
        <div id = "pay_page">
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>KIOSK Admin</header>
            <div className='rect1'>
              <div className='txt1'>어떤일을 하시겠어요?</div>
              <div className='add-menubtn' onClick={openModal}>메뉴추가</div>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>메뉴 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        id="fileInput" 
                        style={{ display: 'none' }} // 파일 입력 필드 숨기기
                    />
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>이미지 선택</label>
                    {image && <img src={image} alt="Selected" style={{ width: '230px', height: '160px', objectFit: 'cover' }} />}
                    <input type="text" value={menuName} placeholder="메뉴 이름을 입력해 주세요." onChange={handleMenuNameChange} />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={closeModal}>닫기</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
