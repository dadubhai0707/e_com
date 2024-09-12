import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetail from "../../Component/Users/cartDetail";
import {orderUser} from "../../Redux-Toolkit/Admin_User/OrderSlice"
import {  toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
function AddToCart() {
    // _________________________________________________________
    // Redux-variables
    // _________________________________________________________
    const addcart = useSelector((state) => state.order.addcart);
    const product = useSelector((state) => state.product.product);
    const IsUser = useSelector((state) => state.auth.IsUser);
 const dispatch= useDispatch()
    // _________________________________________________________
    // update quntity
    // _________________________________________________________

    const [quantities, setQuantities] = useState(
        addcart.reduce((acc, val) => ({ ...acc, [val.cart_Id]: val.quntity }), {})
    );

    const updateQuantity = (cartId, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [cartId]: newQuantity,      
        }));
    };
   // _________________________________________________________
    // Count Total Quntity
    // _________________________________________________________
    const totalPrice = useMemo(() => {
        return addcart.reduce((acc, val) => {
            const selectedProduct = product.find(
                (p) => p.product_ID === val.productId && val.userId === IsUser.user_ID
            );  
            if (selectedProduct) {
                return acc + selectedProduct.Pprice * quantities[val.cart_Id];
            }
            return acc;
        }, 0);
    }, [addcart, product, IsUser, quantities]);

    // __________________________________________________________________________________________
    // orderProduct
    // _________________________________________________________________________________

    const orderProduct = () => {
        let filteredCart = addcart.filter((p) => p.userId === IsUser.user_ID);

        let userOrders = filteredCart.map(item => ({
            cart_Id: item.cart_Id,
            productId: item.productId,
            quntity: quantities[item.cart_Id],
        }));
        
        dispatch(orderUser({ userId: IsUser.user_ID, orders: userOrders,order_id:uuidv4(),  time:[{ time: new Date().toLocaleTimeString()},{ date: new Date().toISOString()},],states:"Your Order Is Pending", }));
        toast.success("Your Order Place Succesfully , Chack in May order ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            
          });
        
    };
    return (
        <div className="add-cart-container">
            <h3>Your Shopping Cart</h3>
            <hr />
            <div className="cart-detail">
                {addcart.map((val, index) => (
                    <CartDetail
                        key={index}
                        cardId={val.cart_Id}
                        userId={val.userId}
                        productId={val.productId}
                        quntity={quantities[val.cart_Id]}
                        updateQuantity={updateQuantity}
                    />
                ))}
            </div>
            <div className="total-price-container">
                <hr />
                <div className="total-price">
                    <p>Subtotal </p>
                    <div className="order-box">
                        <h3>₹{totalPrice.toLocaleString()} </h3>
                        <button className="btn addCart-btn" onClick={orderProduct}>Process To Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
