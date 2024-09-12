import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../Redux-Toolkit/Admin_User/authSlice';
import Aheader from '../../Component/Common/Aheader';
import { toast } from 'react-toastify';


// _______________________________________
// Validation schema using Yup
// _______________________________________
const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.IsAdmin);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (admin && admin.adminPassword === values.currentPassword) {
        dispatch(updatePassword({ id: admin.admin_ID, newPassword: values.newPassword }));
        console.log('Password changed successfully');
        toast.success("Password changed successfully ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        });
        resetForm();
        navigate('/admin/dashboard/'); 
      } else {
        toast.error("Current password is incorrect ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        });
      }
    },
  });

  return (
    <div>
      <div className="header">
        <Aheader name={"Change Password"} />
      </div>
      <div className="Add-form">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              {...formik.getFieldProps('currentPassword')}
            />
            <span> {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="error">{formik.errors.currentPassword}</div>
            ) : null}
            </span>
          </div>

          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              {...formik.getFieldProps('newPassword')}
            />
            <span>  {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error">{formik.errors.newPassword}</div>
            ) : null}
            </span>
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
            />
            <span>  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
            </span>
          </div>

          <button type="submit" className='btn add-cat-btn'>Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;