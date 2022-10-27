import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Navbar/Navbar";
import { useForm, Form } from "./Form";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();
const initialFValues = {
  email: "",
  otp: "",
  newpassword: "",
};
export default function ForgetPassword() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);

  const validate = (fieldValues = values) => {
    console.log(fieldValues.newpassword);
    console.log(fieldValues.otp);
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      const isValidMail = /$^|.+@.+..+/.test(fieldValues.email);
      if (!isValidMail) temp.email = "Email is not valid.";
    }
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    setErrors(temp);
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleConfirm = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        otp: values.otp,
        newpassword: values.newpassword,
      };
      console.log(data);
    }
    history.push("/login/candidate");
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (validate()) {
    //   const data = {
    //     email: values.email,
    //     password: values.password,
    //   };
    //   console.log(data);
    //   const url = BACKEND_URL + "/students/login";
    //   setLoading(true);
    //   axios
    //     .post(url, data)
    //     .then((res) => {
    //       setLoading(false);
    //       if (res.data.otp_error) {
    //         history.push("/candidate-otp", { userId: res.data.userId });
    //       } else {
    //         localStorage.setItem("phd-website-jwt", res.data.token);
    //         localStorage.setItem("phd-website-role", "student");
    //         setSendOTP(true);
    //         // history.push("/candidate");
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       alert("Invalid credentials. Login again");
    //       console.log(err.response || err);
    //     });
    // }
    console.log(values.email);
    setSendOTP(true);
  };
  return (
    <>
      {/* <NavBar /> */}
      <ThemeProvider theme={theme}>
        <NavBar loggedin={false} />
        {sendOTP ? (
          <div>
            <Container
              component="main"
              maxWidth="xs"
              style={{ marginTop: "120px" }}
            >
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "cadetblue" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Reset Password ?
                </Typography>
                <Form onSubmit={handleSubmit}>
                  <Grid align="center" xs={12} item>
                    <Grid align="center" item xs={12}>
                      <Input
                        name="otp"
                        label="OTP*"
                        value={values.otp}
                        onChange={handleInputChange}
                        error={errors.otp}
                      />
                      <Input
                        name="newpassword"
                        label="New Password*"
                        value={values.newpassword}
                        onChange={handleInputChange}
                        error={errors.newpassword}
                      />

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleConfirm}
                          style={{ width: "100%", marginLeft: "2%" }}
                        >
                          {loading ? (
                            <CircularProgress size="1.7em" color="inherit" />
                          ) : (
                            "Confirm"
                          )}
                        </Button>
                      </Grid>
                      <Grid container spacing={20}>
                        <Grid item xs>
                          <Link href="/" variant="body2">
                            {"Home Page"}
                          </Link>
                        </Grid>
                        <Grid item xs>
                          <Link href="/Register" variant="body2">
                            {"Don't have an account? Register"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            </Container>
          </div>
        ) : (
          <Container
            component="main"
            maxWidth="xs"
            style={{ marginTop: "120px" }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "cadetblue" }}></Avatar>
              <Typography component="h1" variant="h5">
                Forget Password ?
              </Typography>
              <Form onSubmit={handleSubmit}>
                <Grid align="center" xs={12} item>
                  <Grid align="center" item xs={12}>
                    <Input
                      name="email"
                      label="Enter Registered Email*"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                        style={{ width: "100%", marginLeft: "2%" }}
                      >
                        {loading ? (
                          <CircularProgress size="1.7em" color="inherit" />
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </Grid>
                    <Grid container spacing={20}>
                      <Grid item xs>
                        <Link href="/" variant="body2">
                          {"Home Page"}
                        </Link>
                      </Grid>
                      <Grid item xs>
                        <Link href="/Register" variant="body2">
                          {"Don't have an account? Register"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Container>
        )}
      </ThemeProvider>
    </>
  );
}
