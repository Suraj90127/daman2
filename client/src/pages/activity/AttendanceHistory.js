import React, { useCallback, useEffect } from 'react'
import { GiBackwardTime } from 'react-icons/gi'
import { IoIosArrowBack } from 'react-icons/io'
import { IoGiftSharp, IoWalletSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { debounce } from 'lodash'
import Coins from "../../assets/coins.png";
import { attendance } from '../../store/reducer/authReducer'
const AttendanceHistory = () => {
  const { attendance_history, successMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const debounced = useCallback(
    debounce(() => {
      dispatch(attendance());
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debounced();
  }, [debounced]);

  console.log("jjoo",)

  return (
    <>
      <div className='nav-bg p-1 py-3 sticky top-0 z-20'>
        <div className="container-section flex items-center">
          <button className='absolute'>
            <Link to={"/activity"}>
              <IoIosArrowBack className='text-xl' />
            </Link>
          </button>
          <h1 className='heading-h1 gray-100 text-center flex justify-center items-center m-auto'>Attendance History</h1>
        </div>
      </div>
      <div className="container-section">
        {Array.isArray(attendance_history) && attendance_history?.map((item, i) => (



          <div className='nav-bg rounded-md mt-3'>



            <div className='flex justify-between items-center p-2 '>
              <div>
                <p className='text-[14px] gray-50 font-medium'>Continuous attendance day</p>
                <p className='fs-sm gray-100'>{item.date}</p>

              </div>
              <div className='flex items-center rounded-2xl color-yellow-bg-200 p-1 w-[40%]'>
                <img src={Coins} alt="" className='w-5' />
                <p className=' text-[14px]  text-center flex m-auto font-medium'>{item.amount}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default AttendanceHistory
