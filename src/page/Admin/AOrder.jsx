import ListProduct from "../../Component/Admin/ListProduct";
import Aheader from "../../Component/Common/Aheader";
import { useSelector } from 'react-redux';

function AOrder() {
  const orders = useSelector((state) => state.order.order);
 
  return (
    <>
      <div className="header">
        <Aheader name={'order'} />
      </div>
      <div className="ordera-containr-admin">
        <div className="order_table">
          <h4  style={{margin:'10px'}}>Total orders: {orders.map((userOrder) => userOrder.orders).length}</h4>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Order Time</th>
                <th>Status</th>
                <th>Price</th>  
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.flatMap((userOrder,index) =>
                   <ListProduct key={index}
                   orderId={userOrder.order_id}
                   userId={userOrder.userId}
                   />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AOrder;
