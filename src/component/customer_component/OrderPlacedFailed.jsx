import { Box, Button, Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import fail from './failed.gif'

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
        width: '400px'
    },
    boxImg: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const OrderPlacedFailed = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <>
            <Container className={classes.container}>
                <Box className={classes.boxImg}>
                    <Box className={classes.img}>
                        <img src={fail} alt="success image" height="100%" width="100%" />
                    </Box>
                </Box>
                <Typography variant='h3' align='center'>Order Failed</Typography>
                <Box className={classes.box}>
                    <Button variant="contained" onClick={() => { navigate('/') }}>Back to HomePage</Button>
                </Box>
            </Container>
        </>
    )
}

export default OrderPlacedFailed