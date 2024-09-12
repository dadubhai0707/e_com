import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { pathname } = useLocation();
  const isAdmin = useSelector((state) => state.auth.IsAdmin);

  if (isAdmin && pathname.startsWith('/admin')) {
    return <Outlet />;
  }
  return <Navigate to="/admin/login" />;
};

export default PrivateRoute;
