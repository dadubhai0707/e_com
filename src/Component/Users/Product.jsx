import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Importing both icons
import { toggleFavorite } from '../../Redux-Toolkit/Admin_User/productSlice'; // Importing the toggleFavorite action

function Product() {
    // _____________________________________________________________
    // All Redux-variable
    // _____________________________________________________________
    const product = useSelector((state) => state.product.product);
    const searchWhithDropDown = useSelector((state) => state.product.searchWhithDropDown);
    const searchWhithInput = useSelector((state) => state.product.searchWhithInput);
    const favorites = useSelector((state) => state.product.favorites); // Get favorite products from Redux state
    const isUser = useSelector((state) => state.auth.IsUser);
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState(product);

    let navigate = useNavigate();

    const ShowProduct = (id) => {
        navigate(`/user/products/${id}`);
    }

    // _____________________________________________________________
    // Search by DropDown
    // _____________________________________________________________
    useEffect(() => {
        if (searchWhithDropDown) {
            let filteredProducts = product.filter((val) => val.subCatId === Number(searchWhithDropDown));
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(product);
        }
    }, [searchWhithDropDown, product]);

    // _____________________________________________________________
    // Search by Input
    // _____________________________________________________________
    useEffect(() => {
        if (searchWhithInput) {
            let filteredProducts = product.filter((val) => val.Pname.toLowerCase().includes(searchWhithInput.toLowerCase()));
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(product);
        }
    }, [searchWhithInput, product]);

    // _____________________________________________________________
    // Handle favorite toggle
    // _____________________________________________________________
    const handleFavoriteToggle = (productId, userId) => {
        dispatch(toggleFavorite({ productId, uid: userId.user_ID })); // Dispatch the toggleFavorite action
    }
    

    // _____________________________________________________________
    // Check if a product is a favorite for the current user
    // _____________________________________________________________
    const isFavorite = (productId) => {
        return favorites.some(fav => fav.productId === productId && fav.userId === isUser.user_ID);
    }

    return (
        <div className="user-cards-container">
        {filteredProducts.map((data, index) => (
            <div className="card" key={index}>
                <div onClick={() => ShowProduct(data.product_ID)}>
                    <div className="img">
                        <img
                            src={`/images/${data.Pimg}`}
                            alt={`${data.Pname} image`}
                        />
                    </div>
                    <div className="name">{data.Pname}</div>
                    <div className="descriptions">
                        <p className="price">₹{data.Pprice}<sup>00</sup></p>
                        <p><strong>Description:</strong> {data.description}</p>
                    </div>
                </div>
                {/* Favorite button */}
                {isFavorite(data.product_ID) ? (
                    <AiFillHeart className="love_button" onClick={() => handleFavoriteToggle(data.product_ID, isUser)} />
                ) : (
                    <AiOutlineHeart className="love_button" onClick={() => handleFavoriteToggle(data.product_ID, isUser)} />
                )}
            </div>
        ))}
    </div>
);
}

export default Product;
