import { Component } from "react";
import React from "react";
import NavBar from "../components/Navbar/Navbar";
import DisplayData from "./DisplayData";

class phdCordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // loggedOut: false,
    };
  }
  render() {
    return (
      <div>
        <NavBar loggedin={true} />
        {/* {console.log(this.props.location.state.details)} */}
        <DisplayData id={this.props.location.state.details}/>
      </div>
    );
  }
}

export default phdCordForm;
