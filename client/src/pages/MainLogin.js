import {React} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom"
const theme = createTheme();

export default function MainLogIn() {
    const history = useHistory();
    
    const handleRoute1 = () =>{ 
      history.push("/StudentLogIn");
    }
    const handleRoute2 = () =>{ 
        history.push("/FacLogIn");
      }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'cadetblue' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={handleRoute1}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Student Login
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button
              onClick={handleRoute2}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Faculty Login
            </Button>
            </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}