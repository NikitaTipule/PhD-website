import React, { Component } from "react";
import Helmet from 'react-helmet'
import logo from "./logo_trans.png"
import "./Nsvbar.css"

class NavBar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <Helmet>
                    <title>COEP - PhD admission Portal</title>
                    <meta name="title" content="COEP PhD Admission Portal"></meta>
                </Helmet>
                <h1 className="navbar-logo">
                    <a href="#">
                        <img
                            src = {logo}
                            alt = "logo"
                            style = {{width: '60px', height: '70px'}}
                        >
                        </img>
                    </a>
                </h1>
                <div>
                    <h1>PhD Admission Portal - College of Engineering, Pune</h1>
                </div>

            </nav>
        );
    }
}

export default NavBar;