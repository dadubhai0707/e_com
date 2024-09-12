import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ALoginForm from './page/authForm/Adminlogin';
import LoginForm from './page/authForm/Login';
import RegisterForm from './page/authForm/Register';
import PrivateRoute from './Component/Common/Deshbord';
import Deshbord from './page/Admin/AdminDeshbord';
import Home from './page/User/Home';
import './App.css';
import AHome from './page/Admin/AHome';
import ACategory from './page/Admin/ACategory';
import ASubcategory from './page/Admin/ASubcategory';
import AOrder from './page/Admin/AOrder';
import AProduct from './page/Admin/AProduct';
import AUser from './page/Admin/AUser';
import AboutProduct from './Component/Users/AboutProduct';
import AddToCart from './page/User/AddToCart';
import ChackOrder from './page/User/ChackOrder';
import ViewOrder from './Component/Admin/ViewOrder';
import PrivateRoute2 from './Component/Common/Udeshbord';
import User_Profile from './page/User/Profile';
import MyAccount from './page/User/MyAcount';
import EditProduct from './Component/Admin/AEditProduct';
import UpdateLocation from './page/User/UpdateLocation';
import ACatForm from './Component/Admin/ACatForm';
import ASCatForm from './Component/Admin/ASCatform';
import ChangePassword from './page/Admin/ChangePassword';
import Category from './page/Admin/Category.jsx';
import SubCatrgoryMain from './page/Admin/SubCatrgory';
import Order from './page/Admin/Order';
import ScrollToTop from './Component/Common/Scrool'; 
function App() {
  return (
    <BrowserRouter>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/user/home" />} />
        {/* _________________________________________ */}
        {/* Public routes */}
        {/* _________________________________________ */}

        <Route path="admin/login" element={<ALoginForm />} />
        <Route path="user/login" element={<LoginForm />} />
        <Route path="user/register" element={<RegisterForm />} />
        {/* _________________________________________ */}
        {/* Admin protected routes */}
        {/* _________________________________________ */}
        <Route element={<PrivateRoute />}>
          <Route path="admin/dashboard" element={<Deshbord />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<AHome />} />
            <Route path="editpassword" element={<ChangePassword />} />

            <Route path="category" element={<Category />} >
              <Route index element={<ACategory />} />
              <Route path="editCategory/:catid" element={<ACatForm />} />
              <Route path="ACatForm" element={<ACatForm />} />
            </Route>
            <Route path="subcategory" element={<SubCatrgoryMain />} >
              <Route index element={<ASubcategory />} />
              <Route path="addsubcat" element={<ASCatForm />} />
              <Route path="editsubcat/:subcatid" element={<ASCatForm />} />
            </Route>
            <Route path="product" element={<AProduct />} />
            <Route path="editProduct/:productID" element={<EditProduct />} />
            <Route path="order" element={<Order />} >
              <Route index element={<AOrder />} />
              <Route path="viewOrder/:orderId" element={<ViewOrder />} />
            </Route>
            <Route path="user" element={<AUser />} />0
          </Route>
        </Route>

        {/* _________________________________________ */}
        {/* User protected routes */}
        {/* _________________________________________ */}
        <Route element={<PrivateRoute2 />}>
          <Route path="user/home" element={<Home />} />
          <Route path="user/products/:productId" element={<AboutProduct />} />
          <Route path="user/addCart" element={<AddToCart />} />
          <Route path="user/order" element={<ChackOrder />} />
          <Route path="user/profile" element={<User_Profile />} />
          <Route path="user/myaccount" element={<MyAccount />} />
          <Route path="user/uplocation" element={<UpdateLocation />} />
        </Route>
        {/* _________________________________________ */}
        {/* Catch-all route for 404 */}
        {/* _________________________________________ */}
        <Route path="*" element={<h1>Not Found 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
