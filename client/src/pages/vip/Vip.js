import React, { useEffect, useState } from 'react'
import VIPIcon from "../../assets/vip.png"
import AvatarImg from "../../assets/avatar5.png"
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { IoDiamondSharp } from 'react-icons/io5'
import Rewards from "../../assets/rewards.png"
import MRewards from "../../assets/coince.png"
import Safe from "../../assets/safe.png"
import Rate from "../../assets/rate.png"
import Wallet from "../../assets/balance.png"
import { RiVipDiamondFill } from 'react-icons/ri'
import { BsDatabaseFill } from 'react-icons/bs'

import "./vip.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import vip1 from '../../assets/1-1fca7935.png';
import vip11 from '../../assets/1-d951dc6d.png';
import vip2 from '../../assets/2-fcf77958.png';
import vip22 from '../../assets/2-5df32e87.png';
import vip3 from '../../assets/3-9cf04b7e.png';
import vip4 from '../../assets/4-a4cfd018.png';
import vip5 from '../../assets/5-89e9b349.png';
import vip6 from '../../assets/6-05959c7c.png';
import vip7 from '../../assets/7-a50aebe0.png';
import vip8 from '../../assets/8-8cbed392.png';
import vip9 from '../../assets/9-63365227.png';
import vip10 from '../../assets/10-0eaf39a0.png';
import vipBg1 from '../../assets/bg1-7ff97a99.png';
import vipBg2 from '../../assets/bg2-ee7fbf5e.png';
import vipBg3 from '../../assets/bg3-96f1cdae.png';
import vipBg4 from '../../assets/bg4-c3caf0f8.png';
import vipBg5 from '../../assets/bg5-e2132369.png';
import vipBg6 from '../../assets/bg6-8b5d1b4f.png';
import vipBg7 from '../../assets/bg7-535312da.png';
import vipBg8 from '../../assets/bg8-8bdc102c.png';
import vipBg9 from '../../assets/bg9-74d6723d.png';
import vipBg10 from '../../assets/bg10-76abb4b7.png';

import VIPCard from './VIPCard'
import { useDispatch, useSelector } from 'react-redux'
import { AvatarData, VIPImg } from '../main/AvatarData'
import { invitationBonus, vipLevel } from '../../store/reducer/authReducer'
const benefit = [
    { level: 0, upReward: 60, MRewards: 30, safe: 0.1, rate: 0.4 },
    { level: 1, upReward: 180, MRewards: 90, safe: 0.1, rate: 0.6 },
    { level: 2, upReward: 690, MRewards: 290, safe: 0.15, rate: 0.65 },
    { level: 3, upReward: 1290, MRewards: 690, safe: 0.15, rate: 0.7 },
    { level: 4, upReward: 6900, MRewards: 1690, safe: 0.2, rate: 0.75 },
    { level: 5, upReward: 16900, MRewards: 6900, safe: 0.2, rate: 0.75 },
    { level: 6, upReward: 69000, MRewards: 16900, safe: 0.25, rate: 0.75 },
    { level: 7, upReward: 169000, MRewards: 69000, safe: 0.25, rate: 0.8 },
    { level: 8, upReward: 690000, MRewards: 169000, safe: 0.3, rate: 0.85 },
    { level: 9, upReward: 1690000, MRewards: 690000, safe: 0.3, rate: 0.85 },
];

