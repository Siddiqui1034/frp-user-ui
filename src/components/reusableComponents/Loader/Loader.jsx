import React from 'react'
import styles from './Loader.module.css'
import Image from 'next/image'

const Loader = () => {
  return (<>
    <div className={`${styles.mask}`}>  
    
    </div>
    <Image src="/loader2.gif" alt="Loading..." width={100} height={100} />
    </>
  )
}

export default Loader
