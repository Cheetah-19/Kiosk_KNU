import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Common.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const option = location.state?.option;

    // 로그인시 phone_number를 key로 사용한다. 휴대전화가 없다면? 비회원. 있다면? 회원이다.
    //optional chaining 사용
    const phoneNumber = location.state?.phoneNumber;

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

    //결제창 가는 함수(장바구니 정보 전송) 결제 버튼을 눌렀을때, 서버로 cart에 담긴 정보를 전송한다.
    async function handlePayment() {
        try {
            await axios.post('http://127.0.0.1:8000/order/menu/orderpost/', { cart }); //요청이 성공해야만 결제 페이지로 이동한다.
            navigate('/pay', { state: { cart, totalPrice: totalPrice.toLocaleString(), option } });
        } catch(error) {
            console.error('서버로 Cart 데이터를 보내는데 실패했습니다:',error);
        }
    }

    //메뉴 항목을 렌더링하는 함수
    function MenuItem({ menu, onClick }) {
        return (
            <div key={menu.id} className="menu-item" onClick={onClick}>
                <img src={"http://127.0.0.1:8000"+menu.menu_pic} alt={menu.menu_name} />
                <h2>{menu.menu_name}</h2>
                <p>{menu.menu_price}</p>
                <p>{menu.menu_introduction}</p>
            </div>
        );
    }

    //카테고리 리스트를 렌더링하는 함수
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
                        }}>
                        {categories[categoryIndex]}
                    </div>) :
                    (<div key={index}></div>)
            );
        });
    }

    //DetailMenu에 정보 전송
    function selectMenu(index) {
        setCurrentMenuIndex(index);
        const selectedMenuItem = menusByCategory[categories[currentCategoryIndex]][index];

        // Get the options for the menu item
        const options = selectedMenuItem.menu_option.map(optionId => {
            const optionCategory = Object.keys(optionsByCategory).find(category =>
                optionsByCategory[category].some(option => option.id === optionId)
            );
            const option = optionsByCategory[optionCategory]?.find(option => option.id === optionId);

            // Add category to each option
            return { ...option, category: optionCategory };
        });

        // Add the options to the menu item
        const selectedMenu = { ...selectedMenuItem, menu_option: options };

        navigate('/DetailMenu', { state: { selectedMenu } });
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

            return (
                <div id="menu_div" key={index}>
                    <div className="cart_item">
                        {/* Left section - menu name and options */}
                        <div className="cart_item_name">
                            <h3>{item.menu.menu_name}</h3>
                            {allOptions.map(([optionName, quantity]) => (
                                <p key={optionName} id="cart_options">{optionName}: {quantity}개</p>
                            ))}
                        </div>

                        {/* Middle section - placeholder for now */}
                        <div className="cart_item_options">
                            {/* Add a delete button */}
                            <button onClick={() => handleDeleteFromCart(index)}>X</button>
                        </div>

                        {/* Right section - total price for this item */}
                        {item.total &&
                            (<p className="cart_item_price">{item.total.toLocaleString()}원</p>)
                        }
                    </div>
                </div>
            );
        });
    }
    //서버로부터 정보를 받아온다. Axios 활용.
    useEffect(() => {
        async function fetchMenusAndOptions() {
            try {
                // 서버 URL에 테스트용 주소 넣어줄것.
                const phoneNumber = location.state?.phone_number;
                const menuUrl = phoneNumber ? `http://127.0.0.1:8000/menu/${phoneNumber}/` : 'http://127.0.0.1:8000/menu/';
	            let responseMenus= await axios.get(menuUrl);
	            let dataMenus= responseMenus.data;
                console.log(menuUrl);
				let categoriesFromServerMenu= dataMenus.categories.map(c => c.menucategory_name);
				let menusFromServerMenu= {};

				for(let category of categoriesFromServerMenu){
					menusFromServerMenu[category]= dataMenus[category];
				}

                // 카테고리별 그룹 옵션 추출
	            let responseOptions= await axios.get('http://127.0.0.1:8000/menu/option/');
	            let dataOptions= responseOptions.data;

                let optionsFromServerOption = {};

                for (let category of dataOptions.categories.map(c => c.optioncategory_name)) {
                    optionsFromServerOption[category] = dataOptions[category];
                }

				setCategories(categoriesFromServerMenu);
				setMenusByCategory(menusFromServerMenu);
                setOptionsByCategory(optionsFromServerOption);

			} catch (error) {
				console.error('ERROR : 메뉴 데이터를 받아오는데 실패했습니다.', error);
			}
        }
        //실행
        fetchMenusAndOptions();
    }, []);

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
        <div>
            <div id="top_bar_menu">
                <div id="top_bar_home" onClick={herf_home}></div>
                <header>Easy KIOSK</header>
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
                {/* 카테고리에 맞는 메뉴 출력 */}
                <div className="menu-container">
                    {menusByCategory[categories[currentCategoryIndex]]?.map((menu, index) => (
                        <MenuItem key={index} menu={menu} onClick={() => selectMenu(index)} />
                    ))}
                </div>

            </div>
            {/* 장바구니 및 결제 부분 */}
            <div id="pay">
                {/* 장바구니 부분 - renderCart 함수 호출로 변경 */}
                <div id="order_list">
                    {renderCart()}
                </div>
                {/* 카드결제 부분 */}
                <div id="order_list_right">
                    <div id="pay_btn" onClick={handlePayment}>
                        <div id="card_img"></div>
                        <div id="total_price">{totalPrice.toLocaleString()}원 결제하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


