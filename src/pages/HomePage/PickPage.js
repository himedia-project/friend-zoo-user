import React, { useEffect, useState } from 'react';
import { getMDPickItemProductList } from '../../api/productApi';
import ItemListGrid from '../../components/post/ItemListGrid';

function PickPage() {
  const [products, setProducts] = useState({ best: [], new: [], mdpick: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const mdpickProducts = await getMDPickItemProductList();
      setProducts({ mdpick: mdpickProducts });
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
      mdpick: prevProducts.mdpick.map((product) =>
        product.id === productId ? { ...product, heart: heartStatus } : product,
      ),
    }));
  };

  return (
    // API 호출이 안되서 memberDTO 오류 해결되면 바꿔주기
    // 현재는 best item으로 임시 호출중이며 추가되는대로 위에 useEffect도 수정해야함.
    <ItemListGrid
      title="❤️ MD'S Pick 🔰"
      items={products.mdpick}
      onHeartChange={handleHeartChange}
    />
  );
}

export default PickPage;
