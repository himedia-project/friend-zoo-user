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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('keyword') || '',
  );
  const [products, setProducts] = useState({ best: [], new: [], mdpick: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
                  src={`http://localhost:8080/api/product/view/${item.uploadFileNames[0]}`}
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
                  <p className="price">{item.price.toLocaleString()}원</p>
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
                    src={`http://localhost:8080/api/product/view/${item.uploadFileNames[0]}`}
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
                    <p className="price">{item.price.toLocaleString()}원</p>
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
                    src={`http://localhost:8080/api/product/view/${item.uploadFileNames[0]}`}
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
                    <p className="price">{item.price.toLocaleString()}원</p>
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
                    src={`http://localhost:8080/api/product/view/${item.uploadFileNames[0]}`}
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
                    <p className="price">{item.price.toLocaleString()}원</p>
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
