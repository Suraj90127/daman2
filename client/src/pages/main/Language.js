import React, { useEffect, useState,useRef } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import EnglishLogo from "../../assets/english-logo.png"
import IndiaLogo from "../../assets/india-flag.png"
import { useTranslation } from 'react-i18next';
const Language = () => {
    const [isChecked, setIsChecked] = useState(false);
    const googleTranslateRef = useRef(null);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    

    // new

    const handle=()=>{
        window.history.back()
      }
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link onClick={handle}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Language</h1>

                </div>
            </div>
            {/* <div ref={googleTranslateRef}></div> */}

         
            <div className="container-section mt-5">
                <label className="flex items-center justify-between nav-bg rounded-t-md p-3 border-b border-[var(--bg-color-l)]">

                    <div className='flex items-center'>
                        <img src={EnglishLogo} alt="" className='w-8 mr-2' />
                        <p className='gray-50 font-semibold text-base cursor-pointer'> English</p>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="hidden peer"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                            <svg
                                className={`w-4 h-4 text-white ${isChecked ? 'block' : 'hidden'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.586l6.793-6.793a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </label>

                <label className="flex items-center mt-2 justify-between  rounded-t-md p-3 border-b border-[var(--bg-color-l)]">

                    <div className='flex items-center'>
                        <img src={IndiaLogo} alt="" className='w-8 mr-2' />
                        <p className='gray-50 font-semibold text-base cursor-pointer'> हिन्दी</p>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="hidden peer"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                            <svg
                                className={`w-4 h-4 text-white ${isChecked ? 'block' : 'hidden'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.586l6.793-6.793a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </label>

                {/* <h1>{t('welcome')}</h1>
        <p>{t('description')}</p>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hi')}>हिंदी</button> */}
            </div>
        </>
    )
}

export default Language
