import React from "react"
import {SidebarData} from './SidebarData'
import '../CSS/sidebar.css'

function Sidebar(){
  return (
   <div className="Sidebar">
    <ul className="SidebarList">
     {SidebarData.map((val,key)=>{
      return(
       <li key={key} className="row" onClick={()=>{}}>
        {" "}
       <div id="icon">{val.icon}</div>{" "}
       <div id="title">{val.title}</div>
       </li>
      )
     })}
    </ul>
   </div>
  )
}

export default Sidebar;