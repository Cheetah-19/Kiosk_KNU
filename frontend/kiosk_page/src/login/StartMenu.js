import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./logincss/StartMenu.css";
import logo2 from "../img/logo2.png" 

function StartMenu() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/logincheck');
  };

  const handleGuestOrder = () => {
    navigate('/mealoption');
  };

  return (
    <div id='login-background'>
      <img id='logo' src={logo2}></img>
      <div id='login-btn-container'>
        <div className='login-btn' onClick={handleLogin}>로그인하기</div>
        <div className='login-btn' onClick={handleGuestOrder}>비회원 주문하기</div>
      </div>
    </div>
  );
}

export default StartMenu;