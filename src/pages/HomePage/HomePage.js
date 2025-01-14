// components/HomePage.js
import React, { useEffect, useState } from 'react';
import SliderComponent from '../../components/post/MainSlider';
import ItemList from '../../components/post/ItemList';
import CategoryButton from '../../components/post/CategoryButton';
import {
  getBestItemProductList,
  getMDPickItemProductList,
  getNewItemProductList,
  getStyleItemProductList,
} from '../../api/productApi'; // API 함수 가져오기

import '../../App.css';
import StyleItemList from '../../components/post/StyleItemList';
import SubSlider from '../../components/post/SubSlider';

const HomePage = () => {
  const [products, setProducts] = useState({
    best: [],
    new: [],
    mdpick: [],
    style: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const bestProducts = await getBestItemProductList();
      const newProducts = await getNewItemProductList();
      const mdpickProducts = await getMDPickItemProductList();
      const styleProducts = await getStyleItemProductList();
      setProducts({
        best: bestProducts,
        new: newProducts,
        mdpick: mdpickProducts,
        style: styleProducts,
      });
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 새로나온 상품 찜하기 상태 변경 함수
  const handleNewItemHeartChange = (productId, newHeartStatus) => {
    setProducts((prev) => ({
      ...prev,
      new: prev.new.map((item) =>
        item.id === productId ? { ...item, heart: newHeartStatus } : item,
      ),
    }));
  };

  return (
    <div>
      <SliderComponent />
      <CategoryButton />
      <hr />
      <ItemList
        title="🔥 베스트 상품 ⭐️"
        items={products.best}
        onHeartChange={handleNewItemHeartChange}
      />
      <hr />
      <br />
      <ItemList
        title="🐶 추천픽 상품 📌"
        items={products.mdpick}
        onHeartChange={handleNewItemHeartChange}
      />
      <hr />
      <br />
      <SubSlider />
      <hr />
      <br />
      <ItemList
        title="🧸 신규 상품 🧩️"
        items={products.new}
        onHeartChange={handleNewItemHeartChange}
      />
      <hr />
      <br />
      <StyleItemList title="🌈 Syle 콘텐츠 리스트" items={products.style} />
      <br />
      <hr />
      <br />
    </div>
  );
};

export default HomePage;
