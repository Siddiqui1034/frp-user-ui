import React, {useEffect, useRef, useState} from 'react'
import styles from './Toaster.module.css'
// import { useAppContext } from '@/statemanagement/appContext'

import { useSelector, useDispatch } from 'react-redux'
// import { useAppCtx } from '@/context/appContex'

const Toaster = () => {
    const [count, setCount] = useState(0)
    // const {state, dispatch} = useAppCtx();
    const dispatch = useDispatch();
    const {toasterMessage, toasterBG} = useSelector((state)=>{
        return state?.appReducer?.toaster 
    })
    const intervalref = useRef();

    useEffect(()=>{
        intervalref.current = setInterval(()=>{
            setCount((prev)=>{
                if(prev > 250 ){
                fnClear();
                }
                return prev + 1;
            })
        }, 33 )
    }, [])

    const fnHideToaster = () =>{
        fnClear();
    }
    
    const fnClear = () =>{
        clearInterval(intervalref.current)
        setCount(0)
        dispatch({
            type: "TOASTER",
            payload: {
                isShowToaster: false,
                toasterMessage: "",
                toasterBG: ""
            }
        })
    }

  return (
    <div  className={`${styles.appToaster}`}>
      <span className='ms-2'>{toasterMessage}</span>
      <b onClick={fnHideToaster} className={`${styles.button}`}>X</b>
    <div style={{ width: 0, background: toasterBG}}></div>
    </div>
  )
}

export default Toaster
