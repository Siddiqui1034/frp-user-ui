import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Header = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} >
        <Box sx={{textAlign:'center', fontSize: '3rem', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          Customer Portal
        </Box>
      </Grid>
    </Grid>  
  )
}

export default Header
