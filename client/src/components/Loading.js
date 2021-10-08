import React from "react";
import { Fade, CircularProgress } from "@material-ui/core";

export default function Loading(props) {
    const loadingStyle = {
        width: "50px",
        height: "50px",
        margin: "0px auto"
    };
    return (
        <Fade
            in={props.loading}
            style={{
                transitionDelay: props.loading ? "800ms" : "0ms",
                padding: "0.5rem"
            }}
            unmountOnExit
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <CircularProgress style={loadingStyle} />
            </div>
        </Fade>
    );
}
