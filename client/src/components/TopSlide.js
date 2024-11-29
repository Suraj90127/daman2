import React, { useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import upi from '../assets/upi.png';
import usd from '../assets/usdt.png';
import paytm from '../assets/paytm.jpg';
import wallet from '../assets/e-wallet.png';

import { MdContentCopy } from "react-icons/md";

const TopSlide = () => {
  const [filter, setFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  const depositData = [
    { id: 1, method: 'Paytm x QR', amount: '₹100.00', date: '2024-08-17 15:33:35', order: 'RC2024081715333519684271', status: 'Failed' },
    { id: 2, method: 'FunPay - APP', amount: '₹100.00', date: '2024-08-17 15:33:12', order: 'RC2024081715331290284052', status: 'Failed' },
    { id: 3, method: 'FunPay - APP', amount: '₹100.00', date: '2014-08-17 15:33:12', order: 'R2408asda1715331290284052', status: 'Completed' },
    // Add more data as needed
  ];

  const filteredData = depositData.filter(item => {
    const itemDate = new Date(item.date);
    const selected = new Date(selectedDate);
    return (filter === 'All' || item.method === filter) && (!selectedDate || itemDate <= selected);
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="bg-gray-900 text-white p-2">
      <div className='flex justify-between items-center p-2 bg-gray-800 mb-2'>
        <IoChevronBack />
        <h1 className="text-xl font-semibold">Deposit history</h1>
        <div></div>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto container">
        <button 
          onClick={() => { setFilter('All'); setSelectedDate(''); }} 
          className={`bg-gray-800 px-4 py-2 rounded-md ${filter === 'All' ? 'bg-[#420080]' : 'active:bg-[#4269c1]'} flex justify-center items-center gap-1 whitespace-nowrap `}
        >
          <PiSquaresFourBold size={24} />All
        </button>
        <button 
          onClick={() => setFilter('UPI x QR')} 
          className={`bg-gray-800 px-4 py-2 text-sm rounded-md ${filter === 'UPI x QR' ? 'bg-[#420080]' : 'active:bg-[#4269c1]'} flex gap-2 justify-center items-center whitespace-nowrap min-w-[100px]`}
        >
          <img src={upi} className='w-[20px]' alt="upi" />
          UPI x QR
        </button>
        <button 
          onClick={() => setFilter('E-Wallet')} 
          className={`bg-gray-800 px-4 py-2 text-sm rounded-md ${filter === 'E-Wallet' ? 'bg-[#420080]' : 'active:bg-[#4269c1]'} flex gap-2 justify-center items-center whitespace-nowrap min-w-[100px]`}
        >
          <img src={wallet} className='w-[20px]' alt="wallet" />
          E-Wallet
        </button>
        <button 
          onClick={() => setFilter('Paytm x QR')} 
          className={`bg-gray-800 px-4 py-2 text-sm rounded-md ${filter === 'Paytm x QR' ? 'bg-[#420080]' : 'active:bg-[#4269c1]'} flex gap-2 justify-center items-center whitespace-nowrap min-w-[120px]`}
        >
          <img src={paytm} className='w-[20px]' alt="ptm" />
          Paytm x QR
        </button>
        <button 
          onClick={() => setFilter('USDT')} 
          className={`bg-gray-800 px-4 py-2 text-sm rounded-md ${filter === 'USDT' ? 'bg-[#420080]' : 'active:bg-[#4269c1]'} flex gap-2 justify-center items-center whitespace-nowrap min-w-[100px]`}
        >
          <img src={usd} className='w-[20px]' alt="usd" />
          USDT
        </button>
      </div>
      <div className="flex mb-4">
        <button 
          onClick={() => { setFilter('All'); setSelectedDate(''); }} 
          className="bg-gray-800 px-4 py-2 rounded-md active:bg-[#4269c1] flex justify-between items-center gap-1 flex-1"
        >
          <IoChevronDownOutline />All
        </button>
        <input 
          type="date" 
          className=" rounded-md p-2 bg-gray-800 text-white flex-1 ml-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="Choose Date"
        />
      </div>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map(item => (
            <li key={item.id} className="mb-4 p-2 bg-gray-800 rounded-md">
              <div className="flex justify-between items-center mb-2 p-2 border-b-[1px] border-white">
                <span className="bg-green-500 text-white px-2 py-1 rounded">Deposit</span>
                <span className={`font-bold ${item.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.status}
                </span>
              </div>
              <div className="text-sm flex flex-col gap-2">
                <div className='flex justify-between'>
                  <p className="text-gray-300">Balance: </p>
                  <p><span className="text-[orange]">{item.amount}</span></p>
                </div>
                <div className='flex justify-between'>
                  <p className="text-gray-300">Type: </p>
                  <p><span className="text-white">{item.method}</span></p>
                </div>
                <div className='flex justify-between'>
                  <p className="text-gray-300">Time: </p>
                  <p><span className="text-white">{item.date}</span></p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className="text-gray-300">Order number:</p>
                  <div className="flex items-center gap-2">
                    <p><span className="text-white">{item.order}</span></p>
                    <MdContentCopy onClick={() => copyToClipboard(item.order)} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <img hidden="true" alt="No data illustration" src="https://openui.fly.dev/openui/200x200.svg?text=📄" />
          <p className="text-muted-foreground mt-4">No data available</p>
        </div>
      )}
      <button className="fixed bottom-4 right-4 bg-accent text-accent-foreground p-3 rounded-full shadow-lg">
        <img hidden="true" alt="Chat icon" src="https://openui.fly.dev/openui/24x24.svg?text=💬" />
      </button>
    </div>
  );
}

export default TopSlide;
