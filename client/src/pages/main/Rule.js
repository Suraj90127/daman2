import React, { useEffect } from 'react'
import { FaSquare } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
const RuleData = [
    {
        Icount: 1,
        Deposit: 500.00,
        Bonus: 55.00
    },
    {
        Icount: 3,
        Deposit: 500.00,
        Bonus: 155.00
    },
    {
        Icount: 10,
        Deposit: 500.00,
        Bonus: 555.00
    },
    {
        Icount: 30,
        Deposit: 500.00,
        Bonus: "1,555.00"
    },
    {
        Icount: 70,
        Deposit: 500.00,
        Bonus: "3,355.00"
    },
    {
        Icount: 200,
        Deposit: 500.00,
        Bonus: "10,955.00"
    },
    {
        Icount: 500,
        Deposit: 500.00,
        Bonus: "25,555.00"
    },
    {
        Icount: 1000,
        Deposit: 500.00,
        Bonus: "48,555.00"
    },
    {
        Icount: 5000,
        Deposit: 500.00,
        Bonus: "355,555.00"
    },
    {
        Icount: 10000,
        Deposit: 500.00,
        Bonus: "755,555.00"
    },
    {
        Icount: 20000,
        Deposit: 500.00,
        Bonus: "1,555,555.00"
    },
    {
        Icount: 50000,
        Deposit: 500.00,
        Bonus: "3,555,555.00"
    },


]


const Rule = () => {
    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[])
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex  items-center">
                    <button className='absolute'><Link to={"/main/InvitationBonus"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Invitation bonus</h1>
                </div>
            </div>
            <div className="container-section mt-2 pb-5">
                <p className='gray-100 text-sm '>Invite  friends and  recharge to get additional platefrom rewards!</p>
                <p className='gray-100 text-sm mt-1'>After being claimed, the rewards will be directly distributed to the wallet balance within 10 minutes.</p>


                <div className='grid grid-cols-12 bg-color-l rounded-t-md p-2 mt-2'>
                    <div className="col-span-4 flex text-center justify-center">
                        <h3 className='heading-h3'>Invite account</h3>

                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h3 className="heading-h3">Deposit amount</h3>
                    </div>
                    <div className="col-span-4  text-center justify-center">
                        <h3 className='heading-h3'>Bonus</h3>
                    </div>
                </div>

                {/* rules data */}
                {RuleData.map((item, i) => (
                    <div className={i % 2 == 0 ? 'grid grid-cols-12 nav-bg p-2 py-3' : 'grid grid-cols-12 bg-color-l p-2 py-3'} key={i}>
                        <div className="col-span-4 flex text-center justify-center">
                            <span className='text-base gray-100 font-medium'>{item.Icount}People</span>
                        </div>
                        <div className="col-span-4  text-center justify-center">
                            <span className='text-base gray-100 font-medium'>₹{item.Deposit}</span>
                        </div>
                        <div className="col-span-4  text-center justify-center">
                            <span className='text-base gray-100 font-medium'>₹{item.Bonus}</span>
                        </div>
                    </div>
                ))}

                <div className='nav-bg mt-5 px-2 pb-5'>
                    <div className='bg-color-l w-[60%] rounded-bl-full mb-2 py-1 rounded-br-full flex justify-center m-auto  font-bold text-base'>Rules</div>
                    <ul>
                        <li className=' flex'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100  leading-[18px]'>Only when the number of invited accounts is reached and each account can meet the recharge amount can you receive the bonus.</p>
                        </li>
                        <li className=' flex mt-2'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>The invitation account meets the requirements, but the recharge amount of the account does not meet the requirements, and the bonus cannot be claimed.</p>
                        </li>
                        <li className=' flex mt-2'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px]'>Please claim the event bonus within the event period. All bonuses will be cleared after the event expires.</p>
                        </li>
                        <li className=' flex mt-2'>
                            <span><FaSquare className='rotate-45 text-[7px] color-blue mr-2 mt-[2px]' /></span>
                            <p className='text-sm gray-100 leading-[18px] '>Please complete the task within the event period. After the event expires, the invitation record will be cleared.</p>
                        </li>
                    </ul>
                </div>


            </div>
        </>
    )
}

export default Rule
