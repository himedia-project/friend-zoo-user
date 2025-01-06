import React from 'react';
import KakaoImg from '../../img/kakao.png';
import '../../css/Kakao.css';

const FloatingImage = () => {
    const handleClick = () => {
        // 클릭 시 링크로 이동
        window.open('https://open.kakao.com/o/sN3lpt8g', '_blank');
    };

    return (
        <div className="floating-image" onClick={handleClick}>
            <img
                src={KakaoImg}
                alt="Floating"
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

const Kakao = () => {
    return (
        <div className="App">
            <FloatingImage />
        </div>
    );
};

export default Kakao;
