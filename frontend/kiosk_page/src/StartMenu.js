import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";



function StartMenu() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/MealOption');
};


    return (
        <div id="start_img" onClick={handleSubmit}></div>
      );
}

export default StartMenu;