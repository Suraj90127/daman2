// ./src/components/BattingRecordTrxs.js
import React, { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowDropright, IoIosArrowForward } from 'react-icons/io';
import { PiCopySimpleBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import CopyCopmponent from '../../components/CopyCopmponent';

const BattingRecordTrx = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [details, setDetails] = useState(false)
  const [copyPopup, setCopyPopup] = useState(false)
  const tabs = ['Trx 1Min', 'Trx 3Min', 'Trx 5Min', "Trx 10Min"];

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };
  console.log("object", activeTab)
  // Get the formatted date
  const currentDate = getCurrentDate();

  const handleDetail = () => {
    setDetails(!details)
  }

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(String(number))
      .then(() => {
        setCopyPopup(true);
        console.log("Copied to clipboard");
        setTimeout(() => {
          setCopyPopup(false);
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy the text: ', err);
      });
  };
  return (
    <>
      <div className='blue-linear p-1 py-3 sticky top-0 z-20'>
        <div className="container-section flex  items-center relative">
          <button className='absolute'><Link to={"/trx"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h3 className='heading-h3  text-center flex justify-center items-center m-auto'>Trx Win Go</h3>
        </div>
      </div>


      <div className="w-full">
        <div className="relative flex justify-between items-center px-2 nav-bg">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-3 px-1 text-sm  focus:outline-none ${activeTab === index ? 'gray-50' : 'gray-color'
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-0.5 bgs-blue-500 transition-transform duration-300 ease-out"
            style={{
              width: `${98 / tabs.length}%`,
              transform: `translateX(${activeTab * 100}%)`,
            }}
          />
        </div>
        <div className="nav-bg px-4">
          {activeTab === 0 && (
            <>
          
            <div className='py-3 mt-5 border-b border-color-slat'>
              <div className='  flex items-center justify-between' onClick={handleDetail}>
                <div className='flex items-center'>
                  <div className={`flex justify-center items-center h-10 w-10 rounded-md mr-2 bg-yellow`}>
                    Big
                  </div>
                  <div>
                    <h3 className="heading-h3 gray-50 text-md">{currentDate + "7868"}</h3>
                    <p className='fs-sm gray-100'>2024-07-24 15:09:44</p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <div className={`border border-color-red px-5 py-[2px] rounded-md text-sm color-red-200`}>
                    Failed
                  </div>
                  <p className={`color-red-200`}>-₹20</p>
                </div>
              </div>
              <div className={`mt-3 history-details ${details ? "active" : ""}`}>
                <h2 className='heading-h2 gray-50 text-lg'>Details</h2>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2 rounded-md'>
                  <span className=' gray-100 '>Order number</span>
                  <span className=' gray-100 flex item-center'>123456789003 <PiCopySimpleBold className='mt-[3px]' onClick={() => copyToClipboard("45678u")} /></span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2 rounded-md'>
                  <span className=' gray-100 '>Period</span>
                  <span className=' gray-100 '>123456789003</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Purchase amount</span>
                  <span className=' gray-100 '>₹5</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Quantiy</span>
                  <span className=' gray-100 '>1</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Amount after tax</span>
                  <span className='color-red-200 '>₹3</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Tax</span>
                  <span className='gray-100 '>₹0.1</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Result</span>
                  <div className=" flex text-center justify-center  items-center">
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full mx-1 border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full mx-1 border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                  </div>
                </div>
                <div className=' flex items-center justify-between  bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Select</span>
                  <span className='fs-sm gray-100 ms-2'>Big</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Status</span>
                  <span className=' color-red-200 '>Failed</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Win/loss</span>
                  <span className=' gray-100 color-red-200'>-₹5.6</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Order time</span>
                  <span className=' gray-100 '>2024-07-24 15:09:44</span>
                </div>

              </div>

            </div>
            <div className='py-3 border-b border-color-slat'>
              <div className='  flex items-center justify-between' onClick={handleDetail}>
                <div className='flex items-center'>
                  <div className={`flex justify-center items-center h-10 w-10 rounded-md mr-2 bg-yellow`}>
                    Big
                  </div>
                  <div>
                    <h3 className="heading-h3 gray-50 text-md">{currentDate + "7868"}</h3>
                    <p className='fs-sm gray-100'>2024-07-24 15:09:44</p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <div className={`border border-color-red px-5 py-[2px] rounded-md text-sm color-red-200`}>
                    Failed
                  </div>
                  <p className={`color-red-200`}>-₹20</p>
                </div>
              </div>
              <div className={`mt-3 history-details ${details ? "active" : ""}`}>
                <h2 className='heading-h2 gray-50 text-lg'>Details</h2>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2 rounded-md'>
                  <span className=' gray-100 '>Order number</span>
                  <span className=' gray-100 flex item-center'>123456789003 <PiCopySimpleBold className='mt-[3px]' onClick={() => copyToClipboard("45678u")} /></span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2 rounded-md'>
                  <span className=' gray-100 '>Period</span>
                  <span className=' gray-100 '>123456789003</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Purchase amount</span>
                  <span className=' gray-100 '>₹5</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Quantiy</span>
                  <span className=' gray-100 '>1</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Amount after tax</span>
                  <span className='color-red-200 '>₹3</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Tax</span>
                  <span className='gray-100 '>₹0.1</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Result</span>
                  <div className=" flex text-center justify-center  items-center">
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full mx-1 border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full mx-1 border-[--stale-500]'>0</div>
                    <div className='text-sm gray-100 w-6 h-6 flex justify-center items-center border-2 rounded-full  border-[--stale-500]'>0</div>
                  </div>
                </div>
                <div className=' flex items-center justify-between  bg-color-l p-1 mb-2  rounded-md'>
                  <span className='gray-100 '>Select</span>
                  <span className='fs-sm gray-100 ms-2'>Big</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Status</span>
                  <span className=' color-red-200 '>Failed</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Win/loss</span>
                  <span className=' gray-100 color-red-200'>-₹5.6</span>
                </div>
                <div className='flex items-center justify-between bg-color-l p-1 mb-2  rounded-md'>
                  <span className=' gray-100 '>Order time</span>
                  <span className=' gray-100 '>2024-07-24 15:09:44</span>
                </div>

              </div>

            </div>
            </>
          )}
        </div>
        <div className='nav-bg p-6 flex items-center justify-center mt-5'>
          <button className='bg-color-l p-2 mr-8'><Link to={"/"}>  <IoIosArrowBack className='text-lg' /></Link></button>
          <span className='fs-sm gray-100'>1/555</span>
          <button className='bgs-blue-500 p-2 ms-8'><Link to={"/"}>  <IoIosArrowForward className='text-lg' /></Link></button>
        </div>
      </div>

      <CopyCopmponent copyPopup={copyPopup} message="Copy successful"/>

    </>
  );
};

export default BattingRecordTrx;
