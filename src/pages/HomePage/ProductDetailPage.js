import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/Detail.css';
import ItemList from '../../components/post/ItemList';
import { getNewItemProductList } from '../../api/productApi';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { postChangeCart } from '../../api/cartApi';
import AlertModal from '../../components/common/AlertModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import { API_SERVER_HOST } from '../../config/apiConfig';
import axiosInstance from '../../api/axiosInstance';
import { useSelector } from 'react-redux';
import useCustomLogin from '../../hooks/useCustomLogin';
import Swal from 'sweetalert2';
import { postOrder } from '../../api/orderApi';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState({ best: [], new: [] });
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
  const [isFavorited, setIsFavorited] = useState(false);
  const { email } = useSelector((state) => state.loginSlice);
  const { requireAuth, handleAuthError } = useCustomLogin();

  useEffect(() => {
    fetchProductDetail();
    fetchProducts();
  }, [productId]);

  const scrollToMiddle = () => {
    const middlePosition = window.innerHeight / 2;
    window.scrollTo({ top: middlePosition, behavior: 'smooth' });
  };

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(
        `${API_SERVER_HOST}/api/product/detail/${productId}`,
      );
      const data = await response.json();
      const productData = {
        ...data,
        rating: 4,
        reviewsCount: 10,
      };
      setProduct(productData);
      setTimeout(scrollToMiddle, 100);
    } catch (error) {
      console.error('상품 상세 정보 로딩 실패:', error);
      setError(error);
    }
  };

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

  const handleAddToCart = async () => {
    console.log('email', email);
    if (!requireAuth(email)) {
      Swal.fire({
        title: '로그인 필요',
        text: '이 작업을 수행하려면 로그인이 필요합니다.',
        icon: 'warning',
        confirmButtonText: '로그인하기',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    try {
      await postChangeCart({ productId: productId, qty: 1 });
      setAlertModal({
        open: true,
        title: '장바구니 담기 성공',
        message: '상품이 장바구니에 담겼습니다.',
        isSuccess: true,
      });
    } catch (error) {
      if (handleAuthError(error)) {
        return;
      }
      setAlertModal({
        open: true,
        title: '장바구니 담기 실패',
        message: '상품을 장바구니에 담는데 실패했습니다.',
        isSuccess: false,
      });
    }
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

  const handleHeartClick = async () => {
    try {
      const response = await axiosInstance.post(
        `/heart/product/${productId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setIsFavorited(!isFavorited);
      const message = !isFavorited
        ? '상품이 찜 목록에 추가되었습니다.'
        : '상품이 찜 목록에서 제거되었습니다.';
      setAlertModal({
        open: true,
        title: !isFavorited ? '찜하기 성공' : '찜하기 해제',
        message,
        isSuccess: true,
      });
    } catch (error) {
      console.error('찜하기 실패:', error);
      setAlertModal({
        open: true,
        title: '찜하기 실패',
        message: '상품을 찜하는 데 실패했습니다.',
        isSuccess: false,
      });
    }
  };

  const handlePurchase = async () => {
    if (!requireAuth(email)) {
      Swal.fire({
        title: '로그인 필요',
        text: '이 작업을 수행하려면 로그인이 필요합니다.',
        icon: 'warning',
        confirmButtonText: '로그인하기',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    try {
      const orderItems = [
        {
          productId: parseInt(productId),
          qty: 1,
        },
      ];

      await postOrder({ cartItems: orderItems });

      Swal.fire({
        title: '주문 성공',
        text: '결제 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/payment', {
          state: { orderItems: orderItems },
        });
      });
    } catch (error) {
      if (handleAuthError(error)) {
        return;
      }
      Swal.fire({
        title: '주문 실패',
        text: '주문 처리 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>문제가 발생했습니다: {error.message}</div>;

  return (
    <div className="App">
      <ItemList title="🧸 새로나온 신상 상품! 🧩" items={products.new} />
      <hr />
      <br />
      <br />
      {product && (
        <div className="ProductDetailContainer">
          <div className="ProductPhotoContainer">
            <img
              src={
                product.uploadFileNames && product.uploadFileNames.length > 0
                  ? `${API_SERVER_HOST}/api/product/view/${product.uploadFileNames[0]}`
                  : 'default-image-url'
              }
              alt={product.title}
              className="ProductPhoto"
            />
            <span
              onClick={handleHeartClick}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              {isFavorited ? (
                <FavoriteIcon style={{ color: 'red', fontSize: '24px' }} />
              ) : (
                <FavoriteBorderOutlinedIcon style={{ fontSize: '24px' }} />
              )}
            </span>
          </div>
          <div className="ProductInfoContainer">
            <h2 className="ProductTitle">{product.name}</h2>
            <p>
              {Array.from({ length: 5 }, (_, index) => (
                <StarOutlinedIcon
                  key={index}
                  style={{
                    color: index < product.rating ? 'orange' : 'lightgray',
                  }}
                />
              ))}{' '}
              {product.reviewsCount}개 구매평
            </p>
            <p>
              가격: {product.price.toLocaleString()}원
              <ShareOutlinedIcon />
            </p>
            <hr />
            <br />
            <div className="ProductSubTextContainer">
              <p>배송 방법: {product.shippingMethod}</p>
              <p>
                배송비: {(product.shippingCost || 0).toLocaleString()}원 (
                {(product.freeShippingThreshold || 0).toLocaleString()}원 이상
                무료배송) | 도서산간 배송비 추가
              </p>
              <p>배송 안내: {product.deliveryInfo || '정보 없음'}</p>
              <div className="ButtonContainer">
                <button className="ProductButton" onClick={handlePurchase}>
                  구매하기
                </button>
                <button className="ProductButton" onClick={handleAddToCart}>
                  장바구니에 넣기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
