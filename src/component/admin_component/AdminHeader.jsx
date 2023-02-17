import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate()
  return (
    <>
        <AppBar>
            <Toolbar sx={{backgroundColor:'green'}}>
                <Typography variant='h4' onClick={()=>{navigate('/admin')}}>Admin Panel</Typography>
            </Toolbar>
            
            <Toolbar sx={{backgroundColor:'white',color:'black',display:'flex',justifyContent:'space-between'}}>
                <MenuIcon/>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Typography fontWeight={600} margin>Welcome, Admin</Typography>
                    <Avatar/>
                </span>
            </Toolbar>

        </AppBar>
    </>
  )
}

export default AdminHeader