import React, { useState, useEffect, useRef } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled, TbTransactionRupee } from 'react-icons/tb'
import { MdVerifiedUser } from 'react-icons/md'




import styled from 'styled-components';

import { MdSportsBasketball, MdSportsSoccer } from 'react-icons/md';
import { PiApplePodcastsLogo, PiTelevisionSimpleFill } from 'react-icons/pi';
import { BiHeartCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { rebateCreate, rebateget, userDetail } from '../../store/reducer/authReducer'
import { FaRegDotCircle } from 'react-icons/fa'
import { AiOutlineSmallDash } from 'react-icons/ai'

const Container = styled.div`
  width: 23rem;
  overflow: hidden;
  margin: 0 auto;
`;

const Picker = styled.div`
  display: flex;
  margin: 0px 10px;
  align-items: center;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.3s ease-out;
  z-index: 2;
  position: relative;
`;

const Item = styled.div`
  height: 55.67px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => (props.active ? '#fff' : '#606877')};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
  width: 250px; /* Assuming each item has a width of 100px */
  margin: 5px;
  background:${props => (props.active ? 'var(--Gradient-1, linear-gradient(93deg, var(--mediam-blue) 7.38%, var(--bgblue) 94.48%))' : 'var( --bg-color-l)')};
  padding: 10px 30px;
`;

const Span = styled.span`
font-size:24px;
`;
const Laundry = () => {
  const [amount, setAmount] = useState(Number)
  const { rebateData, userInfo, successMessage } = useSelector((state) => state.auth)
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const dispatch = useDispatch()
  const [Alerts, setAlerts] = useState(false)


  //   8273142996

  const items = [
    { name: 'All', icon: <TbLayoutDashboardFilled /> },
    { name: 'Lottery', icon: <MdSportsBasketball /> },
    { name: 'Casino', icon: <PiTelevisionSimpleFill /> },
    {
      name: 'Sports', icon: <MdSportsSoccer />
    },
    { name: 'Rummy', icon: <BiHeartCircle /> },
    { name: 'Slots', icon: <PiApplePodcastsLogo /> },

  ];

  const handleSubmit = () => {

    dispatch(rebateCreate(amount)).then(() => {
      dispatch(rebateget())
      dispatch(userDetail())
      setAlerts(true)
      setTimeout(() => {
        setAlerts(false)
      }, 2000);
    })
  }
  console.log("object", rebateData)
  // Function to get the sum of all commissions
  let totalCommission=0
if(rebateData !==null || rebateData !==undefined){
  totalCommission = Array.isArray(rebateData) && rebateData?.reduce((acc, item) => {
    return acc + parseFloat(item.commission);
  }, 0);
}

  // Function to get today's commission
  const todayDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  let todayCommission=0

  if(rebateData !==null || rebateData !==undefined){
    todayCommission  = Array.isArray(rebateData) 
    ? rebateData
        .filter((item) => item?.today?.startsWith(todayDate))
        .reduce((acc, item) => acc + parseFloat(item.commission || 0), 0)
    : 0;
  
  }


  const handleClick = (index) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    if (pickerRef.current) {
      const itemWidth = pickerRef.current.children[0].clientWidth;
      const newTranslateX = -(activeIndex * itemWidth);

      // Check if newTranslateX exceeds the limit of -420px
      if (newTranslateX < -350) {
        setTranslateX(-350); // Set translateX to -420 if it exceeds
      } else if (newTranslateX > 0) {
        setTranslateX(0); // Set translateX to 0 if it's greater than 0
      } else {
        setTranslateX(newTranslateX); // Otherwise, update translateX normally
      }
    }
    dispatch(rebateget())

  }, [activeIndex]);

  useEffect(() => {
    if (pickerRef.current) {
      const itemWidth = pickerRef.current.children[0].clientWidth;

      const newTranslateX = -(activeIndex * itemWidth);
      setTranslateX(newTranslateX)
    }
    setAmount(userInfo?.rebate)
  }, [amount]);
  return (
    <>
      <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
        <div className="container-section flex  items-center">
          <button><Link to={"/activity"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Rebate</h1>
        </div>
      </div>

      <Container>
        <Picker ref={pickerRef} translateX={translateX}>
          {items.map((item, index) => (
            <Item
              className='text-sm nav-bg rounded-md '
              key={index}
              active={index === activeIndex}
              onClick={() => handleClick(index)}
            >
              <Span >

                {item.icon}
              </Span>
              <p className='flex '>{item.name}</p>
            </Item>
          ))}
        </Picker>
        <div className='picker-bottom-highlight'></div>
      </Container>
      <div className="container-section mt-3">
        <div className='nav-bg rounded-xl p-2 pb-0'>
          <h3 className="heading-h3">All-Total betting rebate</h3>

          <button className='border px-2 mt-3 flex items-center rounded-md text-base  border-blue-500  blue-color-300'>
            <MdVerifiedUser />
            <span className='fs-sm ms-1'>Real-time count</span>
          </button>
          <div className='flex items-center mt-2'>
            <TbTransactionRupee className="blue-color-300 text-2xl" /> <span className='text-lg ms-1 font-bold'>{userInfo?.rebate}</span>
          </div>

          <div className='bg-color-l mt-3  w-[80%]  px-3 py-1 rounded-md mb-2 gray-100 fs-sm '>
            <span>Upgrade VIP level to increase rebet rate</span>
          </div>


          <div className='flex item-center justify-between mb-3'>
            <div className='bg-color-l  w-[49%] p-2 rounded-md'>
              <p className='text-[12px] gray-100'>Today rebate</p>
              <p className='text-base color-yellow-200 font-medium'>{todayCommission}</p>
            </div>

            <div className='bg-color-l w-[49%] p-2 rounded-md'>
              <p className='text-[12px] gray-100'>Total rebate</p>
              <p className='text-base color-yellow-200 font-medium'>{Number(totalCommission)?.toFixed(2)}</p>
            </div>
          </div>
          <p className='fs-sm gray-100'>Automatic code washing at 01:00:00 every morning</p>

          <div className=' pb-4 pt-2'>
            <button className={` py-2 rounded-3xl text-base w-full gray-100 heading-h3  font-bold gray-100 ${userInfo?.rebate>0?"bgs-yellow-600 text-white":"bg-slate-700"}`} disabled={userInfo?.rebate<1?true:false} onClick={handleSubmit}>One-Click Rebate</button>
          </div>
       
        </div>
        <div className='flex items-center mt-2  border-l-4 border-blue-500 text-sm'>  <h1 className='heading-h1 ml-1'>Rebate history</h1></div>
        {Array.isArray(rebateData) && rebateData?.map((data, i) => (
          <div className='nav-bg rounded-xl  mt-3 pb-4 pt-3' key={i}>
            <div className='flex justify-between items-center px-3'>
              <h3 className="heading-h3 font-semibold gray-50">{data.type}</h3>

              <p className={`text-base   ${data.status === 0 ? "color-yellow-200" : data.status === 1 ? "color-green" : "color-red-200"}`}>{data.status === 0 ? "Pending" : data.status === 1 ? "Completed" : "Failed"}</p>
            </div>
            <p className='fs-sm px-3 gray-100 border-b border-color-slat leading-5'>{data.today}</p>
            <ul className='px-2 mt-2'>
              <li className='flex  justify-between'>
                <div className='flex '>
                  <div className='flex  flex-col items-center mt-[3px] mr-1'>
                    <FaRegDotCircle className='blue-color-300 bg-white rounded-full fs-sm mr-1 border-b' />
                    {i < 5 ? (
                      <AiOutlineSmallDash className='rotate-90 mt-[2px] mr-1 blue-color-300 fs-sm' />

                    ) : ""}

                  </div>
                  <p className='gray-100 text-sm '>Betting rebate </p>
                </div>
                <span className=' text-sm gray-100'>{data.amount}</span>
              </li>
              <li className='flex  justify-between'>
                <div className='flex '>
                  <div className='flex  flex-col items-center mt-[3px] mr-1'>
                    <FaRegDotCircle className='blue-color-300 bg-white rounded-full fs-sm mr-1 border-b' />
                    {i < 5 ? (
                      <AiOutlineSmallDash className='rotate-90 mt-[2px] mr-1 blue-color-300 fs-sm' />

                    ) : ""}

                  </div>
                  <p className='gray-100 text-sm '>Rebate rate </p>
                </div>
                <span className=' text-sm  color-red-200'>{data.rate}%</span>
              </li>
              <li className='flex  justify-between'>
                <div className='flex '>
                  <div className='flex  flex-col items-center mt-[3px] mr-1'>
                    <FaRegDotCircle className='blue-color-300 bg-white rounded-full fs-sm mr-1 border-b' />


                  </div>
                  <p className='gray-100 text-sm '>Rebate amount</p>
                </div>
                <span className=' text-sm  color-yellow-200'>{data.commission}</span>
              </li>


            </ul>
          </div>
        ))}


        {/* <TbMinusVertical className='color-blue text-2xl'/> */}
        <button className='border py-1 mt-3 nav-bg rounded-3xl text-base w-full border-blue-500 heading-h3 blue-color-300'>All history</button>
      </div>
      {/* alerts */}
      <div className={`place-bet-popup ${Alerts ? "active" : ""}`}>
        <div className='text-sm'>{successMessage} </div>
      </div>
    </>
  )
}

export default Laundry
