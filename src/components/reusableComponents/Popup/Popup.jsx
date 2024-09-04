import React, { useEffect, useState } from 'react'
import styles from './Popup.module.css'

const Popup = ( {closePopup, handleFormSubmit, children}) => {
  
  const [right,setRight] = useState(-400)

  useEffect(()=>{
    setRight(0)
  }, [])

  return (
  <> 
    <div className={styles.popupMask}>      
    </div>
    <div style={{right}} className={`py-2 container-fluid ${styles.popupContent}`}>
        
        <b onClick={closePopup} className={`${styles.popupCloseBtn}`}>X</b>

        <div className={`mt-5`}>
            {children}
        </div>

        <button  onClick={handleFormSubmit} className={`btn btn-primary ${styles.popupSubmitBtn}`}>Submit</button>
    </div>
     </>  
  )
}

export default Popup
