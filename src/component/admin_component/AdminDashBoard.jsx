import { Card, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(18)
    }
}))

const AdminDashBoard = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    return (
        <>
            <AdminHeader />
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }} >Active Orders</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }} onClick={()=>{navigate('/allorders')}} >All Orders</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>All Menus</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }} onClick={()=>{navigate('/adminrestaurants')}}> All Restaurants</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Users</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Tokens</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Addresses</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Stores</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Carts</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Banners</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #339966 0%, #3333ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Gateways</Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Card elevation={16} sx={{ height: '150px', background: 'linear-gradient(to bottom, #3399ff 0%, #99ff66 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800' }}>Notifications</Card>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default AdminDashBoard