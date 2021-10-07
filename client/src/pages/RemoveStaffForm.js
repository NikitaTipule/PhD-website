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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { departmentNamesList } from "../phdAdmDetails";

const theme = createTheme();

export default function RemoveStaffForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    for (const key in fieldValues) {
      temp[key] = fieldValues[key] ? "" : "This field is required.";
    }
    if ("email" in fieldValues && !/$^|.+@.+..+/.test(fieldValues.email)) {
      temp.email = "Email is not valid.";
    }
    setErrors(temp);
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const initialData = {
    mis: "",
    email: "",
    role: "",
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialData,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(values);
    }
    resetForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Remove staff
          </Typography>
          <br />
          <Form onSubmit={handleSubmit}>
            <Grid align="center">
              <Grid align="center" item xs={12}>
                <Input
                  name="mis"
                  label="MIS*"
                  value={values.mis}
                  onChange={handleInputChange}
                  error={errors.mis}
                />
                <Input
                  name="email"
                  label="Email*"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <FormControl sx={{ mt: 1.2, minWidth: 180 }}>
                  <InputLabel id="role" required>
                    role
                  </InputLabel>
                  <Select
                    name="role"
                    value={values.role}
                    labelId="role"
                    id="role"
                    label="role"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="phdCord">PhD Coordinator</MenuItem>
                    <MenuItem value="accountSec">Account Section</MenuItem>
                  </Select>
                </FormControl>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                    style={{ width: "100%", marginLeft: "2%" }}
                  >
                    Remove
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
