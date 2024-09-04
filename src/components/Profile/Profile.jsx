"use client"
import React, { useEffect, useState } from 'react';
import config from './configuration.json'
import Input from '../reusableComponents/inputControls/Input';
import Button from '../reusableComponents/inputControls/Button';
import { formValidation, fieldValidation, setValuesToForm } from '@/services/validations';
import { AppCookie } from '@/services/cookies';
import { Ajax } from '@/services/ajax';
import { useDispatch } from 'react-redux';
const Profile = () => {

  const [formControls, setFormControls] = useState(config)
  const dispatch = useDispatch();

  const getUserInfo = async () => {    
    try{
      dispatch({type: "LOADER", payload: true})
      const id = await AppCookie.getCookie("id")
      // alert(id) // undefined
      const res = await Ajax.sendGetReq(`cust/getCustomerById?id=${id}`)
      // console.log(1111, res?.data);
      setValuesToForm(formControls, setFormControls, res?.data || {} )
      console.log(1111, res?.data);
    }catch(ex){
      console.log("profile", ex)
    }finally{
      dispatch({type: "LOADER", payload: false})
    }  
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleChange = (eve) => {
    fieldValidation(eve, formControls, setFormControls)
  }

  const handleClick = async () => {
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      // alert("hi")
      if (!isFormValid) return;
      dispatch({ type: "LOADER", payload: true })  
      const id = await AppCookie.getCookie('id')
      const res = await Ajax.sendPutReq(`cust/updateProfile?id=${id}`,{data: dataObj})
      // console.log(11, res);
      const { acknowledged, modifiedCount } = res?.data;
      if(acknowledged && modifiedCount ){
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
  return (
    <>
      <h3 className='text-center my-5'>Profile</h3>
      {
        formControls.map((obj, index) => {
          return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
        })
      }
      <div className='row'>
        <div className='offset-sm-4 col-sm-8'>
          <Button handleClick={handleClick}>Save </Button>
        </div>
      </div>
    </>
  )
}

export default Profile
