import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addcart } from '../../Redux-Toolkit/Admin_User/OrderSlice';
import { addReview } from '../../Redux-Toolkit/Admin_User/productSlice'
import { useFormik } from 'formik';

import Rating from '@mui/material/Rating';
import { Star } from '@mui/icons-material';

function AboutProduct() {
    // ______________________________________
    // All Redux-variable 
    // ______________________________________
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let productReview = useSelector((state) => state.product.productReview)
    let cartDetail = useSelector((state) => state.order.addcart);
    const { productId } = useParams();
    const products = useSelector((state) => state.product.product);
    const IsUser = useSelector((state) => state.auth.IsUser);
    const user = useSelector((state) => state.auth.user);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const productFilter = products.find((data) => data.product_ID === parseInt(productId, 10));
        setProduct(productFilter || null);

        // _________________________________________________________
        // Set similar products based on product type or category
        // _________________________________________________________
        if (productFilter) {
            const filteredProducts = products.filter((item) => item.subCatId === productFilter.subCatId && item.product_ID !== productFilter.product_ID);
            setSimilarProducts(filteredProducts);
        }



    }, [products, productId]);

    // ______________________________________
    // Increment Decrement Product
    // ______________________________________
    const handleIncrement = () => {
        if (quantity === product.Pqut) {
            toast.warn("This product is limited in stock. You cannot buy more than this!", {
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
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // ______________________________________
    // Add To Cart Product
    // ______________________________________
    let AddToCart = (pid, uid) => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let dates = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let addToCart = {
            cart_Id: cartDetail.length + 1,
            userId: uid,
            productId: pid,
            isGift: false,
            quntity: quantity,
            date: `${dates}-${month}-${year}`,
            time: `${hours}:${minutes}`,
        };

        toast.success("Successfully added to cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        dispatch(addcart(addToCart));
        navigate('/user/addCart');
    };
    // _________________________________________________
    // Rating  & Review Product 
    // _________________________________________________

    // const [rating, setRating] = useState(0);
    const [rating, setValue] = useState(2);

    const formik = useFormik({
        initialValues: {
            reviewText: '',
        },

        onSubmit: (values, { resetForm }) => {
            resetForm();
            toast.success("Review submitted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            const review = {
                product_ID: productId,
                IsUser: IsUser.user_ID,
                review: values.reviewText,
                star: rating,
                currentTime: formattedDate, 
            }
            dispatch(addReview(review))
        },
    });
    // _______________________________________
    // Set Review
    // _______________________________________
    const [filteredReviews, setFilteredReviews] = useState([]);

    useEffect(() => {
        const reviewsForProduct = productReview.filter((review) => review.product_ID === productId);
        
        const reviewsWithUser = reviewsForProduct.map((review) => {
            const userForReview = user.find((u) => u.user_ID === review.IsUser);
            const userName = userForReview 
                ? `${userForReview.Uname} ${userForReview.Ulname}` 
                : 'Unknown User';
            return {
                ...review,
                userName: userName,
               
            };
        });
        setFilteredReviews(reviewsWithUser);
    }, [productId, productReview, user]);
    
    return (
        <div className="product-container">
            <div className="product-details">
                <div className="product-image">
                    {product && <img src={`/src/assets/ProductImg/${product.Pimg}`} alt={product.Pname} />}
                </div>
                <div className="product-info">
                    <h1>{product ? product.Pname : 'Product Not Found'}</h1>
                    {product && (
                        <>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> ₹{product.Pprice}</p>
                            <p><strong>Color:</strong> {product.Pcolor}</p>
                            <div className="quantity-container">
                                <p><strong>Quantity:</strong></p>
                                <div className="quantity-controls">
                                    <button className="btn btn-quantity" onClick={handleDecrement}>-</button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button className="btn btn-quantity" onClick={handleIncrement}>+</button>
                                </div>
                            </div>
                            <p><strong>Date Added:</strong> {new Date(product.dateAdded).toLocaleDateString()}</p>
                            <div className="product-actions">
                                <button className="btn btn-primary" onClick={() => AddToCart(product.product_ID, IsUser.user_ID)}>Add to Cart</button>
                            </div>
                        </>
                    )}

                    <div className="product-reviews">
                        <h2> Reviews</h2>
                            <Rating
                                name="simple-controlled"
                                icon={<Star fontSize="inherit" style={{ color: 'blue' }} />}
                                value={rating}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />  

                            <form onSubmit={formik.handleSubmit}>
                                <textarea
                                    name="reviewText"
                                    placeholder="Write your review here..."
                                    rows="4"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                                    onChange={formik.handleChange}  // Formik's handleChange
                                    onBlur={formik.handleBlur}      // Formik's handleBlur
                                    value={formik.values.reviewText} // Formik's value binding
                                />
                                {formik.touched.reviewText && formik.errors.reviewText ? (
                                    <div style={{ color: 'red' }}>{formik.errors.reviewText}</div>
                                ) : null}
                                <button className="btn btn-primary" type="submit">Submit Review</button>
                            </form>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="similar-products" >
                <h2>Similar Products</h2>
                <div className="similar-products-list">
                    {similarProducts.map((item) => (
                        <div key={item.product_ID} className="similar-product-item" onClick={() => navigate(`/user/products/${item.product_ID}`)}>
                            <img src={`/src/assets/ProductImg/${item.Pimg}`} alt={item.Pname} />
                            <p>{item.Pname}</p>
                            <p>₹{item.Pprice}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Reviews Section */}
            <div className="product-reviews">
                <h2>User Reviews</h2>

                {filteredReviews.length > 0 ? (
                    <ul>
                        {filteredReviews.map((review) => (
                            <li key={review.id} className="review-item">
                                <div className="review-author">
                                    {review.userName}
                                </div>
                                <div className="review-text">
                                    {review.review}
                                    <span className="rating">Rating: {review.star}/5</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
}

export default AboutProduct;
