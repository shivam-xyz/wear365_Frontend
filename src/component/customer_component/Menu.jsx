import { Box, Button, Card, Container, Fab, Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import logo from '../../logo.svg'
import Header from './Header'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10)
    },
    box: {
        // padding: '5px'
    },
    qtyDisplay: {
        padding: '5px'
    },
    fab: {
        position: 'fixed',
        bottom: 30,
        right: 40
    }


}))

const Menu = () => {
    const [menus, setMenus] = useState([])
    const param = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/api/menu').then((res) => {
            console.log(res);
            setMenus(res.data.filter((fil) => { return fil.restaurant == param.id }).map((ele) => { return { ...ele, qty: 0 } }));
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    console.log(menus);
    const incQty = (menu) => {
        const updatedMenu = menus.map((ele) => {
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
        setMenus(updatedMenu)
        console.log('49', updatedMenu)
    };
    const decQty = (menu) => {
        const updatedMenu = menus.map((ele) => {
            if (ele._id == menu._id) {
                if (ele.qty > 0) {
                    return { ...ele, qty: ele.qty - 1 }
                }
                else {
                    return ele
                }
            }
            return ele;
        });
        setMenus(updatedMenu)
    }
    const addToCart = (menu) => {
        const getCartExistingData = JSON.parse(localStorage.getItem('cartItems'))
        if (getCartExistingData == null || getCartExistingData == undefined || getCartExistingData == '' || getCartExistingData == ' ' || getCartExistingData == 'null' || getCartExistingData == 'undefined') {
            if (menu.qty<=0) {
                alert('Kindly select some quantity,then try to add in Cart');
            }
            else {
                localStorage.setItem('cartItems', JSON.stringify([menu]));
            }
        }
        else {
            if (menu.qty<=0) {
                alert('Kindly select some quantity,then try to add in Cart')
            }
            else {
                const updateCartArray = [...getCartExistingData, menu]
                localStorage.setItem('cartItems', JSON.stringify(updateCartArray));
            }
        }
    }
    return (
        <>
            <Header />
            <Container className={classes.container}>
                <Grid container spacing={1}>
                    {
                        menus.map((menu) => {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.box} elevation={24}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <img src={menu.image} height='170px' alt="image" width='100%' />
                                            </Grid>
                                            <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography fontWeight={600} fontSize={'large'}>{menu.name}</Typography>
                                                <Box sx={{ mt: 1, mb: 1 }}>
                                                    <Button variant='contained' size='small' onClick={() => { decQty(menu) }}>-</Button>
                                                    <span className={classes.qtyDisplay}>{menu.qty}</span>
                                                    <Button variant='contained' size='small' onClick={() => { incQty(menu) }}>+</Button>
                                                </Box>
                                                <Typography>{menu.foodType}</Typography>
                                                <Button variant='contained' size='small' onClick={() => { addToCart(menu) }}>Add to Cart</Button>
                                            </Grid>
                                        </Grid>
                                        <></>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <span className={classes.fab}>
                    <Fab variant='extended' color='secondary' onClick={() => { navigate('/cart') }}>
                        Proceed
                        <ArrowCircleRightIcon sx={{ fontWeight: '800' }} />
                    </Fab>
                </span>
            </Container>
        </>
    )
}

export default Menu