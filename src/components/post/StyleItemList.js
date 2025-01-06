import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import '../../css/StyleItemList.css';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';

const StyleList = ({ title, items }) => {
  // items가 비어있거나 undefined일 경우 메시지 출력
  if (!items || items.length === 0) return;

  return (
    <div className="ItemList">
      <h2 className="ItemTitle">{title}</h2>
      <Swiper
        loop={true}
        modules={[Navigation, Autoplay, Pagination, Grid]}
        rewind={true}
        slidesPerView={5}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grid={{
          rows: 10,
          fill: "row",
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
                <div className="StyleImageContainer">
                  <img
                    src={
                      item.uploadFileNames && item.uploadFileNames.length > 0
                        ? `${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}`
                        : GoodsImg1
                    }
                    alt={item.name || '상품 이미지'}
                    className="SlickImage"
                  />
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
