import { React } from "react";
import Helmet from "react-helmet";
import logo from "./logo_trans.png";

import "./Nsvbar.css";

export default function NavBar(props) {
  return (
    <nav className="NavbarItems" style={{ width: "100%" }}>
      <Helmet>
        <title>COEP - PhD admission Portal</title>
        <meta name="title" content="COEP PhD Admission Portal"></meta>
      </Helmet>

      <ul className="ul-class">
        <li className="li-class">
          <a href="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "70px" }}
            ></img>
          </a>
        </li>
        <li className="li-class">
          <a href="/">
            <h1 id="big-screen">
              PhD Admission Portal - College of Engineering, Pune
            </h1>
            <h1 id="small-screen">PhD Admission Portal - COEP</h1>
          </a>
        </li>
      </ul>
    </nav>
  );
}
