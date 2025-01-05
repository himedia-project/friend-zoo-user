import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import '../../css/Detail.css';
import ItemList from '../../components/post/ItemList';
import {
  getBestItemProductList,
  getNewItemProductList,
} from '../../api/productApi';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { postChangeCart } from '../../api/cartApi';
import AlertModal from '../../components/common/AlertModal';
import ConfirmModal from '../../components/common/ConfirmModal';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  // 샘플 데이터 (실제 데이터는 API에서 가져와야 합니다)
  const product = {
    id: productId,
    title: '상품 제목',
    image: 'https://example.com/image.jpg', // 이미지 URL
    rating: 4,
    price: '43,000원',
    reviewsCount: 23,
    likes: 150,
    shippingMethod: '택배',
    shippingCost: 3000,
    freeShippingThreshold: 50000,
    deliveryInfo: '기본배송(결제 후 5일 내 배송) / 5만원이상 구매시 무료배송',
  };

  const [products, setProducts] = useState({ best: [], new: [], mdpick: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: true,
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const bestProducts = await getBestItemProductList();
      const newProducts = await getNewItemProductList();
      setProducts({ best: bestProducts, new: newProducts, mdpick: [] });
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    postChangeCart({ productId: productId, qty: 1 });
    setAlertModal({
      open: true,
      title: '장바구니 담기 성공',
      message: '상품이 장바구니에 담겼습니다.',
      isSuccess: true,
    });
  };

  const handleAlertClose = () => {
    setAlertModal({ ...alertModal, open: false });
    setConfirmModal({
      open: true,
      title: '장바구니로 이동',
      message: '장바구니 페이지로 이동하시겠습니까?',
      isSuccess: true,
    });
  };

  const handleConfirmClose = () => {
    setConfirmModal({ ...confirmModal, open: false });
  };

  const handleConfirm = () => {
    setConfirmModal({ ...confirmModal, open: false });
    navigate('/cart');
  };

  return (
    <div className="App">
      <ItemList title="🧸 새로나온 신상 상품! 🧩" items={products.new} />
      <hr />
      <br />
      <br />
      <br />
      <div className="ProductDetailContainer">
        <div className="ProductPhotoContainer">
          <img
            src={'https://cdn.imweb.me/thumbnail/20241125/d781269838648.jpg'}
            alt={product.title}
            className="ProductPhoto"
          />
        </div>
        <div className="ProductInfoContainer">
          <h2 className="ProductTitle">{product.title}</h2>
          <p>
            {Array.from({ length: 4 }, (_, index) => (
              <StarOutlinedIcon
                key={index}
                style={{
                  color: index < product.rating ? 'orange' : 'lightgray',
                }} // 별의 색상 설정
              />
            ))}{' '}
            {product.reviewsCount}개 구매평
          </p>
          <p>
            가격: {product.price}
            <FavoriteBorderOutlinedIcon
              style={{
                marginLeft: '12rem',
                color: 'gray',
                verticalAlign: 'middle',
              }}
            />
            {product.likes}
            <ShareOutlinedIcon
              style={{
                marginTop: '-10px;',
                marginLeft: '5px',
                color: 'gray',
                verticalAlign: 'middle',
              }}
            />
          </p>
          <hr />
          <br />
          <div className="ProductSubTextContainer">
            <p>배송 방법: {product.shippingMethod}</p>
            <p>
              배송비: {product.shippingCost.toLocaleString()}원 (
              {product.freeShippingThreshold.toLocaleString()}원 이상 무료배송)
              | 도서산간 배송비 추가
            </p>
            <p>배송 안내: {product.deliveryInfo}</p>
            <div className="ButtonContainer">
              <button className="ProductButton">구매하기</button>
              <button className="ProductButton" onClick={handleAddToCart}>
                장바구니에 넣기
              </button>
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        open={alertModal.open}
        onClose={handleAlertClose}
        title={alertModal.title}
        message={alertModal.message}
        isSuccess={alertModal.isSuccess}
      />
      <ConfirmModal
        open={confirmModal.open}
        onClose={handleConfirmClose}
        title={confirmModal.title}
        message={confirmModal.message}
        isSuccess={confirmModal.isSuccess}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ProductDetailPage;
