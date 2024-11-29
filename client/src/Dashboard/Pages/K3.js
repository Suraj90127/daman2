import React, { useState, useEffect } from "react";
import { SlBasket } from "react-icons/sl";
import './Page.css'
const bettingData = [
    { id: 1, text: "Join Red 40", time: "2024-08-07 6:44:14 AM" },
    { id: 2, text: "Join Red 1", time: "2024-08-07 6:44:14 AM" },
    { id: 3, text: "Join Red 30", time: "2024-08-07 6:44:16 AM" },
    { id: 4, text: "Join Red 10", time: "2024-08-07 6:44:17 AM" },
    { id: 5, text: "Join Red 200", time: "2024-08-07 6:44:18 AM" },
  ];

const K3s = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const data = [
        { period: '202408071137', numbers: [4, 5, 6, 5, 9] },
        { period: '202408071136', numbers: [6, 5, 2, 7, 6] },
        { period: '202408071135', numbers: [2, 1, 7, 8, 9] },
        { period: '202408071134', numbers: [2, 9, 3, 0, 1] },
        { period: '202408071133', numbers: [6, 1, 8, 2, 7] },
        { period: '202408071132', numbers: [6, 8, 2, 6, 8] },
        { period: '202408071131', numbers: [3, 8, 2, 8, 7] },
        { period: '202408071130', numbers: [9, 8, 1, 3, 4] },
        { period: '202408071129', numbers: [8, 1, 3, 4, 5] },
        { period: '202408071128', numbers: [6, 2, 4, 9, 2] },
      ];
    
      const getBigSmall = (numbers) => {
        const sum = numbers.reduce((a, b) => a + b, 0);
        return sum > 25 ? 'Big' : 'Small';
      };
    
      const getParity = (numbers) => {
        const sum = numbers.reduce((a, b) => a + b, 0);
        return sum % 2 === 0 ? 'Even' : 'Odd';
      };
    
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => (prevTime === 0 ? 60 : prevTime - 1));
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
  return (
    <div>
    <div className="bg-background p-2 rounded-lg">
        <h1 className="text-3xl font-semibold text-white mb-6">Dashboard V</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 nav-bg p-4">
          <div className=" text-white border border-color-slat bg-color-l p-2 flex items-center gap-2 rounded-md"
          >
            <p className="text-4xl  p-2 rounded bgs-yellow-600">1M</p>
            <p className="text-lg font-medium gray-50">
            K3 1 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md "
          >
            <p className="text-4xl  p-2 rounded bgs-yellow-600">3M</p>
            <p className="text-lg font-medium gray-50">
            K3 3 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md "
          >
            <p className="text-4xl  p-2 rounded bgs-yellow-600">5M</p>
            <p className="text-sm  font-semibold">
            K3 5 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md "
          >
            <p className="text-4xl   p-2 rounded bgs-yellow-600">10M</p>
            <p className="text-lg font-medium gray-50">
            K3 10 min</p>
          </div>
        </div>
      </div>

      {/* second */}
      <div className="bg-background p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className=" text-white rounded-sm py-3  flex gap-2 items-center bgs-red-200">
          <div className="text-4xl  p-3 rounded bgs-red-200">
            <SlBasket />
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-md font-bold uppercase">Total number</span>
            <span className="text-xl font-bold">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm py-3  flex gap-2 items-center bgs-violet">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-lg font-bold uppercase">2 matching number</span>
            <span className="text-xl font-bold">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm  py-3 flex gap-2 items-center bgs-green">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-lg font-bold uppercase">3 matching number</span>
            <span className="text-xl font-bold uppercase">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm py-3 flex gap-2 items-center bg-aqua">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-lg font-bold uppercase">different number</span>
            <span className="text-xl font-bold uppercase">0</span>
          </div>
        </div>
          </div>

          {/* 3rd */}
          <div className='h-auto w-[100%] nav-bg p-2 text-white'>
          <h2 className='p-3 font-semibold text-lg'>Betting Statistics </h2>
          <div className=" p-4 rounded-lg shadow-lg h-[400px] overflow-hidden">
    <div className="space-y-2 animate-scroll">
      {bettingData.map((item) => (
        <div key={item.id} className="flex items-center justify-between bgs-red-200 p-2 rounded-sm">
          <span className="text-white">{item.text}</span>
          <span className="text-white">{item.time}</span>
        </div>
      ))}
    </div>
    </div>
  </div>

  {/* 4th */}
  <div className="nav-bg mt-5 rounded-lg">
    <div className="flex flex-col justify-center items-center mb-4 bg-color-l p-2 rounded">
    <h1 className="text-2xl font-semibold gray-50 mb-4">202408071103</h1>
    <div className="flex">
      <span className="text-4xl font-mono gray-100">{Math.floor(timeLeft / 60).toString().padStart(2, '0')}</span>
      <span className="text-4xl font-mono gray-100 mx-2">:</span>
      <span className="text-4xl font-mono gray-100">{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-card text-card-foreground">
        <tr>
          <th className="px-6 py-3 text-center text-md text-white font-medium uppercase tracking-wider">Stage</th>
          <th className="px-6 py-3 text-center text-md text-white font-medium uppercase tracking-wider">Result</th>
          <th className="px-6 py-3 text-center text-md text-white font-medium uppercase tracking-wider">Big Small</th>
          <th className="px-6 py-3 text-center text-md text-white font-medium uppercase tracking-wider">Parity</th>
        </tr>
      </thead>
      <tbody className="bg-background divide-y divide-border border-color-slat">
        {data.map((item, index) => {
          const result = item.numbers.join(' ');
          const bigSmall = getBigSmall(item.numbers);
          const parity = getParity(item.numbers);
          const isEven = item.numbers.reduce((a, b) => a + b, 0) % 2 === 0;

          return (
            <tr key={index} className="border-color-slat">
              <td className="px-6 py-4 text-white text-center whitespace-nowrap">{item.period}</td>
              <td className={`"px-6 py-4 text-white text-center whitespace-nowrap" ${isEven? 'text-green-500' : 'text-red-500'}`}>{result}</td>
              <td className="px-6 py-4 text-white text-center whitespace-nowrap">{bigSmall}</td>
              <td className="px-6 py-4 text-white text-center whitespace-nowrap">{parity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  </div>
  {/* 5th */}
  <div className="nav-bg p-6 rounded-md shadow-lg mt-6">
        <h2 className="text-xl bg-color-l p-3 text-white rounded">Adjusting the Result</h2>
        <p className="text-muted-foreground mt-2">
          <span className="color-red-200">0 (Red and White)</span> |<span className="text-green-500">5 (Green and White)</span> |<span className="color-green">1, 3, 7, 9 (Green)</span> |
          <span className="text-red-500">2, 4, 6, 8 (Red)</span>
        </p>
        <h3 className="text-lg font-medium text-white mt-4">
          Next Result: <span className=" color-yellow-200">Random</span>
        </h3>
        <input type="text" placeholder="Enter the result (e.g., 1)" className="mt-4 p-3 bg-body text-white border  rounded-md w-full
               focus:border-slate-700 ps-6 flex items-center focus:border outline-none border-slate-900
              " />
        <button className="text-xl bg-blues mt-2 px-3 py-1 text-white rounded">Submit</button>
      </div>
  </div>
  )
}

export default K3s
