import { React, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import "../CSS/mainlogin.css";
import { BACKEND_URL } from "../config";
import axios from "axios";

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

export default function MainLogIn(props) {
  const history = useHistory();

  (function () {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  })();

  const [links, setLinks] = useState();

  const handleRoute1 = () => {
    history.push("/login/candidate");
  };

  const handleRoute2 = () => {
    history.push("/login/staff");
  };

  const handleRoute3 = () => {
    history.push("/login/account-section");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get(BACKEND_URL + "/phdCords/getalllinks").then((res) => {
        if (res.data) {
          const links = res.data.map((link) => {
            link.priority = link.priority ? link.priority : 0;
            return link;
          });
          links.sort((a, b) => b.priority - a.priority);
          setLinks(links);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="all">
      <NavBar />
      <div className="bod">
        <ThemeProvider theme={theme}>
          <div
            className="container_login"
            id="container"
            style={{ marginTop: "90px" }}
          >
            {/* <div className="form-container log-in-container">
              <div className="form-container">
                <Typography component="h1" variant="h5" mt={2}>
                  <b>Sign in </b>
                </Typography>
                <div className="social-container">
                  <Avatar
                    sx={{ m: 0, bgcolor: "#056676", height: 60, width: 60 }}
                  ></Avatar>
                </div>

                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <Button
                      color="neutral"
                      onClick={handleRoute1}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Candidate
                      <br /> Login
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="neutral"
                      onClick={handleRoute2}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Faculty Login
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    color="neutral"
                    onClick={handleRoute3}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Account Section Login
                  </Button>
                </Grid>
              </div>
            </div> */}
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <Typography component="h1" variant="h5" mt={2}>
                    <b>Important Announcements</b>
                  </Typography>
                  <div className="scroll-box">
                  <p className="link">
                            COEP PhD Admissions are closed now.
                  </p>
                    {/* {links
                      ? links.map((item, key) => (
                          <p key={key} className="link">
                            <a className="main_link" href={item.link}>
                              {item.title}
                            </a>
                          </p>
                        ))
                      : ""} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
