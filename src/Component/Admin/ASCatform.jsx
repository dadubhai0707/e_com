import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { SubcatgoryValidate } from './Schemas/ProductValidate';
import { AddSubCate, editSubCat } from '../../Redux-Toolkit/Admin_User/productSlice';
import Aheader from '../Common/Aheader';
import { toast } from "react-toastify";

function ASCatForm() {
  const { subcatid } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.category);
  const subcategories = useSelector((state) => state.product.subcategory);
  
  const isEditMode = !!subcatid;
  const [initialValues, setInitialValues] = useState({
    category: '',
    name: '',
    description: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const subcat = subcategories.find(cat => cat.id === parseInt(subcatid));
      if (subcat) {
        setInitialValues({
          category: subcat.catId,
          name: subcat.name,
          description: subcat.description
        });
      }
    }
  }, [subcatid, subcategories, isEditMode]);

  const formik = useFormik({
    initialValues,
    validationSchema: SubcatgoryValidate,
    enableReinitialize: true, 
    onSubmit: (values, actions) => {
      if (isEditMode) {
        // Edit existing subcategory
        const updatedSubCategory = {
          id: parseInt(subcatid), 
          catId: parseInt(values.category),
          name: values.name,
          description: values.description
        };
        dispatch(editSubCat(updatedSubCategory));
        toast.success("Subcategory edited successfully.", {
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
        // Add new subcategory
        const newSubCategory = {
          id: subcategories.length + 1,
          catId: parseInt(values.category),
          name: values.name,
          description: values.description
        };
        dispatch(AddSubCate(newSubCategory));
        toast.success("Subcategory added successfully.", {
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
      navigate('/admin/dashboard/subcategory'); // Navigate back to the subcategory list
    }
  });

  return (
    <div>
      <div className="header">
        <Aheader name={isEditMode ? "Edit SubCategory" : "Add SubCategory"} />
      </div>
      <div className="Add-form">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <select
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.errors.category && formik.touched.category && <span className='error'>{formik.errors.category}</span>}
          </div>

          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Subcategory Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && <span className='error'>{formik.errors.name}</span>}
          </div>

          <div>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && formik.touched.description && <span className='error'>{formik.errors.description}</span>}
          </div>

          <button type="submit" className="btn add-cat-btn">
            {isEditMode ? 'Update SubCategory' : 'Save SubCategory'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/subcategory')} className="btn btn-add-Category">
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default ASCatForm;
