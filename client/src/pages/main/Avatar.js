import React, { useState } from 'react'
import { IoIosArrowBack, IoIosCheckmarkCircle } from 'react-icons/io'
import { AvatarData } from './AvatarData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPhoto, userDetail } from '../../store/reducer/authReducer'

const Avatar = () => {
    const {userInfo}=useSelector((state)=>state.auth)
    const avatarArray = Object.values(AvatarData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const handleUpdate = (photo) => {
        dispatch(changeUserPhoto(photo)).then((res)=>{
if(res.payload.status){
    dispatch(userDetail())
    navigate("/main")
}
        })
        // console.log("object",photo)
    }
    console.log("object",userInfo)
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main/SettingCenter"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Change avatar</h1>
                </div>
            </div>

            <div className="container-section p-2 mt-2">
                <div className="grid grid-cols-12 gap-3">

                    {avatarArray.map((item, index) => (
                        <div className={`col-span-4 rounded-lg relative ${userInfo?.userPhoto==index?"border-2 border-color-blue":""}`} key={index}  >
                            <img src={item} alt={`Avatar ${index + 1}`} className={`rounded-lg ${userInfo?.userPhoto==index?"border-2 border-color-blue":""}`}
                            onClick={()=>handleUpdate(index)}
                            />
                            {userInfo?.userPhoto==index?
                             <span className="absolute bottom-0 text-2xl right-0 color-blue-500">
                                <IoIosCheckmarkCircle />
                                </span>
 :""}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Avatar
