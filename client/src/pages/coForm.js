import { Component } from "react"
import React from "react"
import NavBar from "../components/Navbar/Navbar";

class coForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // loggedOut: false,

        }
    }
    render() {
        return (
            <div>
                <NavBar />
                <h1>Form filled by student</h1>
            </div>
        );
    }
}


export default coForm;