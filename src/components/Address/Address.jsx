"use client"
import React, { useEffect, useState } from 'react'
import styles from './Address.module.css'
import Popup from '../reusableComponents/Popup'
import config from './configuration.json'
import { fieldValidation, formValidation, clearValuesFromForm } from '@/services/validations'
import Input from '../reusableComponents/inputControls/Input'
import { Ajax } from '@/services/ajax'
import { useDispatch } from 'react-redux'
// import {handleToaster }from '@/services/functions'


const Address = () => {
  const [addressList, setAddressList] = useState([])
  const [formControls, setFormControls] = useState(config)
  const [isShowPopup, setIsShowPopup] = useState(false)
  const dispatch = useDispatch();

  const getAddressList = async () => {

    try {     
      dispatch({ type: "LOADER", payload: true })    
      const res = await Ajax.sendGetReq("cust/addressList");   
      setAddressList(res?.data) 
    }
    catch (ex) {
      // console.log("Login.txc", ex);
      setAddressList([]) 
      // handleToaster(dispatch, ex.message, "red")
    }
    finally {
      dispatch({ type: "LOADER", payload: false})
    }
  }

  useEffect(()=>{
    getAddressList();
  }, [])
  const handlePopup = () => {
    setIsShowPopup(!isShowPopup)
  }
  const handleFormSubmit = async () => {
    try {
      const [isFormValid, dataObj] = formValidation(formControls, setFormControls)
      if (!isFormValid) return;
      setIsShowPopup(false);
      dispatch({ type: "LOADER", payload: true })

      const res = await Ajax.sendPostReq("cust/saveAddress", {data: dataObj});   
      const { acknowledged, insertedId } = res?.data;
      if (acknowledged && insertedId){
        getAddressList();
        // handleToaster(dispatch, "address saved", "green")
        clearValuesFromForm(formControls, setFormControls);
      }
      else{
        // handleToaster(dispatch, "address not saved", "red")
      }
    }
    catch (ex) {
      console.log("Login.txc", ex);
      // handleToaster(dispatch, ex.message, "red")
    }
    finally {
      dispatch({ type: "LOADER", payload: false})
    }
  }

  const handleChange = (eve) => {
    fieldValidation(eve, formControls, setFormControls);
  }

  return (
    <div>
      <button onClick={handlePopup} className={`btn btn-primary`}> Add Address </button>
      <div>
        {
          addressList.map((obj, val, index) => {
            return <div key={index}>
              <input type='radio' name='address' /> 
              {obj?.address}
            </div>
          })
        }
      </div>
      {
        isShowPopup && <Popup closePopup={handlePopup} handleFormSubmit={handleFormSubmit}>
          {
            formControls.map((obj, index) => {
              return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
            })
          }
        </Popup>
      }
    </div>
  )
}

export default Address
