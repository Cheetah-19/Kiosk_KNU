import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/Url';

import "../reuse/Common.css"
import "./logincss/PhoneNum.css"

export default function PhoneNum(props) {
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
            // 로그인 성공 후 사용자가 입력한 내용이 '12345678901'인 경우 : admin
            if (phone_number === '12345678901') {
                props.showAlert('관리자 모드를 실행합니다');
                navigate('/Admin', { state: { phone_number } });
            } else {
                props.showAlert(response.data.name + '님 안녕하세요');
                navigate('/MealOption', { state: { phone_number } });  // 성공 시 MainMenu로 페이지 이동 + phoneNumber 전달
            }

        } catch (error) {
            console.error(error);
            props.showAlert('휴대폰 번호가 틀렸습니다');
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