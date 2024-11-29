import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Coins from "../../assets/coins.png";
import GIftImg from "../../assets/day7Bg.png";
import { useDispatch, useSelector } from "react-redux";
import { attendance } from '../../store/reducer/authReducer';
import { debounce } from 'lodash';

const DailySignIn = () => {
    const { attendanceData, successMessage } = useSelector((state) => state.auth);
    const [alerts, setAlerts] = useState(false);
    const dispatch = useDispatch();
const navigate=useNavigate()
    const handleSubmit = (data) => {
        dispatch(attendance(data));
        setAlerts(true);
       setTimeout(() => {
        dispatch(attendance());
       }, 2000);
    };

    const debounced = useCallback(
        debounce(() => {
            dispatch(attendance());
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        debounced();
    }, [debounced]);

    useEffect(() => {
        if (alerts) {
            const timer = setTimeout(() => {
                setAlerts(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alerts]);

    useEffect(() => {
        
    }, [successMessage]);

    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-20'>
                <div className="container-section flex items-center">
                    <button className='absolute'>
                        <Link to={"/activity"}>
                            <IoIosArrowBack className='text-xl' />
                        </Link>
                    </button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'
                    
                    >Attendance</h1>
                </div>
            </div>
            <div className="daily-signin-banner">
                <div className='w-[70%]'>
                    <h3 className='heading-h3 font-bold'>Attendance bonus</h3>
                    <p className='text-sm'>Get rewards based on consecutive login days</p>
                    <div className='atten px-2 py-2 w-[70%] mt-2'>
                        <p className='text-base color-red-200 leading-3'>Attended</p>
                        <p className='text-base color-red-200'>
                            consecutively <span className='font-bold text-xl mr-1'>0</span>day
                        </p>
                    </div>
                    <p className='text-sm'>Accumulated</p>
                    <p className='text-base font-bold'>₹0.00</p>
                </div>
                <div className='flex justify-between mt-5'>
                    <button className='bgs-yellow-500 w-[40%] text-sm font-normal rounded-3xl p-2 mr-1' onClick={()=>navigate("/activity/DailySignIn/Rules")}>Game Rules</button>
                    <button className='bgs-yellow-500 w-[40%] text-sm font-normal rounded-3xl p-2 mr-1'
                    onClick={()=>navigate("/activity/DailySignIn/record")}
                    >Attendance history</button>
                </div>
            </div>
            <div className="container-section">
                <div className="grid grid-cols-12 gap-2 mt-2">
                {[1, 2, 3, 4, 5, 6].map(day => (
    <div
        key={day}
        className={`col-span-4 flex flex-col items-center nav-bg rounded-md pb-2`}
        onClick={attendanceData?.[`total${day}`] !== 0 ? () => handleSubmit(day) : undefined}
    >
        <p className='text-base'>₹{attendanceData?.[`total${day}`]?.toFixed(2) || '0.00'}</p>
        <img
            src={Coins}
            alt=""
            className={`w-10 my-2 ${attendanceData?.[`total${day}`] === 0 ? "filter grayscale" : ""}`}
        />
        <span className='gray-100 fs-sm'>{day} day</span>
    </div>
))}

                </div>

                <div className='nav-bg mt-2 p-3 rounded-md pb-10 flex items-center justify-between'>
                    <img src={GIftImg} alt="" className='w-36' />
                    <div className='flex flex-col justify-center items-center mr-10'>
                        <p className='text-base font-medium'>₹6,000.00</p>
                        <p className='gray-100 text-base font-medium'>7 Day</p>
                    </div>
                </div>

                <button className='blue-linear w-[70%] m-auto flex justify-center rounded-full p-2 mt-4' disabled>Attendance</button>
            </div>
            <div className={`place-bet-popup absolute top-[40%] z-50 ${alerts ? "active" : ""}`}>
                <div className='text-sm'>{successMessage}</div>
            </div>
        </>
    );
};

export default DailySignIn;
