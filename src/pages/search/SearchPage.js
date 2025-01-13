import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  getBestItemProductList,
  getMDPickItemProductList,
  getNewItemProductList,
  getSearchProductList,
} from '../../api/productApi';
import '../../css/SearchPage.css';
import { API_SERVER_HOST } from '../../config/apiConfig';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('keyword') || '',
  );
  const [products, setProducts] = useState({ best: [], new: [], mdpick: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleHeartClick = async (id) => {
    try {
      await axiosInstance.post(
        `/heart/product/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (searchTerm) {
        setSearchResults((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, heart: !item.heart } : item,
          ),
        );
      } else {
        setProducts((prev) => ({
          best: prev.best.map((item) =>
            item.id === id ? { ...item, heart: !item.heart } : item,
          ),
          new: prev.new.map((item) =>
            item.id === id ? { ...item, heart: !item.heart } : item,
          ),
          mdpick: prev.mdpick.map((item) =>
            item.id === id ? { ...item, heart: !item.heart } : item,
          ),
        }));
      }

      const isNowHearted = searchTerm
        ? searchResults.find((item) => item.id === id)?.heart
        : products.best.find((item) => item.id === id)?.heart ||
          products.new.find((item) => item.id === id)?.heart ||
          products.mdpick.find((item) => item.id === id)?.heart;

      Swal.fire({
        title: !isNowHearted ? '찜하기 성공' : '찜하기 해제',
        text: !isNowHearted
          ? '상품이 찜 목록에 추가되었습니다.'
          : '상품이 찜 목록에서 제거되었습니다.',
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
      navigate('/login');
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchParams]);

  const fetchInitialProducts = async () => {
    try {
      const [bestProducts, newProducts, mdpickProducts] = await Promise.all([
        getBestItemProductList(),
        getNewItemProductList(),
        getMDPickItemProductList(),
      ]);
      setProducts({
        best: bestProducts,
        new: newProducts,
        mdpick: mdpickProducts,
      });
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const results = await getSearchProductList(searchTerm);
        setSearchResults(results);
        navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      } catch (error) {
        console.error('검색 실패:', error);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </form>
      </div>

      {searchTerm ? (
        <div className="search-results">
          <h2>검색 결과</h2>
          <div className="product-grid">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => handleProductClick(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}`}
                  alt={item.name}
                />
                <div className="product-info">
                  <h3>
                    {item.name.split('|').map((part, index) => (
                      <span
                        key={index}
                        className={index > 0 ? 'product-info-sub' : ''}
                      >
                        {part}
                        {index < item.name.split('|').length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="price" style={{ marginRight: '8px' }}>
                      {item.price.toLocaleString()}원
                    </p>
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
                        handleHeartClick(item.id);
                      }}
                      style={{ cursor: 'pointer', zIndex: 1 }}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="default-content">
          <section className="product-section">
            <h2>🔥 베스트 상품 ⭐️</h2>
            <div className="product-grid">
              {products.best.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}`}
                    alt={item.name}
                  />
                  <div className="product-info">
                    <h3>
                      {item.name.split('|').map((part, index) => (
                        <span
                          key={index}
                          className={index > 0 ? 'product-info-sub' : ''}
                        >
                          {part}
                          {index < item.name.split('|').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="price" style={{ marginRight: '8px' }}>
                        {item.price.toLocaleString()}원
                      </p>
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
                          handleHeartClick(item.id);
                        }}
                        style={{ cursor: 'pointer', zIndex: 1 }}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />
          <br />

          <section className="product-section">
            <h2>🐶 추천픽 상품 📌</h2>
            <div className="product-grid">
              {products.mdpick.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}`}
                    alt={item.name}
                  />
                  <div className="product-info">
                    <h3>
                      {item.name.split('|').map((part, index) => (
                        <span
                          key={index}
                          className={index > 0 ? 'product-info-sub' : ''}
                        >
                          {part}
                          {index < item.name.split('|').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="price" style={{ marginRight: '8px' }}>
                        {item.price.toLocaleString()}원
                      </p>
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
                          handleHeartClick(item.id);
                        }}
                        style={{ cursor: 'pointer', zIndex: 1 }}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />
          <br />

          <section className="product-section">
            <h2>🧸 신규 상품 🧩️</h2>
            <div className="product-grid">
              {products.new.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`${API_SERVER_HOST}/api/product/view/${item.uploadFileNames[0]}`}
                    alt={item.name}
                  />
                  <div className="product-info">
                    <h3>
                      {item.name.split('|').map((part, index) => (
                        <span
                          key={index}
                          className={index > 0 ? 'product-info-sub' : ''}
                        >
                          {part}
                          {index < item.name.split('|').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="price" style={{ marginRight: '8px' }}>
                        {item.price.toLocaleString()}원
                      </p>
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 방지
                          handleHeartClick(item.id);
                        }}
                        style={{ cursor: 'pointer', zIndex: 1 }}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />
          <br />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
