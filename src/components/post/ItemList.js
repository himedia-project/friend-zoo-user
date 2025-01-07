import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import '../../css/ItemList.css';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom"; // useNavigate로 변경
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axiosInstance from '../../api/axiosInstance'; // axiosInstance 임포트
import Swal from 'sweetalert2'; // SweetAlert2 임포트

const ItemList = ({ title, items }) => {
  const [favoritedItems, setFavoritedItems] = useState({});
  const navigate = useNavigate();

  const handleHeartClick = async (id) => {
    try {
      const response = await axiosInstance.post(`/heart/product/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setFavoritedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      const message = !favoritedItems[id] ? '상품이 찜 목록에 추가되었습니다.' : '상품이 찜 목록에서 제거되었습니다.';
      Swal.fire({
        title: !favoritedItems[id] ? '찜하기 성공' : '찜하기 해제',
        text: message,
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


  if (!items || items.length === 0) return null;

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
                <span onClick={() => handleHeartClick(item.id)}
                      style={{ cursor: 'pointer', position: 'absolute', bottom: 10, right: 60, zIndex: 1 }}>
                  {favoritedItems[item.id] ? (
                    <FavoriteIcon style={{ color: 'red', fontSize: '24px' }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon style={{ fontSize: '24px' }} />
                  )}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ItemList;
