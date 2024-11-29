import React from 'react'
import { FaGift } from 'react-icons/fa'
import { GiBackwardTime } from 'react-icons/gi'
import { IoIosArrowBack } from 'react-icons/io'
import { IoGiftSharp, IoWalletSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const DailyTasks = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='nav-bg p-1 py-3'>
        <div className="container-section flex justify-between items-center">
          <button onClick={()=>navigate("/activity")}><IoIosArrowBack className='text-xl' /></button>
          <button className='flex items-center' onClick={() => navigate("/activity/DailyTasks/Record")}><GiBackwardTime className='text-xl me-1' /> <span className='text-sm'>Collecction record</span></button>
        </div>
      </div>
      <div className="dailytask-banner">
        <div className='w-[70%]'>
          <h1 className='heading-h1'>Activity Award</h1>
          <p className='fs-sm'>Complete weekly/daily tasks to recieve rich rewards </p>
          <p className='fs-sm'>Weekly rewards cannot be accumulated to the next week, and daily rewards cannot be accumulated to the next days.</p>

        </div>
      </div>
      <div className="container-section">
        <div className='nav-bg rounded-md mt-3'>
          <div className='flex justify-between items-center'>
            <h2 className='heading-h2 color-yellow-bg-200 text-white rounded-tl-xl rounded-br-xl px-3 py-1 text-base font-medium'>Newbie gift pack</h2>
            <p className='color-red-200
           text-base mr-2 border-b border-slate-700  w-[55%] flex justify-end leading-9 font-medium
            '>Unifinished</p>
          </div>

          <div className='p-2 flex  items-center'>
            <IoGiftSharp className="color-red-200 text-xl" />
            <span className='gray-100 mx-2 text-sm'>test</span>
            <p className='color-red-200'>0/1</p>
          </div>
          <div className='bg-color-l mx-2 px-3 py-1 rounded-md gray-100 text-sm'>test</div>
          <div className='flex justify-between items-center p-2 border-b-3 border-[bg-color-l]'>
            <p className='text-[14px] gray-100'>Award amount</p>
            <div className='flex items-center'>
              <IoWalletSharp className="color-yellow-200" />
              <p className='color-yellow-200 text-[14px] ms-1 font-medium'>₹2.00</p>
            </div>
          </div>
          <div className='m-2 pb-3'>
            <button className='border py-1 rounded-3xl text-base w-full border-blue-500 heading-h3 blue-color-300'>to complete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DailyTasks
