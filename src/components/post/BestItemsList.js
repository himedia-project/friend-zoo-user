import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '../../css/BestItemsList.css';

const BestItemsList = ({ bestItems }) => {
  if (!bestItems || bestItems.length === 0) return <div>상품이 없습니다.</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: 'dots_custom',
  };

  return (
    <div className="ItemList">
      <h2 className="ItemTitle">Best 상품</h2>
      <Slider {...settings}>
        {bestItems.map((item) => (
          <div className="SlickBox" key={item.id}>
            <div className="SlickImageContainer">
              <img
                src={item.img} // 여기에 이미지를 설정합니다.
                alt={item.name}
                className="SlickImage"
              />
            </div>
            <div className="SlickInfoContainer">
              <h3 className="SlickInfoTitle">
                {item.name.split('|').map((part, index) => (
                  <span key={index} className={index > 0 ? 'SlickInfoSubText' : ''}>
                    {part}
                    {index < item.name.split('|').length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="slide-price">{item.price} 원</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestItemsList;
