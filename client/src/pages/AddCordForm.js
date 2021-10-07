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

export default function AddCordForm() {
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
    name: "",
    mis: "",
    email: "",
    department: "",
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
          {/* <Avatar sx={{ m: 1, bgcolor: "cadetblue" }}></Avatar> */}
          <Typography component="h1" variant="h5">
            Add Coordinator
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
                <Input
                  name="mis"
                  label="MIS*"
                  value={values.mis}
                  onChange={handleInputChange}
                  error={errors.mis}
                />
                <FormControl sx={{ mt: 1.2, minWidth: 180 }}>
                  <InputLabel id="department" required>
                    department
                  </InputLabel>
                  <Select
                    name="department"
                    value={values.department}
                    labelId="department"
                    id="department"
                    label="department"
                    onChange={handleInputChange}
                  >
                    {departmentNamesList.map((dept, ind) => {
                      return (
                        <MenuItem key={ind} value={dept}>
                          {dept}
                        </MenuItem>
                      );
                    })}
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
