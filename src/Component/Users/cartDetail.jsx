import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { addcart, removeItem } from "../../Redux-Toolkit/Admin_User/OrderSlice"; // Adjust the import path
import {  toast } from 'react-toastify';


function CartDetail({ cardId, userId, productId, quntity, updateQuantity }) {
    // _________________________________________________________________
    // Redux-variable
    // _________________________________________________________________
    const product = useSelector((state) => state.product.product);
    const IsUser = useSelector((state) => state.auth.IsUser);
    const dispatch = useDispatch();

    const selectedProduct = product.find(
        (val) => val.product_ID === productId && IsUser?.user_ID === userId
    );
    // _________________________________________________________________
    // Increment An d Decrement  Quntity
    // _________________________________________________________________
    const handleIncrement = () => {
        if (quntity >= selectedProduct.Pqut) {
            toast.warn("those  product only left. You cannot buy more than this! ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                  });

            return;
        }
        dispatch(addcart({
            cart_Id: cardId,
            userId,
            productId,
            quntity: 1, 
            isGift: false,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }));
        updateQuantity(cardId, quntity + 1);
    };

    const handleDecrement = () => {
        if (quntity === 1) {
            dispatch(removeItem({ userId, productId }));
            return;
        }
        dispatch(addcart({ cart_Id: cardId, userId, productId, quntity: -1, isGift: false, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }));
       
        updateQuantity(cardId, quntity - 1);
    };

    // ______________________________________________________________________-
    // Remove Cart From Cart
    // ______________________________________________________________________-
    const handleRemove = () => {
        dispatch(removeItem({ userId, productId }));
    };

    if (!selectedProduct) {
        return null;
    }

    return (
        <div className="addcart">
            <div className="img-display">
                <img src={`/src/assets/ProductImg/${selectedProduct.Pimg}`} alt={selectedProduct.Pname} />
            </div>
            <div className="product_description">
                <div className="name-price">
                    <h2>{selectedProduct.Pname}</h2>
                    <h4>₹{selectedProduct.Pprice * quntity}</h4>
                </div>
                <div className="other-detail">
                    <div className="stock-gift">
                        <p>&nbsp;In Stock</p>
                        <FormControlLabel
                            control={<Checkbox name="option1" color="primary" />}
                            label="This will be a gift"
                        />
                    </div>
                    <p className="color"><b>Color</b>: {selectedProduct.Pcolor}</p>
                    <div className="quantity-controls">
                        <button className="btn-quantity" onClick={handleDecrement}>-</button>
                        <span className="quantity-value">{quntity}</span>
                        <button className="btn-quantity" onClick={handleIncrement}>+</button>
                    </div>
                    <button className="btn addCart-btn" onClick={handleRemove}>Remove</button>
                </div>
            </div>
        </div>
    );
}

CartDetail.propTypes = {
    cardId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    quntity: PropTypes.number.isRequired,
    updateQuantity: PropTypes.func.isRequired,
};

export default CartDetail;
