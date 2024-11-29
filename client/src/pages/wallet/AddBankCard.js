import React, { useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BsBank2 } from 'react-icons/bs'
import { FaMobileAlt, FaUser } from 'react-icons/fa'
import { HiKey } from 'react-icons/hi'
import { IoIosArrowBack } from 'react-icons/io'
import { MdOutlineCreditCard } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { addBank } from '../../store/reducer/authReducer'
const AddBankCard = () => {

  const {successMessage,addBankData}=useSelector((state)=>state.auth)
  const [alerts,setAlerts]=useState(false)
const [state,setState]=useState({
  name_bank:"",
  name_user:"",
  stk:"",////account number
  email:"", // ifsc code
  tinh:'',//phone number
})

const inputHandle = (e) => {
  setState({
      ...state,
      [e.target.name]: e.target.value.toUpperCase(),
  });
};
  const dispatch=useDispatch()
  const handleSubmit=async()=>{
dispatch(addBank(state)).then(()=>{
  setAlerts(true)
  setTimeout(() => {
    setAlerts(false)
  }, 2000);
})
  }
  
  return (
    <>
       <div className='nav-bg p-1 py-3 sticky top-0'>
        <div className="container-section flex  items-center">
          <button><Link to={"/wallet/Withdraw"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Add a bank account number</h1>

        </div>
      </div>
      <div className="container-section">
        <div className='flex items-center p-1 px-3 rounded-full nav-bg mt-2'>
<span>
<AiOutlineExclamationCircle className='color-red-200 text-lg' />
</span>
<p className='text-sm ms-2 leading-4  color-red-200'>To ensure the safety of your founds, please bind your bank account</p>
        </div>

        <div className='mt-7'>
            <div className='flex '>
                <span><BsBank2 className='color-blue text-lg mr-1' /></span>
                <p className='text-sm gray-50'>Bank name</p>
            </div>
            <input type="text" className='w-full mt-2 nav-bg rounded-md p-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder="Please enter the bank name"
             name="name_bank"
             onChange={inputHandle}
             value={state.name_bank}
            />
        </div>
        <div className='mt-7'>
            <div className='flex '>
                <span><FaUser className='color-blue text-lg mr-1' /></span>
                <p className='text-sm gray-50'>Full recipient's name</p>
            </div>
            <input type="text" className='w-full mt-2 nav-bg rounded-md p-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder="Please enter the recipient's name" 
            name="name_user"
            onChange={inputHandle}
            value={state.name_user}
            />
        </div>
        <div className='mt-7'>
            <div className='flex '>
                <span><MdOutlineCreditCard className='color-blue text-lg mr-1' /></span>
                <p className='text-sm gray-50'>Bank account number</p>
            </div>
            <input type="text" className='w-full mt-2 nav-bg rounded-md p-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder="Please enter the recipient's name"
            name="stk"
            onChange={inputHandle}
            value={state.stk}
            />
        </div>
        <div className='mt-7'>
            <div className='flex '>
                <span><FaMobileAlt className='color-blue text-lg mr-1' /></span>
                <p className='text-sm gray-50'>Phone number</p>
            </div>
            <input type="number" className='w-full mt-2 nav-bg rounded-md p-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500 placeholder:font-bold' placeholder="Please enter the recipient's name"
            
            name="tinh"
             onChange={inputHandle}
             value={state.tinh}
            />
        </div>
        <div className='mt-7'>
            <div className='flex '>
                <span><HiKey
                 className='color-blue text-lg mr-1' /></span>
                <p className='text-sm gray-50'>IFSC code</p>
            </div>
            <input type="text" className='w-full mt-2 nav-bg rounded-md p-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder="Please enter the recipient's name" 
            name="email"
            onChange={inputHandle}
            value={state.email}
            />
        </div>

        <button className='blue-linear text-white w-full rounded-full p-2 mt-4'
        onClick={handleSubmit}
        >Save</button>
      </div>

      
      <div className={`place-bet-popup ${alerts ? "active" : ""}`}>
        <div className='text-sm'>{successMessage} </div>
      </div>
    </>
  )
}

export default AddBankCard
