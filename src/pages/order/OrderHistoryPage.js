import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderList } from '../../api/orderApi';
import '../../css/OrderPage.css';

import { API_SERVER_HOST } from '../../config/apiConfig';

const OrderHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState({ dtoList: [] });

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await getOrderList();
        setOrderHistory(data);
      } catch (error) {
        console.error('주문 내역 조회 실패:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history-container">
      <h2>주문 내역</h2>
      <div className="order-list">
        {orderHistory.dtoList.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>주문번호: {order.orderCode || order.orderId}</h3>
                <span className="order-date">
                  {new Date(order.orderDate).toLocaleString()}
                </span>
                <span
                  className={`order-status ${order.orderStatus.toLowerCase()}`}
                >
                  {order.orderStatus === 'ORDER' ? '주문중' : '취소'}
                </span>
              </div>
              <div className="order-total">
                <strong>{order.totalPrice.toLocaleString()}원</strong>
              </div>
            </div>
            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="product"
                  onClick={() => handleItemClick(item.productId)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`${API_SERVER_HOST}/api/product/view/${item.imgUrl}`}
                    alt={item.productName}
                  />
                  <div className="product-details">
                    <h2>{item.productName}</h2>
                    <p>수량: {item.count}개</p>
                    <p className="price">
                      {item.orderPrice.toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
