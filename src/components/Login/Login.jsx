"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../../reusableComponents/inputControls/input/input'
import Button from '../../reusableComponents/inputControls/Button/Button';
import { fieldValidation, formValidation } from '@/services/validations'
import { useAppCtx as useAppContext } from '@/context/appContex';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Ajax } from '@/services/ajax'
import { AppCookie } from '@/services/cookies';
import Loader from '@/reusableComponents/Loader/Loader';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [formControls, setFormControls] = useState(config)
  // const { dispatch } = useAppContext();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      if (!isFormValid) return;
      dispatch({
        type: "LOADER",
        payload: true
      })
      const res = await Ajax.sendPostReq("cust/login", { data: dataObj });
      const { token, _id, uid } = res?.data?.data
      if (token) {
        sessionStorage.setItem("token", token)
        AppCookie.setCookies("token", token);
        AppCookie.setCookies("id", _id);
        AppCookie.setCookies("uid", uid);
        dispatch({ type: "AUTH", payload: { isLoggedIn: true, uid } })
        if (sessionStorage.pathName) {
          router.push(sessionStorage.pathName)
          sessionStorage.pathName = "";
        } else {
          router.push('/')
        }
      } else {
        dispatch({
          type: "TOASTER", payload: {
            isShowToaster: true,
            toasterMessage: "Please Checked Entered Uid or Pwd",
            toasterBG: 'red'
          }
        })
      }

    } catch (ex) {
      console.error("Login.tsx", ex)
      dispatch({ type: "AUTH", payload: { isLoggedIn: false, uid: '' } })
    } finally {
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
        <div className='offset-sm-5 col-sm-7'>
          <Button handleClick={handleClick} > Login</Button>
          <Link className='ms-3' href="register">register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
