import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import '../../css/ItemListGrid.css';
import { Autoplay, Navigation, Pagination, Grid } from "swiper/modules";
import { Link } from "react-router-dom";

const ItemListGrid = ({ title, items }) => {
    if (!items || items.length === 0) return;

    return (
        <div className="ItemListGrid">
            <h2 className="ItemGridTitle">{title}</h2>
            <Swiper
                loop={true}
                modules={[Navigation, Autoplay, Pagination, Grid]}
                rewind={true}
                slidesPerView={4}
                grid={{
                    rows: 10,
                    fill: "row",
                }}
                pagination={{
                    el: ".pagination_bullet",   //페이징 태그 클래스 설정
                    clickable: true,    //버튼 클릭 여부
                    type : 'bullets',   //페이징 타입 설정(종류: bullets, fraction, progressbar)
                    // Bullet Numbering 설정
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                }}
                //     autoplay={{
                //     delay: 1000,
                //     disableOnInteraction: false,
                // }}
                // breakpoints={{
                //     320: {
                //         slidesPerView: 1,
                //         spaceBetween: 20,
                //     },
                //     480: {
                //         slidesPerView: 1,
                //         spaceBetween: 30,
                //     },
                //     640: {
                //         slidesPerView: 1,
                //         spaceBetween: 40,
                //     },
                //     1280: {
                //         slidesPerView: 2,
                //     },
                //     1920: {
                //         slidesPerView: 3,
                //     }
                // }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="SwiperGridBox">
                            <Link to={`/product/${item.id}`}>
                                <div className="SwiperGridImageContainer">
                                    <img
                                        src={"https://cdn.imweb.me/thumbnail/20241125/d781269838648.jpg"}
                                        alt={item.name}
                                        className="SwiperGridImage"
                                    />
                                    <div className="SwiperGridOverlay">
                                        <div>
                                            {item.name.split('|').map((part, index) => {
                                                const isKorean = /[가-힣]/.test(part);
                                                if (isKorean) {
                                                    const lines = part.match(/.{1,26}/g);
                                                    return (
                                                        <span key={index} className={index > 0 ? 'SwiperGridImageInfoContainer' : ''}>
                                                            {lines.map((line, lineIndex) => (
                                                                <span key={lineIndex}>{line}<br /></span>
                                                            ))}
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <hr />
                                            <span className='SwiperGridImageInfoPrice'>{item.price.toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="SwiperGridInfoContainer">
                                <h3 className="SwiperGridInfoTitle">
                                    {item.name.split('|').map((part, index) => (
                                        <span key={index} className={index > 0 ? 'SwiperGridInfoSubText' : ''}>
                                            {part}
                                            {index < item.name.split('|').length - 1 && <br />}
                                        </span>
                                    ))}
                                </h3>
                                <p className="SwiperGridPrice">{item.price.toLocaleString()}원</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItemListGrid;
