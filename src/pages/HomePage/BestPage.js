import React, { useEffect, useState } from 'react';
import { getBestItemProductList } from '../../api/productApi';
import ItemListGrid from '../../components/post/ItemListGrid';

function BestPage() {
  const [products, setProducts] = useState({ best: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const bestProducts = await getBestItemProductList();

      setProducts({ best: bestProducts });
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleHeartChange = (productId, heartStatus) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      best: prevProducts.best.map((product) =>
        product.id === productId ? { ...product, heart: heartStatus } : product,
      ),
    }));
  };

  return (
    <ItemListGrid
      title="📌 베스트 상품 🏷️"
      items={products.best}
      onHeartChange={handleHeartChange}
    />
  );
}

export default BestPage;
