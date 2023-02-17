import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    box: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        top: '50%',
        width: '400px',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '20px',
        background: 'linear-gradient(to bottom, #00ff99 0%, #33cccc 100%)'
    }
}));

const CreateRestaurantModal = ({ create_rest_openmodal, create_rest_onclose,fetchRestaurantsApi }) => {
    const classes = useStyles();
    const [inputField, setInputField] = useState({
        name: '',
        mobile: '',
        email: '',
        pan: '',
        address: '',
        image: '',
        restaurantType: '',
        offerText: ''
    })
    const changeHandler = (e) => {
        let { name, value } = e.target;
        setInputField({ ...inputField, [name]: value });
    }

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('name',inputField.name);
        formData.append('mobile',inputField.mobile);
        formData.append('email',inputField.email);
        formData.append('address',inputField.address);
        formData.append('myFile',inputField.image);
        formData.append('offerText',inputField.offerText);
        formData.append('pan',inputField.pan);
        formData.append('restaurantType',inputField.restaurantType);

        axios.post('/api/restaurant',formData)
        .then((res)=>{
            console.log(res)
            fetchRestaurantsApi()
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(inputField)
    }
    return (
        <>
            <Modal
                open={create_rest_openmodal}
                onClose={create_rest_onclose}
            >
                <Box className={classes.box}>
                    <Typography variant='h6' fontWeight={800}>New Restaurant</Typography>
                    <TextField onChange={(e) => { changeHandler(e) }} name="name" value={inputField.name} label="Restaurant Name" type='text' sx={{ mt: 2 }} size="small" autoFocus />
                    <TextField onChange={(e) => { changeHandler(e) }} name="mobile" value={inputField.mobile} label="Mobile On Restaurant" type='text' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="email" value={inputField.email} label="Email" type='text' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="pan" value={inputField.pan} label="PAN Number" type='text' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="address" value={inputField.address} label="Restaurant Full Address" multiline rows={5} type='text' sx={{ mt: 2 }} size="small" />
                    <Button variant='outlined' component="label" sx={{ mt: 2 }}>
                        Upload Image
                        <input hidden onChange={(e) => { setInputField({ ...inputField, image: e.target.files[0] }) }} type="file" />
                    </Button>
                    <FormControl sx={{ width: '210px', mt: 2 }}>
                        <InputLabel id='linkit'>Restaurant Type</InputLabel>
                        <Select onChange={(e) => { changeHandler(e) }} name="restaurantType" value={inputField.restaurantType}
                            labelId='linkit'
                            label="Restaurant Type"
                        >
                            <MenuItem value=" ">Select Restaurant Type</MenuItem>
                            <MenuItem value="Veg">Veg</MenuItem>
                            <MenuItem value="Non-Veg">Non Veg</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField onChange={(e) => { changeHandler(e) }} name="offerText" value={inputField.offerText} label="Offer Text / Description" type='text' sx={{ mt: 2 }} size="small" />
                    <Button type='submit' variant='contained' sx={{ mt: 2 }} onClick={submitHandler}>Create New Restaurant</Button>

                </Box>
            </Modal>
        </>
    )
}

export default CreateRestaurantModal