import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./StartMenu.css";

function StartMenu() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/logincheck');
  };

  const handleGuestOrder = () => {
    navigate('/MainMenu');
  };

  return (
    <div className='main-container'>
      <div className='logo-container'></div>
      <div className='up-button' onClick={handleLogin}>로그인하기</div>
      <div className='low-button' onClick={handleGuestOrder}>비회원 주문하기</div>
    </div>
  );
}

export default StartMenu;