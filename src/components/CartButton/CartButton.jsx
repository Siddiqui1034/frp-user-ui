import React, { Fragment } from 'react'
import {CartSVG }from './CartSVG'
import styles from './CartButton.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
const CartButton = () => {

 const count = useSelector((state)=> state?.appReducer?.cartCount)
   
  return (
    <Fragment>
        <Link href='/cart' className={`${styles.cartSVG}`} >
         <CartSVG />
         <span>{count}</span>
        </Link>      
    </Fragment>
  )
}

export default CartButton
