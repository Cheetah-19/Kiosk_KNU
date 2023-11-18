import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Home.css"
import "./Common.css"
import "./PayCheck.css";

export default function Pay() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalPrice = location.state?.totalPrice || 0;

    //홈 화면 가는 함수
    function herf_home() {
      navigate('/');
    }

    // 이전 페이지로 이동하는 함수
    function goBack() {
      navigate('/'); // '/MainMenu'를 이전 페이지의 경로로 교체하세요.
    }
    
    function goToSignIn() {
      navigate('/SignUp');
    }
    return (
      <div id = "pay_page">
        <div id="top_bar_home" onClick={herf_home}></div>
        <header>Easy KIOSK</header>
        <div className='rect3'>
            <div className='blink-image'></div>
            <div className='price-txt'>{totalPrice.toLocaleString()}원</div>
            <div className='comp-txt'>결제가 완료되었습니다!</div>
            <div className='init-button' onClick={goBack}>처음으로</div>
            <div className='sign-button' onClick={goToSignIn}>사용자 등록</div>
            <div className='reco-txt'>메뉴를 추천받을 수 있어요!</div>
            <div className='reco-image'></div>
        </div>
      </div>
    );
  }
  
  