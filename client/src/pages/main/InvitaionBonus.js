import React, { useEffect } from 'react'
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import "./invitation.css"
import InviteRuleImg from "../../assets/inviterule.svg"
import InviteRecordImg from "../../assets/inviterecord.svg"
import { RxCross2 } from 'react-icons/rx'
import { useSelector, useDispatch } from "react-redux"
import { invitationBonus } from '../../store/reducer/authReducer'
import { FaCheck } from 'react-icons/fa'
const InvitaionBonus = () => {
    const { invitationBonusData } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log("invitationBonusData", invitationBonusData)
    useEffect(() => {
        dispatch(invitationBonus())

    }, []);

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

   
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center">
                    <button className='absolute'><Link to={"/activity"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Invitation bonus</h1>
                </div>
            </div>
            <div className="invitation-banner">
                <div className='w-[90%] text-white'>
                    <h3 className='heading-h3 mb-3'>Invite friends and deposit</h3>
                    <p className='fs-sm'>Both parties can rewards</p>
                    <p className='fs-sm'>Invite friends to register and recharge to recieve awards activity date </p>
                    <h3 className="heading-h3">2024-03-24 - 2124-03-2024</h3>
                </div>
            </div>

            <div className="in-bonus-head bg-color-l w-[90%] m-auto flex justify-between items-center p-4 mt-[-20px] rounded-xl text-center">
                <div className='text-center flex flex-col justify-center items-center' onClick={() => navigate("/main/InvitationBonus/Rule")}>
                    <img src={InviteRuleImg} alt="" className='w-14' />
                    <p className='gray-100 text-sm'>Invitation reward rules</p>
                </div>
                <div className='text-center flex flex-col justify-center items-center '
                onClick={()=>navigate("/main/InvitationBonus/record")}
                >
                    <img src={InviteRecordImg} alt="" className='w-14' />
                    <p className='gray-100 text-sm'>Invitation record</p>
                </div>
            </div>
            <div className="container-section mt-5">

            {inviteData.map((item, i) => {
                    // Assuming data array has an `id` that matches with `inviteData`
                    const dataItem =invitationBonusData?.data[i];
                    const buttonText = dataItem?.status === 1 ? 'Completed' : 'Unfinished';

                    return (
                        <div className='nav-bg rounded-xl mt-3' key={i}>
                            <div className='flex justify-between items-center'>
                                <div className=' bgs-green  w-[40%]  rounded-tl-xl rounded-br-xl px-3 py-3 text-base font-medium'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <span className='text-sm'>Bonus</span>
                                            <span className='bg-white rounded-full ml-1 w-5 h-5 tex-sm text-center flex items-center justify-center gray-100'>{i + 1}</span>
                                        </div>
                                      {buttonText==="Completed"?<IoIosCheckmark className='bg-white gray-100 rounded-full ml-1 w-5 h-5 tex-sm text-center flex items-center justify-center' />:  <RxCross2 className='bg-white gray-100 rounded-full ml-1 w-5 h-5 tex-sm text-center flex items-center justify-center' />}
                                    </div>
                                </div>
                                <p className='color-yellow-200 text-base mr-2 border-b bg-color-l  w-[55%] flex justify-end leading-9 font-medium'>₹{formatNumber(item.bonus)}.00</p>
                            </div>

                            <div className='bg-color-l mt-3 flex justify-between items-center mx-2 px-3 py-1 rounded-sm gray-100 text-sm'>
                                <span>Number of invitations</span>
                                <span className='mr-10'>{item.invite}</span>
                            </div>
                            <div className='bg-color-l mt-2 flex justify-between items-center mx-2 px-3 py-1 rounded-sm gray-100 text-sm'>
                                <span>Recharge per people</span>
                                <span className='mr-10 color-red-200'>₹{(item.recharge).toFixed(2)}</span>
                            </div>

                            <div className="line-two"></div>

                            <div className='flex item-center justify-around mb-3'>
                                <div className='flex items-center flex-col justify-center w-[50%]'>
                                    <p className='text-base color-yellow-200'>
                                    {invitationBonusData?.downline >= 0 ?  invitationBonusData?.downline : 0} / {item.invite}
                                    </p>
                                    <span className='text-[12px] gray-100'>Number of invitations</span>
                                </div>

                                <div className='flex items-center flex-col justify-center w-[50%] border-l bg-color-l'>
                                    <p className='text-base color-red-200'>{invitationBonusData?.validDepositsCount } / {item.invite}</p>
                                    <span className='text-[12px] gray-100'>Deposit number</span>
                                </div>
                            </div>

                            <div className='m-2 pb-4 pt-2'>
                                <button className={` py-2 rounded-3xl text-base w-full gray-100 heading-h3 gray-50 font-bold ${dataItem?.status === 1?"bgs-green":"bg-color-l"}`}>{buttonText}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default InvitaionBonus

const inviteData = [
    {
        invite: 1,
        recharge: 500,
        bonus: 55
    },
    {
        invite: 3,
        recharge: 500,
        bonus: 155
    },
    {
        invite: 10,
        recharge: 500,
        bonus: 555
    },
    {
        invite: 30,
        recharge: 500,
        bonus: 1555
    },
    {
        invite: 70,
        recharge: 500,
        bonus: 3355
    },
    {
        invite: 200,
        recharge: 500,
        bonus: 10955
    },
    {
        invite: 500,
        recharge: 500,
        bonus: 25555
    },
    {
        invite: 100,
        recharge: 500,
        bonus: 48555
    },
    {
        invite: 5000,
        recharge: 500,
        bonus: 355555
    },
    {
        invite: 10000,
        recharge: 500,
        bonus: 755555
    },
    {
        invite: 50000,
        recharge: 500,
        bonus: 1555555
    },
    {
        invite: 20000,
        recharge: 500,
        bonus: 3555555
    },
]
