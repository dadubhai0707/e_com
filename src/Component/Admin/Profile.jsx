import { useNavigate } from "react-router-dom"
function Profile() {
  const navigate = useNavigate()
  let changePassword=()=>{
   navigate('/admin/dashboard/editpassword')
  }
  return (
    <>
         <div className="admin-profile-container">
            <div className="name-email">
                 <h3>Sanjay Suthar</h3>
                 <p>Sanjay@gmail.com</p>
            </div>
            <div className="button">
                <button className="btn deshbord-header-btn admin-p-change-pass" onClick={changePassword}>Change Password</button>
                <button className="btn deshbord-header-btn admin-p-delete-pass">Delete Account</button>
            </div>
        </div>      
    </>
  )
}

export default Profile
