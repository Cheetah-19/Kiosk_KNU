import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

export default function Vegan() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>안녕하세요 {inputValue}님! <br /> 안녕하세요 {PhoneNumber}님!</body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 4/6</div>
            <button className = "next-button" onClick={() => navigate("/Religion")}>비건여부페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}