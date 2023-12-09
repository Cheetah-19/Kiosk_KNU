import React, { useEffect } from 'react';

import './Common.css';
import './Alert.css';

const Alert = ({ message, visibility, setVisibility }) => {
    useEffect(() => {
        if (visibility) {
            const timer = setTimeout(() => {
            setVisibility(false);
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [visibility, setVisibility]);

    useEffect(() => {
        return () => {
            setVisibility(false);
        };
    }, [setVisibility]);

    return (
        visibility && (
            <div id="alert"> {message} </div>
        )
    );
};

export default Alert;