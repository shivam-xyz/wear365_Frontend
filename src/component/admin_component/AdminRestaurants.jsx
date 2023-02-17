import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import {makeStyles} from '@mui/styles'
import { Button, Container, Grid, Typography } from '@mui/material'
import CreateRestaurantModal from './CreateRestaurantModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    container:{
        marginTop:theme.spacing(18)
    }
}))

const AdminRestaurants = () => {
    const navigate = useNavigate();
    const classes = useStyles()
    const [create_rest_openmodal,setCreate_rest_openmodal]=useState(false);
    const [restaurants,setRestaurants]=useState([])
    const create_rest_onclose=()=>{
        setCreate_rest_openmodal(false)
    }

    const fetchRestaurantsApi=()=>{
        axios.get('/api/restaurant')
        .then((res)=>{
            console.log(res)
            setRestaurants(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchRestaurantsApi()
    },[])

  return (
    <>
        <AdminHeader/>
        <Container className={classes.container}>
            <Typography variant='h4' fontWeight={600} align="center">Restaurants</Typography>
            <Typography align='right'>
                <Button size='small' variant='outlined' onClick={()=>{setCreate_rest_openmodal(true)}}>Add New Restaurant</Button>
            </Typography>
            <Grid container>
                <Grid item xs={1} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>S.N</Grid>
                <Grid item xs={4} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>Restaurant Name</Grid>
                <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>Is Online?</Grid>
                <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>Is Popular?</Grid>
                <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>Update</Grid>
                <Grid item xs={1} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'lightblue',fontWeight:'bold'}}>Delete</Grid>
            </Grid>
            {restaurants.map((restaurant,ind)=>{return(
                <Grid container>
                    <Grid item xs={1} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>{ind+1}</Grid>
                    <Grid item xs={4} sx={{display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>{navigate(`/adminmenus/${restaurant._id}`)}}>{restaurant.name}</Grid>
                    <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> <input checked={restaurant.isOnline} type="checkbox" name="" id="" /> </Grid>
                    <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> <input checked={restaurant.isPopular} type="checkbox" name="" id="" /> </Grid>
                    <Grid item xs={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Button variant='contained' sx={{backgroundColor:'orange'}} size='small'>Update</Button></Grid>
                    <Grid item xs={1} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> <Button variant='contained' sx={{backgroundColor:'red'}} size='small'>Delete</Button> </Grid>
                </Grid>
            )})}
        </Container>
        <CreateRestaurantModal fetchRestaurantsApi={fetchRestaurantsApi} create_rest_openmodal={create_rest_openmodal} create_rest_onclose={create_rest_onclose}/>

    </>
  )
}

export default AdminRestaurants