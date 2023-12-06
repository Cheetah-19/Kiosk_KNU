import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import "../Home.css";
import "../Common.css";
import "./Admin.css";

export default function Admin() {
    
    const navigate = useNavigate();
    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
    }

    function addMenu() {
        navigate('/AddCategories');
    }

    function delHandle() {
        navigate('/Delete');
    }

    return(
        <div id = "pay_page">
            <div id="pay-header">
                <div id="top_bar_home" onClick={herf_home}></div>
                <header>KIOSK Admin</header>
            </div>
            <div className='rect1'>
              <div className='txt1'>어떤일을 하시겠어요?</div>
              <div className='add-menubtn' onClick={addMenu}>메뉴추가</div>
              <div className='del-menubtn' onClick={delHandle}>메뉴/옵션 삭제</div>
            </div>
        </div>
    );
}