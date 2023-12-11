import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { BASE_URL } from "../constants/Url";
import "../reuse/Home.css";
import "./admincss/Admin.css";
import "./admincss/AddCategories.css";

export default function AddIngredients() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategoryId = location.state.selectedCategoryId;
    const selectedCategoryName = location.state.selectedCategoryName;
    const selectedOptionIds = location.state.selectedOptionIds;
    const selectedOptionNames = location.state.selectedOptionNames;

    const [selectedIngredients, setSelectedIngredients] = useState(location.state.selectedIngredientIds === undefined ?
          []:
          () => {
            const lists = [];
            for (var i = 0 ; i< location.state.selectedIngredientIds.length; i++ ){
                lists[i] = {id: location.state.selectedIngredientIds[i], name: location.state.selectedIngredientNames[i]} ;
            }   
            return lists;
            }
          );
    const [ingredients, setIngredients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredient_name, setIngredientName] = useState('');

    const selectIngredient = (ingredient) => {
        if (selectedIngredients.find(selected => selected.id === ingredient.id)) {
            setSelectedIngredients(selectedIngredients.filter(selected => selected.id !== ingredient.id));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/manager/manage-ingredient/`);
            setIngredients(response.data.ingredient); 
        } catch (error) {
            console.error('재료를 가져오는데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleIngredientNameChange = (event) => {
        setIngredientName(event.target.value);
    };

    const addIngredient = async () => {
        try {
            const sendData = { ingredient: { ingredient_name } };
            await axios.post(`${BASE_URL}/manager/manage-ingredient/`, sendData);
        } catch (error) {
            console.error('재료 추가에 실패했습니다:', error);
        } finally {
            setIsModalOpen(false);
            setIngredientName('');
            await fetchIngredients();
        }
    };

    const goToNextPage = () => {
        if (selectedIngredients.length !== 0) { 
            navigate('/AddLast', { 
                state: { 
                    selectedCategoryId: selectedCategoryId,
                    selectedCategoryName: selectedCategoryName,
                    selectedOptionIds: selectedOptionIds,
                    selectedOptionNames: selectedOptionNames,
                    selectedIngredientIds: selectedIngredients.map(ingredient => ingredient.id), 
                    selectedIngredientNames: selectedIngredients.map(ingredient => ingredient.name)
                } 
            });
        }
        else
        {
            alert('하나 이상의 재료를 선택해주세요!');
        }
    };
    
    function main_back() {
        navigate('/AddOptions', {
            state : {
                selectedCategoryId: selectedCategoryId,
                selectedCategoryName: selectedCategoryName,
                selectedOptionIds: selectedOptionIds,
                selectedOptionNames: selectedOptionNames,
            }
        });
    }


    return (
        <div id = "pay_page">
            <div id="pay-header">
                <div id="top_bar_back" onClick={main_back}></div>
                <header>KIOSK Admin</header>
            </div>
            <div className='rect1'>
              <div className='txt1'>들어간 재료를 입력하세요</div>
              <div className='rect2'>
                {ingredients.map((ingredient) => (
                    <div
                    key={ingredient.id}
                    className={`category-btn ${selectedIngredients.find(selected => selected.id === ingredient.id) ? 'selected' : ''}`}
                    onClick={() => selectIngredient(ingredient)}
                    >
                    {ingredient.name}
                  </div>
                ))}
              </div>
              <div className='prev-btn' onClick={openModal}>재료 추가</div>
              <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <div>
                        <h3 className="selected_menu">재료 추가</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4 className="selected_menu">추가할 재료의 이름 입력</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div id="ingredientName-inner-container">
                            <input id="ingredientName-input" type="text" value={ingredient_name} placeholder="재료 이름을 입력해 주세요" onChange={handleIngredientNameChange} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="add_menu_btn" variant="secondary" onClick={addIngredient}>
                        <div className="add_menu_btn_text">재료 추가하기</div>
                    </div>
                </Modal.Footer>
              </Modal>
              <div className='next-btn' onClick={goToNextPage}>다음으로</div>
            </div>
        </div>
    );
}
