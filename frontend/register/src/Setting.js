import React from 'react';
import {usedMediaQuery} from 'react-responsive';

/*반응형 만들때 사용할 예정(안쓸수도 있음)*/

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width:768px)"
    });
    return <> {isMobile && children}</> 
}

export const PC = ({children}) => {
    const isPc = useMediaQuery({
        query : "(min-width:769px)"
    });
    return <> {isPc && children}</>
}