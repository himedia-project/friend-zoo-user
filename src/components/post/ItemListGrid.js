import React, { useState } from 'react'; // useState 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../../css/ItemListGrid.css';
import { Autoplay, Navigation, Pagination, Grid } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const ItemListGrid = ({ title, items, onHeartChange }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!items || items.length === 0) return null; // null 반환으로 수정

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
      // window.scrollTo(0, 0);
      navigate('/login');
    }
  };

  return (
    <div className="ItemListGrid">
      <h2 className="ItemGridTitle">{title}</h2>
      <Swiper
        loop={true}
        modules={[Navigation, Autoplay, Pagination, Grid]}
        rewind={true}
        slidesPerView={4}
        grid={{
          rows: 30,
          fill: 'row',
        }}
        simulateTouch={false}
        pagination={{
          el: '.pagination_bullet',
          clickable: true,
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="SwiperGridBox">
              <Link to={`/product/${item.id}`}>
                <div className="SwiperGridImageContainer">
                  <img
                    src={
                      `${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}` ||
                      GoodsImg1
                    }
                    alt={item.name}
                    className="SwiperGridImage"
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
                      <FavoriteIcon
                        style={{ color: 'red', fontSize: '24px' }}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        style={{ fontSize: '24px' }}
                      />
                    )}
                  </span>
                  <div className="SwiperGridOverlay">
                    <div>
                      {item.name.split('|').map((part, index) => {
                        const isKorean = /[가-힣]/.test(part);
                        if (isKorean) {
                          const lines = part.match(/.{1,26}/g);
                          return (
                            <span
                              key={index}
                              className={
                                index > 0 ? 'SwiperGridImageInfoContainer' : ''
                              }
                            >
                              {lines.map((line, lineIndex) => (
                                <span key={lineIndex}>
                                  {line}
                                  <br />
                                </span>
                              ))}
                            </span>
                          );
                        }
                        return null;
                      })}
                      <hr />
                      <div className="SwiperGridImageInfoPriceContainer">
                        <span className="SwiperGridImageInfoPrice">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemListGrid;
