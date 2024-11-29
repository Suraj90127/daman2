import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { MdEmail, MdKeyboardArrowDown, MdVerifiedUser } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emailotp, emailsubmit } from '../../store/reducer/authReducer'

const BindEmail = () => {
    const {loader}=useSelector((state)=>state.auth)
    const [email,setEmail]=useState("")
    const [otp,setOtp]=useState("")
    const [successMessage,setsuccessMessage]=useState("")
    const [Alerts,setAlerts]=useState(null)
const dispatch=useDispatch()

const handleOtp=async()=>{
    dispatch(emailotp(email)).then((res)=>{
        if(res.payload.status){
            setAlerts(true)
            setsuccessMessage(res.payload.message)
            setTimeout(()=>{        
                setAlerts(false)
            },2000)
        }else{
            setAlerts(true)
            setsuccessMessage(res.payload.message)
            setTimeout(()=>{        
                setAlerts(false)
            },2000) 
        }
    })
}

const submit=async()=>{
    dispatch(emailsubmit({otp,email})).then((res)=>{
        if(res.payload.status){
            setAlerts(true)
            setsuccessMessage(res.payload.message)
            setTimeout(()=>{        
                setAlerts(false)
            },2000)
        }else{
            setAlerts(true)
            setsuccessMessage(res.payload.message)
            setTimeout(()=>{        
                setAlerts(false)
            },2000) 
        }
    })
}
useEffect(()=>{

},[loader])

    return (
        <>
            <div className='nav-bg p-1 py-1 sticky top-0'>
                <div className="container-section flex  items-center relative py-2">
                    <button className='absolute'><Link to={"/main/SettingCenter"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>Bind mailbox</h1>
                </div>
            </div>


            <div className="container-section">
                <form action="" className='mt-10'>
                <div>
                            <div className='flex items-center'>
                                <span>
                                    <MdEmail className='color-blue-500 text-2xl' />
                                </span>
                                <label htmlFor="" className='font-sans  ms-1 gray-50'>Mail</label>
                            </div>
                            <div className='mt-3 flex justify-between'>
                              
                                <input type="text" className='w-full py-3  nav-bg border border-slate-900 rounded-lg p-2 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='Please enter your email'
                                
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                    <div className='mt-4'>
                        <div className='flex items-center '>
                            <span>
                                <MdVerifiedUser className='color-blue-500 text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Verification Code</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>
                            <input type="text" className='w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='Please enter the confirmation code'
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            />
                            {loader?
                             <span className='absolute blue-linear right-3 top-2 gray-50 cursor-pointer text-sm px-6 py-2 rounded-full'  >
                             Wait
                         </span>: 
                         
                         <span className='absolute blue-linear right-3 top-2 gray-50 cursor-pointer text-sm px-6 py-2 rounded-full'  onClick={handleOtp}>
                                Send
                            </span>
                            }
                            
                        </div>
                    </div>
                   




                </form>
                    <button className='blue-linear flex justify-center  text-xl  w-80   m-auto font-bold text-center  rounded-full p-2 mt-52 tracking-[3px]' onClick={submit} >Bind</button>
            </div>

            <div className={`place-bet-popup absolute top-[40%] z-50 ${Alerts ? "active" : ""}`}>
<div className='text-sm'>{successMessage} </div>
</div>
        </>
    )
}

export default BindEmail
