import React from 'react'

const TextArea = ({value, lbl, isRequired,  name, placeholder, handleChange, error, options, values, lblColumns, errorMsgColumns, inputCtrlColumns})=> {
 
  return (
    <div className='row mb-3'>

      <div className={`col-${lblColumns} text-end`}>
        <b>{lbl} { isRequired && <span className='text-danger'>*</span>}</b>
      </div>

      <div className={`col-${inputCtrlColumns}`}>
        <textarea className={'form-control'} value={value} placeholder={placeholder} onChange={handleChange} name={name}></textarea>
      </div>

      <div className={`col-${errorMsgColumns}`}>
        {error && <b className={`text-danger`}>{error}</b>}
      </div>

    </div>
  )
}

export default TextArea