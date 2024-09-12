import { Navigate ,Link} from "react-router-dom"
import React from 'react'


const Box = ({name,total,description,btnName,navigate}) => {
  return (
   <div className="box">
   <div className="name">
      <h3>{name}</h3>
   </div>      
   <div className="Number">
      <p>{total}</p>
   </div>
   <div className="description">
       <p>{description}</p>
   </div>
   <div className="buttons">
      <button className="btn box-button"> <Link to={navigate}>{btnName}</Link> </button>
      
   </div>
</div>
  )
}

export default Box

