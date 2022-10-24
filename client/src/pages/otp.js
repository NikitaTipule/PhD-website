import { React, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Navbar/Navbar";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";

const theme = createTheme();

export default function OTP(props) {
  const [mailotp, setMailotp] = useState("");
  const [mobileotp, setMobileotp] = useState("");
  const [mailVerified, setMailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(true);
  // const [resendDisabled, setResendDisabled] = useState(false);
  const location = useLocation();

  // const resendOtp = () => {
  //   axios
  //     .post(BACKEND_URL + "/students/resendotp", {
  //       userId: location.state.userId,
  //     })
  //     .then((res) => {
  //       setTimeout(() => {
  //         setResendDisabled(false);
  //       }, 10000);
  //       setResendDisabled(true);
  //       alert("resent OTP");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("couldn't resend OTP");
  //     });
  // };

  const submitMailOtp = (e) => {
    e.preventDefault();
    if (mailotp && mailotp.length === 6) {
      axios
        .post(BACKEND_URL + "/students/verifymail", {
          userId: location.state.userId,
          otp: mailotp,
        })
        .then((res) => {
          setMailVerified(true);
          alert("Email Verified");
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid details");
        });
    } else alert("Invalid details");
  };

  // const submitMobileOtp = (e) => {
  //   e.preventDefault();
  //   if (mobileotp && mobileotp.length === 6) {
  //     axios
  //       .post(BACKEND_URL + "/students/verifymobile", {
  //         userId: location.state.userId,
  //         otp: mobileotp,
  //       })
  //       .then((res) => {
  //         setMobileVerified(true);
  //         alert("Mobile Verified");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert("Invalid details");
  //       });
  //   } else alert("Invalid details");
  // };

  if (mailVerified && mobileVerified) {
    return <Redirect to="/login/candidate" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedin={true} />
      <Container component="main" maxWidth="xs" style={{ marginTop: "130px" }}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "cadetblue" }}></Avatar> */}
          <Typography component="h1" variant="h5">
            Verify Mail
          </Typography>
          <br />
          <form>
            <Grid align="center">
              <Grid align="center" item xs={12}>
                <Input
                  name="Email OTP"
                  label="Email OTP*"
                  value={mailotp}
                  onChange={(e) => setMailotp(e.target.value)}
                />
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 3 }}
                    onClick={submitMailOtp}
                    style={{ width: "100%", marginLeft: "2%" }}
                  >
                    Submit
                  </Button>
                </Grid>

                <Grid align="center" item xs={12}>
                  {/* <Input
                    name="Mobile OTP"
                    label="Monile OTP*"
                    value={mobileotp}
                    onChange={(e) => setMobileotp(e.target.value)}
                  />
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 5 }}
                      onClick={submitMobileOtp}
                      style={{ width: "100%", marginLeft: "2%" }}
                    >
                      Submit
                    </Button>
                  </Grid> */}

                  {/* <Grid item xs={12}>
                    <Button
                      sx={{ mb: 2, mt: 3 }}
                      disabled={resendDisabled}
                      variant="contained"
                      onClick={resendOtp}
                      style={{
                        width: "100%",
                        backgroundColor: resendDisabled ? "grey" : "black",
                        marginLeft: "2%",
                      }}
                    >
                      Resend OTP
                    </Button>
                  </Grid> */}

                  <Grid item xs>
                    <Link href="/Admin" variant="body2">
                      {"Go to dashboard"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
