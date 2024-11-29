import React, { useState, useEffect } from "react";
import { SlBasket } from "react-icons/sl";
import "./Page.css";
import {
  TbCircleNumber8Filled,
  TbHexagonLetterBFilled,
  TbHexagonLetterSFilled,
  TbHexagonNumber0Filled,
  TbHexagonNumber1Filled,
  TbHexagonNumber2Filled,
  TbHexagonNumber3Filled,
  TbHexagonNumber4Filled,
  TbHexagonNumber5Filled,
  TbHexagonNumber6Filled,
  TbHexagonNumber7Filled,
  TbHexagonNumber9Filled,
} from "react-icons/tb";
const bettingData = [
  { id: 1, text: "Join Red 40", time: "2024-08-07 6:44:14 AM" },
  { id: 2, text: "Join Red 1", time: "2024-08-07 6:44:14 AM" },
  { id: 3, text: "Join Red 30", time: "2024-08-07 6:44:16 AM" },
  { id: 4, text: "Join Red 10", time: "2024-08-07 6:44:17 AM" },
  { id: 5, text: "Join Red 200", time: "2024-08-07 6:44:18 AM" },
];
const Wingos = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [periods, setPeriods] = useState([
    { period: "202408071102", number: 3 },
    { period: "202408071101", number: 6 },
    { period: "202408071100", number: 8 },
    { period: "202408071099", number: 5 },
    { period: "202408071098", number: 7 },
    { period: "202408071097", number: 7 },
    { period: "202408071096", number: 5 },
    { period: "202408071095", number: 7 },
    { period: "202408071094", number: 7 },
    { period: "202408071093", number: 9 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime === 0 ? 60 : prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="bg-background p-2 rounded-md">
        <h1 className="text-3xl font-semibold text-white mb-6">Dashboard V</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 nav-bg p-4">
          <div className=" text-white border border-color-slat bg-color-l p-2 flex items-center gap-2 rounded-md">
            <p className="text-4xl  p-2 rounded bgs-yellow-600">1M</p>
            <p className="text-lg font-medium gray-50">WinGO 1 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md ">
            <p className="text-4xl  p-2 rounded bgs-yellow-600">3M</p>
            <p className="text-lg font-medium gray-50">WinGO 3 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md ">
            <p className="text-4xl  p-2 rounded bgs-yellow-600">5M</p>
            <p className="text-lg font-medium gray-50">WinGO 5 min</p>
          </div>
          <div className="bg-accent text-white border border-color-slat p-2 bg-color-l flex items-center gap-2 rounded-md ">
            <p className="text-4xl   p-2 rounded bgs-yellow-600">10M</p>
            <p className="text-lg font-medium gray-50">WinGO 10 min</p>
          </div>
        </div>
      </div>

      {/* second */}
      <div className="bg-background p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className=" text-white rounded-sm py-3  flex gap-2 items-center bgs-red-200">
          <div className="text-4xl  p-3 rounded bgs-red-200">
            <SlBasket />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-md font-bold uppercase">JOIN RED</span>
            <span className="text-xl font-bold">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm py-3  flex gap-2 items-center bgs-violet">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-lg font-bold uppercase">Join Voilet</span>
            <span className="text-xl font-bold">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm  py-3 flex gap-2 items-center bgs-green">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-lg font-bold uppercase">Join Green</span>
            <span className="text-xl font-bold uppercase">0</span>
          </div>
        </div>
        <div className=" text-white rounded-sm py-3 flex gap-2 items-center bg-aqua">
          <div className="text-4xl  p-3 rounded ">
            <SlBasket />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-lg font-bold uppercase">Total Amount</span>
            <span className="text-xl font-bold uppercase">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className=" rounded ">
            <TbHexagonNumber0Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber1Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber2Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber3Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber4Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber5Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber6Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber7Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbCircleNumber8Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonNumber9Filled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonLetterBFilled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN BIG</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
        <div className=" text-white p-4 rounded-md flex gap-2 items-center nav-bg">
          <p className="">
            <TbHexagonLetterSFilled className="color-blue-500 text-6xl" />
          </p>
          <div className="flex flex-col gap-0 gray-50">
            <span className="text-md font-bold">JOIN SMALL</span>
            <span className="text-xl font-medium">0</span>
          </div>
        </div>
      </div>

      {/* 3rd */}
      <div className="h-auto w-[100%] nav-bg p-2 text-white">
        <h2 className="p-3 font-semibold text-lg">Betting Statistics </h2>
        <div className=" p-4 rounded-md shadow-lg h-[400px] overflow-hidden">
          <div className="space-y-2 animate-scroll">
            {bettingData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bgs-red-200 p-2 rounded-sm"
              >
                <span className="text-white">{item.text}</span>
                <span className="text-white">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4th */}
      <div className="nav-bg mt-5 rounded-md">
        <div className="flex flex-col justify-center items-center mb-4 bg-color-l p-2 rounded">
          <h1 className="text-2xl font-semibold gray-50 mb-4">202408071103</h1>
          <div className="flex">
            <span className="text-4xl font-mono gray-100">
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}
            </span>
            <span className="text-4xl font-mono gray-100 mx-2">:</span>
            <span className="text-4xl font-mono gray-100">
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <table className="min-w-full bg-card border border-color-slat">
          <thead>
            <tr className="bg-secondary text-white border-b-[1px] border-color-slat">
              <th className="py-2">Periods</th>
              <th className="py-2">Number</th>
              <th className="py-2">Big/Small</th>
              <th className="py-2">Colour</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((item) => {
              const bigSmall = item.number > 5 ? "Big" : "Small";
              const color = item.number > 5 ? "bgs-green" : "bgs-red-200";
              return (
                <tr key={item.period} className="text-white">
                  <td className="py-2 text-center">{item.period}</td>
                  <td className="py-2  text-center">{item.number}</td>
                  <td className="py-2  text-center">{bigSmall}</td>
                  <td className="py-2  text-center">
                    <span
                      className={`inline-block w-4 h-4 rounded-full ${color}`}
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 5th */}
      <div className="nav-bg p-6 rounded-md shadow-lg mt-6">
        <h2 className="text-xl bg-color-l p-3 text-white rounded">
          Adjusting the Result
        </h2>
        <p className="text-muted-foreground mt-2">
          <span className="color-red-200">0 (Red and White)</span> |
          <span className="text-green-500">5 (Green and White)</span> |
          <span className="color-green">1, 3, 7, 9 (Green)</span> |
          <span className="text-red-500">2, 4, 6, 8 (Red)</span>
        </p>
        <h3 className="text-lg font-medium text-white mt-4">
          Next Result: <span className=" color-yellow-200">Random</span>
        </h3>
        <input
          type="text"
          placeholder="Enter the result (e.g., 1)"
          className="mt-4 p-3 bg-body text-white border  rounded-md w-full
               focus:border-slate-700 ps-6 flex items-center focus:border outline-none border-slate-900
              "
        />
        <button className="text-xl bg-blues mt-2 px-3 py-1 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Wingos;
