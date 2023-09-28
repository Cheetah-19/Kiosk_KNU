import React, { useState, useEffect } from 'react';
import "./Common.css";
import { useLocation, useNavigate }from 'react-router-dom';

export default function MainMenu() {
    const navigate = useNavigate();

    function herf_home() {
        navigate('/');
    }
    
    const location = useLocation();
    const option = location.state?.option;

    // Initialize categories and menus as empty arrays
    const [categories, setCategories] = useState([]);
    const [menusByCategory, setMenusByCategory] = useState({});

    // Initialize options and optionsByCategory as empty objects
    const [optionsByCategory, setOptionsByCategory] = useState({});

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

            // Extract the main categories and group menus by category
            let categoriesFromServerMenu = dataMenus.categories.map(c => c.menucategory_name);
            let menusFromServerMenu= {};
            
            for (let category of categoriesFromServerMenu) {
                menusFromServerMenu[category] = dataMenus[category];
            }

            // Fetch options
            response= await fetch('/options.json');
            if (!response.ok) { 
                let message= await response.text();
                throw new Error(message);
            }

            let dataOptions= await response.json();

            // Extract the option categories and group options by category
            let optionsFromServerOption= {};
            
            for (let category of dataOptions.categories.map(c => c.optioncategory_name)) {
                optionsFromServerOption[category]= dataOptions[category];
            }
            
            setCategories(categoriesFromServerMenu);
            setMenusByCategory(menusFromServerMenu);

            setOptionsByCategory(optionsFromServerOption);

        } catch (error) {
            console.error('Failed to fetch menu or option data:', error);
        }
    }
    fetchMenusAndOptions();      
    }, []);

    const itemsPerPage = 3; // 3개씩 보여주기로 설정
    const totalPages = Math.ceil(categories.length / itemsPerPage); // == (전체 카테고리 수/ 한 페이지에 표시할 항목 수) 
  
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지를 1페이지로 지정

    //한 페이지씩 왼쪽으로 이동
    function slideLeft() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    //한 페이지씩 오른쪽으로 이동
    function slideRight() {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // current selected main category index
    const [currentMenuIndex, setCurrentMenuIndex]=useState(null);  // current selected menu index


   return (
      <div>
        <div id="top_bar">{/* 홈 버튼 + 맨 위 로고 */}
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>Easy KIOSK</header>
        </div>
        <div id="menu_bar">
        {/* Connect the new functions to onClick handlers */}
            <div id="menu_bar_left" onClick={slideLeft}>&#60;</div>
            {/* Render three categories at a time */}
            {[...Array(itemsPerPage)].map((_, index) => {
            let categoryIndex =(itemsPerPage * (currentPage - 1)) + index;
            return (
                categoryIndex < categories.length ?
                (<div key={index} 
                        title={categories[categoryIndex]} 
                        onClick={() => setCurrentCategoryIndex(categoryIndex)}>
                    {categories[categoryIndex]}
                </div>) : 
                (<div key={index}></div>)
            );
            })}
            {/* Connect the new functions to onClick handlers */}
            <div id="menu_bar_right" onClick={slideRight}>&#62;</div>
        </div>
        {/* Render menus that belong to the selected category */}
        <div>
        {menusByCategory[categories[currentCategoryIndex]]?.map((menu, index) => (
            <div key={menu.id} onClick={()=>setCurrentMenuIndex(index)}>
                <img src={menu.menu_pic} alt={menu.menu_name} />
                <h2>{menu.menu_name}</h2>
                <p>{menu.menu_price}</p>
                <p>{menu.menu_introduction}</p>
            </div>
        ))}
        </div>

        {/* Render options that belong to the selected menu */}
        <div>
        {currentMenuIndex!==null && menusByCategory[categories[currentCategoryIndex]][currentMenuIndex].menu_option.map(optionId =>
            optionsByCategory["Topping"].find(option => option.id === optionId)).map(option=>
            (<div key={option.id}>
                <img src={option.option_pic} alt={option.option_name} />
                <h2>{option.option_name}</h2>
                <p>{option.option_price}</p>
                <p>{option.option_introduction}</p>   
            </div>))
        }
        </div>
      </div>   
   );
}
