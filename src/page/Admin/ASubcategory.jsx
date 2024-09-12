import { useState } from "react";
import Aheader from "../../Component/Common/Aheader";
import { useDispatch, useSelector } from 'react-redux';

import {deleteSubCat} from "../../Redux-Toolkit/Admin_User/productSlice"
import { useNavigate } from "react-router-dom";

function SubCategory() {
  // __________________________________________________________--
  // All Redux And Route Variable
  // __________________________________________________________--
  let navigate= useNavigate()
 const dispatch=useDispatch()
 const subcategory = useSelector((state) => state.product.subcategory);
 const category = useSelector((state) => state.product.category);
 let reversedData = [...subcategory].reverse(); 

 const [currentPage, setCurrentPage] = useState(1);
 const rowsPerPage = 4;
 const indexOfLastRow = currentPage * rowsPerPage;
 const indexOfFirstRow = indexOfLastRow - rowsPerPage;
 const currentRows = reversedData.slice(indexOfFirstRow, indexOfLastRow);
 const totalPages = Math.ceil(subcategory.length / rowsPerPage);

 const handleNextPage = () => {
   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // ___________________________
  // Add Categroy
  // ___________________________
  let addCategroy=()=>{
    navigate("/admin/dashboard/subcategory/addsubcat")
  }
  // _______________________________________
  // Function to get the category name by id
  // _______________________________________
  const getCategoryNameById = (catId) => {
    const cat = category.find(cat => cat.id === catId);
    return cat ? cat.name : "Unknown";
  };
  
  // _______________________________________
  // Request Toi Edit Category
  // _______________________________________
let editSubCategory=(id)=>{
    navigate(`/admin/dashboard/subcategory/editsubcat/${id}`)
}
  // _______________________________________
  // Delete Category
  // _______________________________________

let deleteSubcate=(id)=>{
  dispatch(deleteSubCat(id))
}
  return (
    <>
      <div className="header">
        <Aheader name={"SubCategory"} />
      </div>

      <button className="btn btn-add-Category" onClick={addCategroy}>Add Category</button>
      <div className="cat-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{getCategoryNameById(row.catId)}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>
                <button className="btn deshbord-header-btn" onClick={()=>editSubCategory(row.id)}>Edit</button>
                  <button className="btn deshbord-header-btn" onClick={()=>deleteSubcate(row.id)}>Delete</button>
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
    </>
  );
}

export default SubCategory;
