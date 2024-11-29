import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import WinningInformation from '../WinningInformation';

import { useLocation, useNavigate } from 'react-router-dom';
import WinImg2 from "../../../assets/wingimg2.png"
import WinImg3 from "../../../assets/winimg3.png"
import Profite from '../Profite';


const ESport = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <>
                <div className="lottery--page-section nav-bg">
            <div className="container-section flex items-center">
                    <button className='rounded-3xl border-2 p-1 mt-2 px-3' onClick={() => navigate(`/`, {
                        state: location.pathname,
                    })}><IoIosArrowBack /></button>

                    <p className='text-sm font-semibold gray-100 italic ms-2'>eSport</p>
                </div >
            </div >
            <div className="container-section">

                <div className="grid grid-cols-12 gap-3 mt-3">


                    <div className="col-span-4" >
                        <img src={WinImg2} alt={`Image `} className="w-full h-[150px]" />
                    </div>
                    <div className="col-span-4" >
                        <img src={WinImg3} alt={`Image `} className="w-full h-[150px]" />
                    </div>


                </div>
           
            {/* winning information */}


            <WinningInformation />
     

            <Profite />
                    </div >
                  
                </>
                )
}

export default ESport

