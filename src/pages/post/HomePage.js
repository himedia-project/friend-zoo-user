import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick"; // React Slick 임포트
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const [bestItem, setBestItem] = useState([]); // 베스트 상품 상태 변수
    const [loading, setLoading] = useState(true); // 로딩 상태 변수
    const [error, setError] = useState(null); // 에러 상태 변수
    const sliderRef = useRef(null); // 슬라이더 참조

    // 임시 데이터 생성
    useEffect(() => {
        const mockData = [
            { id: 1, name: "베스트 상품 1번", price: "53,000원", productPhoto: "https://codingapple1.github.io/shop/shoes1.jpg" },
            { id: 2, name: "베스트 상품 2", price: "45,000원", productPhoto: "https://codingapple1.github.io/shop/shoes2.jpg" },
            { id: 3, name: "베스트 상품 3", price: "60,000원", productPhoto: "https://codingapple1.github.io/shop/shoes3.jpg" },
        ];

        setBestItem(mockData);
        setLoading(false); // 로딩 완료
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;

    // 슬라이더 설정
    const settings = {
        dots: true, // 페이지 인디케이터 표시
        infinite: true, // 무한 스크롤
        speed: 500, // 애니메이션 속도
        slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 수

        // 화면 크기에 따른 반응형
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
            <h2>베스트 상품 목록</h2>
            <div style={{ position: 'relative' }}>
                <Slider ref={sliderRef} {...settings}>
                    {bestItem.map(item => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>가격: {item.price}</p>
                            {item.productPhoto && <img src={item.productPhoto} style={{ width: '100%', height: 'auto' }} alt={item.name} />}
                        </div>
                    ))}
                </Slider>
                <button
                    onClick={() => sliderRef.current.slickPrev()}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                    이전
                </button>
                <button
                    onClick={() => sliderRef.current.slickNext()}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                    다음
                </button>
            </div>
        </div>
    );
}

export default HomePage;

// Best 상품 ( Id / name / price / photo ) 을 보여줌
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