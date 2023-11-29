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
    
    const [categories, setCategories] = useState([]);
    const [menusByCategory, setMenusByCategory] = useState({});
    const [optionsByCategory, setOptionsByCategory] = useState({});

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

    //서버로부터 정보를 받아온다. Axios 활용.
    useEffect(() => {
        console.log("fetchMenusAndOptions 실행"); // 확인용 로그
        async function fetchMenusAndOptions() {
            try {
                // 서버 URL에 테스트용 주소 넣어줄것.
                // 로그인시 phone_number를 key로 사용한다. 휴대전화가 없다면? 비회원. 있다면? 회원이다.
                //optional chaining 사용
                const menuUrl = phoneNumber ? `${BASE_URL}/menu/${phoneNumber}/` : `${BASE_URL}/menu/`;
                let responseMenus = await axios.get(menuUrl);
                let dataMenus = responseMenus.data;
                console.log("dataMenus:", dataMenus); // 확인용 로그
                console.log(menuUrl);
                let categoriesFromServerMenu = dataMenus.categories.map(c => c.menucategory_name);
                let menusFromServerMenu = {};
                console.log("categoriesFromServerMenu:", categoriesFromServerMenu); // 확인용 로그

                //메뉴가 있는 카테고리만 선택
                for (let category of categoriesFromServerMenu) {
                    if (dataMenus[category] && dataMenus[category].length > 0) {
                        menusFromServerMenu[category] = dataMenus[category];
                    }
                }

                // 카테고리 중에서 메뉴가 있는 카테고리만 선택
                let filteredCategories = Object.keys(menusFromServerMenu);

                //카테고리별 그룹 옵션 추출
                let responseOptions = await axios.get(`${BASE_URL}/menu/option/`);
                let dataOptions = responseOptions.data;

                let optionsFromServerOption = {};

                for (let category of dataOptions.categories.map(c => c.optioncategory_name)) {
                    optionsFromServerOption[category] = dataOptions[category];
                }

                setCategories(filteredCategories);
                setMenusByCategory(menusFromServerMenu);
                setOptionsByCategory(optionsFromServerOption);
              
            } catch (error) {
                console.error('ERROR : 메뉴 데이터를 받아오는데 실패했습니다.', error.message, error.stack, error.response?.status);
            }
        }
        //실행
        fetchMenusAndOptions();
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
              <div className='del-menubtn'>메뉴삭제</div>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>메뉴 추가</Modal.Title>
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
                    <button onClick={closeModal}>닫기</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
