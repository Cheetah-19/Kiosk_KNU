import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";
import "./UserName.css";

export default function UserName() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
      if (/^\d+$/.test(event.target.value)) {
        alert('숫자는 입력할 수 없습니다.'); 
      } else if (event.target.value.split(' ').join('') !== event.target.value) {
        alert('공백은 입력할 수 없습니다.');
      } else {
        setInputValue(event.target.value);
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/PhoneNum', { state: { inputValue, photos } });
    };

    const handleNext = () => {
      if (inputValue.trim().length === 0) {
        alert('숫자 또는 공백을 입력할 수 없습니다.');
      } else {
        navigate('/PhoneNum', { state: { inputValue, photos } });
      }
    };

    return (
      <div>
        <header>Easy KIOSK</header>
        <div>
          <div className="upper-t">사용자명을 입력해주세요</div>
          <br/>
          <form onSubmit={handleSubmit}>
            <input className ="input-des" type="text" value={inputValue} onChange={handleChange} />
          </form>
        </div>
        <footer>
          <div className="blinking-text">나의 정보를 등록하세요 2/6</div>
          <button className="next-button" onClick={handleNext}>다음으로</button>
        </footer>
        {/* User Name Content... */}
      </div>
    );
}
