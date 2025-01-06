import React, { useRef } from "react";
import Slider from "react-slick"; // React Slick 임포트
import '../../css/Slick.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// 슬라이더 콘텐츠를 위한 컴포넌트
const SliderContent = ({ img }) => {
    return (
        <div style={{ height: '50rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={img} alt="Slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
};

function SliderComponent() {
    const sliderRef = useRef(null); // 슬라이더 참조

    const list = [
        { img: require('../../img/title1.png') },
        { img: require('../../img/title2.png') },
        { img: require('../../img/title3.png') },
        { img: require('../../img/title4.png') },
        { img: require('../../img/title5.png') },
    ];

    // 슬라이더 설정
    const settings = {
        dots: true, // 페이지 인디케이터 표시
        infinite: true, // 무한 스크롤
        speed: 1000, // 애니메이션 속도
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dotsClass: 'dots_custom',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]
    };

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <Slider ref={sliderRef} {...settings}>
                    {list.map((value, index) => (
                        <SliderContent
                            img={value.img}
                            key={index}>
                        </SliderContent>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default SliderComponent;
