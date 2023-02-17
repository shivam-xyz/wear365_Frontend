import { Avatar, Box, Container, Divider, Grid, Modal, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(18)
    }
}));

const AdminViewUserOrderDetailsModal = () => {
    const param = useParams();
    const classes = useStyles();
    const [details, setDetails] = useState({});
    useEffect(() => {
        axios.get(`/api/orderdetail/${param.id}`).then((res) => {
            console.log(res);
            setDetails(res.data)
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    console.log(27, details)
    return (
        <>
            <AdminHeader />
            <Container className={classes.container}>
                <Grid container >
                    <Grid item xs={12} textAlign='center' fontWeight={800} sx={{ backgroundColor: 'lightgreen', mb: 1 }}>User Details</Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>{<Avatar src={details.user ? details.user.image : 'Loading...'} />}</Grid>
                    <Grid item xs={12}><Typography textAlign={'center'} fontWeight={600}>{`${details.user ? details.user.firstName : 'Loading...'} ${details.user ? details.user.lastName : 'Loading...'}`}</Typography></Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>UserId : {details.user ? details.user._id : 'Loading...'}</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>UserId : {details._id ? details._id : 'Loading...'}</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>User Email : {details.user ? details.user.email : 'Loading...'}</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>User Mobile : {details.user ? details.user.mobile : 'Loading'}</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>User Gender : {details.user ? details.user.gender : 'Loading...'}</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} textAlign='center' fontWeight={800} sx={{ backgroundColor: 'lightgreen', mb: 1, mt: 1 }}>Order Details</Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>Current Order Status : <span style={{color:'red',fontWeight:'bold'}}> { details.orderStatus ? details.orderStatus : 'Loading...'}</span></Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>OrderValue: {details.orderValue ? details.orderValue : 'Loading...'} Rs.</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>Tax : {details.tax ? details.tax : 'Loading...'} Rs.</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>Surge Charge : {details.surgeCharge ? details.surgeCharge : 'Loading...'} Rs.</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>Delivery Charge : {details.deliveryCharge ? details.deliveryCharge : 'Loading...'} Rs.</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>Discount : {details.discount ? details.discount : 'Loading...'} Rs.</Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>Wallet: {details.wallet ? details.wallet : 'null'} Rs.</Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} textAlign='center' fontWeight={800} sx={{ backgroundColor: 'lightgreen', mb: 1, mt: 1 }}>Order Summary</Grid>
                    {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>From BBC , 2 qty Kadhai Paneer x 9 price = 9999 Rs</Grid> */}
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600', display: 'flex', justifyContent: 'center' }} >S.N</Grid>
                                <Grid item xs={4} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600' }} >Item Name</Grid>
                                <Grid item xs={3} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600' }} >Vendor Name</Grid>
                                <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600', display: 'flex', justifyContent: 'center' }} >Price</Grid>
                                <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600', display: 'flex', justifyContent: 'center' }} >Qty</Grid>
                                <Grid item xs={2} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', fontWeight: '600', display: 'flex', justifyContent: 'center' }} >SubTotal</Grid>
                            </Grid>
                        </Grid>
                        {
                            !details.orderDetails ? 'Null' : details.orderDetails.map((item,ind) => {
                                return (
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', display: 'flex', justifyContent: 'center' }} >{ind+1}</Grid>
                                            <Grid item xs={4} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen' }} >{item.item.name}</Grid>
                                            <Grid item xs={3} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen' }} >{item.restaurant.name}</Grid>
                                            <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', display: 'flex', justifyContent: 'center' }} >{item.item.srp} Rs.</Grid>
                                            <Grid item xs={1} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', display: 'flex', justifyContent: 'center' }} >{item.qty}</Grid>
                                            <Grid item xs={2} sx={{ border: '1px solid blue', backgroundColor: 'lightgreen', display: 'flex', justifyContent: 'center' }} >{item.item.srp*item.qty} Rs.</Grid>
                                        </Grid>
                                        {/* <Typography textAlign='right' fontWeight={600}>Total Amount : 2511 Rs.</Typography> */}
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default AdminViewUserOrderDetailsModal;