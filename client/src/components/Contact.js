import { React } from "react";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../CSS/mainlogin.css";
import "../App.css";
import { Grid } from "@material-ui/core";



const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#056676",
      contrastText: "#fff",
    },
  },
});

export default function Contact(){
    return(
        <div className="all">
            <div className="bod" style={{height: "100vh"}}>
        <ThemeProvider theme={theme}>
            <h1>Contact Us</h1>
        <div
            className="container_login"
            id="container"
            style={{width: "90%", minHeight: "50%", alignItems: "center"}}
          >
            <div style={{alignItems: "center", marginTop: "10%", marginBottom: "10%"}}>
            <h5 style={{fontSize: "20px", marginLeft: "25%", marginRight: "25%"}}>Email: phdadmissioncoeptech2022-23@coep.ac.in</h5>
            <h5 style={{fontSize: "20px", marginLeft: "25%", marginRight: "25%"}}>Contact No: 020-2550-7222</h5>
            </div>
        </div>
        </ThemeProvider>
        </div>
        </div>
    );
}