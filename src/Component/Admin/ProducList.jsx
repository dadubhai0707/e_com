import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {deleteProduct} from "../../Redux-Toolkit/Admin_User/productSlice"


function ProducList() {
  // ___________________________________________________________
  //Redux Variable
  // ___________________________________________________________
  const products = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  let  dispatch = useDispatch();
  // ________________________________________________________
  // Pagination
  // ________________________________________________________
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  let reversedData = [...products].reverse(); 

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reversedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Color</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((product) => (
            <tr key={product.product_ID}>
              <td>{product.product_ID}</td>
              <td>{product.Pname}</td>
              <td>
              <img src={`/src/assets/ProductImg/${product.Pimg}`} alt="Product Image" width="60" height="40" />
              </td>
              <td>{product.Pcolor}</td>
              <td>₹{product.Pprice}</td>
              <td>{product.Pqut}</td>
              <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
              <td>
                <button className="btn deshbord-header-btn" onClick={() => navigate(`/admin/dashboard/editProduct/${product.product_ID} `)}>Edit</button>
                <button className="btn deshbord-header-btn" onClick={()=> dispatch(deleteProduct(product.product_ID))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProducList;
