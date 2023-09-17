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
        setInputValue(event.target.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/Vegan', { state: { inputValue, PhoneNumber } });
      };
  
      const handleNext = () => {
        navigate('/Vegan', { state: { inputValue, PhoneNumber } });
      };
    
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div>안녕하세요 {inputValue}님!</div>
            <br/>
            <div className="upper-t">휴대폰 번호를 입력해 주세요 ('-'제외)</div>
            
          <br/>
              <form onSubmit={handleSubmit}>
                <input className ="input-des" type="text" value={PhoneNumber} onChange={handleChange} />
              </form>
          </body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 3/6</div>
            <button className = "next-button" onClick={() => navigate("/Vegan", { state: { inputValue, PhoneNumber } })}>휴대폰번호등록페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}