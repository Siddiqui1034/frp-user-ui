"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppCookie } from '@/services/cookies'
import { Ajax } from '@/services/ajax'
import styles from './Orders.module.css'
import { useRouter } from 'next/navigation'
import { AppTable } from '../reusableComponents/AppTable'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const router = useRouter()
  const dispatch = useDispatch();

  const getOrders = async () => {
    dispatch({type: "LOADER", payload: true})
    const id= await AppCookie.getCookie("id")
    try{      
      const res = await Ajax.sendGetReq(`cust/ordersList?id=${id}`);     
      // console.log("Orders", res); 
      setOrders(res?.data)                 
    }
    catch (ex) {
      console.error(ex)
    }
    finally{
      dispatch({type: "LOADER", payload: false })
    }
  }

  useEffect(()=>{
    getOrders();
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

  return (
    <div className={`${styles.ordersDiv}`}>      
      <h3 className='text-center'>Order List</h3>
      <AppTable hasImage={true} 
                imageHeader = {["Product Image"]}
                imageColumns = {["path"]}
                headings = {["Name", "Cost"]}
                data = {orders}
                columns = {["name", "cost"]}
                isShowBuyNow = {true}
                handleBuyNow = {handleBuyNow}
      />
    </div>
  )
}

export default Orders
