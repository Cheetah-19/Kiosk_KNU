import React, { useEffect, useState } from 'react';
import Camera, { stopVideo } from "./Face";
import PhoneNum from "./PhoneNum";

import "../reuse/Common.css";
import "./logincss/LoginCheck.css";

import face from '../img/face.png';
import down from '../img/down_arrow.png';

export default function MainMenu({ showAlert }) {
    const [alert, setAlert] = useState(false);

    const [gotoPhoneNUm, setGotoPhoneNUm] = useState(false);
    const [slide, setSlide] = useState(false);

    useEffect(()=>{
        setTimeout(() => { setAlert(true) }, 2200);
    });
    
    return (
        <div id='background'>
            <div id='inner-bg'>
                {
                    gotoPhoneNUm === true ?
                        <div id='phoneNum-container' style={{animation: slide ? 'slider-open 0.5s forwards 1':'slider-close 0.5s forwards 1'}}><PhoneNum showAlert={showAlert}/></div>
                        :
                        alert ===  true ?
                            <div id='camera-container'><Camera showAlert={showAlert} setGotoPhoneNUm={setGotoPhoneNUm} setSlide={setSlide}/></div>
                            :
                            <div id='face-img-container'>
                                <img src={face} style={{width: '200px', margin: '0px 0px 40px 0px'}}/>
                                <div>
                                    <span id='face-contents'>얼굴을 인식</span>하여 간편하게 주문하세요!
                                </div>
                            </div>
                }
                
                {
                    gotoPhoneNUm === false ?
                        <div class='gotoPhoneNum-btn' onClick={() => {stopVideo(); setAlert(true); setGotoPhoneNUm(true); setSlide(true)}}>
                            휴대폰 번호로 주문하기
                            <img src={down} style={{width: '48px'}}/>
                        </div>
                        :
                        <div class='gotoPhoneNum-btn' onClick={() => {setSlide(false); setTimeout(() => {setGotoPhoneNUm(false)}, 150)}}>
                            <img src={down} style={{width: '48px', transform: 'rotate(180deg)'}}/>  
                            얼굴 인식으로 주문하기
                        </div>
                }
            </div>
        </div>
    );
}