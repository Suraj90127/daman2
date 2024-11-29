import React from 'react'
import ServerBg from "../../assets/serverbg.png"
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
const Server = () => {
  return (
    <>
      <div className='blue-linear p-1 py-3'>
                <div className="container-section flex  items-center">
                    <button><Link to={"/promotion"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>Agent line customer service</h1>
                </div>
      </div> 
      <div className='blue-linear'>
<img src={ ServerBg} alt="" className='px-14' />
      </div>
    </>
  )
}

export default Server
