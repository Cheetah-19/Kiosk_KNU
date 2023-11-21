import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Home.css"
import "./Common.css"
import "./Pay.css";

export default function Pay() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];
    const totalPrice = location.state?.totalPrice || 0;
    const option = location.state?.option || '';

    console.log('Cart:', cart);

    //홈 화면 가는 함수
    function herf_home() {
      navigate('/');
    }

    // 이전 페이지로 이동하는 함수
    function goBack() {
      navigate('/MainMenu'); // '/MainMenu'를 이전 페이지의 경로로 교체하세요.
    }
    
    function goToPayCheck() {
      navigate('/PayCheck', {state: {totalPrice: totalPrice} });
    }
    return (
      <div id = "pay_page">
        <div id="top_bar_home" onClick={herf_home}></div>
        <header>Easy KIOSK</header>
        <div className='rect1'>
          <div className='txt1'>주문목록을 확인해주세요!</div>
          <div className="rect2">
            <p>{option === '테이크아웃' ? '테이크아웃' : '매장식사'}</p>
            {cart.map((item, index) => (
              <div key={index}>
                <h2>{item.menu.menu_name}</h2>
                {Object.entries(item.options).map(([optionName, quantity]) => (
                  <p key={optionName}>{optionName}: {quantity}개</p>
                ))}
                <p>가격: {item.total.toLocaleString()}원</p>
              </div>
            ))}
          </div>
          <div className='sum-txt'>합계</div>
          <div className='sum-price'>{totalPrice.toLocaleString()}원</div>
          <div className='prev-button' onClick={goBack}>이전으로 </div>
          <div className='pay-button' onClick={goToPayCheck}>결제</div>
        </div>
      </div>
    );
  }
  
  
