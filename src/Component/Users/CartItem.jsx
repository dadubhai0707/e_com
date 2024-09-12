// src/components/CartItem.jsx

const CartItem = ({ product }) => {
  return (
    <div className="cart-item">
      <img src={product.Pimg} alt={product.Pname} className="product-image" />
      <div className="product-details">
        <h4>{product.Pname}</h4>
        <p>{product.description}</p>
        <span className="product-price">${product.Pprice}</span>
        <div className="product-quantity">
          Quantity: 
          <select>
            {[...Array(product.Pqut).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <button className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;

