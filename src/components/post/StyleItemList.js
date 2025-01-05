import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import '../../css/StyleItemList.css';
import { Autoplay, Navigation, Pagination, Grid } from "swiper/modules";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const StyleList = ({ title, items }) => {
    if (!items || items.length === 0) return;

    return (
        <div className="StyleList">
            <h2 className="StyleListTitle">{title}</h2>
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
                    el: ".pagination_bullet",
                    clickable: true,
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="StyleListBox">
                            <Link to={`/product/${item.id}`}>
                                <div className="StyleListImageContainer">
                                    <img
                                        src={"https://cdn.imweb.me/thumbnail/20241125/d781269838648.jpg"}
                                        alt={item.name}
                                        className="StyleListImage"
                                    />
                                    <div className="StyleListOverlay">
                                        <div className="ProfileAndHeart">
                                            <img
                                                src="https://via.placeholder.com/40"
                                                alt="Profile"
                                                className="ProfileImage"
                                            />
                                            <FavoriteBorderOutlinedIcon
                                                style={{marginLeft: '230px', color: 'gray', verticalAlign: 'middle'}}/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default StyleList;
