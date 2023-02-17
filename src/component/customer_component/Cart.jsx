import { Box, Button, Container, Fab, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Header from './Header';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10)
    },
    btns: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    displayQty: {
        padding: '5px'
    },
    fab: {
        position: 'fixed',
        bottom: 40,
        right: 30
    }
}));

const Cart = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cartItems'))
        if (data == null || data == undefined || data == '' || data == ' ' || data == 'null' || data == 'undefined') {
            setCart([])
        }
        else {
            setCart(data)
        }
    }, [])

    const incQty = (menu) => {
        const updatedCart = cart.map((ele) => {
            if (ele._id == menu._id) {
                if (ele.qty < 10) {
                    return { ...menu, qty: menu.qty + 1 }
                }
                else {
                    return ele
                }
            }
            return ele
        });
        setCart(updatedCart)
        console.log('49', updatedCart)
    };
    const decQty = (menu) => {
        const updatedCart = cart.map((ele) => {
            if (ele._id == menu._id) {
                if (ele.qty > 0) {
                    return { ...ele, qty: ele.qty - 1 }
                }
                else {
                    return ele;
                }
            }
            return ele;
        });
        setCart(updatedCart)
    };
    const delFLS = (item) => {
        const updatedCart = cart.filter((fil) => { return fil._id !== item._id })
        setCart(updatedCart)
    }

    const proceedHandler = () => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
        navigate('/billing')
    }


    return (
        <>
            <Header />
            <Container className={classes.container}>
                <Typography variant='h5' fontWeight={800} align='center'>Cart Page</Typography>
                <Typography>{cart.length} item</Typography>

                <Paper>
                    <Grid container spacing={2} sx={{ padding: '10px' }}>
                        {
                            cart.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }} >
                                            <span>
                                                <Typography fontWeight={600} variant="body1">{item.name}</Typography>
                                                <small>{item.qty} qty x {item.srp} = {item.qty * item.srp} Rs.</small>
                                            </span>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <span className={classes.btns}>
                                                {item.qty > 1 ?
                                                    <Button variant='contained' onClick={() => { decQty(item) }}>-</Button>
                                                    :
                                                    <Button variant='contained' onClick={() => { delFLS(item) }}><DeleteForeverIcon /></Button>
                                                }
                                                <span className={classes.displayQty}>{item.qty}</span>
                                                <Button variant='contained' onClick={() => { incQty(item) }}>+</Button>
                                            </span>
                                        </Grid>
                                    </>
                                )
                            })
                        }
                    </Grid>
                </Paper>
            </Container>
            <span className={classes.fab}>
                <Fab variant='extended' color='secondary' onClick={proceedHandler}>
                    Proceed
                    <ArrowCircleRightIcon sx={{ fontWeight: '800' }} />
                </Fab>

            </span>
        </>
    )
};

export default Cart;