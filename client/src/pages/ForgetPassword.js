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
  newPassword: "",
  rePassword: "",
};
export default function ForgetPassword() {
  let history = useHistory();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [userId, setUserId] = useState(null);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      const isValidMail = /$^|.+@.+..+/.test(fieldValues.email);
      if (!isValidMail) temp.email = "Email is not valid.";
    }
    if ("newPsassword" in fieldValues) {
      temp.newPassword = fieldValues.newPassword
        ? ""
        : "This field is required.";
    }
    if ("rePassword" in fieldValues) {
      temp.rePassword =
        fieldValues.rePassword !== values.newPassword
          ? "passwords do not match"
          : "";
    }
    if ("otp" in fieldValues) {
      temp.otp = fieldValues.otp ? "" : "This field is required.";
    }
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleConfirm = (e) => {
    e.preventDefault();
    if (
      validate({
        otp: values.otp,
        newPassword: values.newPassword,
        rePassword: values.rePassword,
      })
    ) {
      const url = BACKEND_URL + "/students/password-reset";
      setLoading2(true);
      const data = {
        userId,
        otp: values.otp,
        password: values.newPassword,
      };
      axios
        .post(url, data)
        .then((res) => {
          setLoading2(false);
          alert("password reset successful. Please login");
          history.push("/login/candidate");
        })
        .catch((err) => {
          setLoading2(false);
          alert("Invalid OTP. Could not reset password");
          console.log(err.response || err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate({ email: values.email })) {
      const url = BACKEND_URL + "/students/request-password-reset";
      setLoading1(true);
      axios
        .post(url, {
          email: values.email,
        })
        .then((res) => {
          setLoading1(false);
          setUserId(res.data.userId);
        })
        .catch((err) => {
          setLoading1(false);
          alert("User not found");
          console.log(err.response || err);
        });
    }
  };
  return (
    <>
      {/* <NavBar /> */}
      <ThemeProvider theme={theme}>
        <NavBar loggedin={false} />
        {userId ? (
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
                        name="newPassword"
                        label="New Password*"
                        value={values.newPassword}
                        onChange={handleInputChange}
                        error={errors.newPassword}
                      />
                      <Input
                        name="rePassword"
                        label="Retype New Password*"
                        value={values.rePassword}
                        onChange={handleInputChange}
                        error={errors.rePassword}
                      />

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleConfirm}
                          style={{ width: "100%", marginLeft: "2%" }}
                        >
                          {loading2 ? (
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
                        {loading1 ? (
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
