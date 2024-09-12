import SideBar from "../../Component/Common/SideBar"
import { Outlet } from 'react-router-dom';
import './css/main.css'
function Deshbord() {
  return (
    <>
      <section>
        <div className="admin-container">
          <div className="admin-sidevbar-container">
          <SideBar/>
          </div>
          <div className="deshbord-container">
          <Outlet />
          </div>
        </div>
      </section>
    </> 
  )
}
export default Deshbord