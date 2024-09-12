import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {confirmOrder,cancelOrder} from '../../Redux-Toolkit/Admin_User/OrderSlice'
import { toast } from 'react-toastify';
import {updateProductQuantity} from '../../Redux-Toolkit/Admin_User/productSlice'
function ViewOrder() {
    const { orderId } = useParams();
    const[statuOrdershow , setstatuOrdershow]=useState(false)
    let [userId, orderNumber, orderLength, totalPrice] = orderId.split(" "); 
    const [currentProductIndex, setCurrentProductIndex] = useState(0); 

    const orders = useSelector((state) => state.order.order);
    const users = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state.product.product);
    const  dispatch = useDispatch();

    
    // _______________________________________________________________________
    // Find the user's orders for the specified userId
    // _______________________________________________________________________
    const findUserOrders = orders?.find((userOrder) => userOrder.userId === parseInt(userId) && userOrder.order_id === orderNumber);
    const specificOrders = findUserOrders?.orders || [];
    // ____________________________
    // Track Order Status
    // ____________________________
    console.log(findUserOrders)

    useEffect(() => {

            // Ensure that orderToConfirm has data before searching
            if(findUserOrders.states=== 'Confirmed'){
                setstatuOrdershow(true)
            }
            else if(findUserOrders.states==='Order Delivered'){
                setstatuOrdershow(true)
            }else if(findUserOrders.states==='Cancelled'){
                setstatuOrdershow(true)
            }
        
    }, [findUserOrders, orderNumber]); 
    

    const getStatusClass = (status) => {
        console.log(status)
        switch (status) {
          case 'Confirmed':
            return 'status-confirmed';
          case 'Your Order Is Pending':
            return 'status-pending';
          case 'Cancelled':
            return 'status-cancelled';
          default:
            return '';
        }
      };
    
    // _______________________________________________________________________
    // Find the current product based on the index
    // _______________________________________________________________________
    const currentOrder = specificOrders[currentProductIndex];
    const findProduct = currentOrder
        ? products.find((product) => product.product_ID === parseInt(currentOrder.productId))
        : null;
    const findUser = users?.find((user) => user.user_ID === parseInt(userId));
    if (!findUser || !currentOrder || !findProduct) {
        return <p>No order found</p>;
    }
    console.log(findUserOrders.states)
    // ____________________________________
    // Handle Procees Order
    // ____________________________________
    const handleProcessOrder = (orderId, productId, quantity,status) => {
        console.log(status)
            dispatch(updateProductQuantity({ productId, quantity }));
            console.log(productId,quantity)
            dispatch(confirmOrder(orderId));
    };

    // _______________________________________________________________________
    // Heandle Paginations
    // _______________________________________________________________________
    const handleNextProduct = () => {
        if (currentProductIndex < specificOrders.length - 1) {
            setCurrentProductIndex(currentProductIndex + 1);
        }
    };

    const handlePreviousProduct = () => {
        if (currentProductIndex > 0) {
            setCurrentProductIndex(currentProductIndex - 1);
        }
    };
// __________________________
// Cencel Order 
// __________________________
const handleCancelOrder = (orderId) => {
    if(findUserOrders.states==='Cancelled'){
    dispatch(cancelOrder(orderId));
    toast.warn(`Order ${orderId} cancelled.`);
        setstatuOrdershow(false)
    }else{
        toast.error(`Your Not cancelled`);
    }
};


    const date = findUserOrders.time ? new Date(findUserOrders.time[1]?.date || '') : null;
    const formattedDate = date ? date.toLocaleDateString() : 'N/A';
    const time = findUserOrders.time[0].time || 'N/A' ;
    return (
        <div className='order-display-list-container'>
            <h3 style={{ color: "black" }}>User Detail -</h3>
            <hr />
            <br />
            <div className="user_detail">
                <div className="u-name-id">
                    <p><b>User Id:</b> {findUser.user_ID}</p>
                    <p><b>User Name:</b> {findUser.Uname} {findUser.Ulname}</p>
                </div>
                <div className="u-email-phone">
                    <p><b>User Phone:</b> {findUser.Uphone}</p>
                    <p><b>User Email:</b> {findUser.Uemail}</p>
                </div>
                <div className="u-add-pin">
                    <p><b>User Location:</b> {findUser.Uadd}</p>
                    <p><b>User Pin:</b> {findUser.Upin}</p>
                </div>
            </div>
            <br />
            <hr />
            <h3 style={{ color: "black" }}>Order Details -</h3>
            <hr />
            <br />  
            <div className='order-detail'>
                <div className="product_detais_order">
                    <div className="order_img imgs">
                        <img src={`/src/assets/ProductImg/${findProduct.Pimg}`} alt={findProduct.Pname} />
                    </div>
                    <div className="detail">
                        <h2>{findProduct.Pname}</h2>
                        <p><b>Color:</b> {findProduct.Pcolor}</p>
                        <p><b>Product Price:</b> {findProduct.Pprice}</p>
                        <p><b>Quantity:</b> {currentOrder.quntity}</p>
                    </div>
                </div>
                <br />
                <hr />
                <div className="Order-detail">
                    <div className="detail">
                        <p><b>Order Date:</b> {formattedDate}</p>
                        <p><b>Order Time:</b> {time}</p>
                        <p className={getStatusClass(findUserOrders.states)}><b>Status:</b> {findUserOrders.states}</p>
                    </div>
                    <div className="buttons">
                        <p><b>No Of Order:</b> {orderLength}</p>
                        <p><b>Total Price:</b>{totalPrice}</p>
                        <button className='btn order_btn' onClick={() => handleProcessOrder(findUserOrders.order_id, currentOrder.productId, currentOrder.quntity,statuOrdershow? 'checkout order': 'confirmed Order')}>
                            {statuOrdershow? 'checkout order': 'confirmed Order'}
                            </button>
                        <button className='btn cancel_order_btn' onClick={() => handleCancelOrder(findUserOrders.order_id)}>Cancel Order</button>
                    </div>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className='btn' onClick={handlePreviousProduct} disabled={currentProductIndex === 0}>
                    Previous
                </button>
                <button className='btn' onClick={handleNextProduct} disabled={currentProductIndex === specificOrders.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ViewOrder;
