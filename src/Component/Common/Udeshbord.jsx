import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UserSideBar from '../Users/SideBar';
import Footer from './Footer';

const PrivateRoute2 = () => {
  const { pathname } = useLocation();
  const isUser = useSelector((state) => state.auth.IsUser);



  if (isUser && pathname.startsWith('/user')) {
    return <>
      <div className="nav_bar">
        <UserSideBar />
      </div>
        <Outlet />
        <Footer/>
    </>;
  }

  return <Navigate to="/user/login" />;
};

export default PrivateRoute2;
