import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import FeedbackImg from "../../assets/feedbackImg.png"
const Feedback = () => {
  return (
    <>
         <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>Feedback</h1>
                </div>
            </div>
            <div className="container-section mt-5">
                <div className="nav-bg">
                    <textarea name="" id="" className='w-full h-52 p-4 gray-50 fs-sm bg-transparent focus:outline-none placeholder:text-[var(--stale-500)] rounded-md' placeholder='Welcome to feedback, please give feedback-please describe the problem in detail when providing feedback, preferably attach a screenshot of the problme you accountered, we will immediately process your feddback!'>
                    </textarea>
                </div>
                <div className='mt-10 flex flex-col justify-center items-center'>
                    <p className='text-sm gray-50 font-medium'>Send helpful feedback</p>
                    <p className='text-sm gray-50 font-medium'>Chance to win Mystery Rewards</p>
                    <img src={FeedbackImg} alt="" className='w-52 my-5'/>

                    <button className='blue-linear flex justify-center  text-lg  w-full  m-auto font-medium text-center  rounded-full p-2 mt-5 '>Submit</button>
                </div>
            </div>
    </>
  )
}

export default Feedback
