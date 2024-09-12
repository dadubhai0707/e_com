import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ListProduct({ orderId, userId }) {
    
    // _________________________________________________
    // Redux variables
    // _________________________________________________
    const users = useSelector((state) => state.auth.user);
    const orders = useSelector((state) => state.order.order);
    const products = useSelector((state) => state.product.product);


    // _________________________________________________
    // State for user and order
    // _________________________________________________
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [productMap, setProductMap] = useState(new Map());
    const navigate = useNavigate();

    // _________________________________________________
    // Fetch user details
    // _________________________________________________
    useEffect(() => {
        const foundUser = users.find((user) => user.user_ID === parseInt(userId));
        if (foundUser) setUser(foundUser);
    }, [users, userId]);

    // _________________________________________________
    // Fetch order details and product details
    // _________________________________________________
    useEffect(() => {
        const foundOrder = orders.find(
            (order) => order.userId === parseInt(userId) && order.order_id === orderId
        );
        if (foundOrder) {
            setOrder(foundOrder);

            const productMap = new Map();
            foundOrder.orders.forEach((orderItem) => {
                const product = products.find(
                    (product) => product.product_ID === orderItem.productId
                );
                if (product) {
                    productMap.set(product.product_ID, {
                        ...product,
                        quantity: (productMap.get(product.product_ID)?.quantity || 0) + orderItem.quntity
                    });
                }
            });
            setProductMap(productMap);
        }
    }, [orders, userId, orderId, products]);

    const orderLength = order?.orders?.length || 'Loading...';
    const dateStr = order?.time?.[1]?.date || ''; 
    const timeStr = order?.time?.[0]?.time || 'N/A';
    const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';
    
    // _________________________________________________
    // Calculate total price
    // _________________________________________________
    const totalPrice = Array.from(productMap.values()).reduce((total, product) => {
        return total + (product.Pprice * product.quantity);
    }, 0);

    return (
        <>
            <tr>
                <td>{orderId}</td>
                <td>{user ? `${user.Uname} ${user.Ulname}` : 'Loading...'}</td>
                <td>{orderLength}</td>
                <td>{formattedDate}</td>
                <td>{timeStr}</td>
                <td>{order?.orders[0]?.states || 'Your Order Is Pending'}</td>
                <td>{totalPrice || 'Loading...'}</td>
                <td>
                    <button
                        onClick={() => navigate(`/admin/dashboard/order/viewOrder/${userId} ${orderId} ${orderLength} ${totalPrice} `)}
                        className="btn"
                        style={{ padding: '10px 40px', background: 'var(--yellow)' }}
                    >
                        View
                    </button>
                </td>
            </tr>
        </>
    );
}

export default ListProduct;
