import  { useState } from "react";
import Aheader from "../../Component/Common/Aheader";
import { useSelector ,useDispatch} from "react-redux";
import { deleteCategory } from "../../Redux-Toolkit/Admin_User/productSlice";
import { useNavigate } from "react-router-dom";

function ACategory() {
  // _______________________________________--
  // All Variable
  // _______________________________________--
  let navigate= useNavigate()
  let data=useSelector((state)=>state.product.category)
  let dispatch=useDispatch()
  // ________________________________________________-
  // pagination 
  // ________________________________________________-
  let reversedData = [...data].reverse(); 

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reversedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  let deleteCatagroy=(id)=>{
    dispatch(deleteCategory(id));
  }
  let addCategroy=()=>{
    navigate("/admin/dashboard/category/ACatForm");
  }
  let editCategory=(id)=>{
    navigate(`/admin/dashboard/category/editCategory/${id}`);

  }
  return (
    <>
      <div className="header">
        <Aheader name={"Category"} />
      </div>
        <button className="btn btn-add-Category" onClick={addCategroy}>Add Category</button>
      <div className="cat-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>
                  <button className="btn deshbord-header-btn" onClick={()=>editCategory(row.id)}>Edit</button>
                  <button className="btn deshbord-header-btn" onClick={()=>deleteCatagroy(row.id)}>Delete</button>
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

export default ACategory;
