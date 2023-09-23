import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

export default function Religion() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    const checkboxValue = location.state.checkedBox;

    const handleNext = () => {
        navigate('/Allergy', { state: { inputValue, PhoneNumber, checkboxValue } });
    };

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>사용자명 : {inputValue} <br /> 전화번호 : {PhoneNumber} <br /> 체크박스 : {checkboxValue} </body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 5/6</div>
            <button className = "next-button" onClick={(handleNext)}>종교관련페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}