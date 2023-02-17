import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import { useState } from 'react';
import axios from 'axios';
import SnackBar from './SnackBar';
import { auth, firebase, inst } from './firebase'

const Register = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [vid, setVid] = useState('')
    const [otpBtnClicked,setotpBtnClicked]=useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({
        status: false,
        message: '',
        color: ''
    })
    const [inputField, setInputField] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        referal: '',
        password: '',
        gender: '',
        wantPromotions: false,
        image: ''
    })
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInputField({ ...inputField, [name]: value })
    }
    const registerHandler = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, mobile, referal, password, gender, wantPromotions, image } = inputField;
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('referal', referal);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('wantPromotions', wantPromotions);
        formData.append('myFile', image);
        axios.post('/api/registeruser', formData).then((res) => {
            console.log(res);
            setOpenSnackBar({
                status: true,
                message: res.data.message,
                color: 'success'
            });
            navigate('/loginuser')
        }).catch((err) => {
            console.log(err);
            setOpenSnackBar({
                status: true,
                message: 'Failed to Register, Plz Try Again',
                color: 'error'
            });
        })

    }
    const tickHandler = () => {
        if (inputField.wantPromotions == true) {
            setInputField({ ...inputField, wantPromotions: false });
        }
        else if (inputField.wantPromotions == false) {
            setInputField({ ...inputField, wantPromotions: true });
        }
    }
    const imageHandler = (e) => {
        setInputField({ ...inputField, image: e.target.files[0] });
    }
    const snackBarCloseHandler = () => {
        setOpenSnackBar({
            status: false,
            messsage: '',
            color: ''
        })
    }
    // console.log(inputField)
    const otpChangeChandler = (e) => {
        setOtp(e.target.value);
    }
    const gRegisterHandler=(e)=>{
        e.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then((res)=>{
            console.log('Successfully Registered',res);
        }).catch((err)=>{
            console.log('Failed to Registered',err)
        })
    }

    const sendOtpHandler = () => {
        const appVerifier = new firebase.auth.RecaptchaVerifier('captcha', {
            'size': 'invisible',
            'callback': function (res) { console.log(res) }
        }, inst)
        auth.signInWithPhoneNumber("+91" + inputField.mobile, appVerifier).then((res) => {
            setotpBtnClicked(true)
            setVid(res)
            console.log('OTP Send', res)
        }).catch((err) => {
            console.log("OTP Failed", err)
        })
    };

    const otpVerifyHandler = () => {
        if (otp.length === 6) {
                vid.confirm(String(otp)).then((res)=>{
                    console.log('Otp Verified Successfully',res);
                    alert('Otp Verified Successfully')
                }).catch((err)=>{
                    console.log('Invalid OTP',err)
                    alert('Invalid OTP')
                })
        }
        else {
            alert('Wrong OTP')
        }
    }
    console.log(otp)
    console.log("+91" + inputField.mobile)
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
                            User Registration
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => { changeHandler(e) }} value={inputField.firstName} name="firstName" required fullWidth label="First Name" autoFocus />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField onChange={(e) => { changeHandler(e) }} value={inputField.lastName} required fullWidth label="Last Name" name="lastName" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => { changeHandler(e) }} value={inputField.email} required fullWidth label="Email Address" type="email" name="email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Grid xs={9} md={10}>
                                            <TextField onChange={(e) => { changeHandler(e) }} disabled={otpBtnClicked?true:false} value={inputField.mobile} required fullWidth label="Mobile No." name="mobile" />
                                        </Grid>
                                        <Grid xs={3} md={2} sx={{ marginTop: '15px' }}><Button disabled={otpBtnClicked?true:false} variant='outlined' size='small' onClick={sendOtpHandler} sx={{backgroundColor:otpBtnClicked?'green':''}}>{otpBtnClicked?'OTP Sent':'Request OTP'}</Button></Grid>
                                        <Grid xs={4} md={4} sx={{ marginTop: '15px' }}>
                                            <TextField required fullWidth label="OTP"  name="otp" disabled={!otpBtnClicked?true:false} onChange={(e) => { otpChangeChandler(e) }} value={otp} />
                                        </Grid>
                                        <Grid xs={3} md={3}>
                                            <Button disabled={!otpBtnClicked?true:false} variant='outlined' size='small' onClick={otpVerifyHandler}>Verify</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => { changeHandler(e) }} value={inputField.referal} fullWidth label="Referal Code" placeholder='Optional' name="referal" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => { changeHandler(e) }} value={inputField.password} required fullWidth name="password" label="Password" type="password" />
                                </Grid>
                                <Grid item xs={12} textAlign="center">
                                    <Button variant="outlined" component="label">
                                        Upload Image
                                        <input hidden onChange={imageHandler} type="file" />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">Gender</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            label="Gender"
                                            name="gender"
                                            onChange={(e) => { changeHandler(e) }}
                                            value={inputField.gender}
                                        >
                                            <MenuItem >Select Your Gender</MenuItem>
                                            <MenuItem value={'Male'}>Male</MenuItem>
                                            <MenuItem value={'Female'}>Female</MenuItem>
                                            <MenuItem value={'Trans'}>Trans</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox onClick={tickHandler} color="primary" />}
                                        label="I want Promotional/Offer Informations"
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={registerHandler}>
                                Create New Account
                            </Button>
                            <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={gRegisterHandler}>
                                Create Account With Google
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Typography color="blue" >Have an Account? Log in</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
                {/* <Copyright sx={{ mt: 5 }} /> */}
                {/* <CopyrightOutlinedIcon sx={{mt:5}} /> */}
            </Container>
            <div id='captcha'></div>
        </>
    )
}

export default Register