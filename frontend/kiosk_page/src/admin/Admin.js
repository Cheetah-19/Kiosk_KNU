import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../reuse/Home.css";
import "../reuse/Common.css";
import "./admincss/Admin.css";

export default function Admin() {
    
    const navigate = useNavigate();
    
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