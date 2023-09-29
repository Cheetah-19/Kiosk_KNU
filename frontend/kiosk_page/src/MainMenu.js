import React, { useState, useEffect } from 'react';
import "./Common.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const option = location.state?.option;

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

    //한 페이지씩 왼쪽으로 이동
    function slideLeft() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    //한 페이지씩 오른쪽으로 이동
    function slideRight() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    function herf_home() {
        navigate('/');
    }

    //메뉴 항목을 렌더링하는 함수
    function MenuItem({ menu, onClick }) {
        return (
            <div key={menu.id} class="menu-item" onClick={onClick}>
                <img src={menu.menu_pic} alt={menu.menu_name} />
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

    //서브메뉴 출력
    function renderSubMenus() {
        if (currentMenuIndex === null) {
            return null;
        }

        const options = menusByCategory[categories[currentCategoryIndex]][currentMenuIndex].menu_option.map(optionId => {
            const optionCategory = Object.keys(optionsByCategory).find(category =>
                optionsByCategory[category].some(option => option.id === optionId)
            );
            return optionsByCategory[optionCategory]?.find(option => option.id === optionId);
        });

        return (
            <div className="menu-container">
                {options.map(option =>
                (<div key={option.id} class="menu-item">
                    <img src={option.option_pic} alt={option.option_name} />
                    <h2>{option.option_name}</h2>
                    <p>{option.option_price}</p>
                    <p>{option.option_introduction}</p>
                </div>))
                }
            </div>
        );
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



    useEffect(() => {
        async function fetchMenusAndOptions() {
            try {
                // Fetch menus
                let response = await fetch('./menus.json');
                if (!response.ok) {
                    let message = await response.text();
                    throw new Error(message);
                }

                let dataMenus = await response.json();

                // 카테고리별 그룹 메뉴 추출
                let categoriesFromServerMenu = dataMenus.categories.map(c => c.menucategory_name);
                let menusFromServerMenu = {};

                for (let category of categoriesFromServerMenu) {
                    menusFromServerMenu[category] = dataMenus[category];
                }

                // Fetch options
                response = await fetch('/options.json');
                if (!response.ok) {
                    let message = await response.text();
                    throw new Error(message);
                }

                let dataOptions = await response.json();

                // 카테고리별 그룹 옵션 추출
                let optionsFromServerOption = {};

                for (let category of dataOptions.categories.map(c => c.optioncategory_name)) {
                    optionsFromServerOption[category] = dataOptions[category];
                }

                setCategories(categoriesFromServerMenu);
                setMenusByCategory(menusFromServerMenu);

                setOptionsByCategory(optionsFromServerOption);

            } catch (error) {
                console.error('Failed to fetch menu or option data:', error);
            }
        }
        //실행
        fetchMenusAndOptions();
    }, []);

    // 페이지 바꿀 때마다 페이지 자동 업데이트
    useEffect(() => {
        setCurrentCategoryIndex((currentPage - 1) * itemsPerPage);
    }, [currentPage]);

    return (
        <div>
            <div id="top_bar_menu">
                <div id="top_bar">{/* 홈 버튼 + 맨 위 로고 */}
                    <div id="top_bar_home" onClick={herf_home}></div>
                    <header>Easy KIOSK</header>
                </div>
                <div id="menu_bar">
                    {/* 왼쪽으로 카테고리 이동 */}
                    <div id="menu_bar_left" onClick={slideLeft}>&#60;</div>

                    {/* 3개의 카테고리씩 로드 */}
                    {renderCategories()}

                    {/* 오른쪽으로 카테고리 이동 */}
                    <div id="menu_bar_right" onClick={slideRight}>&#62;</div>
                </div>
            </div>
            <div id="munu_table">
                {/* 카테고리에 맞는 메뉴 출력 */}
                <div className="menu-container">
                    {menusByCategory[categories[currentCategoryIndex]]?.map((menu, index) => (
                        <MenuItem key={index} menu={menu} onClick={() => selectMenu(index)} />
                    ))}
                </div>

                {/* 서브메뉴 출력 */}
                {renderSubMenus()}
            </div>
            {/* 장바구니 및 결제 부분 */}
            <div id="pay">
                {/* 장바구니 부분 */}
                <div id="order_list">

                </div>
                {/* 카드결제 부분 */}
                <div id="order_list_right">

                </div>
            </div>
        </div>
    );
}
