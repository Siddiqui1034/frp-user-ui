import React from 'react'
import Image from 'next/image'

const Input = ({  value, src, disabled, lbl, isRequired, type, name, placeholder, handleChange, error, options, values, lblColumns, errorMsgColumns, inputCtrlColumns})=> {
 
  const fnPrepareInputControls= () => {
  switch(type){
    case "text":
    case "password":
    case "number":
      return <input disabled={disabled} value={value} className='form-control' onChange={handleChange} type={type} name={name} placeholder={placeholder}  />
    
    case "radio" :
    return <>
    {
      options?.map( (opt, index)=>{
        return <React.Fragment key={`opt_${index}`}>
          <input onChange={handleChange} type={type} name={name} value={values[index]} placeholder={placeholder} />
                  <span className={`ms-2 me-4`}>{opt}</span>
                </React.Fragment>
      })
    }
    </> 
    case "file":
    return <>
    <input className='form-control' onChange={handleChange} type={type} name={name} placeholder={placeholder} /> 
    <p>
      <Image className='mt-3' src={ `${ src ? src : "/defaultImage.png"}`} width={100} height={100} alt='defaultImage'/>
    </p>
    </> 
    case "dropdown": 
      return <div></div>
    default :
    return <div></div>
  } 
 }
  return (
    <div className='row my-3'>

      <div className={`col-${lblColumns} text-end`}>
        <b>{lbl} { isRequired && <span className='text-danger'>*</span>}</b>
      </div>

      <div className={`col-${inputCtrlColumns}`}  >
            {/* <input onChange={handleChange} className={``} type={type} name={name} placeholder={placeholder} /> */}
            {fnPrepareInputControls()}
      </div>

      <div className={`col-${errorMsgColumns}`}>
        {error && <b className={`text-danger`}>{error}</b>}
      </div>

    </div>
  )
}

export default Input
