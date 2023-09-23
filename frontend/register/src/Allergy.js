import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

function Allergy() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    const checkboxValue = location.state.checkboxValue;
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>이곳이 마지막 페이지 <br />사용자명 : {inputValue} <br /> 전화번호 : {PhoneNumber} <br /> 체크박스 : {checkboxValue}</body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 6/6</div>
          
          </footer>
        </set>
      </div>
    )
}
export default Allergy;