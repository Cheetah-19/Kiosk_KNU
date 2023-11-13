import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Common.css"
import axios from 'axios';

export default function PhoneNum() {
    const BASE_URL = 'https://kioskknu2023.run.goorm.site';

    const [phone_number, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login/`, {
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

    // Enter 키를 눌렀을 때 handleSubmit 함수를 호출하는 함수
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div>
            <div id="top_bar_menu">
                <div id="top_bar_home" onClick={herf_home}></div>
                <header>Easy KIOSK</header>
            </div>
            <div id = "mid">
                <div className="upper-t">휴대폰 번호를 입력해 주세요 ('-'제외)</div>
                <input className="input-des" type="text" value={phone_number} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            </div>
            <div id = "bottom">
                <div className="next-button" onClick={handleSubmit}>다음으로</div>
            </div>
        </div>
    );
}