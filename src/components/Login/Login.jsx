"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input'
import Button from '../reusableComponents/inputControls/Button'
import { fieldValidation, formValidation } from '@/services/validations'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies';
import Loader from '../reusableComponents/Loader'
import { useRouter } from 'next/navigation';

const Login = () => {

  const [formControls, setFormControls] = useState(config)
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    // try {
    //   const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
    //   if (!isFormValid) return;
    //   dispatch({
    //     type: "LOADER",
    //     payload: true
    //   });

    //   const res = await Ajax.sendPostReq("cust/login", { data: dataObj });
    //   const { token, _id, uid } = res?.data?.data;

    //   if (token) {
    //     alert('Success')
    //     sessionStorage.setItem("token", token)
    //     AppCookie.setCookies("token", token);
    //     AppCookie.setCookies("id", _id);
    //     AppCookie.setCookies("uid", uid);
    //     dispatch({ type: "AUTH", payload: { isLoggedIn: true, uid } })
    //     if (sessionStorage.pathName) {
    //       router.push(sessionStorage.pathName)
    //       sessionStorage.pathName = "";
    //     } else {
    //       router.push('/')
    //     }
    //   } else {
    //     dispatch({
    //       type: "TOASTER", payload: {
    //         isShowToaster: true,
    //         toasterMessage: "Please Checked Entered Uid or Pwd",
    //         toasterBG: 'red'
    //       }
    //     })
    //   }

    // } catch (ex) {
    //   console.error("Login.tsx", ex)
    //   dispatch({ type: "AUTH", payload: { isLoggedIn: false, uid: '' } })
    // } finally {
    //   dispatch({ type: "LOADER", payload: false })
    // }
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      if (!isFormValid) return;
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.sendPostReq("cust/login", { data: dataObj })
      console.log(110, res.data); // Now you can write condition
      // if(res?.data?.length > 0){ // res.data is object so we can not check length of object if it is array then only we can check for length

      const { token, _id, uid } = res?.data?.data;
      if (token) {
        sessionStorage.setItem("token", token)
        // sessionStorage.cartCount = count;
        AppCookie.setCookie("token", token)
        AppCookie.setCookie("id", _id)
        AppCookie.setCookie("uid", uid)
        // AppCookie.setCookie('image', profile);
        // dispatch({ type: "Auth", payload: true })
        // dispatch({ type: "AUTH", payload: { isLoggedIn: true, uid, cartCount: count, image: profile } })
        dispatch({ type: "AUTH", payload: { isLoggedIn: true, uid } })
        if (sessionStorage.pathName) {
          debugger;
          router.push(sessionStorage.pathName)
          sessionStorage.pathName = "";
        } else {
          router.push('/')
        }
      }
      else {
        dispatch({
          type: "TOASTER",
          payload: {
            isShowToaster: true,
            toasterMessage: "Please Checked Entered Uid or Pwd",
            toasterBG: "red"
          }
        })
      }
    }
    catch (exception) {
      console.error("Login Page exception", exception);
      dispatch({ type: "AUTH", payload: { isLoggedIn: false, uid: '' } })
    }
    finally {
      dispatch({ type: "LOADER", payload: false })
    }
  }

  const handleChange = (eve) => {
    fieldValidation(eve, formControls, setFormControls);
  }

  return (
    <div className='row container-fluid'>

      <h3 className='text-center my-5'>Login</h3>
      {
        formControls.map((obj, index) => {
          return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
        })
      }
      <div className='row'>
        <div className='offset-sm-4 col-sm-8'>
          <Button handleClick={handleClick}>Login</Button>
          <Link className='ms-3' href="register">register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
