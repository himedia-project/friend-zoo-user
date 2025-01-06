import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postOrder, getOrderList } from '../../api/orderApi';
import { API_SERVER_HOST } from '../../config/apiConfig';
import '../../css/PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // First, create the order using cartItems from location state
        await postOrder({ cartItems: location.state.orderItems });

        // Then fetch the order list to get the latest order
        const response = await getOrderList();
        // Get the most recent order (first item in dtoList)
        setOrderData(response.dtoList[0]);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [location.state]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }
    navigate('/payment/complete');
  };

  if (!orderData) return <div>Loading...</div>;

  return (
    <div className="payment-container">
      <h1 className="payment-title">결제하기</h1>

      <div className="order-section">
        {orderData.orderItems.map((item) => (
          <div key={item.productId} className="order-item">
            <div className="order-product">
              <div className="product-image">
                <img
                  src={`${API_SERVER_HOST}/api/product/view/${item.imgUrl}`}
                  alt={item.productName}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.productName}</h3>
                <div className="product-details">
                  <span className="product-quantity">수량: {item.count}개</span>
                  <span className="product-price">
                    {item.orderPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-info">
        <div className="customer-info">
          <h3>주문자 정보</h3>
          <p>{orderData.name}</p>
          <p>{orderData.phone}</p>
          <p>{orderData.email}</p>
        </div>

        <div className="price-summary">
          <div className="price-row">
            <span>상품가격</span>
            <span>{orderData.totalPrice.toLocaleString()}원</span>
          </div>
          <div className="price-row">
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div className="price-row total-price">
            <span>총 주문금액</span>
            <span>{orderData.totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        <label
          className={`payment-method-option ${
            paymentMethod === '신용카드' ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            value="신용카드"
            checked={paymentMethod === '신용카드'}
            onChange={handlePaymentChange}
          />
          신용카드
        </label>
        <label
          className={`payment-method-option ${
            paymentMethod === '가상계좌' ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            value="가상계좌"
            checked={paymentMethod === '가상계좌'}
            onChange={handlePaymentChange}
          />
          가상계좌
        </label>
      </div>

      <button
        className="payment-button"
        onClick={handlePayment}
        disabled={!paymentMethod}
      >
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;
