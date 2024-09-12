import * as Yup from 'yup';

// Define the validation schema for user registration
export const RegisterSchema = Yup.object({
  name: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  gender: Yup.string().required('Gender is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().required('Address is required'),
});
// src/Schemas/LoginSchema.js

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});



