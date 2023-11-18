import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';
import "./Common.css"
import "./PhoneNum.css"

export default function PhoneNum() {
    const BASE_URL = 'https://kioskknu2023.run.goorm.site';

    const [phone_number, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

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
            alert("휴대폰 번호가 틀렸습니다.");

            // 휴대폰 번호까지 틀렸을 시 홈화면으로 이동
            navigate('/');
        }
    };

    // Enter 키를 눌렀을 때 handleSubmit 함수를 호출하는 함수
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div id="phoneNum-inner-container">
            <input id="phoneNum-input" type="text" value={phone_number} placeholder="휴대폰 번호를 입력해 주세요 ('-' 제외)" onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <div className='light-gray-btn' onClick={handleSubmit}>확인</div>
        </div>
    );
}