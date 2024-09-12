import { FeaturedVideo } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    // _________________________________________________________
    // All Redux-toolkit 
    // _________________________________________________________
    const IsUser = useSelector((state) => state.auth.IsUser) || {};

    const favorites = useSelector((state) => state.product.favorites) || [];
    const productReview = useSelector((state) => state.product.productReview) || [];
    const products = useSelector((state) => state.product.product) || [];
    const navigate = useNavigate()
    const userFavorites = favorites.filter(fav => fav.userId === IsUser.user_ID) || [];


    const favoriteProducts = userFavorites.map(fav =>
        products.find(product => product.product_ID === fav.productId)
    ).filter(product => product) || [];

    const [filteredReviews, setFilteredReviews] = useState([]);
    useEffect(() => {
        const reviewsForProduct = productReview.filter((review) => review.IsUser === IsUser.user_ID);
        const setreview = reviewsForProduct.map((review) => {
            const product = products.find((product) => product.product_ID == review.product_ID)
            return {
                ...review,
                products: product.Pname,
                productsimg: product.Pimg,
            };
        })
        setFilteredReviews(setreview)
    }, [])
    console.log(filteredReviews)

    // __________________________________________________________
    // Pagination
    // __________________________________________________
    // Pagination states for wishlist and reviews
    const [wishlistPage, setWishlistPage] = useState(1);
    const [reviewsPage, setReviewsPage] = useState(1);
    const itemsPerPage = 2;

    // Calculate paginated data
    const paginatedWishlist = favoriteProducts.slice((wishlistPage - 1) * itemsPerPage, wishlistPage * itemsPerPage);
    const paginatedReviews = filteredReviews.slice((reviewsPage - 1) * itemsPerPage, reviewsPage * itemsPerPage);

    // Pagination control functions
    const handleWishlistNext = () => setWishlistPage(wishlistPage + 1);
    const handleWishlistPrev = () => setWishlistPage(wishlistPage - 1);
    const handleReviewsNext = () => setReviewsPage(reviewsPage + 1);
    const handleReviewsPrev = () => setReviewsPage(reviewsPage - 1);
    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <img src={IsUser.profilePicture} alt={`${IsUser.Uname}'s profile`} className="profile-picture" />
                <div className="profile-info">
                    <h1 className="profile-name">{IsUser.Uname} {IsUser.Ulname}</h1>
                    <p className="profile-username">@{IsUser.Uname}</p>
                    <p className="profile-bio">{IsUser.bio}</p>
                </div>
            </div>

            {/* Wishlist Section */}
            <div className="profile-section">
                <h2 className="wishlist-title">Wishlist</h2>
                <ul className="favorite-products">
                    {paginatedWishlist.length > 0 ? (
                        paginatedWishlist.map((product, index) => (
                            product ? (
                                <li key={index} className="favorite-product-item" onClick={() => navigate(`/user/products/${product.product_ID}`)}>
                                    <img src={`/src/assets/ProductImg/${product.Pimg}`} alt={product.Pname} className="favorite-product-image" />
                                    <div className="favorite-product-info">
                                        <h3 className="favorite-product-name">{product.Pname}</h3>
                                        <p className="favorite-product-price">${product.Pprice}</p>
                                    </div>
                                </li>
                            ) : null
                        ))
                    ) : (
                        <p>No favorite products found.</p>
                    )}
                </ul>
                {/* Wishlist Pagination Controls */}
                <div className="pagination-controls">
                    {wishlistPage > 1 && <button className="btn  profile-nect-btn" onClick={handleWishlistPrev}>Previous</button>}
                    {wishlistPage < Math.ceil(favoriteProducts.length / itemsPerPage) && <button className="btn  profile-nect-btn" onClick={handleWishlistNext}>Next</button>}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="profile-section">
                <h2>Reviews</h2>
                <ul className="favorite-products">
                    {paginatedReviews.length > 0 ? (
                        paginatedReviews.map((product, index) => (
                            product ? (
                                <li key={index} className="favorite-product-item" onClick={() => navigate(`/user/products/${product.product_ID}`)}>
                                    <img src={`/src/assets/ProductImg/${product.productsimg}`} alt={product.products} className="favorite-product-image" />
                                    <div>
                                        <div className="favorite-product-info">
                                            <h3 className="favorite-product-name">{product.products}</h3>
                                            <p className="favorite-product-price">{product.review}</p>
                                        </div>
                                        <p className="review-date">{new Date(product.currentTime).toLocaleDateString()}</p>
                                        <p className="review-date">{new Date(product.currentTime).toLocaleTimeString()}</p>
                                    </div>
                                </li>
                            ) : null
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </ul>
                {/* Reviews Pagination Controls */}
                <div className="pagination-controls">
                    {reviewsPage > 1 && <button className="btn  profile-nect-btn" onClick={handleReviewsPrev}>Previous</button>}
                    {reviewsPage < Math.ceil(filteredReviews.length / itemsPerPage) && <button className="btn  profile-nect-btn"  onClick={handleReviewsNext}>Next</button>}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
