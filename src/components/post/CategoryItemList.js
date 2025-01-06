import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';

const CategoryItemList = ({ items }) => {
  if (!items || items.length === 0) return <div>상품이 없습니다.</div>;

  return (
    <div className="bestItemsList_Container">
      <h2 className="best-items-title">OO 카테고리 상품</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {items.map((item) => (
          <SwiperSlide className="slide-box" key={item.id}>
            <div className="image-container">
              <img
                src={
                  `${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}` ||
                  GoodsImg1
                }
                alt={item.name}
                className="slide-image"
              />
            </div>
            <div className="info-container">
              <h3 className="slide-title">{item.name}</h3>
              <p className="slide-price">{item.price} 원</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryItemList;
