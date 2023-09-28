import React, { useState } from 'react';
import "./Common.css";
import { useLocation, useNavigate }from 'react-router-dom'; // Import useLocation

export default function MainMenu() {
    const navigate = useNavigate();

    function herf_home() {
        navigate('/');
    }
    
    const location = useLocation(); // Get the location object
    const option = location.state?.option;

    const categories = [
        { title: "추천_메뉴", onclick: "" },
        { title: "커피_HOT", onclick: "" },
        { title: "커피_ICE", onclick: "" },
        { title: "디저트", onclick: "" }
    ];

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

   return (
      <div>
         <div id="top_bar">{/* 홈 버튼 + 맨 위 로고 */}
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>Easy KIOSK</header>
         </div>
         <div id="menu_bar">
            {/* < 버튼 누르면 페이지 왼쪽으로 이동 */}
            <div id="menu_bar_left" onClick={slideLeft}>&#60;</div>

            {/* 3개의 카테고리 한 번에 렌더링 */}
            {[...Array(itemsPerPage)].map((_, index) => {
               let categoryIndex = (itemsPerPage * (currentPage - 1)) + index;
               return (
                  categoryIndex < categories.length ?
                  (<div key={index} 
                        title={categories[categoryIndex].title} 
                        onClick={categories[categoryIndex].onclick}>
                     {categories[categoryIndex].title}
                  </div>) : 
                  (<div key={index}></div>)
               );
            })}

             {/* > 버튼 누르면 페이지 오른쪽으로 이동 */}
             <div id="menu_bar_right" onClick={slideRight}>&#62;</div>
         </div>
      </div>   
   );
}
