import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Home.css";


export default function DetailMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedMenu = location.state?.selectedMenu;

    // 사용자가 선택한 사이드 메뉴들을 저장하는 state
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const total = selectedMenu.menu_price + selectedOptions.reduce((sum, option) => sum + option.option_price, 0);
    
    // 서브메뉴를 클릭했을 때의 처리 함수
    function handleOptionClick(option) {
        setSelectedOptions([...selectedOptions, option]);
    }

    if (!selectedMenu) {
        // 선택한 메뉴가 없는 경우 예외 처리
        return <div>No menu selected.</div>;
    }

    function herf_back() {
        navigate('/MainMenu');
    }

    // 서브메뉴를 카테고리별로 그룹화하는 함수
    function groupByCategory(options) {
        return options.reduce((groups, option) => {
            if (!groups[option.category]) groups[option.category] = [];
            groups[option.category].push(option);
            return groups;
        }, {});
    }

    const groupedOptions = groupByCategory(selectedMenu.menu_option);

    return (
        <div>
            <div id="fullscreen">
                {/* ...추가적인 메뉴 정보 출력 */}
                <div id="left_menu">
                    <h2>{selectedMenu.menu_name}</h2>
                    <p>ID: {selectedMenu.id}</p>
                    <img src={selectedMenu.menu_pic} alt={selectedMenu.menu_name} />
                    {/*<p>Price: {selectedMenu.menu_price}</p> */}
                    <p>introduction: {selectedMenu.menu_introduction}</p>
                </div>


                <div id="middle_menu">
                    {Object.entries(groupedOptions).map(([categoryName, options]) => (
                        <>
                            <h2>{categoryName}</h2>

                            {options.map(option => (
                                <>
                                    {/* onClick 핸들러 추가 */}
                                    <p className='option_item' onClick={() => handleOptionClick(option)}>
                                        <span className='option_name'>{option.option_name}</span>
                                        <span className='option_price'>{option.option_price.toLocaleString()}원</span>
                                    </p>
                                </>
                            ))}
                        </>
                    ))}
                </div>

                {/* 오른쪽 영역에 주문 담기 버튼 추가. */}
                <div id="right_menu">
                    <div id="top_bar">
                        <div id="top_bar_back" onClick={herf_back}></div>
                    </div>
                    {/* 기본 메뉴 정보 출력 */}
                    <div className='selected_item'>
                        {/* 기본 메뉴 정보 출력 */}
                        <div className='menu_item'>
                            <span className='selected_name'>{selectedMenu.menu_name}</span>
                            <span className='selected_price'>{selectedMenu.menu_price.toLocaleString()}원</span>
                        </div>

                        {/* 선택한 사이드 메뉴들 출력 */}
                        {selectedOptions.map(option => (
                            <div className='menu_item'>
                                <span className='selected_name'>{option.option_name}</span>
                                <span className='selected_price'>{option.option_price.toLocaleString()}원</span>
                            </div>
                        ))}
                    </div>

                    {/* 합계 금액 출력 부분 */}
                    <div className="total_section">
                        <div className="total_text">합계:</div>
                        <div className="total_price">{total.toLocaleString()}원</div>
                    </div>

                    {/* 주문 담기 버튼 */}
                    <div className='order_section'>
                        <button className='order_button'>주문 담기</button>
                    </div>
                </div>






            </div>
        </div>
    );
}


