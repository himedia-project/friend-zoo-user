import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getOrderList } from '../../api/orderApi';
import '../../css/OrderPage.css';
import MySidebar from '../../components/common/MySidebar';

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
    <div className="goods-wrap">
      <h2>주문조회</h2>
      <div className="goods-containter">
        <MySidebar />
        <div className="order-list">
          {orderHistory.dtoList.length === 0 ? (
            <div className="no-orders-message">주문 내역이 아직 없습니다</div>
          ) : (
            orderHistory.dtoList.map((order) => (
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
                        <h2>
                          {item.productName.split('|').map((part, index) => (
                            <span
                              key={index}
                              className={index > 0 ? 'product-info-sub' : ''}
                            >
                              {part}
                              {index <
                                item.productName.split('|').length - 1 && (
                                <br />
                              )}
                            </span>
                          ))}
                        </h2>
                        <div className="product-purchase-info">
                          <div className="quantity">수량: {item.count}개</div>
                          <div className="price">
                            <strong>{item.orderPrice.toLocaleString()}</strong>
                            원
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
