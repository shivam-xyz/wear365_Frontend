import { Box, Card, Container, Grid, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../logo.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10)
  },
  box: {
    padding: '5px'
  }
}))

const VendorCard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/restaurant').then((res) => {
      console.log(res);
      setRestaurants(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  console.log(31, restaurants)
  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={1}>
          {
            restaurants.map((restaurant) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={3} onClick={() => { navigate(`/menu/${restaurant._id}`) }} >
                  <Paper className={classes.box} elevation={16}>
                    <Grid container>
                      <Grid item xs={12}>
                        <img src={restaurant.image} height='200px' alt="image" width='100%' />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', fontSize: 'large' }}>
                            {restaurant.name}
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            {restaurant.restaurantType}
                          </Grid>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            {restaurant.offerText}
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            {restaurant.mobile}
                          </Grid>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            PAN:{restaurant.pan}
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            {restaurant.email}
                          </Grid>
                          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>
                            Address Here
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <></>
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </>
  )
}

export default VendorCard