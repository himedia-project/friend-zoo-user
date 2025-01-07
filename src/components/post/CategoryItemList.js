import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { API_SERVER_HOST } from '../../config/apiConfig';
import GoodsImg1 from '../../img/goods.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Swal from 'sweetalert2';

const CategoryItemList = ({ items }) => {
  const { categoryId } = useParams();
  const category = parseInt(categoryId, 10);
  const [favoritedItems, setFavoritedItems] = useState({});

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

  const handleHeartClick = (id) => {
    setFavoritedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    const message = !favoritedItems[id] ? '찜 목록에 추가되었습니다.' : '찜 목록에서 제거되었습니다.';
    Swal.fire({
      title: !favoritedItems[id] ? '찜하기 성공' : '찜하기 해제',
      text: message,
      icon: 'success',
      confirmButtonText: '확인',
    });
  };

  return (
    <div className="ItemList">
      <h2 className="ItemTitle">{getCategoryTitle(category)}</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={4}
        loop={true}
        grid={{
          rows: 30,
          fill: "row",
        }}
      >
        {items.map((item) => (
          <SwiperSlide className="SlickBox" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <div className="SlickImageContainer" style={{ position: 'relative' }}>
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
                    e.stopPropagation(); // 이벤트 버블링 중단
                    e.preventDefault(); // 기본 동작 방지
                    handleHeartClick(item.id); // 찜 기능 동작
                  }}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    zIndex: 1,
                  }}
                >
                  {favoritedItems[item.id] ? (
                    <FavoriteIcon style={{ color: 'red', fontSize: '24px' }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon style={{ fontSize: '24px' }} />
                  )}
                </span>
              </div>
              <div className="SwiperGridInfoContainer">
                <h3 className="SwiperGridInfoTitle">
                  {item.name.split('|').map((part, index) => (
                    <span key={index} className={index > 0 ? 'SwiperGridInfoSubText' : ''}>
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
