import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loading from "./Loading";
const ProtectedRouteCoordinator = ({ component: Component, ...rest }) => {
  const [access, setAccess] = useState("pending");

  const verifyToken = async () => {
    var token = localStorage.getItem("phd-website-jwt");
    await axios
      .get(BACKEND_URL + "/staff/getUser", {
        headers: { "phd-website-jwt": token },
      })
      .then((resp) => {
        console.log(resp.data.userRole);
        if (resp.data.userRole === "phdCord" || resp.data.userRole === "admin") setAccess("granted");
        else setAccess("blocked");
      })
      .catch((err) => {
        setAccess("blocked");
        console.log(err.response || err);
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (access === "granted") {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else if (access === "blocked") {
    return <Redirect to="/" />;
  } else {
    return <Loading loading={true} />;
  }
};
export default ProtectedRouteCoordinator;

