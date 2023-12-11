import React , {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../reuse/Home.css"
import "../reuse/Common.css"
import "./kioskcss/PayCheck.css";

export default function Pay() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const totalPrice = location.state?.totalPrice || 0;

  function herf_home() {
    navigate('/');
  }

  function goBack() {
    navigate('/');
  }
  
  function goToSignIn() {
    navigate('/SignUp');
  }
  


  useEffect(() => {
    const timer = setTimeout(() => {
      herf_home();
    },30000);
    
    return () => clearTimeout(timer);

  },[]);
  return (
    <div id = "pay_page">
      <div id="pay-header">
        <div id="top_bar_home" onClick={herf_home}></div>
        <header>KNU KIOSK</header>
      </div>
      <div className='rect3'>
          <div className='blink-image'></div>
          <div className='price-txt'>{totalPrice.toLocaleString()}원</div>
          <div className='comp-txt'>결제가 완료되었습니다!</div>
          <div id='pay-chk-btn-container'>
            <div className='light-gray-btn' onClick={goBack}>처음으로</div>
            {
              cart[0].user === '' ?
                <div className='light-gray-btn' onClick={goToSignIn}>사용자 등록</div>
                :
                ''
            }
          </div>
          {
            cart[0].user === '' ?
              <div>
                <div className='reco-txt'>메뉴를 추천받을 수 있어요!</div>
                <div className='reco-image'></div>
              </div>
              :
              ''
          }
      </div>
    </div>
  );
}