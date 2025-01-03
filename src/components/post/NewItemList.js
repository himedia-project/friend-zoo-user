import React from "react";
import Slider from "react-slick";

import '../../css/NewItemList.css';

const NewItemList = ({ newItems }) => {
    if (!newItems || newItems.length === 0) return <div>상품이 없습니다.</div>;

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dotsClass: 'dots_custom',
    };

    return (
        <div className="newItemList_Container">
            <h2 className="new-items-title">New 상품</h2>
            <Slider {...settings}>
                {newItems.map((item) => (
                    <div className="slide-box" key={item.id}>
                        <div className="image-container">
                            <img
                                src="https://cdn.imweb.me/thumbnail/20241125/e9bf53edb1c0c.jpg"
                                alt={item.name}
                                className="slide-image"
                            />
                        </div>
                        <div className="info-container">
                            <h3 className="slide-title">{item.name}</h3>
                            <p className="slide-price">{item.price} 원</p>
                            <span className="new-tag">NEW</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default NewItemList;
