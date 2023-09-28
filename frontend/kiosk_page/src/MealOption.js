import React from 'react';
import "./Home.css";
import "./Common.css";
import eatImage from './img/eat.png'; // Add this line
import takeOutImage from './img/take_out.png'; // Add this line

export default function MealOption() {
    return (
        <div className="set">
            <header>Easy KIOSK</header>
            <div className="container">
                <button className="button button1">
                    <img src={eatImage} alt="먹고가기" /> {/* Update this line */}
                    먹고가기
                </button>
                <button className="button button2">
                    <img src={takeOutImage} alt="포장해가기" /> {/* Update this line */}
                    포장하기
                </button>
            </div>
        </div>
    );
}
