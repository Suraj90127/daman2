import React from 'react'
import { FaSquare } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
const RuleData = [
    {
      Deposit: 300,
        Bonus: 7
    },
    {
      Deposit: 1000,
        Bonus: 20
    },
    {
      Deposit: 3000,
        Bonus: 100
    },
    {
      Deposit: 8000,
        Bonus: 200
    },
    {
      Deposit: 20000,
        Bonus: 450
    },
    {
      Deposit: 80000,
        Bonus: 2400
    },
    {
      Deposit: 200000,
        Bonus: 6400
    },
   


]


const GameRules = () => {
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex  items-center">
                    <button className='absolute'><Link to={"/main/InvitationBonus"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Game Rules</h1>
                </div>
            </div>
            <div className="container-section mt-2 pb-5">
              

                <div className='grid grid-cols-12 bg-color-l rounded-t-md p-2 mt-2'>
                    <div className="col-span-4 flex text-center justify-center">
                        <h3 className='heading-h3'>Continues attendance</h3>

                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h3 className="heading-h3">Accumulated amount</h3>
                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h3 className='heading-h3'>Attendance Bonus</h3>
                    </div>
                </div>

                {/* rules data */}
                {RuleData.map((item, i) => (
                    <div className={i % 2 == 0 ? 'grid grid-cols-12 nav-bg p-2 py-3' : 'grid grid-cols-12 bg-color-l p-2 py-3'} key={i}>
                        <div className="col-span-4 flex text-center justify-center">
                            <span className='text-base gray-100 font-medium'>{i+1}</span>
                        </div>
                        <div className="col-span-4  text-center justify-center">
                            <span className='text-base gray-100 font-medium'>{(item.Deposit).toLocaleString()}.00</span>
                        </div>
                        <div className="col-span-4  text-center justify-center">
                            <span className='text-base gray-100 font-medium'>{(item.Bonus).toLocaleString()}.00</span>
                        </div>
                    </div>
                ))}

                <div className='nav-bg mt-5 px-2 pb-5'>
                    <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base'>Rules</div>
                    <ul>
                        <li className=' flex'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100  leading-[18px]'>The higher the number of consecutive login days, the more rewards you get, up to 7 consecutive days</p>
                        </li>
                        <li className=' flex mt-4'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>During the activity, please check once a day</p>
                        </li>
                        <li className=' flex mt-4'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px]'>Players with no deposit history cannot claim the bonus</p>
                        </li>
                        <li className=' flex mt-4'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>Deposit requirements must be met from day one</p>
                        </li>
                        <li className=' flex mt-4'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>The plateform reserves the right to final interpretation of this activity</p>
                        </li>
                        <li className=' flex mt-4'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>When you encounter problems, please contact customer service</p>
                        </li>
                    </ul>
                </div>


            </div>
        </>
    )
}

export default GameRules
