import { Component } from "react"
import React from "react"

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
                {this.data.name}
            </div>
        );
    }
}


export default coForm;