import React, { Component } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import MainLogIn from "./MainLogin";
class Home extends Component {
  render() {
    return (
      <>
        <div style={{ marginTop: "10spx" }}>
          <MainLogIn />
        </div>
      </>
    );
  }
}

export default Home;
