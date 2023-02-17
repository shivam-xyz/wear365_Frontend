import { Container, Divider, Fab, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Header from './Header';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10)
    },
    paper: {
        padding: '7px'
    },
    fab: {
        position: 'fixed',
        bottom: 30,
        right: 40
    }
}));

const Billing = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cartItems'))
        if (data == null || data == undefined || data == '' || data == ' ' || data == 'null' || data == 'undefined') {
            setItems([])
        }
        else {
            setItems(data)
        }
    }, [])
    useEffect(() => {
        setSubTotal(items.reduce((acc, ele) => { return acc = acc + ele.srp * ele.qty }, 0))
    }, [items])

    const tax = Math.round(subTotal * 0.18);
    const deliveryCharge = Math.round(subTotal > 200 ? 45 : 25);
    const surgeCharge = Math.round(subTotal > 200 ? 30 : 15);
    const discount = Math.round(subTotal * 0.20);
    const toPay = Math.round(subTotal + deliveryCharge + surgeCharge - discount)

    const placeOrderHandler = () => {
        const body = {
            modeOfPayment: 'CoD',
            orderValue: toPay,
            tax: tax,
            deliveryCharge: deliveryCharge,
            surgeCharge: surgeCharge,
            discount: discount,
            orderDetails: items.map((data) => { return { item: data._id, restaurant: data.restaurant, qty: data.qty } })
        };
        axios.post('/api/placeorder', body).then((res) => {
            console.log(res);
            navigate('/orderplacedsuccess')
        }).catch((err) => {
            console.log(err);
            navigate('/orderplacedfail')
        })
        // console.log(body);
    }

    return (
        <>
            <Header />
            <Container className={classes.container} maxWidth={'sm'}>
                <Typography variant='h4' fontWeight={600} marginBottom={1} align='center'>Billing Pages</Typography>
                <Grid container sx={{ mb: 3 }}>
                    <Grid item xs={12} sx={{}}>
                        <Paper elevation={15} className={classes.paper}>
                            <Typography sx={{ mt: 1.5, fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    SubTotal
                                </span>
                                <span>
                                    {subTotal} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Typography sx={{ mt: 1.5, fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    Tax (GST 18%)
                                </span>
                                <span>
                                    {tax} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Typography sx={{ mt: 1.5, fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    Delivery Charge
                                </span>
                                <span>
                                    {deliveryCharge} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Typography sx={{ mt: 1.5, fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    Surge Charge
                                </span>
                                <span>
                                    {surgeCharge} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Typography sx={{ mt: 1.5, fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    Discount
                                </span>
                                <span>
                                    {discount} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Typography sx={{ mt: 1.5, mb: 1.5, fontWeight: '800', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'green' }}>
                                <span>
                                    Bill Amount
                                </span>
                                <span>
                                    {toPay} Rs.
                                </span>
                            </Typography>
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
                <Typography align='center' fontWeight={600} variant="h6">
                    Order Summary
                </Typography>
                <Paper elevation={15}>
                    <Grid container>
                        <Grid item xs={12} >
                            <Typography>{items.length} items</Typography>
                            <Grid container sx={{ fontWeight: 600 }}>
                                <Grid item xs={1.5} sx={{ textAlign: 'center', backgroundColor: 'lightblue' }}>S.N</Grid>
                                <Grid item xs={10.5} sx={{ textAlign: 'center', backgroundColor: 'lightblue' }}>Item Name</Grid>
                            </Grid>
                            {
                                items.map((item, ind) => {
                                    return (
                                        <Grid container>
                                            <Grid item xs={1.5} sx={{ textAlign: 'center' }}>{ind + 1}</Grid>
                                            <Grid item xs={10.5} sx={{ textAlign: 'center' }}>{item.name} :- {item.qty} qty x {item.srp} price = {item.srp * item.qty}</Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <span className={classes.fab}>
                <Fab variant='extended' color='secondary' onClick={placeOrderHandler}>
                    Proceed
                    <ArrowCircleRightIcon sx={{ fontWeight: '800' }} />
                </Fab>
            </span>
        </>
    )
};

export default Billing;