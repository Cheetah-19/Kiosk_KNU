import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./StartMenu.css";
import logo from "./img/logo.png" 

function StartMenu() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/logincheck');
  };

  const handleGuestOrder = () => {
    navigate('/mealoption');
  };

  return (
    <div id='login_background'>
      <img id='logo' src={logo}></img>
      <div id='login_btn_container'>
        <div className='login_btn' onClick={handleLogin}>로그인하기</div>
        <div className='login_btn' onClick={handleGuestOrder}>비회원 주문하기</div>
      </div>
    </div>
  );
}

export default StartMenu;