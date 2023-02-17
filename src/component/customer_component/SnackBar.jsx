import React from 'react'
import {makeStyles} from '@mui/styles'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme)=>({}))


const SnackBar = ({openSnackBar,snackBarCloseHandler}) => {
    const classes = useStyles();
  return (
    <>
        <Snackbar
        open={openSnackBar.status}
        onClose={snackBarCloseHandler}
        autoHideDuration={3000}
        >
            <Alert severity={openSnackBar.color}>{openSnackBar.message}</Alert>
        </Snackbar>
    </>
  )
}

export default SnackBar