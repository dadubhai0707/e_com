import  { useState } from 'react';
import { useSelector } from 'react-redux';


const MyAccount = () => {
    const IsUser = useSelector((state) => state.auth.IsUser);
    console.log(IsUser)
    const [user, setUser] = useState({
        email: 'johndoe@example.com',
        phone: '+1234567890',
        address: '1234 Street, City, Country',
        paymentMethods: [
            { type: 'Credit Card', last4: '1234' },
            { type: 'PayPal', email: 'johndoe@paypal.com' },
        ],
        orders: [
            { id: '123', date: '2023-07-01', total: '$150.00', status: 'Delivered' },
            { id: '124', date: '2023-07-15', total: '$250.00', status: 'Shipped' },
        ],
    });

    return (
        <div>
        <div className="account-container">
            <div className="account-section">
                <h2 className="section-title">Personal Information</h2>
                <div className="section-content">
                    <p><strong>Email:</strong> {IsUser.Uemail}</p>
                    <p><strong>Phone:</strong> {IsUser.Uphone}</p>
                    <p><strong>Address:</strong> {IsUser.Uadd}</p>
                    <p><strong>Address:</strong> {IsUser.Upin}</p>
                </div>
            </div>
            <div className="account-section">
                <h2 className="section-title">Payment Methods</h2>
                <ul className="payment-methods">
                        <li  className="payment-method">
                            <strong>Credit Card:</strong>{ `**** **** **** 1234` } <br />
                            <strong>PayPal:</strong>{ IsUser.Uemail.split("@")[0]+"@paypal.com"}
                        </li>
                </ul>
            </div>
            <div className="account-section">
                <h2 className="section-title">Order History</h2>
                <ul className="order-history">
                    {user.orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                            <p><strong>Total:</strong> {order.total}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
};

export default MyAccount;
