import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

export default function Vegan() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const inputValue = location.state.inputValue;
    const [PhoneNumber, setInputValue] = useState('');
    //PhoneNum페이지로 input된 정보를 넘겨준다.
    const handleChange = (event) => {
      // '-'를 입력할 경우
      if (!/^[0-9]*$/.test(event.target.value)) {
        alert('0~9 이외의 값은 입력할 수 없습니다.');
      } else {
        setInputValue(event.target.value);
      }
}

    

    const handleSubmit = (event) => {
      event.preventDefault();
      //입력한 문자열의 길이가 11글자가 아닐 경우
      if(PhoneNumber.length !== 11){
        alert("핸드폰 번호는 11글자를 입력해야 합니다.");
        //navigate 하지 않도록 return
        return;
      }
  
      navigate('/Vegan', { state: { inputValue, PhoneNumber } });
  };
    
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div className="upper-t">휴대폰 번호를 입력해 주세요 ('-'제외)</div>
              <form onSubmit={handleSubmit}>
                <input className ="input-des" type="text" value={PhoneNumber} onChange={handleChange} />
              </form>
          </body>
          <footer>
            
          <div className="blinking-text">나의 정보를 등록하세요 3/6</div>
          <button className = "next-button" onClick={handleSubmit}>휴대폰번호등록페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}