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
    <div className='container'>
      <div className='logo-container'></div>
      <button className='upper-button' onClick={handleLogin}>로그인하기</button>
      <button className='lower-button' onClick={handleGuestOrder}>비회원 주문하기</button>
    </div>
  );
}

export default StartMenu;