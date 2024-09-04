import React from 'react'
import styles from './Menu.module.css'
import Link from 'next/link'
import config from './configuration.json'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'

const Menu = () => {

  const dispatch = useDispatch();

  const handleMenuClick =(eve)=>{
    // alert("Menu Item clicked")
    eve.stopPropagation();
    dispatch({ type: "MENU", payload: false })
    // console.log(eve.target.id)
    if(eve?.target?.id === 'logout'){
      dispatch({ type: 'AUTH', payload: { isLoggedIn: false, uid: ''} });
      sessionStorage.clear();
      AppCookie.clearCookie();
    }
  }

  return (
    <div className={`${styles.menu}`}>
      {
        config?.map(({path, label, id})=>{
            return <Link key={id} onClick={handleMenuClick} id={id} href={`/${path}`}>{label}</Link>
        })
      }
    </div>
  )
}

export default Menu
