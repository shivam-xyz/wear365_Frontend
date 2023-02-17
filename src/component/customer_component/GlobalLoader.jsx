import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { context } from '../../GlobalContexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        top: '50%',
        left: '50%'
    }
}));

const GlobalLoader = () => {
    const classes = useStyles();
    const {userProfile,getUserProfile} = useContext(context);
    console.log('Loader',userProfile);
    useEffect(()=>{
        getUserProfile();
        if(userProfile.length===0){
            getUserProfile();
            
        }
    },[])
    return (
        <>
            <Container>
                <Box sx={{ display: 'flex',justifyContent:'center',mt:'50vh' }}>
                    <CircularProgress sx={{height:'150px',width:'150px'}} />
                </Box>
            </Container>
        </>
    )
};

export default GlobalLoader;