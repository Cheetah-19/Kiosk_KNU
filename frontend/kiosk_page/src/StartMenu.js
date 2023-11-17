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
      <button className='up-button' onClick={handleLogin}>로그인하기</button>
      <button className='low-button' onClick={handleGuestOrder}>비회원 주문하기</button>
    </div>
  );
}

export default StartMenu;