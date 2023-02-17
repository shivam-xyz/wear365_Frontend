import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import Header from './Header';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10)
    }
}));

const OrderTrack = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const [order, setOrder] = useState([])
    useEffect(() => {
        axios.get('/api/activeorder').then((res) => {
            console.log(res);
            setOrder(res.data)
        }).catch((err) => {
            console.log(err);
            navigate('/loginuser')
        })
    }, [])
    console.log(26, order)
    return (
        <>
            <Header />
            <Container className={classes.container}>
                <Typography fontWeight={800} variant='h5'>My Active Orders</Typography>
                <Grid container spacing={2}>
                    {
                        order.map((data) => {
                            return (
                                <Grid item xs={12} md={6} >
                                    <Accordion>
                                        <AccordionSummary sx={{ backgroundColor: 'lightblue' }} className={classes.as} expandIcon={<UnfoldMoreIcon />}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography textAlign={'center'} fontWeight="800">Current Order Status : <span style={{color:'green'}}>{ data.orderStatus}</span></Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <span>
                                                        ID: {data._id}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    MoP : {data.modeOfPayment}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    Order Value : {data.orderValue} Rs.
                                                </Grid>
                                                <Grid xs={12}>
                                                    Restaurants From : [{  [...new Set(data.orderDetails.map((m)=>{return ` ${m.restaurant.name}, ` }))]  }]
                                                </Grid>
                                            </Grid>
                                        </AccordionSummary>
                                        {console.log(57, data.orderDetails)}
                                        <AccordionDetails sx={{ backgroundColor: 'lightseagreen' }}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Grid container sx={{backgroundColor:'lightpink'}}>
                                                        <Grid item xs={1} md={1}>S.N</Grid>
                                                        <Grid item xs={4} md={5}> Restaurant</Grid>
                                                        <Grid item xs={4} md={4}> Item</Grid>
                                                        <Grid item xs={1} md={1}>Qty</Grid>
                                                        <Grid item xs={2} md={1}>SRP</Grid>
                                                    </Grid>
                                                </Grid>
                                                {
                                                    data.orderDetails.map((item, ind) => {
                                                        return (
                                                            <Grid item key={ind} xs={12}>
                                                                <Grid container>
                                                                    <Grid item xs={1} md={1}>{ind + 1}</Grid>
                                                                    <Grid item xs={4} md={5}>{item.restaurant.name}</Grid>
                                                                    <Grid item xs={4} md={4}>{item.item.name}</Grid>
                                                                    <Grid item xs={1} md={1}>{item.qty}</Grid>
                                                                    <Grid item xs={2} md={1}>{item.item.srp}</Grid>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    )
};

export default OrderTrack;