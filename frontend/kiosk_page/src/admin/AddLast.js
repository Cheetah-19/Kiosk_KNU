//이곳은 메뉴 이미지, 이름, 가격, 설명 적는곳.
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import "../Home.css";
import "../Common.css";
import "./Admin.css";
import "./AddLast.css";

export default function AddCategories() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategoryId = location.state.selectedCategoryId;
    const selectedCategoryName = location.state.selectedCategoryName;
    const selectedOptionIds = location.state.selectedOptionIds;
    const selectedOptionNames = location.state.selectedOptionNames;
    const selectedIngredientIds = location.state.selectedIngredientIds;
    const selectedIngredientNames = location.state.selectedIngredientNames;

    const [image, setImage] = useState(null); // 이미지 상태 변수
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변수
    const [menuName, setMenuName] = useState('');  // 메뉴 이름 상태 변수
    const [menuPrice, setMenuPrice] = useState('');  // 메뉴 가격 상태 변수
    const [menuExplain, setMenuExplain] = useState(''); //메뉴 설명 상태 변수
    const [isModalOpen, setIsModalOpen] = useState(false); //모달 관련 변수

    const handleMenuNameChange = (event) => {
        setMenuName(event.target.value);  // 입력 필드의 값으로 메뉴 이름 상태 업데이트
    };

    const handleMenuPriceChange = (event) => {
        const value = event.target.value;
    
        // 값이 정수가 아니거나 0인 경우 무시
        if (!Number.isInteger(Number(value))) {
            alert("정확한 가격을 입력하세요");
            return;
        }
    
        // 값이 정수이고 0이 아닌 경우 상태 업데이트
        setMenuPrice(value);
    };

    function goToPrevPage() {
        navigate('/AddIngredient');
    }

    const goToCheck = () => {
        if (!menuName || !menuPrice || !menuExplain || !image) {
            alert('모든 필드를 입력하세요');
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMenuExplainChange = (event) => {
        setMenuExplain(event.target.value);
    }

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]); // 이미지 파일 상태 설정

            // 파일을 읽어서 미리보기 이미지를 출력
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // 이미지 미리보기 상태 설정
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    }

    //뒤로 가는 함수
    function herf_back() {
        navigate('/Admin');
    }

    const handleAddMenu = async () => {
        const formData = new FormData();
        formData.append('menucategory', selectedCategoryId);
        formData.append('menu_option', selectedOptionIds);
        formData.append('menu_ingredient', selectedIngredientIds);
        formData.append('menu_name', menuName);
        formData.append('menu_pic', imageFile);
        formData.append('menu_price', menuPrice);
        formData.append('menu_introduction', menuExplain);
        
        // FormData 객체의 내용을 콘솔에 출력
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
            const response = await axios.post('서버URL', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (response.status === 200) {
                alert('메뉴가 성공적으로 추가되었습니다.');
            } else {
                alert('메뉴 추가에 실패하였습니다.');
            }
        } catch (error) {
            console.error('메뉴 추가 에러:', error);
        }
    };
    
    return (
        <div id = "pay_page">
            <div id="top_bar_back" onClick={herf_back}></div>
            <header>KIOSK Admin</header>
            <div className='rect1'>
              <div className='txt1'>마지막 정보를 입력하세요</div>
              <div className='rect2'>
                <div className='picture-box'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            id="fileInput"
                            style={{ display: 'none' }} 
                        />
                        <label htmlFor="fileInput" 
                            style={{ 
                                cursor: 'pointer', 
                                color: '#000', 
                                fontFamily: 'Pretendard', 
                                marginTop: '10px', // margin-top 추가
                                fontWeight: '700', // 글꼴 두께 추가
                                fontSize: '20px'   // 글꼴 크기 추가
                            }}
                        >
                            이미지 업로드(터치)
                        </label>
                        {image && <img src={image} alt="Selected" style={{ width: '270px', height: '270px', objectFit: 'cover' }} />}
                    </div>
                </div>
                <div className='menu-name-txt'>메뉴이름
                    <div id="menu-inner-container">
                        <input id="menu-input" type="text" value={menuName} placeholder="메뉴 이름을 입력해 주세요" onChange={handleMenuNameChange} />
                    </div>
                </div>
                <div className='menu-price-txt'>메뉴가격
                    <div id="menu-inner-container">
                        <input id="menu-input" type="text" value={menuPrice} placeholder="메뉴 가격을 입력해 주세요" onChange={handleMenuPriceChange} />
                    </div>
                </div>
                <div className='menu-ex-txt'>메뉴설명
                    <div id="menu-ex-inner-container">
                        <textarea id="menu-ex-input" value={menuExplain} placeholder="메뉴에 대한 설명을 입력해 주세요" onChange={handleMenuExplainChange} />
                    </div>
                </div>
              </div>
              <div className='prev-btn' onClick={goToPrevPage}>이전으로</div>
              <div className='next-btn' onClick={goToCheck}>입력완료</div>
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">입력한 정보를 확인하세요</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4 className="selected_menu">메뉴카테고리</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{selectedCategoryName}</h5>
                    </div>
                    <div>
                        <h4 className="selected_menu">메뉴옵션</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{selectedOptionNames.join(', ')}</h5>
                    </div>
                    <div>
                        <h4 className="selected_menu">메뉴재료</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{selectedIngredientNames.join(', ')}</h5>
                    </div>
                    <div>
                        <h4 className="selected_menu">메뉴이름</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{menuName}</h5>
                    </div>
                    <div>
                        <h4 className="selected_menu">메뉴사진</h4>
                    </div>
                    <div>
                        {image && <img src={image} alt="Selected" style={{ width: '270px', height: '270px', objectFit: 'cover' }} />}
                    </div>
                    <div>
                        <h4 className="selected_menu">가격</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{menuPrice}원</h5>
                    </div>
                    <div>
                        <h4 className="selected_menu">메뉴설명</h4>
                    </div>
                    <div>
                        <h5 className="selected_menu">{menuExplain}</h5>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary">
                        <div className="add_menu_btn_text" onClick={handleAddMenu}>메뉴 추가하기</div>
                    </div>
                </Modal.Footer>
              </Modal>
            </div>
        </div>
    );
}