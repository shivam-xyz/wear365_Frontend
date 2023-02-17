import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { makeStyles } from '@mui/styles'
import { Button, Container, Grid, Typography } from '@mui/material'
import CreateMenuModal from './CreateMenuModal'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(18)
    }
}))

const AdminMenu = () => {
    const navigate = useNavigate();
    const param = useParams()
    const classes = useStyles()
    const [create_menu_openmodal, setCreate_menu_openmodal] = useState(false);
    const [menus, setMenus] = useState([])
    const create_menu_onclose = () => {
        setCreate_menu_openmodal(false)
    }

    const fetchMenusApi = () => {
        axios.get('/api/menu')
            .then((res) => {
                console.log(res)
                setMenus(res.data.filter((fil) => { return fil.restaurant == param.id }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchMenusApi()
    }, [])

    return (
        <>
            <AdminHeader />
            <Container className={classes.container}>
                <Typography variant='h4' fontWeight={600} align="center">Menus</Typography>
                <Typography align='right'>
                    <Button size='small' variant='outlined' onClick={() => { setCreate_menu_openmodal(true) }}>Add New Menu</Button>
                </Typography>
                <Grid container>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>S.N</Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Item</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Is stock?</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>SRP</Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Update</Grid>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', fontWeight: 'bold' }}>Delete</Grid>
                </Grid>
                {menus.map((menu, ind) => {
                    return (
                        <Grid container>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{ind + 1}</Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >{menu.name}</Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <input checked={menu.isStock} type="checkbox" name="" id="" /> </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {menu.srp} </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button variant='contained' sx={{ backgroundColor: 'orange' }} size='small'>Update</Button></Grid>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <Button variant='contained' sx={{ backgroundColor: 'red' }} size='small'>Delete</Button> </Grid>
                        </Grid>
                    )
                })}
            </Container>
            <CreateMenuModal param={param} fetchMenusApi={fetchMenusApi} create_menu_openmodal={create_menu_openmodal} create_menu_onclose={create_menu_onclose} />

        </>
    )
}

export default AdminMenu