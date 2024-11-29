import React, { useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {  notificationgets } from '../../store/reducer/authReducer'
import { AiFillSound } from "react-icons/ai";
const Notifications = () => {
  const {notificationgetData} =useSelector((state)=>state.auth)
const dispatch=useDispatch()


useEffect(() => {
  console.log('Dispatching notificationgets thunk');
  dispatch(notificationgets());
}, [dispatch]);

  return (
    <>
        <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>Notification</h1>
                </div>
            </div>

<div className="container-section mt-5">
  {Array.isArray(notificationgetData) && notificationgetData?.map((item,i)=>(

 
  <div className='nav-bg p-2 flex rounded-md mb-2'>
    <div>
    <AiFillSound  className='color-yellow-200 text-lg mt-1'/>
    </div>
<div className='ms-1'>
<h3 className="heading-h3 gray-50">
  {item.heading}
</h3>
<p className='text-sm gray-100'>
  {item.message}
</p>
</div>
  </div>
))}
</div>

    </>
  )
}

export default Notifications
