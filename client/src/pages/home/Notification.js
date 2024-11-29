import React, { useEffect } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { notification, notificationDelete } from '../../store/reducer/authReducer'

const Notification = () => {
const dispatch=useDispatch()
const {notificationData}=useSelector((state)=>state.auth)

const handleDelete=(id)=>{
    dispatch(notificationDelete(id)).then((res)=>{
        if(res?.payload?.status){
            dispatch(notification())
        }
    })
}
    useEffect(() => {
        dispatch(notification())
       
    }, []);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }

      const handle=()=>{
        window.history.back()
      }
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link onClick={handle}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Notification</h1>
                </div>
            </div>
            <div className="container-section">
                <ul>
                    {Array.isArray(notificationData) && notificationData?.map((item,i)=>(
                 
                    <li className='p-3 nav-bg relative mt-2 ' key={i}>
                        <div className='flex  items-center'>
                            <MdEmail className='text-slate-500 mr-1' />
                            <h3 className="heading-h3   font-bold gray-50">LOGIN NOTIFICATION</h3>
                        </div>
                        <p className='fs-sm slate-500'>{formatTimestamp(item.today)}</p>
                        <p className='fs-sm gray-100 mt-3'>Your account is logged in {formatTimestamp(item.today)}</p>
                        <span className='absolute  right-3  top-3 cursor-pointer' onClick={()=>handleDelete(item.id)}>
                            <FaRegTrashAlt className='color-blue-500 text-lg' />
                        </span>
                    </li>
                       ))}
                </ul>
            </div>
        </>
    )
}

export default Notification
