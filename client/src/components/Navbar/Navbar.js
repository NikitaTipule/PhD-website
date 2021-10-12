import { Button } from "@material-ui/core"
import { React, useState, useEffect } from "react";
import Helmet from 'react-helmet'
import logo from "./logo_trans.png"
import { useHistory } from "react-router-dom";
import { Route } from 'react-router-dom'

import "./Nsvbar.css"


export default function NavBar(props) {
    let history = useHistory();
    const [loggedIn, setLoggedIn] = useState(props.loggedin)

    useEffect(() => {
        if (localStorage.getItem("phd-website-jwt")) {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
    });

    const toggle = (event) => {
        if (loggedIn) {
            localStorage.removeItem("phd-website-jwt");
            history.push("/");
            setLoggedIn(!loggedIn)
        }
        else {
            history.push("/")
        }
        
    }
    

        let btnTxt = loggedIn ? "Logout" : "Login"
        return (
            <nav className="NavbarItems" style={{width: "100%"}}>
                <Helmet>
                    <title>COEP - PhD admission Portal</title>
                    <meta name="title" content="COEP PhD Admission Portal"></meta>
                </Helmet>
                
                <ul className="ul-class">
                    <li className="li-class">
                        <a href="/">
                            <img
                                src = {logo}
                                alt = "logo"
                                style = {{width: '60px', height: '70px'}}
                            >
                            </img>
                        </a>
                    </li>
                    <li className="li-class">
                        <a href="/">
                            <h1 id="big-screen">PhD Admission Portal - College of Engineering, Pune</h1>
                            <h1 id="small-screen">PhD Admission Portal - COEP</h1>
                        </a>
                    </li>
                
                    <li className="li-class" style={{ float: "right", marginRight: '10px' }}>
                    <div>
                        <h3>
                            <Button color="light" onClick={toggle} value={btnTxt}>{btnTxt}</Button>
                        </h3>
                    </div>
                    </li>
                    <li className="li-class" style={{ float: "right", marginRight: '10px' }}>
                        <div>
                            <h3>
                                <Button color="light">Home</Button>
                            </h3>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    
}

