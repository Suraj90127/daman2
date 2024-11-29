import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

import { TbLockFilled } from 'react-icons/tb'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { SlArrowRight } from "react-icons/sl";
import { RiArrowRightSLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../store/reducer/authReducer'
const ChangePassword = () => {
    const {userInfo,successMessage}=useSelector((state)=>state.auth) 
    const dispatch=useDispatch()
    const [Alerts,setAlerts]=useState(false)

    const [state, setState] = useState({
        password: "",
        newPassWord: "",
        cPassWord: "",
    })
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    const toggleShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };


    const handleUpdate=()=>{
        dispatch(changePassword(state))
        setAlerts(true)
        setTimeout(() => {
            setAlerts(false)
        }, 2000);
    }
  
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main/SettingCenter"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>Change login password</h1>
                </div>
            </div>

            <div className="container-section mt-10">
              
                <form action="" className=''>
                    <div className='mt-5'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-blue-500 text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Login Password</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={inputHandle}
                                value={state.password}
                                className='w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='Login password'
                            />
                            <span onClick={toggleShowPassword} className='absolute right-4 text-lg top-4 gray-50 cursor-pointer'>
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-blue-500 text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>New login password</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                name="newPassWord"
                                onChange={inputHandle}
                                value={state.newPassWord}
                                className='w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='New login password'
                            />
                            <span onClick={toggleShowPassword2} className='absolute right-4 text-lg top-4 gray-50 cursor-pointer'>
                                {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-blue-500 text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Confirm new password</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>
                            <input
                                type={showPassword3 ? 'text' : 'password'}
                                name="cPassWord"
                                onChange={inputHandle}
                                value={state.cPassWord}
                                className='w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='Please new password'
                            />
                            <span onClick={toggleShowPassword3} className='absolute right-4 text-lg top-4 gray-50 cursor-pointer'>
                                {showPassword3 ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>

                    <p className='gray-100 fs-sm flex items-center float-right mt-3'>
                        <Link to={"/main/CustomerService"}>Contact customer service</Link> <RiArrowRightSLine  className='text-sm mt-[3px]'/>
                    </p>
                  
                   




                </form>
                    <button className='blue-linear flex justify-center  text-xl  w-80   m-auto font-bold text-center  rounded-full p-2 mt-20 tracking-[3px]'  onClick={handleUpdate}>Save changes</button>


            </div>
            <div className={`place-bet-popup absolute top-[40%] z-50 ${Alerts ? "active" : ""}`}>
<div className='text-sm'>{successMessage} </div>
</div>
        </>
    )
}

export default ChangePassword
