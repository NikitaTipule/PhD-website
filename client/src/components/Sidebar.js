import React from "react"
import {SidebarData} from './SidebarData'
import '../CSS/sidebar.css'

function Sidebar({user}){
  return (
   <div className="Sidebar">
    <ul className="SidebarList">
     {SidebarData.map((val,key)=>{
      if(val.user == user){
        return(
          <li key={key} className="row" onClick={()=>{
            if(val.title == "Logout"){
              localStorage.clear();
              window.location.pathname = val.link
            }
            else{
              window.location.pathname = val.link
            }
          }}>
          {" "}
          <div id="icon">{val.icon}</div>{" "}
          <div id="title">{val.title}</div>
          </li>
        )
      }
      else{
        return
      }
     })}
    </ul>
   </div>
  )
}

export default Sidebar;