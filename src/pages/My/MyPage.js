import React, { useState, useEffect } from 'react';
import {
  getHeartProducts,
  getHeartContents,
  changeHeartProduct,
  changeHeartContent,
} from '../../api/heartApi';
import '../../css/Goods.css';
import GoodsImg1 from '../../img/goods.jpg';
import GoodsImg2 from '../../img/goods2.jpg';
import { API_SERVER_HOST } from '../../config/apiConfig';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import MySidebar from '../../components/common/MySidebar';
import Swal from 'sweetalert2';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [products, setProducts] = useState([]);
  // const [contents, setContents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadHeartLists();
  }, []);

  const loadHeartLists = async () => {
    try {
      const productList = await getHeartProducts();
      // const contentList = await getHeartContents();
      console.log('productList: ', productList);
      setProducts(productList);
      // console.log('contentList: ', contentList);
      // setContents(contentList);
    } catch (error) {
      console.error('Failed to load heart lists:', error);
    }
  };

  const handleHeartClick = async (id, type) => {
    try {
      // 좋아요가 이미 되어있는 상품인 경우
      const product = products.find((p) => p.id === id);
      if (product?.heart) {
        const result = await Swal.fire({
          title: '찜 취소',
          text: '찜 목록에서 삭제하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '확인',
          cancelButtonText: '취소',
        });

        if (!result.isConfirmed) {
          return; // 취소를 눌렀을 경우 함수 종료
        }
      }

      // 좋아요 변경 처리
      if (type === 'product') {
        await changeHeartProduct(id);
        console.log('좋아요 변경 완료');
      } else {
        await changeHeartContent(id);
        console.log('좋아요 변경 완료');
      }
      loadHeartLists(); // 목록 새로고침
    } catch (error) {
      console.error('Failed to update heart:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleItemClick = (id, type) => {
    if (type === 'product') {
      navigate(`/product/${id}`);
    } else {
      navigate(`/content/${id}`);
    }
  };

  return (
    <div className="goods-wrap">
      <h2>찜목록</h2>
      <div className="goods-containter">
        <MySidebar />
        <div className="shopping-cart-container">
          <div className="tabs">
            <button
              className={activeTab === 'product' ? 'active' : ''}
              onClick={() => handleTabClick('product')}
            >
              상품
            </button>
            {/* <button
              className={activeTab === 'content' ? 'active' : ''}
              onClick={() => handleTabClick('content')}
            >
              컨텐츠
            </button> */}
          </div>
          {activeTab === 'product' && (
            <div className="tab-content">
              {products.length === 0 ? (
                <div className="empty-message">찜한 상품이 없습니다.</div>
              ) : (
                products.map((product) => (
                  <div className="product" key={product.id}>
                    <div
                      onClick={() => handleItemClick(product.id, 'product')}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={
                          `${API_SERVER_HOST}/api/product/view/${product.uploadFileNames[0]}` ||
                          GoodsImg1
                        }
                        alt={product.name}
                      />
                      <div className="product-details">
                        <h2>
                          {product.name.split('|').map((part, index) => (
                            <span
                              key={index}
                              className={index > 0 ? 'product-info-sub' : ''}
                            >
                              {part}
                              {index < product.name.split('|').length - 1 && (
                                <br />
                              )}
                            </span>
                          ))}
                        </h2>
                      </div>
                    </div>
                    <div className="product-right">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHeartClick(product.id, 'product');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {product.heart ? (
                          <FavoriteIcon style={{ color: 'red' }} />
                        ) : (
                          <FavoriteOutlinedIcon />
                        )}
                      </div>
                      <p className="price">
                        {product.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {/* {activeTab === 'content' && (
            <div className="tab-content">
              {contents.map((content) => (
                <div className="product" key={content.id}>
                  <div
                    onClick={() => handleItemClick(content.id, 'content')}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={
                        content.uploadFileNames && content.uploadFileNames[0]
                          ? `${API_SERVER_HOST}/api/content/view/${content.uploadFileNames[0]}`
                          : GoodsImg2
                      }
                      alt={content.title}
                    />
                    <div className="product-details">
                      <h2>{content.title}</h2>
                      <p>{content.description}</p>
                      <p className="price">{content.price}원</p>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeartClick(content.id, 'content');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {content.heart ? (
                      <FavoriteIcon style={{ color: 'red' }} />
                    ) : (
                      <FavoriteOutlinedIcon />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
