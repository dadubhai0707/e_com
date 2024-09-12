import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { catgoryValidate } from './Schemas/ProductValidate'; // Assuming you have validation schema
import { editCategory, AddCate } from '../../Redux-Toolkit/Admin_User/productSlice';
import Aheader from '../Common/Aheader';
import {  toast } from 'react-toastify';


function ACatForm() {
  // _____________________
  // Redux-vrb
  // _____________________
  const { catid } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.category);
  // ___________________________________
  // Chack is Edit Moede or not
  // ___________________________________
  
  const isEditMode = !!catid;
  const [initialValues, setInitialValues] = useState({ Cname: '', Description: '' });

  useEffect(() => {
    if (isEditMode) {
      const cat = categories.find(cat => cat.id === parseInt(catid));
      if (cat) {
        setInitialValues({ Cname: cat.name, Description: cat.description });
      }
    }
  }, [catid, categories, isEditMode]);
// __________________________________________________-
// Formik
// __________________________________________________-
  const formik = useFormik({
    initialValues,
    validationSchema: catgoryValidate,
    enableReinitialize: true, 
    onSubmit: (values, actions) => {
      if (isEditMode) {
        const updatedCategory = {
          id: parseInt(catid),
          name: values.Cname,
          description: values.Description,
        };
        dispatch(editCategory(updatedCategory));
        toast.success("Category updated successfulley ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const newCategory = {
          id: categories.length + 1, 
          name: values.Cname,
          description: values.Description,
        };
        dispatch(AddCate(newCategory));
        toast.success("Category added successfully.", {
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
      actions.resetForm();
      navigate('/admin/dashboard/category'); 
    }
  });

  return (
    <div>
      <div className="header">
        <Aheader name={isEditMode ? "Edit Category" : "Add Category"} />
      </div>
      <div className="Add-form">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              id="Cname"
              placeholder="Enter Category Name"
              name="Cname"
              value={formik.values.Cname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.Cname && formik.touched.Cname && <span className='error'>{formik.errors.Cname}</span>}
          </div>
          <div>
            <input
              type="text"
              id="Description"
              placeholder="Description"
              name="Description"
              value={formik.values.Description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.Description && formik.touched.Description && <span className='error'>{formik.errors.Description}</span>}
          </div>
          <button type='submit' className="btn add-cat-btn">
            {isEditMode ? 'Update Category' : 'Save Category'}
          </button>
          <button type='button' onClick={() => navigate('/admin/dashboard/category')} className="btn btn-add-Category">
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default ACatForm;
