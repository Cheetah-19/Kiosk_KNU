import React, { useState } from 'react';
import axios from 'axios';

export default function PhoneNum() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                phone_number: phoneNumber
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
          <div id="top_bar_menu">
            <header>Easy KIOSK</header>

            <form onSubmit={handleSubmit}>
                <label>
                    휴대전화번호(test):
                    <input type="text" value={phoneNumber} onChange={handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
    );
}