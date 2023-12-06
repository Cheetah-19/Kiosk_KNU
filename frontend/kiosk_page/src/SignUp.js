import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import "./Common.css"
import "./SignUp.css";
import "./PayCheck.css";

export default function Pay() {
    const navigate = useNavigate();

    //홈 화면 가는 함수
    function herf_home() {
      navigate('/');
    }
    return (
      <div id = "pay_page">
        <div id="pay-header">
          <div id="top_bar_home" onClick={herf_home}></div>
          <header>Easy KIOSK</header>
        </div>
        <div className='singup-container'>
          <div className='qr-txt'>QR코드를 스캔하여 등록해주세요</div>
          <div className='light-gray-btn' onClick={herf_home}>처음으로</div>
        </div>
      </div>
    );
  }
  
  
