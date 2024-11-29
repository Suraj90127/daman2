import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Wallet from "../../assets/balance.png"
import BannerImg from "../../assets/gift-bg.png"
import { IoCalendarClear } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getRedeemGift, RedeemGiftCode } from '../../store/reducer/authReducer'
const RedeemGift = () => {
  const {  redeemData ,loadergift} = useSelector((state) => state.auth)
  const [Alerts, setAlerts] = useState(false)
  const [code, setCode] = useState("")
  const [successMessage,setSuccessMessage]=useState("")
  const dispatch = useDispatch()

function dates(item){
  const date = new Date(String(item));
const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];
return formattedDate
}

  const handleSubmit = () => {
    dispatch(RedeemGiftCode({ code: code })).then((res)=>{
      setSuccessMessage(res.payload.message)
      dispatch(getRedeemGift())
    })
    setAlerts(true)
    setTimeout(() => {
      setAlerts(false)
    }, 2000);
  }
  useEffect(() => {
    dispatch(getRedeemGift())
  }, []);

  const handle=()=>{
    window.history.back()
  }
  return (
    <>
      <div className='nav-bg p-1 py-3 sticky top-0'>
        <div className="container-section flex  items-center relative">
          <button className='absolute'><Link onClick={handle}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Gift</h1>
        </div>
      </div>
      <div>
        <img src={BannerImg} alt="" className='h-52' />
      </div>
      <div className="container-section">
        <div className='nav-bg mt-2 p-3 rounded-md pb-10'>
          <p className='gray-100'>Hi</p>
          <p className='gray-100'>We have a gift for you</p>
          <p className='mt-6'>Please enter the gift code below </p>
          <input type="text" className='w-full mt-2 bg-body border border-slate-900 rounded-full p-2 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500' placeholder='Please enter gift code' value={code} onChange={(e) => setCode(e.target.value)} />
          <button className='blue-linear  w-full rounded-full p-2 mt-4'  disabled={loadergift?true:false}  onClick={handleSubmit}>Recieve</button>
        </div>


        <div className='nav-bg mt-3 p-3 pb-4 rounded-md'>
          <div className='flex items-center'><IoCalendarClear className='blue-color-300 mr-1' /> <span className='text-base'>History</span></div>

{Array.isArray(redeemData)  && redeemData?.map((item,i)=>(
  <div className='flex items-center justify-between mb-3' key={i}>
            <div>
              <h3 className='color-green font-semibold'>Successful recieved</h3>
              <p className='fs-sm'>{item.time}</p>
            </div>
            <p className='flex items-center border border-[#ffd180] p-[2px] w-20 justify-between px-2 fs-sm rounded-md color-yellow-200'><img src={Wallet} alt="" className='w-3 mr-4' /> {item.money}</p>
          </div>

          ))}

        </div>
      </div>
      <div className={`place-bet-popup ${Alerts ? "active" : ""}`}>
        <div className='text-sm'>{successMessage} </div>
      </div>
    </>
  )
}

export default RedeemGift
