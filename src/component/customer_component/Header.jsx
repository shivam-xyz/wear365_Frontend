import { AppBar, Avatar, Badge, Box, Drawer, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import logo from '../../logo.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { context } from '../../GlobalContexts/GlobalContext';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    rightBtns: {
        display: 'flex',
        alignItems: 'center'
    },
    box: {
        border: '1px solid red'
    },
    gridContainer: {
        marginBottom: '20px'
    }
}))

const Header = () => {
    const classes = useStyles()
    const { userProfile,getUserProfile } = useContext(context)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        getUserProfile()
    },[])
    return (
        <>
            <AppBar>
                <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to top, #cc33ff 0%, #ff3399 91%)' }}>
                    <Typography variant='h4' fontWeight={800} onClick={() => { navigate('/');getUserProfile(); }} >wear365</Typography>
                    <span className={classes.rightBtns}>
                        <MenuIcon onMouseEnter={() => { setOpen(true);getUserProfile() }} />
                        {/* <Avatar src={logo}/> */}
                    </span>
                </Toolbar>
            </AppBar>
            <Drawer
                elevation={16}
                open={open}
                anchor='bottom'
                onClose={() => { setOpen(false) }}
            >
                {
                    userProfile.length === 0 ?
                        <Box elevation={24} sx={{ background: 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)' }}>
                            <Grid container className={classes.gridContainer}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Avatar src='https://www.southernliving.com/thmb/CW6c6JPmHUqvoggsMJ9IxVkAgQo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-892959344-88c4f99df9984da2876de836f14a35a1.jpg' sx={{ mt: 1, height: 70, width: 70 }} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
                                    <Typography variant='h6' fontWeight={800} sx={{ textShadow: '2px 2px 5px green' }}>Welcome Guest</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6'>Contact Us</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6'>About Us</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6'>Permissions</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6' onClick={() => { navigate('/loginuser') }} >Log In</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6' onClick={() => { navigate('/registeruser') }}>Register</Typography>
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                    <Typography variant='h6'>Customer Support</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        :
                        <Box elevation={24} sx={{ background: 'linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)' }}>
                            <Grid container className={classes.gridContainer}>
                                {
                                    userProfile.map((user) => {
                                        return (
                                            <>
                                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Avatar src={user.image} sx={{ mt: 1, height: 70, width: 70 }} />
                                                </Grid>
                                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
                                                    <Typography variant='h6' fontWeight={800} sx={{ textShadow: '2px 2px 5px green' }}>{`${user.firstName} ${user.lastName}`}</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6' onClick={() => { navigate('/profile') }} >My Profile</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Badge badgeContent={25} color='primary'>
                                                        <Typography variant='h6'>Cart</Typography>
                                                    </Badge>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>Order History</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>My Address</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>Contact Us</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>About Us</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>Permissions</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Badge badgeContent={1} color="primary">
                                                        <Typography variant='h6' onClick={()=>{navigate('/trackorder')}}>Track order</Typography>
                                                    </Badge>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6' onClick={() => { navigate('/loginuser') }} >Log In</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6' onClick={() => { navigate('/registeruser') }}>Register</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6' color="red">Sign Out</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} >
                                                    <Typography variant='h6'>Customer Support</Typography>
                                                </Grid>
                                            </>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                }
            </Drawer>
        </>
    )
}

export default Header