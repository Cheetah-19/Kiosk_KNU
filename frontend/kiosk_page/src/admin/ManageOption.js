import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from "../constants/Url";
import "../reuse/Home.css";
import "./admincss/Admin.css";
import "./admincss/AddCategories.css";
import "./admincss/ManageOption.css";

export default function ManageOption() {
    
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); //삭제하기 눌렀을때 띄울 모달창
    const [option_name, setOptionName] = useState('');  // 옵션 이름 상태 변수
    const [option_price, setOptionPrice] = useState('');  // 옵션 가격 상태 변수
    const selectOption = (option) => {
        if (selectedOptions.find(selected => selected.id === option.id)) {
            setSelectedOptions(selectedOptions.filter(selected => selected.id !== option.id));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    // 옵션을 가져오는 함수
    const fetchOptions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/manager/manage-option/`);
            setOptions(response.data.option); 
        } catch (error) {
            console.error('옵션을 가져오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const openDeleteModal = () => {
        if (selectedOptions.length === 0) {
          alert('선택된 옵션이 없습니다');
        } else {
          setIsDeleteModalOpen(true);
        }
      };
    const handleOptionNameChange = (event) => {
        setOptionName(event.target.value);
    };

    const handleOptionPriceChange = (event) => {
        setOptionPrice(event.target.value);
    };

    // 옵션 추가 함수
    const addOption = async () => {
        try {
            const sendData = { option: { option_name, option_price} };  // 보낼 데이터를 수정
            console.log(sendData)
            await axios.post(`${BASE_URL}/manager/manage-option/`, sendData); // 데이터 전송
        } catch (error) {
            console.error('옵션 추가에 실패했습니다:', error);
        } finally {
            setIsModalOpen(false);
            setOptionName('');
            setOptionPrice('');
            await fetchOptions();
        }
    };

    //옵션 삭제 함수
    const delOption = async () => {
        const menu_option = selectedOptions.map(option => option.id);
        console.log(menu_option)
        try {
          const response = await axios.delete(`${BASE_URL}/manager/manage-option/`, { params: {options:menu_option} });
          setSelectedOptions([]);
        } catch (error) {
          console.error('옵션 삭제에 실패했습니다:', error);
        } finally {
          setIsDeleteModalOpen(false);
          await fetchOptions();
        }
      };
      

    function main_back() {
        navigate('/Admin');
    }
    
    return (
        <div id = "pay_page">
            <div id="pay-header">
                <div id="top_bar_back" onClick={main_back}></div>
                <header>KIOSK Admin</header>
            </div>
            <div className='rect1'>
              <div className='manage-txt'>옵션을 추가하거나 삭제하세요</div>
              <div className='rect2'>
                {options.map((option) => (
                    <div
                    key={option.id}
                    className={`category-btn ${selectedOptions.find(selected => selected.id === option.id) ? 'selected' : ''}`}
                    onClick={() => selectOption(option)}
                    >
                    {option.name}
                  </div>
                ))}
              </div>
              <div className='prev-btn' onClick={openModal}>옵션 추가</div>
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">옵션 추가</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4 className="selected_menu">추가할 옵션의 이름 입력</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div id="optionName-inner-container">
                            <input id="optionName-input" type="text" value={option_name} placeholder="옵션 이름을 입력해 주세요" onChange={handleOptionNameChange} />
                        </div>
                    </div>
                    <div>
                        <h4 className="selected_menu">추가할 옵션의 가격 입력</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div id="optionPrice-inner-container">
                            <input id="optionPrice-input" type="text" value={option_price} placeholder="옵션 가격을 입력해 주세요" onChange={handleOptionPriceChange} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={addOption}>
                        <div className="add_menu_btn_text">옵션 추가하기</div>
                    </div>
                </Modal.Footer>
              </Modal>

              <div className='next-btn' onClick={openDeleteModal}>삭제하기</div>
              <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">이 옵션들을 삭제할까요?</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                {selectedOptions.map((option) => (
                    <p key={option.id} style={{ marginLeft: '20px', fontSize: '24px', fontFamily: 'Pretendard', fontWeight: '700' }}>
                    {option.name}
                    </p>
                ))}
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={delOption}>
                        <div className="add_menu_btn_text">삭제하기</div>
                    </div>
                </Modal.Footer>
              </Modal>
            </div>
        </div>
    );
}
