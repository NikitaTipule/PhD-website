import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  let token = localStorage.getItem("phd-website-jwt");
  const role = localStorage.getItem("phd-website-role");
  if (!(allowedRoles.includes(role) && token)) {
    localStorage.clear();
    return <Redirect to="/" />;
  }
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default ProtectedRoute;
