import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../reuse/Home.css"
import "../reuse/Common.css"
import "./kioskcss/SignUp.css";
import "./kioskcss/PayCheck.css";
import QR from "./QR";


export default function Pay() {
    const navigate = useNavigate();
    function herf_home() {
      navigate('/');
    }
    return (
      <div id = "pay_page">
        <div id="pay-header">
          <div id="top_bar_home" onClick={herf_home}></div>
          <header>KNU KIOSK</header>
        </div>
        <div className='singup-container'>
          <div style={{position: 'absolute', top: '60px', width: '200px'}}>
            <QR/>
          </div>
          <div className='qr-txt'>QR코드를 스캔하여 등록해주세요</div>
          <div className='light-gray-btn' onClick={herf_home}>처음으로</div>
        </div>
      </div>
    );
  }
  
  
