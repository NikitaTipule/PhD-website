import React from "react";
// import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import "../CSS/sidebar.css";

function Sidebar({ user }) {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          if (val.user === user) {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  if (val.title === "Logout") {
                    localStorage.clear();
                    window.location.pathname = val.link;
                  }
                  // if(val.title == "Download Form"){

                  // }
                  else {
                    window.location.pathname = val.link;
                  }
                }}
              >
                {" "}
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">{val.title}</div>
                {/* <div id="title">{val.title == "Download Form" ? <PDFDownloadLink style={{paddingLeft: "0px", textAlign: "left",}} document={<MyDoc />} fileName="Application.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form') }
    </PDFDownloadLink> : val.title}</div> */}
              </li>
            );
          } else if (
            val.user === "Admin" &&
            user === "Coordinator" &&
            val.title === "Back"
          ) {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  if (val.title === "Logout") {
                    localStorage.clear();
                    window.location.pathname = val.link;
                  }
                  // if(val.title == "Download Form"){

                  // }
                  else {
                    window.location.pathname = val.link;
                  }
                }}
              >
                {" "}
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">{val.title}</div>
                {/* <div id="title">{val.title == "Download Form" ? <PDFDownloadLink style={{paddingLeft: "0px", textAlign: "left",}} document={<MyDoc />} fileName="Application.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Form') }
    </PDFDownloadLink> : val.title}</div> */}
              </li>
            );
          } else if (user === "Coordinator" && val.title === "Back") {
          } else {
            return <></>;
          }
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
