import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from "../constants/Url";
import "../reuse/Home.css";
import "./admincss/Admin.css";
import "./admincss/AddCategories.css";
import "./admincss/ManageOption.css";

export default function ManageCategory({ showAlert }) {
    
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); //삭제하기 눌렀을때 띄울 모달창
    const [menucategory_name, setCategoryName] = useState('');  // 옵션 이름 상태 변수
    const selectCategory = (category) => {
        if (selectedCategory.find(selected => selected.id === category.id)) {
            setSelectedCategory(selectedCategory.filter(selected => selected.id !== category.id));
        } else {
            setSelectedCategory([...selectedCategory, category]);
        }
    };

    // 카테고리를 가져오는 함수
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
    const closeModal = () => setIsModalOpen(false);
    
    const openDeleteModal = () => {
        if (selectedCategory.length === 0) {
          //alert('선택된 카테고리가 없습니다');
          showAlert('선택된 카테고리가 없습니다');
        } else {
          setIsDeleteModalOpen(true);
        }
      };
    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    // 카테고리 추가 함수
    const addOption = async () => {
        try {
            const sendData = { category: { menucategory_name } };  // 보낼 데이터를 수정
            console.log(sendData)
            await axios.post(`${BASE_URL}/manager/manage-category/`, sendData); // 데이터 전송
        } catch (error) {
            console.error('옵션 추가에 실패했습니다:', error);
        } finally {
            setIsModalOpen(false);
            setCategoryName('');
            await fetchCategories();
        }
    };

    //옵션 삭제 함수
    const delCategory = async () => {
        const category_todel = selectedCategory.map(category => category.id);
        console.log(category_todel)
        try {
          const response = await axios.delete(`${BASE_URL}/manager/manage-category/`, { params: {category:category_todel} });
          setSelectedCategory([]);
        } catch (error) {
          console.error('옵션 삭제에 실패했습니다:', error);
          showAlert("카테고리 삭제를 실패했습니다.");
        } finally {
            showAlert("카테고리가 삭제 되었습니다.");
          setIsDeleteModalOpen(false);
          await fetchCategories();
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
              <div className='manage-txt'>카테고리를 추가하거나 삭제하세요</div>
              <div className='rect2'>
                {categories.map((category) => (
                    <div
                    key={category.id}
                    className={`category-btn ${selectedCategory.find(selected => selected.id === category.id) ? 'selected' : ''}`}
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
                        <h4 className="selected_menu">추가할 카테고리의 이름 입력</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div id="optionName-inner-container">
                            <input id="optionName-input" type="text" value={menucategory_name} placeholder="카테고리 이름을 입력해 주세요" onChange={handleCategoryNameChange} />
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={addOption}>
                        <div className="add_menu_btn_text">카테고리 추가하기</div>
                    </div>
                </Modal.Footer>
              </Modal>

              <div className='next-btn' onClick={openDeleteModal}>삭제하기</div>
              <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">이 카테고리들을 삭제할까요?</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                {selectedCategory.map((option) => (
                    <p key={option.id} style={{ marginLeft: '20px', fontSize: '24px', fontFamily: 'Pretendard', fontWeight: '700' }}>
                    {option.name}
                    </p>
                ))}
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={delCategory}>
                        <div className="add_menu_btn_text">삭제하기</div>
                    </div>
                </Modal.Footer>
              </Modal>
            </div>
        </div>
    );
}
