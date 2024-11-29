import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../Assets/h5setting_20240723152925kds8.png";
import img1 from "../Assets/bank-594df8bf.png";
import img2 from "../Assets/trucktick-a04f7dac.png";
import qr from "../Assets/download.png";
import "./Promotion.css";

const PromotionShare = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px", // Adjusted to remove extra space around slides
    arrows: false, // Disable arrows if unnecessary
  };

  return (
    <div className="bg-[#0e131b] m-0 p-0 overflow-x-hidden">
      <header className="bg-[#141b26] relative h-[50px] text-white flex justify-start items-center">
        <MdOutlineKeyboardArrowLeft className="text-3xl font-bold" />
        <h2 className="text-xl font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Invite
        </h2>
      </header>
      <p className="text-center text-sm mt-2 text-white">
        Please swipe left - right to choose your favorite poster
      </p>

      {/* Slider */}
      <Slider {...settings} className="mt-2 flex gap-5">
        {/* Slide 1 */}
        <div className=" mx-auto bg-gray-500 px-6 slide mr-[10px] border-4 border-[#0e131b] rounded-lg">
          <div className="mt-[40px]">
            <img src="/logo.png" className="h-8 w-auto" alt="logo" />
          </div>
          <div className="flex justify-between gap-4 items-center text-center">
            <p className="text-white text-base">BharatClub</p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Fair and Justice
            </p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Open and Transparent
            </p>
          </div>
          <h1 className="text-center text-2xl text-white font-bold mt-1">
            Full Odds Bouns Rate
          </h1>

          <div className="flex gap-6 justify-center mt-3">
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img1} alt="" className="h-[30px] w-auto" />
              <p className="text-sm text-center">Fancial Security</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img2} alt="" className="h-[30px] w-auto" />
              <p className="text-sm">Quick Withdrawl</p>
            </div>
          </div>
          <div className="text-white text-center text-lg font-semibold mt-2">
            <p className="text-center">Parmanent</p>
            <p className="text-center">Commission up to 85%</p>
          </div>
          <div className="flex justify-center">
            <img src={qr} className="h-[100px] w-auto mt-[40px]" alt="" />
          </div>
        </div>
        {/* Slide 2 */}
        <div className=" mx-auto bg-gray-500 px-6 slide  border-4 border-[#0e131b] rounded-lg">
          <div className="mt-[40px]">
            <img src="/logo.png" className="h-8 w-auto" alt="logo" />
          </div>
          <div className="flex justify-between gap-4 items-center text-center">
            <p className="text-white text-base">BharatClub</p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Fair and Justice
            </p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Open and Transparent
            </p>
          </div>
          <h1 className="text-center text-2xl text-white font-bold mt-1">
            Full Odds Bouns Rate
          </h1>

          <div className="flex gap-6 justify-center mt-3">
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img1} alt="" className="h-[30px] w-auto" />
              <p className="text-sm">Fancial Security</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img2} alt="" className="h-[30px] w-auto" />
              <p className="text-sm">Quick Withdrawl</p>
            </div>
          </div>
          <div className="text-white text-center text-lg font-semibold mt-2">
            <p className="text-center">Parmanent</p>
            <p className="text-center">Commission up to 85%</p>
          </div>
          <div className="flex justify-center">
            <img src={qr} className="h-[100px] w-auto mt-[40px]" alt="" />
          </div>
        </div>
        {/* Slide 3 */}
        <div className=" mx-auto bg-gray-500 px-6 slide border-4 border-[#0e131b] rounded-lg ">
          <div className="mt-[40px]">
            <img src="/logo.png" className="h-8 w-auto" alt="logo" />
          </div>
          <div className="flex justify-between gap-4 items-center text-center">
            <p className="text-white text-base">BharatClub</p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Fair and Justice
            </p>
            <p className="text-[#f35249] text-[10px] justice font-semibold p-1">
              Open and Transparent
            </p>
          </div>
          <h1 className="text-center text-2xl text-white font-bold mt-1">
            Full Odds Bouns Rate
          </h1>

          <div className="flex gap-6 justify-center mt-3">
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img1} alt="" className="h-[30px] w-auto" />
              <p className="text-sm">Fancial Security</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg gap-1 border border-white text-white py-1">
              <img src={img2} alt="" className="h-[30px] w-auto" />
              <p className="text-sm">Quick Withdrawl</p>
            </div>
          </div>
          <div className="text-white text-center text-lg font-semibold mt-2">
            <p className="text-center">Parmanent</p>
            <p className="text-center">Commission up to 85%</p>
          </div>
          <div className="flex justify-center">
            <img src={qr} className="h-[100px] w-auto mt-[40px]" alt="" />
          </div>
        </div>
      </Slider>

      <div className="flex justify-around text-base font-semibold text-white mt-2">
        <p className="fs-sm gray-100">Invite Friend</p>
        <p className="fs-sm gray-100">
          Income <span className="text-[red]">10 billion</span> commission
        </p>
      </div>
      <div className="flex flex-col justify-center items-center p-6 gap-5">
        <button className="bgs-blue-500 text-lg text-white p-2 rounded-full w-full ">
          INVITATION LINK
        </button>
        <button className="border border-color-blue text-lg color-blue-500 p-2 rounded-full w-full ">
          Copy invitation link
        </button>
      </div>
    </div>
  );
};

export default PromotionShare;
