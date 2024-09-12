// src/LoginForm.jsx
import { useFormik } from 'formik';
import './Login.css';
import { Link } from 'react-router-dom';
import { UserLogin, RemoveMessage } from '../../Redux-Toolkit/Admin_User/authSlice'
import { LoginSchema } from './Schemas';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
// UserLogin
const LoginForm = () => {
  // ______________________________________________________________
  // redux-variabls 
  // ______________________________________________________________
  let dispatch = useDispatch();
  let message = useSelector((state) => state.auth.message)
  let user = useSelector((state) => state.auth.user)
  let navigate = useNavigate()
  console.log(user)
  // ______________________________________________________________
  // Initialize Formik
  // ______________________________________________________________
  const[messages,setMessage]=useState(message)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
    
      dispatch(UserLogin(values))
      navigate('/user/home')
      setTimeout(() => {
        dispatch(RemoveMessage())
      }, 3000)
      resetForm();
    },
  });

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </span>
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </span>
        </label>
        <div className="form-footer">
          <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="register-link-container">
        <span>{`Don't`} have an account?</span>
        <Link to="/user/register" className="register-link">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;