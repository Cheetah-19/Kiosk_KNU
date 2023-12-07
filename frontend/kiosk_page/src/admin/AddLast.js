//이곳은 메뉴 이미지, 이름, 가격, 설명 적는곳.
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import "../Home.css";
import "../Common.css";
import "./Admin.css";

export default function AddCategories() {
    
    const navigate = useNavigate();
    const location = useLocation();
    
    //뒤로 가는 함수
    function herf_back() {
        navigate('/Admin');
    }
    
    return (
        <div id = "pay_page">
            <div id="pay-header">
                <div id="top_bar_back" onClick={herf_back}></div>
                <header>KIOSK Admin</header>
            </div>
            <div className='rect1'>
              <div className='txt1'>마지막 정보를 입력하세요.</div>
              <div className='rect2'></div>
            </div>
        </div>
    );
}