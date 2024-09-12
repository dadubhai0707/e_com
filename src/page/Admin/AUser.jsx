import { useSelector } from "react-redux"
import Aheader from "../../Component/Common/Aheader"

function AUser() {
  const user = useSelector((state)=>state.auth.user)
  return (
    <>
    <div className="header">
       <Aheader name={'List User'}/>
    </div>
    <div className="display-users">
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>User Addresh</th>
            <th>Pin Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
          user.map((user,index)=>(
            <tr  key={index}>
              <td>{user.user_ID}</td>
              <td>{user.Uname} {user.Ulname}</td>
              <td>{user.Uphone}</td>
              <td>{user.Uemail}</td>
              <td>{user.Uadd}</td>
              <td>{user.Upin}</td>
              <td>
                <button className="btn deshbord-header-btn">Edit</button>
                <button className="btn deshbord-header-btn">Delete</button>
              </td>
            </tr>
          ))
         }
        </tbody>
      </table>
      
    </div>
    </div>
    </>
  )
}

export default AUser
