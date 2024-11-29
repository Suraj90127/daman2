import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const FiveDChart = () => {
    const [selectTab, setSelectTab] = useState("A")
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

            <div className="chart-section mt-5  rounded-t-md">
                <div className='nav-bg'>
                    <div className='flex items-center mt-4 border-b border-[--bg-color-l]'>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2 rounded-t-md ${selectTab == "A" ? " bgs-blue-500 text-white after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => setSelectTab("A")}>A</button>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2 rounded-t-md ${selectTab == "B" ? "bgs-blue-500 text-white  after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => { setSelectTab("B"); }}>B</button>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2 rounded-t-md ${selectTab == "C" ? "bgs-blue-500 text-white after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => { setSelectTab("C"); }}>C</button>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2  rounded-t-md ${selectTab == "D" ? "bgs-blue-500 text-white after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => { setSelectTab("D"); }}>D</button>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2  rounded-t-md ${selectTab == "E" ? "bgs-blue-500 text-white after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => { setSelectTab("E"); }}>E</button>
                        <button className={` text-lg font-bold gray-100  w-10 h-10  flex justify-center items-center abc-select relative mr-2  rounded-t-md ${selectTab == "F" ? "bgs-blue-500 text-white after:bg-custom-radial-gradient" : "bg-color-l"}`} onClick={() => { setSelectTab("F"); }}>F</button>
                    </div>

                    <div className='mx-2 mt-2'>
                        <p className='text-sm gray-50 font-normal font-sans'>Static (last 100 Periods)</p>

                        <div className='flex items-center justify-between mt-2'>
                            <p className='text-sm gray-50'>Missing</p>
                            <div className='grid grid-cols-10 gap-2'>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>4</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>16</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>3</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>14</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>1</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>9</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>7</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>22</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <p className='text-sm gray-50'>Avg Missing</p>
                            <div className='grid grid-cols-10 gap-2'>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>4</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>16</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>3</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>14</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>1</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>9</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>7</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>22</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <p className='text-sm gray-50'>Frequency</p>
                            <div className='grid grid-cols-10 gap-2'>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>4</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>16</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>3</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>14</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>1</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>9</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>7</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>22</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <p className='text-sm gray-50'>Max consecutive</p>
                            <div className='grid grid-cols-10 gap-2'>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>4</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>16</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>3</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>14</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>18</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>1</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>9</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>7</span>
                                <span className='col-span-1 flex justify-center items-center fs-sm  gray-100 '>22</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container2 mx-2 nav-bg mt-5">
                    <div className='flex items-center bg-color-l justify-evenly rounded-t-md py-2'>
                        <h5 className="heading-h5 text-base font-semibold ">Period</h5>
                        <h5 className="heading-h5 text-base font-semibold ">Number</h5>
                    </div>
                    <div className="trend-record  w-full">
                        <ul id="trendList" className='w-full mt-5 fivedlist'>
                            <li className='flex justify-between items-center'>
                                <div className="first fs-sm gray-50 ">20240327010558</div>
                                <div className="sec text-sm gray-50 ms-2">
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
                                <div className='flex items-center'>
                                    <div className="third bg-yellow">B</div>
                                    <div className="third bgs-blue-500">B</div>
                                </div>
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

export default FiveDChart;
