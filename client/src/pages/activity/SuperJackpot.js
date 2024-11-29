import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'


import { GrNotes } from 'react-icons/gr'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import { PiShieldStarFill } from 'react-icons/pi'
const Superjackpot = () => {

    const navigate=useNavigate()
    return (
        <>
            <div className='nav-bg p-1 py-3'>
                <div className="container-section flex  items-center">
                    <button><Link to={"/activity"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Super Jackpot</h1>
                </div>
            </div>
            <div className="jackpot-banner">
                <div className='w-[70%] text-white'>
                    <h3 className='heading-h3 mb-3 font-bold'>Super Jackpot</h3>
                    <p className='fs-sm'>When you get the Super jackpot in [Slots] Can get 1 additional bonus</p>
                    <p className='fs-sm mb-2'>The reward is valid for 30 day, and you will not be able to claim it after it expires </p>

                </div>
            </div>

          
            <div className="container-section mt-5">
<div className='flex justify-center items-center text-white fs-sm rounded-3xl blue-linear p-3 '><TbLayoutDashboardFilled className="bg-slate-400 rounded-full text-lg p-[2px] mr-1"/> Recieve in batches</div>
           <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-6 nav-bg flex justify-center items-center p-3 rounded-md" onClick={()=>navigate("/main/SuperJackpot/rule")}>
            <GrNotes className="blue-color-300 text-lg"/>
                <span className='fs-sm ms-1'>Rule</span>
            </div>
            <div className="col-span-6 nav-bg flex justify-center items-center p-3 rounded-md" onClick={()=>navigate("/main/SuperJackpot/star")}>
               <PiShieldStarFill className="blue-color-300 text-xl"/>
                <span className='fs-sm ms-1'>Winning star</span>
            </div>
         
           </div>

                <div className='nav-bg rounded-xl mt-3 h-52 relative'>
                


                   <p className='gray-100 absolute bottom-1 m-auto left-0 right-0 flex text-center justify-center'>You don't have a big jackpot yet, let's  bet</p>
                </div>
                <div className='flex mt-3 justify-center items-center  fs-sm rounded-3xl bg-blues p-2 text-white font-medium cursor-pointer' onClick={()=>navigate("/")}> Go bet</div>
            </div>
        </>
    )
}

export default Superjackpot
