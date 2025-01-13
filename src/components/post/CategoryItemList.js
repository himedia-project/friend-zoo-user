import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import axiosInstance from '../../api/axiosInstance';
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';

const CategoryItemList = ({ items, onHeartChange }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return <div>상품이 없습니다.</div>;

  const handleHeartClick = async (id) => {
    try {
      await axiosInstance.post(`/heart/product/${id}`);

      // Find the item and toggle its heart status
      const updatedItem = items.find((item) => item.id === id);
      if (updatedItem) {
        updatedItem.heart = !updatedItem.heart;
        // Notify parent component about the heart change
        onHeartChange && onHeartChange(id, updatedItem.heart);
      }

      Swal.fire({
        title: '찜하기 상태 변경',
        text: '상품 찜하기 상태가 변경되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      });
    } catch (error) {
      console.error('찜하기 실패:', error);
      Swal.fire({
        title: '찜하기 실패',
        text: '로그인을 해주시기 바랍니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      window.scrollTo(0, 0);
      navigate('/login');
    }
  };

  return (
    <div className="ItemList">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={4}
        loop={true}
        grid={{
          rows: 30,
          fill: 'row',
        }}
      >
        {items.map((item) => (
          <SwiperSlide className="SlickBox" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <div
                className="SlickImageContainer"
                style={{ position: 'relative' }}
              >
                <img
                  src={
                    `${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}` ||
                    GoodsImg1
                  }
                  alt={item.name}
                  className="SlickImage"
                />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleHeartClick(item.id);
                  }}
                  className="heart-icon"
                >
                  {item.heart ? (
                    <FavoriteIcon style={{ color: 'red', fontSize: '24px' }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon style={{ fontSize: '24px' }} />
                  )}
                </span>
              </div>
              <div className="SwiperGridInfoContainer">
                <h3 className="SwiperGridInfoTitle">
                  {item.name.split('|').map((part, index) => (
                    <span
                      key={index}
                      className={index > 0 ? 'SwiperGridInfoSubText' : ''}
                    >
                      {part}
                      {index < item.name.split('|').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="SwiperGridPrice" style={{ position: 'relative' }}>
                  {item.price.toLocaleString()}원
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryItemList;
