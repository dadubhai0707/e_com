import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { UpdateUser } from '../../Redux-Toolkit/Admin_User/authSlice'; // Adjust the import path as needed

function UpdateLocation() {
  
  const dispatch = useDispatch();
  const addresh = useSelector((state) => state.auth.IsUser);
  // _____________________________________________
  // previous  Data Set 
  // _____________________________________________
  const formik = useFormik({
    initialValues: {
      country: addresh.Uadd.split(" - ")[0] || '',
      state: addresh.Uadd.split(" - ")[2] || '',
      city: addresh.Uadd.split(" - ")[1] || '',
      address: addresh.Uadd.split(" - ")[3] || '',
      Upin: addresh.Upin || '',
      Uemail: addresh.Uemail || '', 
    },
    validationSchema: Yup.object({
      country: Yup.string().required('Country is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      address: Yup.string().required('Address is required'),
      Upin: Yup.string().required('Pin Number is required').matches(/^\d+$/, 'Pin Number must be a number'),
    }),
    onSubmit: (values) => {
      dispatch(UpdateUser({
        Uemail: values.Uemail, 
        Uadd: `${values.country} - ${values.city} - ${values.state} - ${values.address}`,
        Upin: values.Upin
      }));
      toast.success("Successfully updated address!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <label>
          Country
          <select
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
          </select>
          {formik.touched.country && formik.errors.country ? <div>{formik.errors.country}</div> : null}
        </label>

        <label>
          State
          <select
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          >
            <option value="">Select State</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
          {formik.touched.state && formik.errors.state ? <div>{formik.errors.state}</div> : null}
        </label>

        <label>
          City
          <select
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          >
            <option value="">Select City</option>
            <option value="Ahamdabad">Ahamdabad</option>
            <option value="Mehshana">Mehshana</option>
            <option value="Jodhpur">Jodhpur</option>
          </select>
          {formik.touched.city && formik.errors.city ? <div>{formik.errors.city}</div> : null}
        </label>

        <label>
          Address
          <textarea
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
        </label>

        <label>
          Pin Number    
          <input
            type="tel"
            name="Upin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Upin}
          />
          {formik.touched.Upin && formik.errors.Upin ? <div>{formik.errors.Upin}</div> : null}
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateLocation;
