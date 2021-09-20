import { Button } from "@material-ui/core"
import React, { Component } from "react";
import Helmet from 'react-helmet'
import logo from "./logo_trans.png"
import "./Nsvbar.css"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState(prevState => {
            return {
                loggedIn: !prevState.loggedIn
            }
        });
    
    }
    render() {
        let btnTxt = this.state.loggedIn ? "Logout" : "Login" 
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
                {/* <div style={{display: "flex", alignContent:'end', justifyContent: 'right'}}>
                    <h3>
                        <Button color="light" onClick={this.toggle}>{btnTxt}</Button>
                    </h3>
                </div> */}
            </nav>
        );
    }
}

export default NavBar;