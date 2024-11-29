import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from '../WinningInformation';
import { SlotsGameData } from '../ImgData';
import MoneySvg from "../../../assets/moneys.png"
import SlotsSvg from "../../../assets/SlotGame.svg"


const Slots = () => {
    const location = useLocation()
    const navigate = useNavigate()



    const allImages = SlotsGameData.reduce((acc, curr) => {
        return acc.concat(Object.values(curr));
    }, []);


    return (
        <>
            <div className="container-section">
                <div className="lottery--page-section">
                    <button className='rounded-3xl border-2 p-1 mt-2 px-3' onClick={() => navigate(`/`, {
                        state: location.pathname,
                    })}><IoIosArrowBack /></button>
                    <div >





                        <div className=" mt-5">

                            <div className="flex items-center">
                                <img src={MoneySvg} alt="" />
                                <h2 className="heading-h2 gray-color italic ml-1">
                                    Super Jackpot
                                </h2>
                            </div>
                            <p className="gray-100 text-sm mt-2 font-medium">
                                When You Get the Super Jackpot, You Will Get Extra Rewards
                            </p>
                            <p className="gray-100 text-sm font-medium">
                                Highest
                            </p>
                        </div>
                        <div className="grid grid-cols-12 gap-2 mt-3">
                            <div className="col-span-4 slots-img rounded-md">
                                <div className='slots-item rounded-b-md'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[10px] text-white'>Plinko</span>
                                        <span className='border rounded-md text-[10px] p-[1px] px-[5px] text-white'>0.5X</span>
                                    </div>
                                    <h5 className="heading-h5 text-[#fea800]"> ₹10.00</h5>
                                </div>
                            </div>
                            <div className="col-span-4 slots-img rounded-md">
                                <div className='slots-item rounded-b-md'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[10px] text-white'>Plinko</span>
                                        <span className='border rounded-md text-[10px] p-[1px] px-[5px] text-white'>0.5X</span>
                                    </div>
                                    <h5 className="heading-h5 text-[#fea800]"> ₹10.00</h5>
                                </div>
                            </div>
                            <div className="col-span-4 slots-img rounded-md">
                                <div className='slots-item rounded-b-md'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[10px] text-white'>Plinko</span>
                                        <span className='border rounded-md text-[10px] p-[1px] px-[5px] text-white'>0.5X</span>
                                    </div>
                                    <h5 className="heading-h5 text-[#fea800]"> ₹10.00</h5>
                                </div>
                            </div>
                        </div>


                        <button className='blue-linear italic m-auto px-8 py-2 items-center justify-center rounded-3xl text-sm font-medium my-5 text-center flex  text-white '> Look Super Jackpot {">>"}</button>





                        <div className="flex items-center">
                            <img src={SlotsSvg} alt="" />
                            <h2 className="heading-h2 gray-color italic ml-1">
                                Slots Game
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-2 mt-1">
                            {allImages.map((img, index) => (
                                <div className="col-span-4" key={index}>
                                    <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px]" 
                                     onClick={() =>{
                                        index===0 && navigate("/home/AllOnlineGames?game=Slots")
                                        index===1 && navigate("/home/AllOnlineGames?game=Crash")
                                        index===2 && navigate("/home/AllOnlineGames?game=MG_Fish")
                                        index===3 && navigate("/home/AllOnlineGames?game=Rummy")
                                        index===4 && navigate("/home/AllOnlineGames?game=Jilli")
                                        index===5 && navigate("/home/AllOnlineGames?game=Casino")
                                        index===6 && navigate("/home/AllOnlineGames?game=Rummy")
                                        index===7 && navigate("/home/AllOnlineGames?game=MG_Fish")
                                        index===8 && navigate("/home/AllOnlineGames?game=Jilli")
                                    }}
                                    
                                    />
                                </div>
                            ))}


                        </div>
                    </div>


                    {/* winning information */}


                    <WinningInformation />
                </div>
            </div>
        </>
    )
}

export default Slots

