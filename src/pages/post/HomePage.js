import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick"; // React Slick 임포트
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 슬라이더 콘텐츠를 위한 컴포넌트
const SliderContent = ({ $color, children }) => {
    return (
        <div style={{ backgroundColor: $color, height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            {children}
        </div>
    );
};

function HomePage() {
    const [welComePhoto, setwelComePhoto] = useState([]); // 베스트 상품 상태 변수
    const [loading, setLoading] = useState(true); // 로딩 상태 변수
    const [error, setError] = useState(null); // 에러 상태 변수
    const sliderRef = useRef(null); // 슬라이더 참조

    const list = [
        { content: 1, color: '#FF5757' },
        { content: 2, color: '#FFBC57' },
        { content: 3, color: '#FFEE57' },
        { content: 4, color: '#57FF86' },
        { content: 5, color: '#5786FF' },
        { content: 6, color: '#8013D7' },
    ];

    //Best 상품 ( Id / name / price / photo ) 을 보여줌
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get('/api/product/list?best=”Y”'); // 베스트 아이템 리스트
    //             setBestItem(response.data); // 가져온 데이터를 상태에 저장
    //         } catch (error) {
    //             setError(error); // 에러 처리
    //         } finally {
    //             setLoading(false); // 로딩 완료
    //         }
    //     };
    //
    //     fetchCategories(); // API 호출 함수 실행하고 ? // 컴포넌트가 처음 렌더링될 때만 실행하기
    // }, []);

    // 슬라이더 설정
    const settings = {
        dots: false, // 페이지 인디케이터 표시
        infinite: true, // 무한 스크롤
        speed: 1000, // 애니메이션 속도
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
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
                            $color={value.color}
                            key={index}>

                            {value.content}

                        </SliderContent>

                    ))}
                </Slider>

            </div>
        </div>
    );
}

export default HomePage;
