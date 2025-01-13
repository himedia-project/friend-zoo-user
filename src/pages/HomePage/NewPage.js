import React, { useEffect, useState } from 'react';
import { getNewItemProductList } from '../../api/productApi';
import ItemListGrid from '../../components/post/ItemListGrid';

function NewPage() {
  const [products, setProducts] = useState({ new: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const newProducts = await getNewItemProductList();
      setProducts({ new: newProducts });
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
      new: prevProducts.new.map((product) =>
        product.id === productId ? { ...product, heart: heartStatus } : product,
      ),
    }));
  };

  return (
    <ItemListGrid
      title="🧸 신규 상품 🧩️"
      items={products.new}
      onHeartChange={handleHeartChange}
    />
  );
}

export default NewPage;
