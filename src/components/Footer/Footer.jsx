import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

const Footer = () => {

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear(); 

  return (
    <div className={`${styles.footer}`}>
      {currentYear} @ rights belongs to me
    </div>
  )
}

export default Footer
