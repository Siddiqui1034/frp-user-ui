"use client"
import React, { useEffect } from 'react'
import Header from '@/components/Header';
import Loader from '@/components/reusableComponents/Loader';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppCookie } from '@/services/cookies';
import Toaster from '@/components/reusableComponents/Toaster';

export const LayoutWrapper = ({ children }) => {
  const dispatch =useDispatch();
  const isShowLoader = useSelector(state => state?.appReducer?.isShowLoader);
  const isShowToaster = useSelector(state => state?.appReducer?.toaster?.isShowToaster);
  
  useEffect(()=>{
    (async ()=>{
      const isLoggedIn = await AppCookie.isLoggedIn();
      const uid = await AppCookie.getCookie("uid");
      dispatch({ type: "AUTH", payload: {isLoggedIn, uid, cartCount: sessionStorage.cartCount } })
    })()
  }, [])
  
  return (
    <div>
      <Header />
      {children}
      {/* {store?.appReducer?.isShowLoader && <Loader />} */}
      <Footer />
      {isShowLoader && <Loader />} 
      {isShowToaster && <Toaster />}     
    </div>
  )
}

 
