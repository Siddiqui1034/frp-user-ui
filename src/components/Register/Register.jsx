"use client"
import React, { useState } from 'react'
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input'
import Button from '../reusableComponents/inputControls/Button/Button'
// import Input from '@/reusableComponents/inputControls/Input/Input'
// import Button from '@/reusableComponents/inputControls/Button/Button';
import { clearValuesFromForm, fieldValidation, formValidation } from '@/services/validations'
import { useAppCtx as useAppContext } from '@/context/appContex'
import { AppCookie } from '@/services/cookies';
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { Ajax} from '@/services/ajax'

export const Register = () => {

  const [formControls, setFormControls] = useState(config)
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      // alert("hi")
      if (!isFormValid) return;  
      dispatch({
        type: "LOADER", 
        payload: true
      })  
      const res = await Ajax.sendPostReq("cust/register",{data: dataObj})
      // console.log(11, res);
      const {acknowledged, insertedId} = res?.data;
      if(acknowledged && insertedId){
        alert('success')
        clearValuesFromForm(formControls, setFormControls)
      } else {
        
      }     
    }
    catch (exception) {
      console.error("Login Page exception", exception);
    }
    finally {
      dispatch({
        type: "LOADER", 
        payload: false
      })
    }
  }

  const handleChange = (eve) => {
    fieldValidation(eve, formControls, setFormControls);
  }

  return (
    <div className='row container-fluid'>
      <h3 className='text-center my-5'>Register</h3>
      {
        formControls.map((obj, index) => {
          return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
        })
      }   
      <div className='row'>
        <div className='offset-sm-4 col-sm-8'>
          <Button handleClick={handleClick}>Register </Button>
          <Link className='ms-3' href='login'>Login</Link>
        </div>
      </div>  
    </div>
  )
}

