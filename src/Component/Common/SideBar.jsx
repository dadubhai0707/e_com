import {NavLink} from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { MdCategory } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
function SideBar() {
  return (
    <>
     <h1>Admin-panel</h1>
     <hr style={{width:'100%'}} />
      <nav>
        <ul>
        <NavLink to={'/admin/dashboard/home'}><li><RxDashboard/> Dashboard</li></NavLink>
        <NavLink to={'/admin/dashboard/category'}> <li><MdCategory/>Add category</li></NavLink>
        <NavLink to={'/admin/dashboard/subcategory'}><li><MdOutlineCategory/>Add subcategory</li></NavLink>
        <NavLink to={'/admin/dashboard/product'}><li><MdProductionQuantityLimits/>List product</li></NavLink>
        <NavLink to={'/admin/dashboard/order'}><li><MdBorderColor/> Order</li></NavLink>
        <NavLink to={'/admin/dashboard/user'}> <li><FaUserFriends/> View User</li></NavLink>
        </ul>
      </nav>
    </>
  )
}

export default SideBar