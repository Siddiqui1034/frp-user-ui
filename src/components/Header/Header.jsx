import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

const Header = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} justify="space-between">
        <Box sx={{ textAlign: 'center', fontSize: '3rem', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          <Link href='/' className='float-start'>
            <img src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Image" width={75} height={75} />
          </Link>
          Customer Portal
        </Box>
      </Grid>
    </Grid>
  )
}

export default Header
