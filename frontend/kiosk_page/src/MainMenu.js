import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

export default function MainMenu() {
    const location = useLocation(); // Get the location object
    const option = location.state?.option;
    
    return (
        <div>
            선택한 옵션 : {option}
        </div>
    );
}
