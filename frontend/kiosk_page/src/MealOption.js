import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import "./Home.css";
// import "./Common.css";
import "./MealOption.css"
import eatImage from './img/store_meal.png'; // Add this line
import takeOutImage from './img/takeout.png'; // Add this line

export default function MealOption() {
    const [selected, setSelected] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const handleClick = (option) => {
        navigate('/MainMenu', { state: { option } });
    };

    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
      }

    return (
        
        <div className="full_screen">
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>Easy KIOSK</header>
            <div id="middle_border">
                <div id="text1">주문방식을 선택해 주세요.</div>
                <div id="Buttons">
                    <div 
                        className={selected === '매장식사' ? 'selected' : ''} 
                        onClick={() => handleClick('매장식사')}>
                        <img src={eatImage} alt="매장식사"/>
                        <span>매장식사</span>
                    </div>
                    <div 
                        className={selected === '테이크아웃' ? 'selected' : ''} 
                        onClick={() => handleClick('테이크아웃')}>
                        <img src={takeOutImage} alt="테이크아웃"/>
                        <span>테이크아웃</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

