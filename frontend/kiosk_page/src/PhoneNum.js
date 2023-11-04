import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PhoneNum() {
    const [phone_number, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/login', {
              phone_number: phone_number
          });
          console.log(response.data);
          alert("로그인 성공");
          navigate('/mainmenu', { state: { phone_number } });  // 성공 시 MainMenu로 페이지 이동 + phoneNumber 전달

      } catch (error) {
          console.error(error);
          alert("휴대전화번호 전송에 실패했습니다. 다시 시도해 주세요.");  
      }
    };
    return (
        <div>
          <div id="top_bar_menu">
            <header>Easy KIOSK</header>

            <form onSubmit={handleSubmit}>
                <label>
                    휴대전화번호(test):
                    <input type="text" value={phone_number} onChange={handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
    );
}