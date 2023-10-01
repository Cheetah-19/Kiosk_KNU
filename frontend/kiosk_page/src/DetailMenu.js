import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Home.css";

export default function DetailMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedMenu = location.state?.selectedMenu;

    // 사용자가 선택한 사이드 메뉴들과 그들의 수량을 저장하는 state
    const [selectedOptions, setSelectedOptions] = React.useState({});

       //DetailMenu.js가 실행될때, 그에 맞는 메뉴 옵션 데이터 가져오기
       useEffect(() => {
          async function fetchMenuOptions() {
             try {
                const response = await axios.get('http://127.0.0.1:8000/order/menu/2');
                const menuOptionsData = response.data.menu_option;
                    
                    //서버에서 읽어온 Option값들을 option_name과 option_price에 할당.
                const updateSelectedOption = (clickedOption) => {
                   const selectedOption = menuOptionsData.find(item => item.option_name === clickedOption.option_name);
                   clickedOption.option_name = selectedOption?.option_name;
                   clickedOption.option_price = selectedOption?.option_price;
                };

                selectedMenu.menu_option.forEach(updateSelectedOption);
             } catch (error) {
                console.error('Failed to fetch menu options:', error);
             }
          }
            fetchMenuOptions();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
    // 서브메뉴를 클릭했을 때의 처리 함수
    function handleOptionClick(option) {
        setSelectedOptions(prevState => ({
            ...prevState,
            [option.option_name]: (prevState[option.option_name] || 0) + 1,
        }));
    }


    // 선택된 옵션에 대한 정보를 찾는 함수 추가
    function findSelectedOption(optionName) {
        return selectedMenu.menu_option.find(option => option.option_name === optionName);
    }


    // 선택한 사이드 메뉴들과 그들의 총 가격 계산
    const total = selectedMenu.menu_price + Object.entries(selectedOptions).reduce((sum, [optionName, quantity]) => {
        const optionPrice = findSelectedOption(optionName).option_price;
        return sum + (optionPrice * quantity);
    }, 0);

    // 주문 담기 버튼을 클릭했을 때의 처리 함수
    function handleOrderClick() {
        // Create a new order item with the selected menu and options, and total price
        const orderItem = {
            menu: selectedMenu,
            options: selectedOptions,
            total: total,
        };

        // Get existing cart from local storage
        let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Add the new order item to the cart and update it in local storage 
        existingCart.push(orderItem);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        // Navigate back to MainMenu and pass the updated cart along as state 
        navigate("/MainMenu", { state: { cart: existingCart } });
    }


    //서브메뉴 수량 계산
    function handleQuantityChange(optionName, change) {
        setSelectedOptions(prevState => {
            const newQuantity = Math.max((prevState[optionName] || 0) + change, 0);

            // If the new quantity is zero, remove the item from the state
            if (newQuantity === 0) {
                const newState = { ...prevState };
                delete newState[optionName];
                return newState;
            }

            // Otherwise, update the quantity as before
            return {
                ...prevState,
                [optionName]: newQuantity,
            };
        });
    }


    if (!selectedMenu) {
        // 선택한 메뉴가 없는 경우 예외 처리
        return <div>No menu selected.</div>;
    }


    function herf_back() {
        navigate("/MainMenu");
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
                                    <p className="option_item" onClick={() => handleOptionClick(option)}>
                                        <span className="option_name">{option.option_name}</span>
                                        {option.option_price &&
                                            (<span className="option_price">{option.option_price.toLocaleString()}원</span>)
                                        }
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
                    <div className="selected_item">
                        {/* 기본 메뉴 정보 출력 */}
                        <div className="menu_item">
                            <span className="selected_name">{selectedMenu.menu_name}</span>
                            <span className="selected_price">{selectedMenu.menu_price.toLocaleString()}원</span>
                        </div>

                        {/* 선택한 사이드 메뉴들 출력 */}
                        {Object.entries(selectedOptions).map(([optionName, quantity]) => {
                            const option = findSelectedOption(optionName);
                            return (
                                <div className="menu_item">
                                    <span className="selected_name">{optionName}</span>
                                    <div className="quantity_section">
                                        <button className="minus" onClick={() => handleQuantityChange(optionName, -1)}>-</button>
                                        <span>{quantity}</span>
                                        <button className="plus" onClick={() => handleQuantityChange(optionName, 1)}>+</button>
                                    </div>
                                    < span className="selected_price" > {(option.option_price * quantity).toLocaleString()} 원 </ span >
                                </ div >
                            );
                        })}
                    </ div >

                    {/* 합계 금액 출력 부분 */}
                    < div className="total_section" >
                        < div className="total_text" > 합계 :</div>
                        < div className="total_price" > {total.toLocaleString()} 원 </ div >
                    </ div >

                    {/* 주문 담기 버튼 */}
                    <div className="order_section">
                        <button className="order_button" onClick={handleOrderClick}>주문 담기</button>
                    </div>
                </ div >
            </ div >
        </ div >
    );
}