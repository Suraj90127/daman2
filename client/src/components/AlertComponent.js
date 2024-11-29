import React from 'react'
import { IoAlertOutline } from 'react-icons/io5'

const AlertCopmponent = ({alertPopup,message}) => {
  return (
    <>
         <div className={`copy-popup ${alertPopup ? "active" : ""}`}>
        <IoAlertOutline />
        <div>{message} </div>
      </div>
    </>
  )
}

export default AlertCopmponent
