import React from 'react'
import styles from './Header.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import {deepOrange, deepPurple} from '@mui/material/colors';
import Menu from '../Menu/Menu';
import CartButton from '../CartButton';

const Header = () => {
const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=> state?.appReducer.isLoggedIn)
  const isShowMenu = useSelector((state)=> state?.appReducer.isShowMenu)
  const uid = useSelector((state)=> state?.appReducer.uid)
 
  const handleClick = () =>{
    dispatch({ type: "MENU", payload: !isShowMenu })
  }
  return (
    <Grid container spacing={1}>
      <Grid item="true" xs={12} justify="space-between">

        <Box sx={{ textAlign: 'center', fontSize: '3rem', bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          <Link href='/' className='float-start'>
            <img src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Image" width={75} height={75} />
          </Link>
            Customer Portal
            {/* {isLoggedIn ? <b>{uid.slice(0, 1)}</b>: ''}  */}
            {isLoggedIn ? <> <CartButton />
            <Avatar onClick={handleClick} sx={{ cursor:'pointer', bgcolor: deepOrange[500], position:'absolute', top:'20px', right:'30px' }}>{uid?.slice(0,1)}</Avatar> 
            {isShowMenu && <Menu />}
            </>
            : 
            <Link href="/login" className={`float-end ${styles.login}`}>
              Login
            </Link>
            }
            {isShowMenu ? <Menu />: ""}
          
        </Box>

      </Grid>
    </Grid>
  )
}

export default Header
