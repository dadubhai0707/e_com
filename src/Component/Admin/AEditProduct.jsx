import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editProduct } from '../../Redux-Toolkit/Admin_User/productSlice'; // Your action to edit a product
import Aheader from '../Common/Aheader';
import {  toast } from 'react-toastify';


const EditProduct = () => {
  // ___________________________________
    // Get the product ID from the route params
  // ___________________________________
    const { productID } = useParams();
    let navigate = useNavigate();

  // ___________________________________
    // Redux variables
  // ___________________________________
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.category);
    const subcategories = useSelector((state) => state.product.subcategory);
    const data = useSelector((state) => state.product.product);

  // ___________________________________
    // Find the product by ID
  // ___________________________________
    const productToEdit = data.find((product) => product.product_ID === parseInt(productID));

  // ___________________________________
    // Formik setup
  // ___________________________________
    const formik = useFormik({
        initialValues: {
            Pname: productToEdit?.Pname || '',
            Pimg: '', 
            Pcolor: productToEdit?.Pcolor || '',
            Pprice: productToEdit?.Pprice || '',
            Pqut: productToEdit?.Pqut || '',
            description: productToEdit?.description || '',
            category: productToEdit?.category || '',
            subCatId: productToEdit?.subCatId || null,
        },  
        enableReinitialize: true, 
        onSubmit: (values) => {
            let updatedProduct = {
                ...productToEdit,
                subCatId: parseInt(values.subCatId),
                Pname: values.Pname,
                Pimg: values.Pimg ? values.Pimg.name : productToEdit.Pimg, 
                Pcolor: values.Pcolor,
                Pprice: values.Pprice,
                Pqut: values.Pqut,
                description: values.description,
                dateAdded: productToEdit.dateAdded 
            };
            dispatch(editProduct(updatedProduct));
            toast.success("Product edited successfully. ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            navigate('/admin/dashboard/product');
        }
    });

    // __________________________________________________
    // Handle image preview
    // __________________________________________________
    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("Pimg", file);
    };

    // __________________________________________________
    // Filter Subcategories based on selected category
    // __________________________________________________
    const filteredSubcategories = subcategories.filter(
        (sub) => sub.catId === parseInt(formik.values.category)
    );

    const existingImageUrl = productToEdit?.Pimg ? `/src/assets/ProductImg/${productToEdit.Pimg}` : '';

    return (
        <>
            <div className="header">
                <Aheader name={'Edit Product'} />
            </div>
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
                    </label>

                    <label>
                        Category:
                        <select
                            name="category"
                            value={formik.values.category}
                            onChange={(event) => {
                                formik.handleChange(event);
                                formik.setFieldValue("subCatId", null); // Reset subcategory when category changes
                            }}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {formik.values.category && (
                        <label>
                            Subcategory:
                            <select
                                name="subCatId"
                                value={formik.values.subCatId || ""}
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
                        </label>
                    )}

                    <label>
                        Image:
                        {existingImageUrl && (
                            <div className="image-preview">
                                <img src={existingImageUrl} alt="Product" width="100" />
                            </div>
                        )}
                        <input
                            type="file"
                            name="Pimg"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                        />
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
                    </label>

                    <button type="submit" className="btn" >Update Product</button>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
