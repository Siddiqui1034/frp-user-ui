"use client"
import React, { useEffect, useState } from 'react'
import styles from './BuyNow.module.css'
import Address from '../Address/Address'
import { useDispatch } from 'react-redux'
// import { usePathname } from 'next/navigation'
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies'
import { useRouter } from 'next/navigation'
// import { handleToaster } from '@/services/functions'

const BuyNow = (props) => {

  const [product, setProduct] = useState({})
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = props?.params
  // const pathName = usePathname(); 

  const getProductDetails = async () => {
    try {
      dispatch({ type: "LOADER", payload: true })
      // debugger;
      const res = await Ajax.sendGetReq(`cust/getProductById?id=${id}`)
      // console.log(2224, res);
      // console.log(2225, res?.data);
      // debugger;
      setProduct(res?.data)
    } catch (ex) {
      console.error("BuyNow", ex);
      setProduct({})
    } finally {
      dispatch({ type: "LOADER", payload: false })
    }
  }

  useEffect(()=>{
    getProductDetails();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  // useEffect(() => {
  //   getProductDetails();
  // }, [])

  const handleSaveOrder = async () => {
    try{
      dispatch({type: "LOADER", payload: true })
      const id = await AppCookie.getCookie("id")
      const dataObj = { productId: product._id, uid: id }
      const res = await Ajax.sendPostReq('cust/save-order', {data: dataObj })
      const { acknowledged, insertedId, message } = res.data;
      if (acknowledged && insertedId) {
        handleToaster( dispatch, 'Order Placed', 'green')
        router.push('/orders')
      }else {
        handleToaster(dispatch, message, 'red')
      }
    } catch(ex){
      console.error('BuyNow', ex)
    } finally {
      dispatch({ type: "LOADER", payload: false })
    }
  }

  const fnProceed = async () => {
    try {

      dispatch({ type: "LOADER", payload: true })
      const id = await AppCookie.getCookie("id")
      const dataObj = { productId: product._id, customerId: id }
      // console.log("BuyNow 122", dataObj)
      const res = await Ajax.sendPostReq('cust/saveOrder', { data: dataObj })
      // console.log("BuyNow 123", res)
      const { acknowledged, insertedId, message } = res?.data;
      // debugger;
      if (acknowledged && insertedId ) {
        // handleToaster(dispatch, 'Order placed', 'green')
        // debugger;
        router.push('/orders')
      }
      else {
        // handleToaster(dispatch, message, 'red')
      }
    } catch (ex) {
      console.error("BuyNow", ex);
    } finally {
      dispatch({ type: "LOADER", payload: false })
    }
  }

  return (
    <div className={`${styles.orderNow}`}>
      <Address />
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>Item Name:</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product?.name}</td>
              <td>{product?.cost}</td>
            </tr>
            <tr>
              <td>Charges</td>
              <td>40</td>
            </tr>

            <tr>
              <td><b>{product?.name} </b></td>
              <td><b>{product?.cost + 40} </b></td>
            </tr>

          </tbody>
        </table>
        <p>
          <button onClick={fnProceed} className='btn btn-primary'>Proceed</button>
        </p>
      </div>
    </div>
  )
}

export default BuyNow
