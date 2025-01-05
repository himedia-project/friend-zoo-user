import { API_SERVER_HOST } from '../../config/apiConfig';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  console.log('item', item);
  return (
    <div className="cart-item">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onQuantityChange(item.id, 'toggleSelect')}
      />
      <img
        src={`${API_SERVER_HOST}/api/product/view/${item.image}`}
        alt={item.name}
        className="item-image"
      />
      <div className="item-info">
        <div className="item-name">{item.name}</div>
        <div className="item-option">옵션: {item.option}</div>
        <button className="btnNone">옵션변경</button>
      </div>
      <div className="item-quantity">
        <button onClick={() => onQuantityChange(item.id, 'decrease')}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 'increase')}>+</button>
      </div>
      <div className="item-price">{item.quantity * item.price}원</div>
      <div className="item-shipping">무료</div>
      <div className="item-actions">
        <button onClick={() => onRemove(item.id, item.productId)}>삭제</button>
      </div>
    </div>
  );
};

export default CartItem;
