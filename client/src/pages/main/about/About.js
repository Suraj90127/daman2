import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import AboutBg from "../../../assets/aboutBg.png"
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import CAIcon from "../../../assets/copyinvitationcode.png"
import RCDIcon from "../../../assets/invitationrule.png"
const About = () => {
  return (
    <>
        <div className='blue-linear p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>About us</h1>
                </div>
            </div>

            <div >
        <img src={AboutBg} alt="" />

      </div>

      <div className="container-section">

        <Link to={"/main/About/AboutDetail"} className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg '>
          <div className='flex items-center'>
            <img src={CAIcon} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans '>Connfidentiality Agreement</span>
          </div>
          <div className='flex items-center' >
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>
        <Link to={"/main/About/RiskDisclosure"} className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg '>
          <div className='flex items-center'>
            <img src={RCDIcon} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans '>Risk Disclosure Agreement</span>
          </div>
          <div className='flex items-center' >
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>

      </div>
    </>
  )
}

export default About
