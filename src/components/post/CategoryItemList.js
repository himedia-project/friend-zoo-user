import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';

const CategoryItemList = ({ items, category }) => {
  if (!items || items.length === 0) return <div>상품이 없습니다.</div>;

  const getCategoryTitle = (category) => {
    switch (category) {
      case 1:
        return '쿼카 카테고리 상품';
      case 2:
        return '강아지 카테고리 상품';
      case 3:
        return '악어 카테고리 상품';
      case 4:
        return '라이언 카테고리 상품';
      case 5:
        return '토끼 카테고리 상품';
      case 6:
        return '거북이 카테고리 상품';
      case 7:
        return '다람쥐 카테고리 상품';
      case 8:
        return '해달 카테고리 상품';
      case 9:
        return '고양이 카테고리 상품';
      default:
        return '카테고리 상품';
    }
  };

  return (
    <div className="bestItemsList_Container">
      <h2 className="best-items-title">{getCategoryTitle(category)}</h2>
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
              <p className="slide-price">{item.price.toLocaleString()} 원</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryItemList;
