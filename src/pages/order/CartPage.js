import React, { useEffect, useState } from 'react';
import '../../css/CartPage.css';
import CartItem from '../../components/cart/CartItem';
import { getCartItems, postChangeCart } from '../../api/cartApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const res = await getCartItems();
    const formattedItems = res.map((item) => ({
      id: item.cartItemId,
      name: item.productName,
      quantity: item.qty,
      price: item.price,
      selected: true,
      image: item.imageName,
      productId: item.productId,
      discountPrice: item.discountPrice,
    }));
    setItems(formattedItems);
  };

  useEffect(() => {
    fetchCartItems();
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

  const handleRemove = async (cartItemId, productId) => {
    const result = await Swal.fire({
      title: '상품 삭제',
      text: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    });

    if (result.isConfirmed) {
      try {
        await postChangeCart({ cartItemId, productId, qty: 0 });
        await fetchCartItems();
        Swal.fire('삭제 완료', '삭제되었습니다.', 'success');
      } catch (error) {
        Swal.fire('오류', '삭제 중 오류가 발생했습니다.', 'error');
        console.error(error);
      }
    }
  };

  const calculateTotals = () => {
    const itemTotal = items.reduce(
      (total, item) =>
        item.selected ? total + item.quantity * item.price : total,
      0,
    );
    const shippingTotal = 0; // For simplicity, we assume free shipping
    const discountTotal = 0; // Assume a fixed discount for demonstration purposes
    return { itemTotal, shippingTotal, discountTotal };
  };

  const { itemTotal, shippingTotal, discountTotal } = calculateTotals();
  const totalAmount = itemTotal + shippingTotal - discountTotal;

  const handlePurchase = () => {
    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      Swal.fire('알림', '선택된 상품이 없습니다.', 'warning');
      return;
    }

    const orderItems = selectedItems.map((item) => ({
      productId: item.productId,
      qty: item.quantity,
    }));

    navigate('/payment', { state: { orderItems } });
  };

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart">
          {items.length === 0 ? (
            <div className="empty-cart-message">
              장바구니에 담은 상품이 없습니다.
            </div>
          ) : (
            <>
              <div className="cart-header">
                <input
                  type="checkbox"
                  checked={items.every((item) => item.selected)}
                  onChange={() => {
                    const allSelected = items.every((item) => item.selected);
                    setItems(
                      items.map((item) => ({
                        ...item,
                        selected: !allSelected,
                      })),
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
            </>
          )}
        </div>
        <div className="order-summary">
          <h2>주문 예상 금액</h2>
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
              <span className="color-red">{discountTotal.toLocaleString()}원</span>
            </div>
            <hr />
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
          <button className="purchase-button" onClick={handlePurchase}>
            구매하기 (총 {items.filter((item) => item.selected).length}건)
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
