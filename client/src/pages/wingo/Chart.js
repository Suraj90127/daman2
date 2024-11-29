import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Chart = () => {
  useEffect(() => {
    const trendList = document.getElementById('trendList');
    const activeElements = document.querySelectorAll('.active');

    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("class", "svg-line");

    for (let i = 0; i < activeElements.length - 1; i++) {
      const firstActive = activeElements[i];
      const secondActive = activeElements[i + 1];

      const line = document.createElementNS(svgns, "line");
      line.setAttribute("x1", `${firstActive.offsetLeft + firstActive.offsetWidth / 2}px`);
      line.setAttribute("y1", `${firstActive.offsetTop + firstActive.offsetHeight / 2}px`);
      line.setAttribute("x2", `${secondActive.offsetLeft + secondActive.offsetWidth / 2}px`);
      line.setAttribute("y2", `${secondActive.offsetTop + secondActive.offsetHeight / 2}px`);
      line.setAttribute("stroke", "red");
      line.setAttribute("stroke-width", "2");

      svg.appendChild(line);
    }

    trendList.appendChild(svg);
  }, []);



  return (

    <>
      <div className="chart-section mt-5 nav-bg rounded-t-md">
        <div className='flex items-center bg-color-l justify-evenly rounded-t-md py-2'>
          <h5 className="heading-h5 text-base font-semibold ">Period</h5>
          <h5 className="heading-h5 text-base font-semibold ">Number</h5>
        </div>

        <div className='mx-2 mt-2'>
          <p className='text-sm gray-50 font-normal font-sans'>Static (last 100 Periods)</p>
          <div className='flex items-center justify-between'>
            <p className='text-sm gray-50'>Winning number</p>
            <div className='flex items-center mt-2'>

              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>0</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>1</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>2</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>3</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>4</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>5</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>6</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>7</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>8</span>
              <span className='rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center'>9</span>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-sm gray-50'>Missing</p>
            <div className='grid grid-cols-10 gap-2'>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>4</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>16</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>3</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>14</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>1</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>9</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>7</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>22</span>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-sm gray-50'>Avg Missing</p>
            <div className='grid grid-cols-10 gap-2'>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>4</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>16</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>3</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>14</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>1</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>9</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>7</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>22</span>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-sm gray-50'>Frequency</p>
            <div className='grid grid-cols-10 gap-2'>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>4</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>16</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>3</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>14</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>1</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>9</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>7</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>22</span>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-sm gray-50'>Max consecutive</p>
            <div className='grid grid-cols-10 gap-2'>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>4</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>16</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>3</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>14</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>18</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>1</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>9</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>7</span>
              <span className='col-span-1 flex justify-center items-center fs-sm  slate-500 '>22</span>
            </div>
          </div>
        </div>

        <div className="container2 mx-2">
          <div className="trend-record w-full">
            <ul id="trendList" className='w-full mt-5'>
              <li className='flex justify-between items-center'>
                <div className="first fs-sm gray-50">20240327010558</div>
                <div className="sec text-sm gray-50">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span className="active">3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                </div>
                <div className="third">B</div>
              </li>
              <li className='flex justify-between items-center'>
                <div className="first  fs-sm gray-50">20240327010558</div>
                <div className="sec">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span className="active">7</span>
                  <span>8</span>
                  <span>9</span>
                </div>
                <div className="third">B</div>
              </li>
              <li className='flex justify-between items-center'>
                <div className="first  fs-sm gray-50">20240327010558</div>
                <div className="sec">
                  <span>0</span>
                  <span className="active">1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                </div>
                <div className="third color-yellow-bg-200">B</div>
              </li>
              <li className='flex justify-between items-center'>
                <div className="first  fs-sm gray-50">20240327010558</div>
                <div className="sec">
                  <span>0</span>
                  <span className='active'>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                </div>
                <div className="third bgs-blue-500">S</div>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className='nav-bg p-6 flex items-center justify-center mt-5'>
        <button className='bg-color-l p-2 mr-8'><Link to={"/"}>  <IoIosArrowBack className='text-lg' /></Link></button>
        <span className='fs-sm gray-100'>1/555</span>
        <button className='bgs-blue-500 p-2 ms-8'><Link to={"/"}>  <IoIosArrowForward className='text-lg' /></Link></button>

      </div>



    </>
  );
};

export default Chart;
