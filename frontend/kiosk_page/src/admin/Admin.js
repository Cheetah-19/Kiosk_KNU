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
    function addOpt() {
        navigate('/ManageOption');
    }
    function addCat(){
        navigate('/ManageCategory');
    }
    function delHandle() {
        navigate('/ManageMenu');
    }

    return(
        <div id = "pay_page">
            <div id="pay-header">
                <div id="top_bar_home" onClick={herf_home}></div>
                <header>KIOSK Admin</header>
            </div>
            <div className='rect1'>
              <div className='txt1'>어떤 일을 하시겠어요?</div>
              <div className='rect-manager'>
                <div className='add-menubtn' onClick={addMenu}>메뉴 추가</div>
                <div className='del-menubtn' onClick={delHandle}>현재 메뉴 관리</div>
                <div className='manage-catbtn' onClick={addCat}>카테고리<br/>추가 및 삭제</div>
                <div className='manage-optbtn' onClick={addOpt}>메뉴 옵션<br/>추가 및 삭제</div>
              </div>
              

            </div>
        </div>
    );
}