const Vip = () => {
    const [activeRule, setActiveRule] = useState(1)
    const { userInfo,vipLevelData } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [exp, setExp] = useState(0)



    const levels = [
        { level: 1, progress: exp, maxProgress: 3000, bgColor: '#889ebe', vipImage: vip1, iconImage: vip11, bgImage: vipBg1, track: '#647a9a' },
        { level: 2, progress: exp, maxProgress: 30000, bgColor: '#e2984e', vipImage: vip2, iconImage: vip22, bgImage: vipBg2, track: '#d57c26' },
        { level: 3, progress: exp, maxProgress: 400000, bgColor: '#ff7878', vipImage: vip3, iconImage: vip22, bgImage: vipBg3, track: '#ef5b5b' },
        { level: 4, progress: exp, maxProgress: 4000000, bgColor: '#48c7f0', vipImage: vip4, iconImage: vip22, bgImage: vipBg4, track: '#32b6e8' },
        { level: 5, progress: exp, maxProgress: 2000000, bgColor: '#ef82d5', vipImage: vip5, iconImage: vip22, bgImage: vipBg5, track: '#ea69ca' },
        { level: 6, progress: exp, maxProgress: 80000000, bgColor: '#46c188', vipImage: vip6, iconImage: vip22, bgImage: vipBg6, track: '#1eb18b' },
        { level: 7, progress: exp, maxProgress: 300000000, bgColor: '#41ac46', vipImage: vip7, iconImage: vip22, bgImage: vipBg7, track: '#137b48' },
        { level: 8, progress: exp, maxProgress: 1000000000, bgColor: '#4a9ded', vipImage: vip8, iconImage: vip22, bgImage: vipBg8, track: '#215dce' },
        { level: 9, progress: exp, maxProgress: 5000000000, bgColor: '#b068f0', vipImage: vip9, iconImage: vip22, bgImage: vipBg9, track: '#742cef' },
        { level: 10, progress: exp, maxProgress: 9999999999, bgColor: '#f49c3b', vipImage: vip10, iconImage: vip22, bgImage: vipBg10, track: '#e46f1a' },
        // Add more levels with different properties as needed
    ];


  

    const settings = {
        dots: false,
        speed: 500,
        infinite: false,  // Set to false to disable infinite loop
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false,
        afterChange: (current) => setCount(current),
    };
    

    const filteredBenefits = benefit.filter(item => item.level == count);

    useEffect(() => {
        dispatch(invitationBonus())
        dispatch(vipLevel()).then((res) => {
            setExp(res.payload.levels)
        })

        
    }, [dispatch]);
   
    return (
        <>
            <div className='blue-linear p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex  items-center relative ">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl text-white' /></Link></button>
                    <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>VIP</h1>
                </div>
            </div>
            <div className='blue-linear py-5 pb-10'>
                <div className='container-section'>
                    <div className='flex items-center'>
                        <img src={AvatarData[userInfo?.userPhoto]} alt="" className='w-20 rounded-full h-20' />
                        <div className='ms-2'>
                            <h3 className="heaing-h3 flex items-center text-xl"> <img src={VIPImg[userInfo?.vip_level]} alt="" className='w-16  ' /></h3>
                            <p className='text-sm mt-1 text-white'>{userInfo?.name_user}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-section relative top-[-20px]">
                <div className='flex items-center justify-between'>
                    <div className='w-[48%] nav-bg flex py-3 justify-center items-center flex-col rounded-md'>
                        <p className='fs-sm color-blue-500 '>{exp} EXP</p>
                        <p className='fs-sm gray-100'>My experience</p>
                    </div>
                    <div className='w-[48%]  nav-bg  flex justify-center items-center  flex-col py-3  rounded-md'>
                        <p className='fs-sm gray-100'><span className='gray-50 text-sm font-semibold'>20</span> Days</p>
                        <p className='fs-sm gray-100'>Payout time</p>
                    </div>
                </div>
            </div>
            <div className="container-section">
                <p className='border border-color-slat rounded-md fs-sm gray-100 text-center'>VIP level rewards are settled at 2:00 am on the 1st every month</p>

                <div className='m-auto mt-3 vips w-[90%]'>
                    <Slider {...settings}>
                        {levels.map((vip,i) => (
                            <VIPCard
                                key={i}
                                level={vip.level}
                                progress={vip.progress}
                                maxProgress={vip.maxProgress}
                                bgColor={vip.bgColor}
                                vipImage={vip.vipImage}
                                iconImage={vip.iconImage}
                                bgImage={vip.bgImage}
                                track={vip.track}
                                className="mx-2"
                            />
                        ))}
                    </Slider>
                </div>





{filteredBenefits.map((item,i)=>(


                <div className="nav-bg p-3 mt-4">
                    <div className='flex items-center '>
                        <span><IoDiamondSharp className='color-blue-500 text-xl' /></span>
                        <h3 className="heading-h3 gray-50 ms-1 font-medium">VIP{count+1} Benefits level</h3>
                    </div>
                    <hr className='border-color-slat' />
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center mt-2'>
                            <img src={Rewards} alt="" className='w-14 mr-1' />
                            <div>
                                <p className='text-sm gray-50'>Level up rewards</p>
                                <p className='fs-sm gray-100 mt-2'>Each account can only recieve 1 time</p>
                            </div>
                        </div>
                        <div>
                            <div className='border border-[--yellow-200] rounded-md color-yellow-200 flex items-center px-4 text-sm'>

                                <img src={Wallet} className='w-3 mr-1' alt="" />
                                <span>{(item.upReward).toLocaleString()}</span>
                            </div>
                            <div className='border border-color-blue rounded-md color-blue-500 flex items-center px-4 text-sm mt-1'>

                                <RiVipDiamondFill className='color-blue-500 mr-1' />
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center mt-2'>
                            <img src={MRewards} alt="" className='w-14 mr-1' />
                            <div>
                                <p className='text-sm gray-50'>Monthly  rewards</p>
                                <p className='fs-sm gray-100 '>Each account can only recieve 1 time per month</p>
                            </div>
                        </div>
                        <div>
                            <div className='border border-[--yellow-200] rounded-md color-yellow-200 flex items-center px-4 text-sm'>

                                <img src={Wallet} className='w-3 mr-1' alt="" />
                                <span>{(item.MRewards).toLocaleString()}</span>
                            </div>
                            <div className='border border-color-blue rounded-md color-blue-500 flex items-center px-4 text-sm mt-1'>

                                <RiVipDiamondFill className='color-blue-500 mr-1' />
                                <span>0</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center mt-2'>
                            <img src={Safe} alt="" className='w-14 mr-1' />
                            <div>
                                <p className='text-sm gray-50'>Safe</p>
                                <p className='fs-sm gray-100 mt-2'>Increase the extra income of the safe</p>
                            </div>
                        </div>
                        <div>
                            <div className='border border-color-blue rounded-md color-blue-500 flex items-center px-2 py-1 text-sm mt-1'>

                                <RiVipDiamondFill className='color-blue-500 mr-1' />
                                <span>{item.safe}%</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center mt-2'>
                            <img src={Rate} alt="" className='w-14 mr-1' />
                            <div>
                                <p className='text-sm gray-50'>Rebate rate</p>
                                <p className='fs-sm gray-100 mt-2'>Increase income of rebate</p>
                            </div>
                        </div>
                        <div>
                            <div className='border border-color-blue rounded-md color-blue-500 flex items-center px-2 py-1 text-sm mt-1'>
                                <BsDatabaseFill className='color-blue-500 mr-1' />
                                <span>{item.rate}%</span>
                            </div>
                        </div>
                    </div>
                </div>

))}
                <div className='mt-5'>
                    <div className='flex items-center justify-between relative'>
                        <button className={`flex justify-center items-center nav-bg w-full py-2 rounded-md ${activeRule == 1 ? "color-blue-500 border-b " : ""} border-color-blue`} onClick={() => setActiveRule(1)}> History</button>
                        <button className={`flex justify-center items-center nav-bg w-full py-2 rounded-md  ${activeRule == 2 ? "color-blue-500 border-b " : ""} border-color-blue`} onClick={() => setActiveRule(2)}>Rules</button>

                    </div>

                    {activeRule == 1 && (
                        <div>
{vipLevelData?.map((item,i)=>(

    <div className='flex items-center justify-between nav-bg mt-2 rounded-md p-2' key={i}>
                           <div>
                            <h3 className='color-blue-500'>Experience Bonus</h3>
                            <p className='fs-sm gray-50'>Betting EXP</p>
                            <p className='fs-sm gray-50'>{item.date}</p>
                        </div>
                        <p className='flex items-center border border-[#ffd180] p-[2px] w-20 justify-between px-2 fs-sm rounded-md color-yellow-200'><img src={Wallet} alt="" className='w-3 mr-4' /> {item.amount}</p>
                           </div>

                        ))}


                            <button className='blue-linear flex justify-center text-white text-lg  w-80   m-auto font-semibold text-center  rounded-full p-2 mt-10 tracking-widest'>View All</button>
                        </div>
                    )}


                    {activeRule == 2 && (
                        <div className="container-section mt-2">
                            <h1 className="heading-h1 text-center color-blue"> VIP privilenges</h1>
                            <p className='text-base  gray-100 text-center'>VIP rule description</p>


                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Upgrade standard</div>

                                <p className='fs-sm gray-100  leading-7'>
                                    The IP member's experience points (valid bet amount) that meet the requirements of the corresponding rank will be promoted to the corresponding VIP level, the member's VIP data statistics period starts from 00:00:00 days VIP system launched.VIP level calculation is refreshed every 10 minutes! The corresponding experience level is calculated according to valid odds 100:1 !</p>

                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Upgrade order</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    The VIP level that meets the corresponding requirements can be promoted by one level every day, but the VIP level cannot be promoted by leapfrogging.
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Level maintenance</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    VIP members need to complete the maintenance requirements of the corresponding level within 30 days after the "VIP level change"; if the promotion is completed during this period, the maintenance requirements will be calculated according to the current level.
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Downgrade standard</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    If a VIP member fails to complete the corresponding level maintenance requirements within 30 days, the system will automatically deduct the experience points corresponding to the level. If the experience points are insufficient, the level will be downgraded, and the corresponding discounts will be adjusted to the downgraded level accordingly.
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Upgrade Bonus</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    The upgrade benefits can be claimed on the VIP page after the member reaches the VIP membership level, and each VIP member can only get the upgrade reward of each level once.
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Monthly reward</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    VIP members can earn the highest level of VIP rewards once a month.Can only be received once a month. Prizes cannot be accumulated. And any unclaimed rewards will be refreshed on the next settlement day. When receiving the highest level of monthly rewards this month Monthly Rewards earned in this month will be deducted e.g. when VIP1 earns 500 and upgrades to VIP2 to receive monthly rewards 500 will be deducted.
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Real-time rebate</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    The higher the VIP level, the return rate, all the games are calculated in real time and can be self-rewrded!
                                </p>
                            </div>
                            <div className='nav-bg mt-5 px-2 pb-5 rounded-md'>
                                <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  fs-sm'>Safe</div>
                                <p className='fs-sm gray-100  leading-7'>
                                    VIP members who have reached the corresponding level will get additional benefits on safe deposit based on the member's  VIP level.
                                </p>
                            </div>






                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Vip

