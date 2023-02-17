import { Avatar, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../../GlobalContexts/GlobalContext'
import GlobalLoader from './GlobalLoader'
import Header from './Header'

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10)
    }
}))

const Profile = ({ userProfile }) => {
    const classes = useStyles();
    if(userProfile.length===0){
        return(
            <GlobalLoader/>
        )
    }
    else{

        return (
            <>
                <Header />
                <Container className={classes.container}>
                    {
                        userProfile.map((user) => {
                            return (
                                <Paper elevation={0} sx={{ background: 'linear-gradient(to bottom, #ff99ff 0%, #ffffff 100%)' }}>
                                    <Grid container>
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Avatar sx={{ height: 200, width: 200 }} src={user.image} />
                                        </Grid>
                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='h6' fontWeight={800}>{`${user.firstName} ${user.lastName}`}</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>Your Public Name</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>{`${user.firstName} ${user.lastName}`}</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>Email</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>{user.email}</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>Mobile</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>{user.mobile}</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>Order Placed</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>2511</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>Wallet Balance</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                            <Typography variant='subtitle2' fontWeight={600}>2500 Rs.</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        })
                    }
                </Container>
            </>
        )
    }
}



export default Profile