import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaDice } from "react-icons/fa6";
import { FaRegFlag, FaCheck, FaScaleBalanced } from "react-icons/fa6";
import { GiFlyingFlag } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

const BusnesMange = () => {
  return (
    <div className='text-white'>
      <h2 className='text-2xl'>Statistical Data</h2>
      <div className='flex flex-col gap-2 mt-6'>
        <input type="date" className='bg-[gray] w-fit rounded-sm' />
        <button className='px-3 py-1 bg-[#03bd8d] w-fit rounded-sm'>Search</button>
      </div>
      {/*  */}
      <div className="bg-background p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#17a2b8]">
            <IoPersonCircleOutline />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Total Members</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#8e44ad]">
            <FaDice />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Today Bets</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#8e44ad]">
            <FaDice />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Total Bets</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaRegFlag />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Win Counts</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaRegFlag />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Wins</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-red-500">
            <GiFlyingFlag />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Losses Count</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-red-500">
            <GiFlyingFlag />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Losses</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#9cbd21]">
            <MdBlock />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Locked Account</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaCheck />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Total Deposit</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaCheck />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Today Deposit</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#ffc107]">
            <BsBank2 />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Total Withdrawls</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#ffc107]">
            <BsBank2 />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Withdrawls Today</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaScaleBalanced />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Total P/L</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaScaleBalanced />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Today P/L</span>
              <span className="text-xl">0</span>
              </div>
            </div>
            <div style={{boxShadow:"0px 0px 10px #343a99"}} className=" text-white p-4 rounded-lg flex gap-2 items-center nav-bg">
            <div className="text-4xl  p-3 rounded bg-[#28a745]">
            <FaScaleBalanced />
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg">Net Earning</span>
              <span className="text-xl">0</span>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="nav-bg p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Export Data</h2>
                  <ul className="space-y-2">
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Today Recharge Export</button>
                    </li>
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Total Recharge Export</button>
                    </li>
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Total Withdrawal Export</button>
                    </li>
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Today Withdrawal Export</button>
                    </li>
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Today Betting Export</button>
                    </li>
                    <li>
                      <button className="w-full bg-[#192434] text-primary-foreground p-2 rounded hover:bg-[#192434]/80">Total Betting Export</button>
                    </li>
                  </ul>
                </div>
                <div className="nav-bg p-6 rounded-lg shadow-md mt-6">
                  <h2 className="text-lg font-semibold mb-4">Create Partner Account</h2>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium ">Username</label>
                    <input type="text" id="username" placeholder="Enter username" className="mt-1 text-white bg-body block w-full border border-border rounded p-2 focus:outline-none focus:ring focus:ring-ring" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium ">Password</label>
                    <input type="password" id="password" placeholder="Enter password" className="mt-1 text-white bg-body block w-full border border-border rounded p-2 focus:outline-none focus:ring focus:ring-ring" />
                  </div>
                  <button className="w-full bg-[#192434] p-2 rounded hover:bg-secondary/80">Initialize</button>
                </div>
                <div className="nav-bg  p-6 rounded-lg shadow-md mt-6">
                  <h2 className="text-lg font-semibold mb-4">Increase/Decrease Points/Money for All Partners</h2>
                  <div className="mb-4 w-[100%]">
                    <label htmlFor="username" className="block text-md font-medium ">Select Funtion</label>
                    <select name="Select Function" id="" className='text-white bg-body  w-[100%] p-2 rounded'>
                      <option value="Recharge" className='p-1'>Add money</option>
                      <option value="Withdrawal" className='p-1'>Deduct Money</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="text" className="block  text-md font-medium ">Amount</label>
                    <input type="number" id="text" placeholder="Enter Amount" className="mt-1 text-white bg-body block w-full border border-border rounded p-2 focus:outline-none focus:ring focus:ring-ring" />
                  </div>
                  <button className="w-full bg-[#192434] p-2 rounded hover:bg-secondary/80">Initialize</button>
                </div>
                <div className="nav-bg  p-6 rounded-lg shadow-md mt-6">
                  <h2 className="text-lg font-semibold mb-4">Increase/Decrease Points/Money for a Partner</h2>
                  <div className="mb-4">
                    <label htmlFor="text" className="block  text-md font-medium ">User Name</label>
                    <input type="number" id="text" placeholder="Enter Partner Name" className="mt-1 text-white bg-body block w-full border border-border rounded p-2 focus:outline-none focus:ring focus:ring-ring" />
                  </div>
                  <div className="mb-4 w-[100%]">
                    <label htmlFor="username" className="block text-md font-medium ">Select Funtion</label>
                    <select name="Select Function" id="" className='text-white bg-body  w-[100%] p-2 rounded'>
                      <option value="Recharge" className='p-1'>Add money</option>
                      <option value="Withdrawal" className='p-1'>Deduct Money</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="text" className="block  text-md font-medium ">Amount</label>
                    <input type="number" id="text" placeholder="Enter Amount" className="mt-1 text-white bg-body block w-full border border-border rounded p-2 focus:outline-none focus:ring focus:ring-ring" />
                  </div>
                  <button className="w-full bg-[#192434] p-2 rounded hover:bg-secondary/80">Initialize</button>
                </div>
    </div>
  )
}

export default BusnesMange
