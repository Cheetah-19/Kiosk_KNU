import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Common.css";
import "./MealOption.css";
import eatImage from './img/store_meal.png';
import takeoutImage from './img/takeout.png';

export default function MealOption() {
    const [selected, setSelected] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // State to store phone number
    const navigate = useNavigate();
    const location = useLocation();

    // Extract phone number from location state when component mounts
    React.useEffect(() => {
        setPhoneNumber(location.state?.phone_number || ''); 
    }, []);

    const handleClick = (option) => {
        navigate('/MainMenu', { state: { option, phone_number: phoneNumber } });
    };  

    function herf_home() {
        navigate('/');
    }

    return (
        <div id="background">
            <div id="middle_border">
                <div id="text1">주문방식을 선택해 주세요.</div>
                <div id="buttons">
                    <div id='eat-btn' 
                        onClick={() => handleClick('매장식사')}>
                        <img src={eatImage} alt="매장식사"/>
                        <span>매장식사</span>
                    </div>
                    <div id='takeout-btn'
                        onClick={() => handleClick('테이크아웃')}>
                        <img src={takeoutImage} alt="테이크아웃"/>
                        <span>테이크아웃</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
