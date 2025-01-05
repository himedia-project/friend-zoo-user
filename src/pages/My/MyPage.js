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

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [products, setProducts] = useState([]);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    loadHeartLists();
  }, []);

  const loadHeartLists = async () => {
    try {
      const productList = await getHeartProducts();
      const contentList = await getHeartContents();
      console.log('productList: ', productList);
      setProducts(productList);
      console.log('contentList: ', contentList);
      setContents(contentList);
    } catch (error) {
      console.error('Failed to load heart lists:', error);
    }
  };

  const handleHeartClick = async (id, type) => {
    try {
      if (type === 'product') {
        await changeHeartProduct(id);
        console.log('좋아요 추가 완료');
      } else {
        await changeHeartContent(id);
        console.log('좋아요 추가 완료');
      }
      loadHeartLists(); // 목록 새로고침
    } catch (error) {
      console.error('Failed to update heart:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="goods-wrap">
      <h2>찜목록</h2>
      <div className="goods-containter">
        <div className="sidebar">
          <ul>
            <li>
              <a href="">주문조회</a>
            </li>
            <li>
              <a href="" style={{ fontWeight: 'bold', color: '#000' }}>
                찜목록
              </a>
            </li>
            <li>
              <a href="">주문조회</a>
            </li>
            <li>
              <a href="">정보수정</a>
            </li>
            <li>
              <a href="">회원탈퇴</a>
            </li>
          </ul>
        </div>
        <div className="shopping-cart-container">
          <div className="tabs">
            <button
              className={activeTab === 'product' ? 'active' : ''}
              onClick={() => handleTabClick('product')}
            >
              상품
            </button>
            <button
              className={activeTab === 'content' ? 'active' : ''}
              onClick={() => handleTabClick('content')}
            >
              컨텐츠
            </button>
          </div>
          {activeTab === 'product' && (
            <div className="tab-content">
              {products.map((product) => (
                <div className="product" key={product.id}>
                  <img
                    src={
                      `${API_SERVER_HOST}/api/product/view/${product.uploadFileNames[0]}` ||
                      GoodsImg1
                    }
                    alt={product.name}
                  />
                  <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="price">{product.price}원</p>
                    <button
                      className="edit-button"
                      onClick={() => handleHeartClick(product.id, 'product')}
                    >
                      찜하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'content' && (
            <div className="tab-content">
              {contents.map((content) => (
                <div className="product" key={content.id}>
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
                    <button
                      className="edit-button"
                      onClick={() => handleHeartClick(content.id, 'content')}
                    >
                      찜하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
