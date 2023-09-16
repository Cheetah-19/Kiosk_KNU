import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Common.css";
import "./PhoneNum.css";

export default function PhoneNum() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/Vegan', { state: { name: location.state.name, phoneNum: inputValue } });
  };

  return (
    <div>
      <set>
        <header>Easy KIOSK</header>
        <body>
          <div className="upper-t">안녕하세요 {location.state.name}님!</div>
          <br />
          <div className="upper-t">전화번호를 입력해주세요!('-' 제외)</div>
          <br />
          <form onSubmit={handleSubmit}>
            <input className="input-des" type="text" value={inputValue} onChange={handleChange} />
          </form>
        </body>
        <footer>
        <div className="blinking-text">나의 정보를 등록하세요 2/5</div>
            <button className = "next-button" onClick={handleNext}>다음으로</button> {/* Button to navigate to the next page */}
        </footer>
      </set>      
      {/* User Name Content... */}
    </div>
  );
}
