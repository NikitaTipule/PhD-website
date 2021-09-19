import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/Navbar/Navbar';
import {useForm, Form} from './Form';
import Input from './Input';
const theme = createTheme();
const initialFValues = {
  id: 0,
  email: '',
  password: '',
}
export default function StudentLogIn() {
   
   const [recordForEdit, setRecordForEdit]= useState(null)
   const addorEdit=(user, resetForm) => {
    resetForm()
    setRecordForEdit(null)
    }
  const validate = (fieldValues = values) => {
    let temp = {...errors} 
    if('email' in fieldValues)
      (temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid.") || (temp.email = fieldValues.email ? "" : "This field is required.")
    if('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."
    setErrors({
        ...temp
    })
    if(fieldValues == values)
     return Object.values(temp).every(x => x == "")
    }
    const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
     } = useForm(initialFValues,true,validate);
     const handleSubmit = e => {
      e.preventDefault()
      if(validate()){
          addorEdit(values, resetForm);
          const data ={
              fullname: values.fullname,
              email: values.email,
              password: values.password,
          }
          console.log(data)
      }
      
  }
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
          <Form onSubmit = {handleSubmit}>
                <Grid align='center' xs={12}>
                    <Grid align='center' item xs={12}>
                      <Input 
                        name="email"
                        label="Email*"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                      />
                     <Input 
                        name="password"
                        label="Password*"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                      />
                      <Grid item xs={12}>
                      <Button
                       type='submit'
                       variant="contained"
                       sx={{ mt: 3, mb: 2}}
                       onClick={handleSubmit}
                       style={{width: "100%", marginLeft:'2%'}}
                       >
                        SIGN IN
                      </Button>
                      </Grid>
                     
                       <Grid item xs>
                       <Link href="/Register" variant="body2">
                         {"Don't have an account? Register"}
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