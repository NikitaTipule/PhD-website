import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import NavBar from '../components/Navbar/Navbar';
import "../CSS/mainlogin.css";
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#056676',
      contrastText: '#fff',
    },
  },
});

export default function MainLogIn() {
  const history = useHistory();

  const handleRoute1 = () => {
    history.push("/login/candidate");
  };
  const handleRoute2 = () => {
    history.push("/login/staff");
  };

  return (
<div class="all">
<NavBar/>
<div class="bod">
<ThemeProvider theme={theme}>

	<div class="container_login" id="container">
		<div class="form-container log-in-container">
			<div class="form-container">
      <Typography component="h1" variant="h5" mt={2}>
              <b>Sign in </b>
            </Typography>
				<div class="social-container">
					<Avatar sx={{ m: 0, bgcolor: "#056676", height: 60, width: 60 }}></Avatar>
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
                    Candidate<br /> Login
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
                  onClick={handleRoute2}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Account Section Login
                </Button>
              </Grid>

			</div>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				<div class="overlay-panel overlay-right">
        <Typography component="h1" variant="h5" mt={2}>
                <b>Important Announcements</b>
              </Typography>
              <div class="scroll-box">
              <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 1</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 2</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 3</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 4</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 5</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 6</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 7</a></p>
            <p class="link"><a class="main_link" href="https://www.google.co.in/">Link 8</a></p>
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
