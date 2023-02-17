import { Box, Button, Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import success from './success.gif'

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(3)
    },
    container: {
        marginTop: theme.spacing(10)
    },
    img: {
        // border: '1px solid red',
        width: '300px'
    },
    boxImg: {
        // border: '1px solid blue',
        display: 'flex',
        justifyContent: 'center'
    }
}));

const OrderPlacedSuccessfully = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <>
            <Container className={classes.container}>
                <Box className={classes.boxImg}>
                    <Box className={classes.img}>
                        <img src={success} alt="success image" height="100%" width="100%" />
                    </Box>
                </Box>
                <Typography variant='h3' align='center'>Order Placed Successfully</Typography>
                <Box className={classes.box}>
                    <Button variant="contained" onClick={() => { navigate('/trackorder') }}>Track Order</Button>
                </Box>
                <Box className={classes.box}>
                    <Button variant="outlined" onClick={() => { navigate('/') }}>Back to HomePage</Button>
                </Box>
            </Container>
        </>
    )
}

export default OrderPlacedSuccessfully