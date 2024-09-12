import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';  // Import Yup for validation
import { AddProduct } from '../../Redux-Toolkit/Admin_User/productSlice'; // Assume this is your action to add a product
import { toast } from 'react-toastify';

const AdProduct = () => {
  // ___________________________________
  // Redux variables
  // ___________________________________
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.category);
  const subcategories = useSelector((state) => state.product.subcategory);
  const data = useSelector((state) => state.product.product);
  // ___________________________________
  // Validation schema using Yup
  // ___________________________________

  const validationSchema = Yup.object({
    Pname: Yup.string().required('Product Name is required'),
    Pimg: Yup.mixed().required('Product Image is required'),
    Pcolor: Yup.string().required('Please select a color'),
    Pprice: Yup.number().required('Price is required').positive('Price must be a positive number'),
    Pqut: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Please select a category'),
    subCatId: Yup.string().required('Please select a subcategory'),
  });

  // ___________________________________
  // Formik setup
  // ___________________________________
  const formik = useFormik({
    initialValues: {
      Pname: '',
      Pimg: null,
      Pcolor: '',
      Pprice: '',
      Pqut: '',
      description: '',
      category: '',
      subCatId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let newProduct = {
        product_ID: data.length + 1,
        subCatId: parseInt(values.subCatId),
        Pname: values.Pname,
        Pimg: values.Pimg ? values.Pimg.name : '',
        Pcolor: values.Pcolor,
        Pprice: values.Pprice,
        Pqut: values.Pqut,
        description: values.description,
        dateAdded: new Date().toISOString(),
      };
      console.log(newProduct);
      dispatch(AddProduct(newProduct));
      toast.success("Product Added successfully ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      formik.resetForm();
    }
  });

  // ___________________________________
  // Filter subcategories based on selected category
  // ___________________________________
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.catId === parseInt(formik.values.category)
  );

  return (
    <div className="admin-add-product-form">
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="Pname"
            placeholder="Enter Product Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Pname}
          />
          <span>  {formik.touched.Pname && formik.errors.Pname ? (
            <div className="error">{formik.errors.Pname}</div>
          ) : null}
          </span>
        </label>

        <label>
          Category:
          <select
            name="category"
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
          <span>    {formik.touched.category && formik.errors.category ? (
            <div className="error">{formik.errors.category}</div>
          ) : null}
          </span>
        </label>

        {formik.values.category && (
          <label>
            Subcategory:
            <select
              name="subCatId"
              value={formik.values.subCatId || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>Select a subcategory</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <span> {formik.touched.subCatId && formik.errors.subCatId ? (
              <div className="error">{formik.errors.subCatId}</div>
            ) : null}
            </span>
          </label>
        )}

        <label>
          Image:
          <input
            type="file"
            name="Pimg"
            onChange={(event) => {
              formik.setFieldValue("Pimg", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          <span>
            {formik.touched.Pimg && formik.errors.Pimg ? (
              <div className="error">{formik.errors.Pimg}</div>
            ) : null}
          </span>
        </label>

        <label>
          Color:
          <select
            name="Pcolor"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Pcolor}
          >
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Brown">Brown</option>
            <option value="Silver">Silver</option>
            <option value="Multi-color">Multi-color</option>
          </select>
          <span>
            {formik.touched.Pcolor && formik.errors.Pcolor ? (
              <div className="error">{formik.errors.Pcolor}</div>
            ) : null}
          </span>
        </label>

        <label>
          Price:
          <input
            type="number"
            name="Pprice"
            placeholder="Enter Product Price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Pprice}
          />
          <span>
            {formik.touched.Pprice && formik.errors.Pprice ? (
              <div className="error">{formik.errors.Pprice}</div>
            ) : null}
          </span>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="Pqut"
            placeholder="Enter Product Total Available Quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Pqut}
          />
          <span>
            {formik.touched.Pqut && formik.errors.Pqut ? (
              <div className="error">{formik.errors.Pqut}</div>
            ) : null}
          </span>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            placeholder="Write Some Text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          <span>
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </span>
        </label>

        <button type="submit" className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default AdProduct;
