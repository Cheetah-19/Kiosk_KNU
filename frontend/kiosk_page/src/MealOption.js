import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Home.css";
import "./Common.css";
import eatImage from './img/eat.png'; // Add this line
import takeOutImage from './img/take_out.png'; // Add this line

export default function MealOption() {
    const navigate = useNavigate(); // Get the navigate function

    const handleClick = (option) => {
        navigate('/MainMenu', { state: { option } });
    };

    return (
        <div className="set">
            <header>Easy KIOSK</header>
            <div className="container">
                <button className="button button1">
                    <img src={eatImage} alt="먹고가기" onClick={() => handleClick('먹고가기')}/> {/* Update this line */}
                    먹고가기
                </button>
                <button className="button button2">
                    <img src={takeOutImage} alt="포장하기" onClick={() => handleClick('포장하기')}/> {/* Update this line */}
                    포장하기
                </button>
            </div>
        </div>
    );
}
