import { React, useState } from "react";
import Button from "@mui/material/Button";
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
import axios from "axios";

const theme = createTheme();

export default function AddAccountForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    for (const key in fieldValues) {
      temp[key] = fieldValues[key] ? "" : "This field is required.";
    }
    if ("email" in fieldValues && !/$^|.+@.+..+/.test(fieldValues.email)) {
      temp.email = "Email is not valid.";
    }
    setErrors(temp);
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const initialData = {
    name: "",
    email: "",
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialData,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(BACKEND_URL + "/account-section/add", values)
        .then((res) => {
          alert("user added");
          resetForm();
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.error || "Invalid details");
        });
    } else alert("Invalid details");
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedin={true} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Account Section
          </Typography>
          <br />
          <Form onSubmit={handleSubmit}>
            <Grid align="center">
              <Grid align="center" item xs={12}>
                <Input
                  name="name"
                  label="Name*"
                  value={values.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
                <Input
                  name="email"
                  label="Email*"
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
                    Add
                  </Button>
                </Grid>

                <Grid item xs>
                  <Link href="/Admin" variant="body2">
                    {"Go to dashboard"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
