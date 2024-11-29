import React, { useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { invitationBonus, newSubordinate } from '../../store/reducer/authReducer'
import { useDispatch, useSelector } from 'react-redux'

const InvitaionRecord = () => {

    const { newSubordinateData} = useSelector((state) => state.auth)


  const dispatch = useDispatch()
 




  useEffect(() => {

    dispatch(newSubordinate())
  }, []);

  

  function formatDateString(dateStr) {
    const date = new Date(dateStr);

    const formattedDate = date.getUTCFullYear() +
        '-' + String(date.getUTCMonth() + 1).padStart(2, '0') +
        '-' + String(date.getUTCDate()).padStart(2, '0') +
        ' ' + String(date.getUTCHours()).padStart(2, '0') +
        ':' + String(date.getUTCMinutes()).padStart(2, '0') +
        ':' + String(date.getUTCSeconds()).padStart(2, '0');

    return formattedDate;
}

function formatPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
      throw new Error('Invalid phone number format');
  }
  const prefix = phoneNumber.slice(0, 3);   // '987'
  const suffix = phoneNumber.slice(-3);     // '211'
  
  return `${prefix}****${suffix}`;
}

  return (
    <>
       <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center">
                    <button className='absolute'><Link to={"/main/InvitationBonus"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Invitation Record</h1>
                </div>
            </div>
            <div className='container-section'>
            {Array.isArray(newSubordinateData) && newSubordinateData?.map((item, i) => (
                    <div className='nav-bg rounded-md mt-3 pb-7 px-3 pt-1' key={i}>
                        <div className='mt-3 flex justify-between items-center gray-100 text-sm'>
                            <span className='text-sm font-medium'>{formatPhoneNumber(item.phone)}</span>
                            <span className='text-sm font-medium '>UID:{item?.id_user}</span>
                        </div>
                        <div className='flex justify-between items-center mt-3 gray-100 text-sm'>
                            <span className='text-sm font-medium'>First Deposit</span>
                            <span className='text-sm font-medium flex items-center'>{item.money}</span>
                        </div>

                        <div className='flex justify-between items-center mt-3 gray-100 text-sm'>
                            <span className='text-sm font-medium'>Direct Subordinate</span>
                            <span className='text-sm font-medium flex items-center'>{formatDateString(item.today)}</span>
                        </div>

                     
                    </div>
                ))}
            </div>
    </>
  )
}

export default InvitaionRecord
