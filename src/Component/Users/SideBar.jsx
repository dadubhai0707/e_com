import { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownFilter, filterBysearch } from '../../Redux-Toolkit/Admin_User/productSlice';
import { LogoutUser } from '../../Redux-Toolkit/Admin_User/authSlice';
import { toast } from 'react-toastify';
import { FaOpencart } from 'react-icons/fa';

function UserSideBar() {
    // ___________________________________
    // Redux-toolkit variables
    // ___________________________________
    const category = useSelector((state) => state.product.category);
    const subcategory = useSelector((state) => state.product.subcategory);
    const order = useSelector((state) => state.order.order);
    let addcart = useSelector((state) => state.order.addcart);
    let user = useSelector((state) => state.auth.IsUser);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    // ______________________________________________________________________________
    // Select SubCategory
    // ______________________________________________________________________________
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCat, setSubcat] = useState([]);

    useEffect(() => {
        if (selectedCategory !== '') {
            let a = subcategory.filter((data) => data.catId === Number(selectedCategory));
            setSubcat(a);
        } else {
            setSubcat([]);
        }
    }, [selectedCategory, subcategory]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        if (value === "all") {
            setSubcat([]);
            dispatch(DropDownFilter(null));
        }
    };

    // ___________________________________
    // Toggle User Profile
    // ___________________________________
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (url) => {
        setAnchorEl(null);
        if (url === 'logout') {
            dispatch(LogoutUser());
            toast.error("Logged out successfully");
        } else {
            navigate(url);
        }
    };

    // ___________________________________
    // Check How much added To cart
    // ___________________________________
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
        const userCartItems = addcart.filter((item) => item.userId === user.user_ID);
        setTotalCart(userCartItems.length);
    }, [user, addcart]);

    // ___________________________________
    // Select Category
    // ___________________________________
    const GetSubDetail = (e) => {
        const value = e.target.value;
        if (value === "all") {
            dispatch(DropDownFilter(null));
        } else {
            dispatch(DropDownFilter(value));
        }
    };

    // ________________________________
    // Filter By Search
    // ________________________________
    const FilterBySearch = (e) => {
        dispatch(filterBysearch(e.target.value));
    };

    // ___________________________________
    // Find Total length Order
    // ___________________________________
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        const userOrders = order.filter(order => order.userId === user.user_ID);
        const ordersLength = userOrders.reduce((acc, curr) => acc + curr.orders.length, 0);
        setTotalOrder(ordersLength);
    }, [order, user]);

    // ___________________________________________________
    // Scroll-static
    // ___________________________________________________

    const [isFixed, setIsFixed] = useState(false);
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop > (documentHeight - windowHeight) * 0.1) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`top-user-heaader ${isFixed && 'fixed'}`}  >
                <div className="logo-name" onClick={() => navigate('/user/home')}>
                    <img src="\images\ananta-removebg-preview (1) (1).png" alt="Logo" />
                </div>

                <div className="location">
                    <p className="addresh">Delivering To {user.Uadd.split(" - ")[3]} {user.Upin}</p>
                    <Link to={'/user/uplocation'}>Update Location</Link>
                </div>

                <div className="search-product">
                    <select id="dropdown" className="selectCatagroy" name="category" value={selectedCategory} onChange={handleChange}>
                        <option value="all">all</option>
                        {category.length > 0 ? (
                            category.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="all">No categories available</option>
                        )}
                    </select>

                    <select id="dropdown" className="selectCatagroy" name="subcategory" onChange={GetSubDetail}>
                        <option value="all">all</option>
                        {subCat.length > 0 ? (
                            subCat.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="all">Please Select Category</option>
                        )}
                    </select>
                    <input type="text" placeholder="search_product" onChange={FilterBySearch} />
                </div>
                <div className="may-order-cart">
                  
                </div>
                <div className="profile">
                        <div className="buy cart-order" onClick={() => navigate('user/addCart')}>
                            <span className='cart-count'>{totalCart}</span>
                            <span className='icon'>
                                <FaOpencart />
                            </span>
                        </div>
                    <IconButton
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        className="user-profile-icon"
                    >
                        <MdAccountCircle     className='Maicon'  />
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => handleClose('user/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleClose('user/myaccount')}>My Account</MenuItem>
                        <MenuItem onClick={() => handleClose('user/order')}>My Order</MenuItem>
                        <MenuItem onClick={() => handleClose('logout')}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>

        </>
    );
}

export default UserSideBar;
