import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'


import { GrNotes } from 'react-icons/gr'
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbLayoutDashboardFilled } from 'react-icons/tb'
import { PiShieldStarFill } from 'react-icons/pi'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { BsDatabaseSlash } from 'react-icons/bs'
import { RiHandHeartLine } from 'react-icons/ri'
const MemberPackage = () => {

    const navigate = useNavigate()
    return (
        <>
            <div className='nav-bg p-1 py-3'>
                <div className="container-section flex  items-center">
                    <button><Link to={"/activity"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Activity details</h1>
                </div>
            </div>
            <div className="member-package-banner">
                <div className='w-[90%]'>
                    <h3 className='heading-h3 mb-3 font-bold'>New member gift package</h3>
                    <p className='fs-sm mb-1'>There are two types of new member gift package rewards::</p>
                    <p className='fs-sm  flex items-center '> <TbCircleNumber1Filled className='text-lg mr-1' />Bonus bonus for first deposit negative profit</p>
                    <p className='fs-sm flex items-center'><TbCircleNumber2Filled className='text-lg mr-1' />Play games and get bonuses only for new member</p>
                    <button className='border mt-2 border-white px-2 text-sm font-normal rounded-3xl'>Activity details</button>

                </div>
            </div>


            <div className="container-section mt-5">



                <div className='nav-bg mt-5 px-2 pb-5'>
                    <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base'>Event start time</div>
                    <p className='font-bold text-base color-red-200 text-center'>  2024-03-06 00:00:00</p>

                </div>


                <div className='grid grid-cols-12 bg-color-l rounded-t-md p-2 mt-2'>
                    <div className="col-span-4 flex text-center justify-center">
                        <h5 className='heading-h5 text-base leading-4 '>Conditions of  participation</h5>

                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h5 className="heading-h5 text-base leading-4">Get bonus the next day</h5>
                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h5 className='heading-h5 text-base leading-4'>Bonus limit</h5>
                    </div>
                </div>

                {/* rules data */}

                <div className='grid grid-cols-12 nav-bg p-2 '  >
                    <div className="col-span-3 flex text-center justify-center">
                        <span className='text-[13px] font-medium leading-4 gray-100'>First deposit for new users</span>
                    </div>
                    <div className="col-span-6  text-center justify-center border-l border-r border-slate-700">
                        <span className='text-[13px] font-medium leading-1 gray-100 '>Total negative profit rebate for the day</span>

                        <br />
                        <span className='text-[14px] font-medium color-red-200'>5%</span>
                    </div>
                    <div className="col-span-3  text-center justify-center">
                        <span className='text-[14px] font-medium color-red-200'>₹200.00</span>
                    </div>
                </div>

                <div className='nav-bg rounded-full mt-3 flex p-2 py-4 '>
                    <HiOutlineExclamationCircle className='color-red-200 text-3xl' />
                    <p className='color-red-200 fs-sm ms-2'>The membership system that meets the standard automatically distribute bonuses</p>
                </div>



                <div>
                    <div className="member-top-banner mt-2">
                        <span className='text-gray-300'>Membership gift package after registration for 1 days</span>
                    </div>

                    <div className="member-package rounded-b-xl ">

                        <div className='red-linear p-4'>
                            <div className='flex justify-between mb-3'>
                                <div className="member-money-bg flex justify-center flex-col items-center rounded-md w-[48%]">
                                    <h3 className="heading-h3 gray-100 mt-2">₹0.00</h3>
                                    <BsDatabaseSlash className='color-red-200 mt-4 text-lg' />

                                    <p className='text-sm gray-100 p-2'>Accumulated deposits</p>
                                </div>
                                <div className="member-money-bg flex justify-center flex-col items-center rounded-md w-[48%]">
                                    <h3 className="heading-h3 gray-100 mt-2">₹0.00</h3>
                                    <RiHandHeartLine className='color-red-200 mt-4 text-2xl' />

                                    <p className='text-sm gray-100 p-2'>Valid bet</p>
                                </div>
                            </div>


                            <div className='flex justify-between items-center bg-white rounded-md p-2'>
                                <span className='gray-100 text-sm'>Bonus bonus</span>
                                <span className='color-yellow-200'>₹0.00</span>
                            </div>
                        </div>
                        <p className='gray-100 text-sm text-center p-2 '>Pending application</p>
                    </div>
                    <div className='flex justify-center mt-2 items-center gray-200 text-lg font-medium rounded-3xl bg-slate-800 p-2 text-gray-500 cursor-pointer'> Pending application</div>
                </div>
                <div className='mt-4'>
                    <div className="member-top-banner mt-2">
                        <span className='text-gray-300'>Membership gift package after registration for 2 days</span>
                    </div>

                    <div className="member-package rounded-b-xl ">

                        <div className='red-linear p-4'>
                            <div className='flex justify-between mb-3'>
                                <div className="member-money-bg flex justify-center flex-col items-center rounded-md w-[48%]">
                                    <h3 className="heading-h3 gray-100 mt-2">₹0.00</h3>
                                    <BsDatabaseSlash className='color-red-200 mt-4 text-lg' />

                                    <p className='text-sm gray-100 p-2'>Accumulated deposits</p>
                                </div>
                                <div className="member-money-bg flex justify-center flex-col items-center rounded-md w-[48%]">
                                    <h3 className="heading-h3 gray-100 mt-2">₹0.00</h3>
                                    <RiHandHeartLine className='color-red-200 mt-4 text-2xl' />

                                    <p className='text-sm gray-100 p-2'>Valid bet</p>
                                </div>
                            </div>


                            <div className='flex justify-between items-center bg-white rounded-md p-2'>
                                <span className='gray-100 text-sm'>Bonus bonus</span>
                                <span className='color-yellow-200'>₹0.00</span>
                            </div>
                        </div>
                        <p className='gray-100 text-sm text-center p-2 '>Pending application</p>
                    </div>
                    <div className='flex justify-center mt-2 items-center gray-200 text-lg font-medium rounded-3xl bg-slate-800 p-2 text-gray-500 cursor-pointer'> Pending application</div>
                </div>

            </div>
        </>
    )
}

export default MemberPackage
