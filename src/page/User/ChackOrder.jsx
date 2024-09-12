import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function OrderPage() {
  // _________________________________________________________
  // All Redux-variable 
  // _________________________________________________________
  const ordersState = useSelector((state) => state.order.order);
  const user = useSelector((state) => state.auth.IsUser);
  const products = useSelector((state) => state.product.product);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (user && ordersState.length > 0) {
      const currentUserOrders = ordersState
        .filter(order => order.userId === user.user_ID)
        .flatMap(order => order.orders.map(ord => ({
          ...ord,
          order_id: order.order_id, 
          states: order.states, 
          time: order.time 
        })));
      setUserOrders(currentUserOrders);
    }
  }, [ordersState, user]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'status-confirmed';
      case 'Your Order Is Pending':
        return 'status-pending';
      case 'Cancel  led':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="order-container">
      <h2>My Orders</h2>
      <div className="order-page">
        {userOrders.length > 0 ? (
          <div className="orders-container">
            {userOrders.map((order, index) => {
              const product = products.find(p => p.product_ID === order.productId);

              if (!product) {
                return (
                  <div key={index} className="order-card">
                    <p>Product details not available.</p>
                  </div>
                );
              }

              return (
                <div key={index} className="order-card">
                  <img
                    src={product.Pimg ? `/src/assets/ProductImg/${product.Pimg}` : '/path/to/default/image.jpg'}
                    alt={product.Pname || "Product"}
                    className="product-img"
                  />
                  <div className="order-details">
                    <div className="name_Id">
                      <h3>{product.Pname}</h3>
                      <p><b>Order ID:</b> {order.order_id}</p> 
                    </div>
                    <div className="order-date-status" style={{ margin: '10px 0' }}>
                      <div className="date">
                        <p><b>Your Location:</b> {user.Uadd || 'Location not available'}</p>
                        <p><b>Order Date:</b> {order.time && order.time[1] ? new Date(order.time[1].date).toLocaleDateString() : 'Date not available'}</p>
                        <p>
                          <p className={getStatusClass(order.states)}>
                          <b>Status:</b>
                            {order.states || 'Status not available'}
                          </p>
                        </p>
                      </div>
                      <div className="price-status">
                        <p><b>Quantity:</b> {order.quntity || 'N/A'}</p>
                        <p><b>Price:</b> ₹{product.Pprice ? product.Pprice * order.quntity : 'Price not available'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
