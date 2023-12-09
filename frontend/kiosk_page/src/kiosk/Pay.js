import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../reuse/Home.css"
import "../reuse/Common.css"
import "./kioskcss/Pay.css";

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
    localStorage.removeItem('cart');
    navigate('/PayCheck', {state: {cart: cart, totalPrice: totalPrice} });
  }
  
  return (
    <div id="pay_page">
      <div id="pay-header">
        <div id="top_bar_home" onClick={herf_home}></div>
        <header>Easy KIOSK</header> 
      </div>
        <div className='pay-container'> 
        <div className='pay-title'>주문목록을 확인해주세요!</div>
        <div className="pay-inner-container">
          <p style={{margin: '10px'}}>{option === '테이크아웃' ? '테이크아웃' : '매장식사'}</p>
          {cart.map((item, index) => (
            <div>
              <div id='order-list' key={index}>
                <div id='menu-name'>{item.menu.menu_name}</div>
                <div id='option-list'>
                  {Object.entries(item.options).map(([optionName, quantity]) => (
                    <div id='option-name' key={optionName}>{optionName}+{quantity}</div>
                  ))}
                </div>
                <div id='total-price'>{item.total.toLocaleString()}원</div>
              </div>
              <div id='separator'></div>
            </div>
          ))}
        </div>
        <div className='pay-sum-txt'>합계</div>
        <div className='pay-sum-price'>{totalPrice.toLocaleString()}원</div>
        <div id='pay-btn-container'>
          <div className='light-gray-btn' onClick={goBack}>이전으로 </div>
          <div className='light-gray-btn' onClick={goToPayCheck}>결제하기</div>
        </div>
      </div>
    </div>
  );
}