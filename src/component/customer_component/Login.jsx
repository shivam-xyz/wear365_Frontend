import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import { useState } from 'react';
import axios from 'axios';
import SnackBar from './SnackBar';
import { context } from '../../GlobalContexts/GlobalContext';

const Register = () => {
  const {getUserProfile} = useContext(context)
  const navigate = useNavigate()
  const [openSnackBar, setOpenSnackBar] = useState({
    status: false,
    message: '',
    color: ''
  })
  const [inputField, setInputField] = useState({
    mobile: '',
    password: ''
  })
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputField({ ...inputField, [name]: value })
  }
  const logInHandler = (e) => {
    e.preventDefault();
    const { mobile, password } = inputField;
    axios.post('/api/verifyuser', { mobile, password })
    .then((res) => {
      console.log(res);
      getUserProfile();
      setOpenSnackBar({
        status: true,
        message: res.data.message,
        color: 'success'
      });
      navigate('/')
    }).catch((err) => {
      console.log(err);
      setOpenSnackBar({
        status: true,
        message: 'Failed to Log in, Plz Try Again with proper credentials',
        color: 'error'
      });
    })
  }
  console.log(inputField)
  const snackBarCloseHandler = () => {
    setOpenSnackBar({
      status: false,
      messsage: '',
      color: ''
    })
  }

  return (
    <>
      <Container >
        <SnackBar openSnackBar={openSnackBar} snackBarCloseHandler={snackBarCloseHandler} />
        <CssBaseline />
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', width: '80%', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Log In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoFocus onChange={(e) => { changeHandler(e) }} value={inputField.mobile} required fullWidth label="Mobile No." name="mobile" />
                </Grid>

                <Grid item xs={12}>
                  <TextField onChange={(e) => { changeHandler(e) }} value={inputField.password} required fullWidth name="password" label="Password" type="password" />
                </Grid>

              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logInHandler}>
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography color="blue" >Don't have an Account? Register</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
        {/* <Copyright sx={{ mt: 5 }} /> */}
        {/* <CopyrightOutlinedIcon sx={{mt:5}} /> */}
      </Container>
    </>
  )
}

export default Register