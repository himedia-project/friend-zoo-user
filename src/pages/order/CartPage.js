import React, { useEffect, useState } from 'react';
import '../../css/CartPage.css';
import CartItem from '../../components/cart/CartItem';
import { getCartItems } from '../../api/cartApi';

const initState = {
  items: [],
  itemTotal: 0,
  shippingTotal: 0,
  discountTotal: 0,
  totalAmount: 0,
};

const CartPage = () => {
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     name: '무언',
  //     option: '빨강',
  //     quantity: 1,
  //     price: 7900,
  //     selected: true,
  //     image: cartImage1,
  //   },
  //   {
  //     id: 2,
  //     name: '무언',
  //     option: '파랑',
  //     quantity: 1,
  //     price: 7900,
  //     selected: true,
  //     image: cartImage2,
  //   },
  //   {
  //     id: 3,
  //     name: '무언',
  //     option: '노랑',
  //     quantity: 1,
  //     price: 7900,
  //     selected: true,
  //     image: cartImage3,
  //   },
  // ]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    getCartItems().then((res) => {
      console.log(res);
      setItems(res);
    });
  }, []);

  const handleQuantityChange = (id, action) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else if (action === 'toggleSelect') {
            return { ...item, selected: !item.selected };
          }
        }
        return item;
      }),
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const itemTotal = items.reduce(
      (total, item) =>
        item.selected ? total + item.quantity * item.price : total,
      0,
    );
    const shippingTotal = 0; // For simplicity, we assume free shipping
    const discountTotal = 5600; // Assume a fixed discount for demonstration purposes
    return { itemTotal, shippingTotal, discountTotal };
  };

  const { itemTotal, shippingTotal, discountTotal } = calculateTotals();
  const totalAmount = itemTotal + shippingTotal - discountTotal;

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <div className="cart-header">
          <input
            type="checkbox"
            checked={items.every((item) => item.selected)}
            onChange={() => {
              const allSelected = items.every((item) => item.selected);
              setItems(
                items.map((item) => ({ ...item, selected: !allSelected })),
              );
            }}
          />
          <span>전체 선택</span>
        </div>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <div className="order-summary">
        <h2>주문정보</h2>
        <div className="order-details">
          <div className="order-item">
            <span>총 물품금액</span>
            <span>{itemTotal.toLocaleString()}원</span>
          </div>
          <div className="order-item">
            <span>총 배송비</span>
            <span>{shippingTotal.toLocaleString()}원</span>
          </div>
          <div className="order-item discount">
            <span>총 할인금액</span>
            <span class="color-red">{discountTotal.toLocaleString()}원</span>
          </div>
          <hr></hr>
          <div className="order-total">
            <span>총 금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <ul className="order-notes">
          <li>장바구니에 담긴 상품은 일년간 보관합니다.</li>
          <li>쿠폰 및 포인트는 주문 결제 페이지에서 적용 가능합니다.</li>
          <li>판매 종료한 상품은 자동 삭제됩니다.</li>
          <li>환불 시 쿠폰 및 포인트 사용에 제한이 있을 수 있습니다.</li>
          <li>도서산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
        </ul>
        <button className="purchase-button">구매하기 (총 1건)</button>
      </div>
    </div>
  );
};

export default CartPage;
