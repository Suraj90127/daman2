import React, { useEffect, useState } from 'react'
import { FaCircleExclamation } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import { MdEmail, MdLock, MdOutlineArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
import AvatarImg from "../../assets/avatar5.png"
import { PiCopySimpleLight } from 'react-icons/pi'
import { FaUserCircle } from "react-icons/fa";

import { RxCrossCircled } from "react-icons/rx";
import CopyCopmponent from '../../components/CopyCopmponent'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserName, userDetail } from '../../store/reducer/authReducer'
import { AvatarData } from './AvatarData'
const SettingCenter = () => {
    const {userInfo,successMessage}=useSelector((state)=>state.auth)
    const [openAll, setOpenAll] = useState(false)
    const [copyPopup,setCopyPopup]=useState(false)
    const [Alerts,setAlerts]=useState(false)
    const [name,setName]=useState("")
    const dispatch=useDispatch()

    const handleOpenAll = () => {
        setOpenAll(!openAll)
    }
  
    const copyToClipCode = () => {
        navigator.clipboard.writeText(userInfo?.id_user)
            setCopyPopup(true);
    setTimeout(() => {
      setCopyPopup(false);
    }, 1500);
       
}

    const handleUpdate=()=>{
        dispatch(changeUserName(name)).then((res)=>{
            if(res.payload.status){
                dispatch(userDetail())
                setOpenAll(false)
            }
        })
        setAlerts(true)

        setTimeout(() => {
            setAlerts(false)
        }, 2000);
    }
    useEffect(()=>{

    },[dispatch])
    return (
        <>
            <div className='blue-linear p-1 py-3 sticky top-0 z-20'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1  text-lg text-center flex justify-center items-center m-auto text-white'>Settings Center</h1>

                </div>
            </div>

            <div className="blue-linear h-32 w-full rounded-b-[60px]">
            </div>
            <div className="container-section relative mt-[-120px]">
                <div className="bg-color-l p-3 rounded-lg pb-8">
                    <div className='flex items-center justify-between'>
                     
                        <img src={AvatarData[userInfo?.userPhoto]} alt="" className='w-20 rounded-full h-20' />
                        <Link className='flex items-center' to={"/main/avatar"}>
                            <span className='text-sm gray-100 mr-2'>Change avatar</span>
                            <MdOutlineArrowForwardIos className='text-lg gray-100' />
                        </Link>
                    </div>
                    <div className='flex items-center justify-between mt-2' onClick={handleOpenAll}>
                        <p className='text-sm font-sans font-medium gray-100'>
                            Nickname
                        </p>
                        <Link className='flex items-center'>
                            <span className='text-base font-medium gray-50 mr-2'>{userInfo?.name_user}</span>
                            <MdOutlineArrowForwardIos className='text-lg gray-100' />
                        </Link>
                    </div>
                    <hr className=' border-gray-800 mt-8' />
                    <div className='flex items-center justify-between mt-2'>
                        <p className='text-sm font-sans font-medium gray-100'>
                            UID
                        </p>
                        <Link className='flex items-center'>
                            <span className='text-base font-medium gray-50 mr-2'>{userInfo?.id_user}</span>
                            <span className='ps-2 color-blue-500' onClick={copyToClipCode}><PiCopySimpleLight /></span>
                        </Link>
                    </div>
                </div>
            </div>




            <div className='container-section mt-8'>

                <div className='flex items-center mt-2  border-l-4 border-blue-500 font-medium'>  <h3 className='heading-h3 ml-1 gray-50'>Security information</h3></div>
                <ul className='mt-3'>
                    <li className='mt-2 nav-bg p-3 py-4 rounded-lg'>
                        <Link className='flex justify-between items-center  ' to={"/main/SettingCenter/changePassword"}>
                            <div className='flex items-center'>

                                <span className='bg-[rgb(147_197_253/14%)] p-1 rounded-md'>
                                    <MdLock className='color-blue-500 text-2xl ' />
                                </span>
                                <span className='text-sm font-semibold gray-50 ms-2 font-sans'>Login password</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-sm gray-100 mr-2'>Edit</span>
                                <MdOutlineArrowForwardIos className='text-lg gray-100' />
                            </div>
                        </Link>
                    </li>
                    <li className='mt-4 nav-bg p-3 py-4 rounded-lg'>
                        <Link className='flex justify-between items-center' to={"/main/SettingCenter/BindEmail"}>
                            <div className='flex items-center'>

                                <span className='bg-[rgb(147_197_253/14%)] p-1 rounded-md'>
                                    <MdEmail className='color-blue-500 text-2xl ' />
                                </span>
                                <span className='text-sm font-semibold gray-50 ms-2 font-sans'>Bind mainbox</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-sm gray-100 mr-2'>to bind</span>
                                <MdOutlineArrowForwardIos className='text-lg gray-100' />
                            </div>
                        </Link>
                    </li>
                    <li className='mt-4 nav-bg p-3 py-4 rounded-lg'>
                        <Link className='flex justify-between items-center  '>
                            <div className='flex items-center'>

                                <span className='bg-[rgb(147_197_253/14%)] p-1 rounded-md'>
                                    <FaCircleExclamation className='color-blue-500 text-2xl ' />
                                </span>
                                <span className='text-sm font-semibold gray-50 ms-2 font-sans'>Updated version</span>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-sm gray-100 mr-2'>1.0.9</span>
                                <MdOutlineArrowForwardIos className='text-lg gray-100' />
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={openAll ? "overlay-section block" : "hidden"}></div>
            <div className={`${openAll?"block":"hidden"} transition ease-in-out delay-150 container-section`}>
                <div className='absolute top-32  right-2 p-3 left-2 flex flex-col m-auto rounded-lg bg-color-l z-10'>
                    <div className='flex justify-between items-center'>
                        <span className='info-dialog-header left-arrow'></span>
                        <h3 className="heading-h3 text-xl font-medium">Change Nickname</h3>
                        <span className='info-dialog-header right-arrow'></span>
                    </div>
                    <div  className='nav-bg p-3 mt-4 rounded-lg'>

                    <div className='flex items-center'>
                        <FaUserCircle  className='color-blue-500 text-2xl'/> <p className='text-base font-medium ms-2 gray-50 '>Nickname</p>
                    </div>
                    <input type="text" className='w-full mt-2 bg-body border border-slate-900 rounded-full p-2 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-base placeholder:text-slate-500' placeholder='Please enter Nickname'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <button className='blue-linear  w-full rounded-full p-2 mt-52 font-serif font-medium' onClick={handleUpdate}>Confirm</button>
                    </div>

                    <span className='absolute bottom-[-35px] flex left-0 right-0 m-auto justify-center text-3xl' onClick={handleOpenAll}>
                    <RxCrossCircled />
                    </span>
                </div>
            </div>
            <CopyCopmponent copyPopup={copyPopup} message="Copy successful"/>
            <div className={`place-bet-popup absolute top-[40%] z-50 ${Alerts ? "active" : ""}`}>
<div className='text-sm'>{successMessage} </div>
</div>
        </>
    )
}

export default SettingCenter
