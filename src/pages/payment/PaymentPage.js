import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postOrder, getOrderList } from '../../api/orderApi';
import { API_SERVER_HOST } from '../../config/apiConfig';
import '../../css/PaymentPage.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { paymentApi } from '../../api/paymentApi';

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
        const latestOrder = response.dtoList[0];
        setOrderData(latestOrder);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [location.state]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    const tossPayments = await loadTossPayments(
      'test_ck_OyL0qZ4G1VO4mYmDbvnroWb2MQYg',
    );

    try {
      // 결제 준비
      await paymentApi.preparePayment({
        orderId: orderData.orderCode,
        amount: orderData.totalPrice,
      });

      // 결제 금액 검증
      await paymentApi.validatePayment(
        orderData.orderCode,
        orderData.totalPrice,
      );

      // 결제 요청
      await tossPayments.requestPayment(
        paymentMethod === '간편결제' ? 'CARD' : 'VIRTUAL_ACCOUNT',
        {
          amount: orderData.totalPrice,
          orderId: orderData.orderCode,
          orderName: `${orderData.orderItems[0].productName} ${
            orderData.orderItems.length > 1
              ? `외 ${orderData.orderItems.length - 1}건`
              : ''
          }`,
          customerName: orderData.name,
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
        },
      );
    } catch (error) {
      console.error('결제 요청 실패:', error);
      alert('결제 요청이 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!orderData) return;

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
            paymentMethod === '간편결제' ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            value="간편결제"
            checked={paymentMethod === '간편결제'}
            onChange={handlePaymentChange}
          />
          간편결제
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
