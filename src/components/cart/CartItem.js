const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onQuantityChange(item.id, 'toggleSelect')}
      />
      <img src={item.image} alt={item.name} className="item-image" />
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
        <button>바로구매</button>
        <button onClick={() => onRemove(item.id)}>구매취소</button>
      </div>
    </div>
  );
};

export default CartItem;
