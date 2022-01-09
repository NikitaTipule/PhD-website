import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Select from 'react-bootstrap/Dropdown';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/Navbar/Navbar";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { BACKEND_URL } from "../config";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileView, BrowserView } from 'react-device-detect';

const theme = createTheme();
const initialState = {
  mis: "",
  password: "",
  role: "",
};
export default function FacLogIn() {
  let history = useHistory();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = BACKEND_URL + "/staff/login";
    setLoading(true);
    axios
      .post(url, state)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("phd-website-jwt", res.data.token);
        localStorage.setItem("phd-website-role", state.role);
        if (state.role === "phdCord") history.push("/coordinator");
        else if (state.role === "admin") history.push("/admin");
        else history.push("/account");
      })
      .catch((err) => {
        setLoading(false);
        setState(initialState);
        alert("Invalid credentials. Login again");
        console.log(err.response || err);
      });
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <NavBar loggedin={false} />
      <div className="menu">
        {!menu ? (
          <MenuIcon
            onClick={() => {
              setMenu(true);
            }}
          />
        ) : (
          <CloseIcon
            onClick={() => {
              setMenu(false);
            }}
          />
        )}
      </div>
      <div className="container">
        <MobileView>
          {menu && <Sidebar className="mob" user="Faculty" />}
        </MobileView>
        <BrowserView>
          {!menu && <Sidebar className="mob" user="Faculty" />}
        </BrowserView>
        <div>
          <Container component="main" maxWidth="xs">
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
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mis"
                  label="MIS"
                  name="mis"
                  autoComplete="mis"
                  onChange={handleInput}
                  value={state.mis}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={state.password}
                  onChange={handleInput}
                  autoComplete="current-password"
                />
                <FormControl sx={{ mt: 1.2, minWidth: 180 }}>
                  <InputLabel id="role" required>
                    Role
                  </InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Role"
                    name="role"
                    value={state.role}
                    onChange={handleInput}
                  >
                    <MenuItem value="admin">Administrator</MenuItem>
                    <MenuItem value="phdCord">Coordinator</MenuItem>
                    {/* <MenuItem value="accountSec">Account Section</MenuItem> */}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? (
                    <CircularProgress size="1.7em" color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/" variant="body2">
                      {"Home Page"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
