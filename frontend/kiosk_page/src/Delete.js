import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Common.css";
import "./Home.css"
import "./MainMenu.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { BASE_URL } from './constants/Url';

export default function Delete() {

    const navigate = useNavigate();
    const location = useLocation();
    const option = location.state?.option;
    let phoneNumber = location.state?.phone_number; // 전역 변수로 phoneNumber 선언

    const [selectedOptions, setSelectedOptions] = React.useState({});

    // 모달 상태 변수 및 함수 추가
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    // 선택한 메뉴 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null);
    // 선택한 사이드 메뉴들과 그들의 총 가격 계산
    const total = selectedMenu ? selectedMenu.menu_price + Object.entries(selectedOptions).reduce((sum, [optionName, quantity]) => {
        const optionPrice = findSelectedOption(optionName).option_price;
        return sum + (optionPrice * quantity);
    }, 0) : 0;

    // 선택된 옵션에 대한 정보를 찾는 함수 추가
    function findSelectedOption(optionName) {
        return selectedMenu.menu_option.find(option => option.option_name === optionName);
    }

    // 총 가격 상태 변수 추가
    const [totalPrice, setTotalPrice] = useState(0);

    const [currentPage, setCurrentPage] = useState(1); //현재 페이지를 1페이지로 지정
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // 현재 선택된 메인 카테고리 index
    const [currentMenuIndex, setCurrentMenuIndex] = useState(null);  // 현재 선택된 메인 메뉴 index

    // 카테고리, 메뉴를 빈 배열로 초기화
    const [categories, setCategories] = useState([]);
    const [menusByCategory, setMenusByCategory] = useState({});

    const itemsPerPage = 3; // 3개씩 보여주기로 설정
    const totalPages = Math.ceil(categories.length / itemsPerPage); // == (전체 카테고리 수/ 한 페이지에 표시할 항목 수) 

    // Initialize options and optionsByCategory as empty objects
    const [optionsByCategory, setOptionsByCategory] = useState({});

    // 장바구니 배열 초기화
    const [cart, setCart] = useState([]);

    //한 페이지씩 왼쪽으로 이동
    function slideLeft() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    //한 페이지씩 오른쪽으로 이동
    function slideRight() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    //홈 화면 가는 함수
    function herf_home() {
        // Clear local storage
        localStorage.removeItem('cart');

        // Clear cart state
        setCart([]);

        navigate('/');
    }

    // 모달 내에서 "메뉴 추가하기" 버튼을 클릭했을 때 호출되는 함수
    function addToCart() {
        // Create a new order item with the selected menu and options, and total price
        const orderItem = {
            menu: selectedMenu,
            options: selectedOptions,
            total: total,
        };

        // Get existing cart from local storage
        let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Add the new order item to the cart and update it in local storage
        existingCart.push(orderItem);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        // Update the cart state
        setCart(existingCart);

        // 닫기 버튼 클릭 시 모달을 닫도록 설정
        closeModal();
    }

    //서브메뉴 수량 계산
    function handleQuantityChange(optionName, change) {
        setSelectedOptions(prevState => {
            const currentQuantity = prevState[optionName] || 0;
            const newQuantity = Math.max(currentQuantity + change, 0);

            if (newQuantity === 0) {
                const { [optionName]: removedOption, ...rest } = prevState;
                return rest;
            }

            return {
                ...prevState,
                [optionName]: newQuantity,
            };
        });
    }
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
    //서버로부터 정보를 받아온다. Axios 활용.
    useEffect(() => {
        console.log("fetchMenusAndOptions 실행"); // 확인용 로그
        //실행
        fetchMenusAndOptions();
    }, []);

    //삭제 버튼을 눌렀을때, 서버로 담겨있는 menu.id를 배열에 담아 보낸다.
    async function handleDelMenu() {
        //0원 일 때는 실행 x
        if (totalPrice === 0) {
            return;
        }

        try {
            const user = phoneNumber ? phoneNumber : '';
            //item.menu.id만 추출해서 배열로 만든다.
            const cartMenuIds = cart.map(item => item.menu.id);
            // 서버로 삭제할 데이터를 전송
            console.log(cartMenuIds);
            await axios.post(`${BASE_URL}/뒤에URL추가할것`, { cart: cartMenuIds });

            //삭제하기를 누르면 cart 배열 초기화
            localStorage.removeItem('cart');
            setCart([]);
            fetchMenusAndOptions(); //삭제 이후에 메뉴 정보를 다시 받아온다.
        } catch (error) {
            console.error('서버로 삭제할 메뉴 데이터를 보내는데 실패했습니다:', error);
        }
    }

    //메뉴 항목을 렌더링하는 함수
    function MenuItem({ menu, onClick }) {
        return (
            <div key={menu.id} className="menu-item" onClick={onClick}>
                <img src={`${BASE_URL}${menu.menu_pic}`} alt={menu.menu_name} />
                <h2>{menu.menu_name}</h2>
                <p>{menu.menu_price.toLocaleString()} 원</p>
                {/* <p>{menu.menu_introduction}</p> */}
            </div>
        );
    }

    // 카테고리를 렌더링 하는 함수
    function renderCategories() {
        return [...Array(itemsPerPage)].map((_, index) => {
            let categoryIndex = (itemsPerPage * (currentPage - 1)) + index;
            return (
                categoryIndex < categories.length ?
                    (<div key={index}
                        title={categories[categoryIndex]}
                        onClick={() => {
                            setCurrentCategoryIndex(categoryIndex);
                            setCurrentMenuIndex(null); // 카테고리를 변경했을 때 선택된 메뉴 초기화
                        }}
                        className="category_name">
                        {categories[categoryIndex]}
                    </div>) :
                    (<div key={index}></div>)
            );
        });
    }

    //선택한 메뉴 정보 저장 ( 모달에서 사용용도 )
    function selectMenu(index) {
        const selectedMenuItem = menusByCategory[categories[currentCategoryIndex]][index];
        const options = selectedMenuItem.menu_option.map(optionId => {
            const optionCategory = Object.keys(optionsByCategory).find(category =>
                optionsByCategory[category].some(option => option.id === optionId)
            );
            const option = optionsByCategory[optionCategory]?.find(option => option.id === optionId);
            return { ...option, category: optionCategory };
        });

        const selectedMenu = { ...selectedMenuItem, menu_option: options };
        setSelectedMenu(selectedMenu); // 선택한 메뉴 정보를 상태 변수에 저장
        setSelectedOptions({}); // 옵션과 수량 초기화
        openModal(); // 모달 열기
    }


    // index를 기준으로 카트에서 항목 삭제
    function handleDeleteFromCart(index) {
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart.splice(index, 1);

            // Update the local storage as well
            localStorage.setItem('cart', JSON.stringify(newCart));

            return newCart;
        });
    }

    // 장바구니 출력 부분 추가
    function renderCart() {
        return cart.map((item, index) => {
            const allOptions = Object.entries(item.options);
            const isMultiOptions = allOptions.length > 1;
            return (
                <div id="menu_div" className={isMultiOptions ? 'multi-options' : ''} key={index}>
                    {/* top section - placeholder for now */}
                    <div className="cart_item_options">
                        {/* Add a delete button */}
                        <div className="cart_item_delete" onClick={() => handleDeleteFromCart(index)}>삭제</div>
                    </div>

                    {/* middle section - menu name and options */}
                    <div className="cart_item_name">
                        <h3>{item.menu.menu_name}</h3>
                        {allOptions.map(([optionName, quantity]) => (
                            <div className="cart_item_count"><p key={optionName}>{optionName}: {quantity}개</p></div>
                        ))}
                    </div>

                    {/* bottom section - total price for this item */}
                    {item.total &&
                        (<div className="cart_item_price"><p >{item.total.toLocaleString()}원</p></div>)
                    }
                </div>
            );
        });
    }

    // DetailMenu에서 넘어온 주문정보를 장바구니에 추가 및 로컬 스토리지 업데이트
    useEffect(() => {
        if (location.state?.orderItem) {
            setCart(prevCart => {
                const newCart = [...prevCart, location.state.orderItem];
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            });
        }
    }, [location.state?.orderItem]);

    // 컴포넌트 마운트 시 한 번만 실행
    useEffect(() => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(existingCart);
    }, []);

    // 페이지 바꿀 때마다 페이지 자동 업데이트
    useEffect(() => {
        setCurrentCategoryIndex((currentPage - 1) * itemsPerPage);
    }, [currentPage]);

    // 장바구니의 내용이 변경될 때마다 실행되는 useEffect 훅 추가
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.total, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className = "col-lg-8 main-container">
                    <div className="row top-bar">
                        <div className="col-lg-4 left-bar">
                            <div id="top_bar_home" onClick={herf_home}></div>
                        </div>
                        <div className="col-lg-4 center-bar">
                            <header>KIOSK Admin</header>
                        </div>
                        <div className="col-lg-4 right-bar">
                            {/* 내정보 보는 곳 ? 넣을 지 말지 정해야함. */}
                        </div>
                    </div>
                    <div className="row">
                        <div id="menu_bar">
                            {/* 왼쪽으로 카테고리 이동 */}
                            <div id="menu_bar_left" onClick={slideLeft}>&#60;</div>
                            {/* 3개의 카테고리씩 로드 */}
                            {renderCategories()}
                            {/* 오른쪽으로 카테고리 이동 */}
                            <div id="menu_bar_right" onClick={slideRight}>&#62;</div>
                        </div>
                    </div>
                    <div id="menu_table">
                        {/* 모달 컴포넌트 작성 */}
                        <Modal show={showModal} onHide={closeModal}>
                            <Modal.Header closeButton>

                                {selectedMenu && ( // Check if selectedMenu exists
                                    <div>
                                        <h3 className="selected_menu">{selectedMenu.menu_name}</h3>
                                        <p className="selected_menu">{selectedMenu.menu_price.toLocaleString()} 원</p>
                                        {/* 추가적인 정보 표시 등 */}
                                    </div>
                                )}
                            </Modal.Header>
                            <Modal.Body>
                                {selectedMenu && selectedMenu.menu_option && (
                                    selectedMenu.menu_option.map(option => (
                                        <div key={option.id} className="option_text">
                                            <div className="option_row">
                                                <div className="option_name">{option.option_name}</div>
                                                <div className="quantity_section"></div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </Modal.Body>

                            <Modal.Footer >

                                <div className="add_btn" variant="secondary" onClick={addToCart}>
                                    <div className="add_btn_text">이 메뉴를 삭제할래요.</div>
                                </div>

                            </Modal.Footer>
                        </Modal>
                        {/* 카테고리에 맞는 메뉴 출력 */}
                        <div className="menu_container">
                            {menusByCategory[categories[currentCategoryIndex]]?.map((menu, index) => (
                                <MenuItem key={index} menu={menu} onClick={() => selectMenu(index)} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 side-container">
                    <div className = "order-list">
                        <div id="order_list_text">삭제희망목록</div>
                    </div>
                    <div id="order_list_area">
                        {renderCart()}
                    </div>
                    <div id="pay">
                        <div id="pay_btn" onClick={handleDelMenu} className={totalPrice === 0 ? 'disabled' : ''}> {/* 0원이면 클릭 못하게 하기 */}
                            <div className="total_price">삭제하기</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

