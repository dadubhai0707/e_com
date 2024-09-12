// src/RegisterForm.jsx
import { useFormik } from 'formik';
import './Register.css';
import { Link } from 'react-router-dom';
import { RegisterSchema } from './Schemas';
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../Redux-Toolkit/Admin_User/authSlice'
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  // ______________________________________________________________
  // redux-variabls 
  // ______________________________________________________________
  let dispatch = useDispatch();
  let navigate = useNavigate()
  let user = useSelector((state) => state.auth.user)
  // ______________________________________________________________
  // Initialize Formik
  // ______________________________________________________________
  const formik = useFormik({
    initialValues: {
      name: '',
      lname: '',
      password: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      gender: '',
      address: '',
      Upin:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let newUser = {
        user_ID: user.length + 1,
        Uname: values.name,
        Ulname: values.lname,
        Uphone: values.phone,
        Uemail: values.email,
        Upassword: values.password,
        Uadd: `${values.country} - ${values.city} - ${values.state} - ${values.address}`,
        Upin:values.Upin,
      }
      console.log(user)
      dispatch(Register(newUser))
      navigate('/user/login')
    },
  });

  return (
    <div className="register-form-container">
      <h2>Create account On Ananta</h2>
      <form onSubmit={formik.handleSubmit} className="register-form"> 
        <label>
          First Name
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span>  {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}</span>
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lname"
            value={formik.values.lname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span>  {formik.touched.lname && formik.errors.lname ? <div className="error">{formik.errors.lname}</div> : null}</span>
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span> {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}</span>
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span> {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}</span>
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
          <span> {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}</span>
        </label>
        <label>
          Gender
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span> {formik.touched.gender && formik.errors.gender ? <div className="error">{formik.errors.gender}</div> : null}</span>
        </label>
        <label>
          Country
          <select
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select country</option>
            <option value="India">India</option>
          </select>
          <span>  {formik.touched.country && formik.errors.country ? <div className="error">{formik.errors.country}</div> : null}</span>
        </label>

        <label>
          State
          <select
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select state</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
          <span>  {formik.touched.state && formik.errors.state ? <div className="error">{formik.errors.state}</div> : null}</span>
        </label>
        <label>
          City
          <select
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select city</option>
            <option value="Ahamdabad">Ahamdabad</option>
            <option value="Mehshana">Mehshana</option>
            <option value="jodhpur">jodhpur</option>
          </select>
          <span>  {formik.touched.city && formik.errors.city ? <div className="error">{formik.errors.city}</div> : null}</span>
        </label>
        <label>
          Address
          <textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          ></textarea>
          <span> {formik.touched.address && formik.errors.address ? <div className="error">{formik.errors.address}</div> : null}</span>
        </label>
        <label>
          Pin Number
          <input
            type="tel"
            name="Upin"
            value={formik.values.Upin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span> {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}</span>
        </label>
        <button type="submit">Register</button>
        <span style={{ textAlign: 'center' }}>
          Do You Have An Account? <Link to={'/user/login'}>LOGIN</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
