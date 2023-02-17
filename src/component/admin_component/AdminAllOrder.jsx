import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Avatar, Button, Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'

const useStyles = makeStyles(theme => ({
    container:{
        marginTop:theme.spacing(20)
    }
}));

const AdminAllOrder = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [allOrders,setAllOrders]=useState([]);
    useEffect(()=>{
        axios.get('/api/allorders').then((res)=>{
            console.log(res);
            setAllOrders(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[]);
    console.log('State All API',allOrders);
    return (
        <>
            <AdminHeader />
            <Container className={classes.container}>
                <Typography variant='h4' fontWeight={600} align="center">All Orders</Typography>
                <Typography align='right'>
                    <Button size='small' variant='outlined'>Add New Order</Button>
                </Typography>
                <Grid container>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>S.N</Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>User</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Order Status</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Order Value</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Details</Grid>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Delete</Grid>
                </Grid>
                {allOrders.map((order, ind) => {
                    return (
                        <Grid container>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{ind + 1}</Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt:1.5 }} ><Avatar src={order.user.image} /> {`${order.user.firstName} ${order.user.lastName}`}</Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{order.orderStatus}</Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {order.orderValue} </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button variant='outlined' sx={{ color: 'orange' }} size='small' onClick={()=>{navigate(`/vieworderdetail/${order._id}`)}}><RemoveRedEyeIcon/></Button></Grid>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <Button variant='outlined' sx={{ color: 'red' }} size='small'><DeleteSweepIcon/></Button> </Grid>
                        </Grid>
                    )
                })}
            </Container>
        </>
    )
};

export default AdminAllOrder;