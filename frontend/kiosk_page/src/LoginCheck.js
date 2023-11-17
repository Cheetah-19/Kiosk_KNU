import { useNavigate } from 'react-router-dom';
import "./Common.css";
import "./LoginCheck.css";

export default function MainMenu() {
    const navigate = useNavigate();

    const handleLeftButtonClick = () => {
        navigate('/face');
    };

    //홈 화면 가는 함수
    function herf_home() {
        navigate('/');
    }

    const handleRightButtonClick = () => {
        navigate('/phonenum');
    };

    const handleNoMemberClick = () => {
        navigate('/MainMenu');
    };
    return (
        <div id="top_bar_menu">
            <div id="top_bar_home" onClick={herf_home}></div>
            <header>Easy KIOSK</header>
            <body>
                <div className='container'>
                    <div id="button-container">
                        <button onClick={handleLeftButtonClick}>얼굴인식</button>
                        <button onClick={handleRightButtonClick}>휴대폰번호</button>
                    </div>
                    <div>
                        <button className='button2' onClick={handleNoMemberClick}>비회원으로 주문하기</button>
                    </div>
                </div>
            </body>
        </div>
    );
}