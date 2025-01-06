import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import '../../css/ItemList.css';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';

const ItemList = ({ title, items }) => {
    if (!items || items.length === 0) return;

    return (
        <div className="ItemList">
            <h2 className="ItemTitle">{title}</h2>
            <Swiper
                loop={true}
                modules={[Navigation, Autoplay, Pagination]}
                rewind={true}
                slidesPerView={5}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    1280: {
                        slidesPerView: 2,
                    },
                    1920: {
                        slidesPerView: 3,
                    }
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="SlickBox">
                            <Link to={`/product/${item.id}`}>
                                <div className="SlickImageContainer">
                                  <img
                                    src={
                                      `${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}` ||
                                      GoodsImg1
                                    }
                                    alt={item.name}
                                    className="SlickImage"
                                  />
                                  <div className="SlickOverlay">
                                    <div>
                                      {item.name.split('|').map((part, index) => {
                                        const isKorean = /[가-힣]/.test(part);
                                                if (isKorean) {
                                                    const lines = part.match(/.{1,26}/g);
                                                    return (
                                                        <span key={index} className={index > 0 ? 'SlideImageInfoContainer' : ''}>
                                                            {lines.map((line, lineIndex) => (
                                                                <span key={lineIndex}>{line}<br /></span>
                                                            ))}
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <hr />
                                            <span className='SlideImageInfoPrice'>{item.price.toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="SlickInfoContainer">
                                <h3 className="SlickInfoTitle">
                                    {item.name.split('|').map((part, index) => (
                                        <span key={index} className={index > 0 ? 'SlickInfoSubText' : ''}>
                                            {part}
                                            {index < item.name.split('|').length - 1 && <br />}
                                        </span>
                                    ))}
                                </h3>
                                <p className="slide-price">{item.price.toLocaleString()}원</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItemList;
