import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Common.css";


export default function DetailMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedMenu = location.state?.selectedMenu;

    if (!selectedMenu) {
        // 선택한 메뉴가 없는 경우 예외 처리
        return <div>No menu selected.</div>;
    }

    function herf_back() {
        navigate('/MainMenu');
    }

    return (
        <div>
            <div id="top_bar">{/* 홈 버튼 + 맨 위 로고 */}
                <div id="top_bar_back" onClick={herf_back}></div>
                <header>Easy KIOSK</header>
            </div>
            <div>
                <h2>Selected Menu:</h2>
                <p>ID: {selectedMenu.id}</p>
                <img src={selectedMenu.menu_pic} alt={selectedMenu.menu_name} />
                <p>Name: {selectedMenu.menu_name}</p>
                <p>Price: {selectedMenu.menu_price}</p>
                <p>introduction: {selectedMenu.menu_introduction}</p>
                {/* ...추가적인 메뉴 정보 출력 */}

                {/* 서브메뉴 출력 */}
                {selectedMenu.menu_option && (
                    <>
                        <h2>Submenu:</h2>
                        {selectedMenu.menu_option.map(option => (
                            <div key={option.id}>
                                <p>Category: {option.category}</p> {/* 출력 부분 추가 */}
                                <p>ID: {option.id}</p>
                                <p>Name: {option.option_name}</p>
                                <p>Price: {option.option_price}</p>
                                {/* ...추가적인 서브메뉴 정보 출력 */}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
