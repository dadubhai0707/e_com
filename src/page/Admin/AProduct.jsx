import { useState } from "react"
import Aheader from "../../Component/Common/Aheader"
import AdProduct from "../../Component/Admin/AdProduct"
import ProducList from "../../Component/Admin/ProducList"

function AProduct() {
  // ________________________________
  // normal Variable
  // ________________________________
  let [render,setrender]= useState(false)
  // ____________________________
  // Togale form and Table
  // ____________________________

  return (
    <>
    <div className="header">
       <Aheader name={'product'}/>
    </div>
    <div className="Admin-table-form-container">
        <div className="buttons">
          <button className="btn" onClick={()=>setrender(!render)}>   {render?'View Product': 'Add Product'}</button>
        </div>
        <div className="table-form">
          {render?<AdProduct/>: <ProducList/>}
        </div>
    </div>
    </>
  )
}

export default AProduct
