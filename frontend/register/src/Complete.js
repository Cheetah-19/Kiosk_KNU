import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



import "./Common.css";


export default function FaceReco() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const inputValue = location.state.inputValue;
    const PhoneNumber = location.state.PhoneNumber;
    const selectedItemId = location.state.selectedItemId;
    const selectedReligion = location.state.selectedReligion;

    const goback = () => {
        navigate('/', { state: { photos: [] } });
    };

    return (
        <div>
            <div>
                <header>Easy KIOSK</header>
            </div>
            <div>
                <div className="Top_text">
                    <div className="title"> 내 정보 등록하기 </div>
                </div>
                <div className="Middle_Menu">
                    <div id="inner-bg_2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                            <path d="M32.2471 14.6224C32.98 13.8895 34.1689 13.8895 34.9018 14.6224C35.6347 15.3556 35.6347 16.5444 34.9018 17.2774L20.8029 31.3768C20.0697 32.1097 18.8809 32.1097 18.1479 31.3768L11.0982 24.3271C10.3653 23.5942 10.3653 22.4053 11.0982 21.6724C11.8314 20.9392 13.0202 20.9392 13.7532 21.6724L19.4754 27.3947L32.2471 14.6224ZM22.9999 0.5C29.2122 0.5 34.8378 3.01882 38.9095 7.09052C42.9812 11.162 45.5 16.7878 45.5 22.9999C45.5 29.2129 42.9814 34.8378 38.9095 38.9095C34.8378 42.9812 29.2122 45.5 22.9999 45.5C16.7871 45.5 11.162 42.9814 7.09052 38.9095C3.01831 34.8378 0.5 29.2129 0.5 22.9999C0.5 16.7878 3.01882 11.162 7.09052 7.09052C11.162 3.01831 16.7871 0.5 22.9999 0.5ZM36.2548 9.7452C32.8629 6.35355 28.1764 4.25546 22.9999 4.25546C17.8231 4.25546 13.1366 6.35355 9.7452 9.7452C6.35355 13.1369 4.25546 17.8236 4.25546 22.9999C4.25546 28.1769 6.35355 32.8634 9.7452 36.2548C13.1366 39.6465 17.8231 41.7443 22.9999 41.7443C28.1764 41.7443 32.8629 39.6465 36.2548 36.2548C39.6465 32.8634 41.7443 28.1769 41.7443 22.9999C41.7443 17.8236 39.6465 13.1369 36.2548 9.7452Z" fill="#FF7A00" />
                        </svg>
                    <div className="middle_text">
                    등록이 완료되었습니다!
                    </div>
                    </div>
                </div>
                <div className="Bottom_button">
                    <div className="left_section">
                        <div id="left_button" onClick={() =>{
                            console.log(photos); // photos를 출력
                            console.log(PhoneNumber);
                            console.log(inputValue);
                            console.log(selectedItemId);
                            console.log(selectedReligion);
                            goback();
                            }}>
                            
                            <div className="button_text" > 메인으로 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



