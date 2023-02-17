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

const CreateRestaurantModal = ({ create_menu_openmodal,param, create_menu_onclose,fetchMenusApi }) => {
    const classes = useStyles();
    const [inputField, setInputField] = useState({
        name: '',
        mrp: '',
        srp: '',
        description: '',
        offerText: '',
        image: '',
        foodType: '',
        ingred: ''
    })
    const changeHandler = (e) => {
        let { name, value } = e.target;
        setInputField({ ...inputField, [name]: value });
    }

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('name',inputField.name);
        formData.append('mrp',inputField.mrp);
        formData.append('srp',inputField.srp);
        formData.append('description',inputField.description);
        formData.append('myFile',inputField.image);
        formData.append('offerText',inputField.offerText);
        formData.append('ingred',inputField.ingred);
        formData.append('foodType',inputField.foodType);
        formData.append('restaurant',param.id)

        axios.post('/api/menu',formData)
        .then((res)=>{
            console.log(res)
            fetchMenusApi()
        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log(inputField)
    }
    return (
        <>
            <Modal
                open={create_menu_openmodal}
                onClose={create_menu_onclose}
            >
                <Box className={classes.box}>
                    <Typography variant='h6' fontWeight={800}>New Menu</Typography>
                    <TextField onChange={(e) => { changeHandler(e) }} name="name" value={inputField.name} label="Product Name" type='text' sx={{ mt: 2 }} size="small" autoFocus />
                    <TextField onChange={(e) => { changeHandler(e) }} name="mrp" value={inputField.mrp} label="MRP" type='number' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="srp" value={inputField.srp} label="SRP" type='number' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="description" value={inputField.description} label="Description" type='text' sx={{ mt: 2 }} size="small" />
                    <TextField onChange={(e) => { changeHandler(e) }} name="offerText" value={inputField.offerText} label="About Offer" multiline rows={5} type='text' sx={{ mt: 2 }} size="small" />
                    <Button variant='outlined' component="label" sx={{ mt: 2 }}>
                        Upload Image
                        <input hidden onChange={(e) => { setInputField({ ...inputField, image: e.target.files[0] }) }} type="file" />
                    </Button>
                    <FormControl sx={{ width: '210px', mt: 2 }}>
                        <InputLabel id='linkit'>Food Type</InputLabel>
                        <Select onChange={(e) => { changeHandler(e) }} name="foodType" value={inputField.foodType}
                            labelId='linkit'
                            label="Restaurant Type"
                        >
                            <MenuItem value=" ">Select Food Type</MenuItem>
                            <MenuItem value="Veg">Veg</MenuItem>
                            <MenuItem value="Non-Veg">Non Veg</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField onChange={(e) => { changeHandler(e) }} name="ingred" value={inputField.ingred} label="Ingredients" type='text' sx={{ mt: 2 }} size="small" />
                    <Button type='submit' variant='contained' sx={{ mt: 2 }} onClick={submitHandler}>Create New Menu</Button>

                </Box>
            </Modal>
        </>
    )
}

export default CreateRestaurantModal