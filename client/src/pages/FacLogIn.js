import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Select from 'react-bootstrap/Dropdown';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/Navbar/Navbar';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme();

export default function FacLogIn() {
  const[roleState,setRoleState]=useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      mis: data.get('mis'),
      password: data.get('password'),
      role: roleState,
    });
  };
  return (
    <ThemeProvider theme={theme}>
        <NavBar />
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mis"
              label="MIS"
              name="mis"
              autoComplete="mis"
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
              autoComplete="current-password"
            />
             <FormControl sx={{mt:1.2, minWidth: 180 }}>
             <InputLabel 
             id="role"
             required

            >
            Role    
             </InputLabel>
             <Select
              labelId="role"
              id="role"
              label="Role"
              onChange={(e)=>{
                const selectedRole=e.target.value;
                setRoleState(selectedRole)
              }}
             >

          <MenuItem value='admin'>Administrator</MenuItem>
          <MenuItem value='coord'>Coordinator</MenuItem>
          <MenuItem value='accounts'>Account Section</MenuItem>
        </Select>
      </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Sign In
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
    </ThemeProvider>
  );
}