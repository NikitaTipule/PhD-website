import { Button } from "@material-ui/core"
import React, { Component } from "react";
import Helmet from 'react-helmet'
import logo from "./logo_trans.png"
import { useHistory } from "react-router-dom";
import "./Nsvbar.css"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        
        if (this.loggedIn) {
            localStorage.removeItem("token");
            this.props.history.push("/");
        }
        this.setState(prevState => {
            return {
                loggedIn: !prevState.loggedIn
            }
        })
        
    }

    //logout functionality remaining


    render() {
        let btnTxt = this.state.loggedIn ? "Logout" : "Login" 
        return (
            <nav className="NavbarItems" style={{width: "100%"}}>
                <Helmet>
                    <title>COEP - PhD admission Portal</title>
                    <meta name="title" content="COEP PhD Admission Portal"></meta>
                </Helmet>
                {/* <h1 className="navbar-logo">
                    <a href="#">
                        <img
                            src = {logo}
                            alt = "logo"
                            style = {{width: '60px', height: '70px'}}
                        >
                        </img>
                    </a>
                </h1>
                <div className="NavbarText">
                    <h1>PhD Admission Portal - College of Engineering, Pune</h1>
                </div>
                <div className="loginLogout">
                    <h3>
                        <Button color="light" onClick={this.toggle}>{btnTxt}</Button>
                    </h3>
                </div> */}
                
                <ul>
                <li><a href="/">
                        <img
                            src = {logo}
                            alt = "logo"
                            style = {{width: '60px', height: '70px'}}
                        >
                        </img>
                    </a></li>
                <li><a href="/"><p>PhD Admission Portal - College of Engineering, Pune</p></a></li>
                    <li style={{ float: "right", marginRight: '10px' }}>
                        <div>
                            <h3>
                                <Button color="light" onClick={this.toggle}>{btnTxt}</Button>
                            </h3>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;