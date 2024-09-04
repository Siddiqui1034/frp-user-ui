"use client"
import React,  { useState, useEffect, useCallback } from 'react'
import styles from './Cart.module.css'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'
import { Ajax } from '@/services/ajax'
import { AppTable } from '../reusableComponents/AppTable'
import {useRouter} from 'next/navigation'
const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const getCartItems = async () => {
    dispatch({type: "LOADER", payload: true})
    const id= await AppCookie.getCookie("id")
    try{
      const res = await Ajax.sendGetReq('cust/cartList', { id })
      console.log("cart Product", res?.data);   
      setCartItems(res?.data)         
    }
    catch (ex) {
      console.error(ex)
    }
    finally{
      dispatch({type: "LOADER", payload: false })
    }
  }

  const handleDelete = useCallback( async (obj) => {
    // console.log('delete', obj)
    dispatch({type: "LOADER", payload: true})
    const id = await AppCookie.getCookie("id")
    try{
      const res = await Ajax.sendDeleteReq(`cust/deleteCart?uid=${obj.uid}&productId=${obj.productId}`)
      // console.log("cart Product", res?.data); 
      const { acknowledged, deleteCount, count } = res?.data;
      if(acknowledged && deleteCount) {
        // getCartItems(res?.data) 
        setCartItems(res?.data)
        // handleToaster(dispatch, "Deleted from cart", "green")
      }           
    }
    catch (ex) {
      console.error(ex)
      // handleToaster(dispatch, "Not deleted", "red")
    }
    finally{
      dispatch({type: "LOADER", payload: false })
    }

  }, [])

  const handleBuyNow = useCallback((obj) => {
    console.log('buynow', obj)
    try{
      router.push(`/buy-now/${obj?.productId}`)
    }
    catch(ex){
      console.error(ex.message)
    }finally{

    }
  },[])

  useEffect(()=>{
    getCartItems();
  }, []); 

  return (
    <div>
      <h3 className='text-center'> Cart Details </h3>
      <AppTable hasImage={true} 
                imageHeader = {["Product Image"]}
                imageColumns = {["path"]}
                headings = {["Name", "Cost"]}
                data = {cartItems}
                columns = {["name", "cost"]}
                isShowDelete = {true}
                handleDelete = {handleDelete}
                isShowBuyNow = {true}
                handleBuyNow = {handleBuyNow}
      />
    </div>
  )
}

export default Cart
