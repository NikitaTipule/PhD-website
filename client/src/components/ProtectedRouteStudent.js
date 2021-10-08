import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loading from "./Loading";
const ProtectedRouteStudent = ({ component: Component, ...rest }) => {
    const [validated, setValidated] = useState(null);

    const verifyToken = async () => {
        var token = localStorage.getItem("token");
        await axios
            .get(BACKEND_URL + "/student/login", {
                headers: { token: token }
            })
            .then(response => {
                setValidated(true);
            })
            .catch(err => {
                setValidated(false);
                console.log(err);
            });
    };

    useEffect(() => {
        verifyToken();
    }, []);
    if (validated != null && validated) {
        return (
            <Route
                {...rest}
                render={props => <Component {...rest} {...props} />}
            />
        );
    } else if (validated != null && !validated) {
        return <Redirect to="/" />;
    } else {
        return <Loading loading={true} />;
    }
};
export default ProtectedRouteStudent;
