import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Pay() {
    const location = useLocation();
    const cart = location.state?.cart || [];
    const totalPrice = location.state?.totalPrice || 0;
    const option = location.state?.option || '';

    console.log('Cart:', cart);
  
    return (
      <div>
        <h1>Payment Page</h1>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        <p>{option === 'takeout' ? '포장 주문' : '매장식사 주문'}</p>
        {cart.map((item, index) => (
          <div key={index}>
            <h2>{item.menu.menu_name}</h2>
            {Object.entries(item.options).map(([optionName, quantity]) => (
              <>
                <p key={optionName}>{optionName}: {quantity}개</p>
              </>
            ))}
            {/* 각 메뉴의 총 가격 출력 */}
          <p>메뉴 {index + 1} 가격: {item.total.toLocaleString()}원</p>
          </div>
        ))}
        <h2>총 결제 금액: {totalPrice.toLocaleString()}원</h2>
      </div>
    );
  }
  
  
