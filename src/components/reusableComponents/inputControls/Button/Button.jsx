import React from 'react'
import styles from './Button.module.css'
import Button  from '@mui/material/Button'
import Link from 'next/link'
const MyButton = ({handleClick, children}) => { // we can expect background of the button accordingly and text inside the button and what action it will perform on button click
  return (  
      <Button onClick={handleClick} variant="outlined">{children}</Button>
  )
}
export default MyButton
 