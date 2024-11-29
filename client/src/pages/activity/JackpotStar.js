import React from 'react'
import Avatar1 from "../../assets/avatar5.png"
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
const JackpotStar = () => {
  return (
    <>
      <div className='nav-bg p-1 py-3'>
        <div className="container-section flex  items-center">
          <button><Link to={"/main/SuperJackpot"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <h1 className='heading-h1  text-center flex justify-center items-center m-auto'>Winning star</h1>
        </div>
      </div>

      <div className="container-section mt-3">
        <div className="nav-bg rounded-lg p-2 pb-5">
          <div className='flex items-center mb-5'>
            <img src={Avatar1} alt="" className='w-10 rounded-full mr-2' />
            <h3 className='heading-h3 font-medium'>916***315</h3>
          </div>

          <div className="grid grid-cols-12 bg-color-l px-2 fs-sm py-1 rounded-md">
            <div className="col-span-6 gray-100">
              Game name
            </div>
            <div className="col-span-6"> Limbo</div>
          </div>
          <div className="grid grid-cols-12 bg-color-l px-2 fs-sm py-1 rounded-md mt-1">
            <div className="col-span-6 gray-100">
              Number of wins
            </div>
            <div className="col-span-6 color-yellow-200 text-base"> 1.1X</div>
          </div>
          <div className="grid grid-cols-12 bg-color-l px-2 fs-sm py-1 rounded-md mt-1">
            <div className="col-span-6 gray-100">
             Bonus
            </div>
            <div className="col-span-6 color-red-200 text-base"> ₹10.00</div>
          </div>
          <div className="grid grid-cols-12 bg-color-l px-2 fs-sm py-1 rounded-md mt-1">
            <div className="col-span-6 gray-100">
              Winning time
            </div>
            <div className="col-span-6 gray-100"> 2024-06-18 12:03:06</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JackpotStar
