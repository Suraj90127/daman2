import React, { useState } from "react";
import Slider from "react-slick";
import Poster from "../../assets/poster.png";
import logo from "../../assets/logo.png";
import img1 from "../../assets/bank-594df8bf.png";
import img2 from "../../assets/trucktick-a04f7dac.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import CopyCopmponent from "../../components/CopyCopmponent";
const PromotionLink = () => {
  const [copyPopup, setCopyPopup] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handle = () => {
    window.history.back();
  };

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
  const currentUrl = window.location.origin;
  const invitationLink = `${currentUrl}/#/register?r_code=${userInfo?.code}`;
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(invitationLink)
      .then(() => {
        setCopyPopup(true);
        setTimeout(() => {
          setCopyPopup(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0 z-50">
        <div className="container-section flex  items-center">
          <button className="absolute">
            <Link onClick={handle}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            Invite
          </h1>
        </div>
      </div>

      <div className="container-section">
        <p className="fs-sm gray-100">
          Please swipe left-right to choose your favorite poster
        </p>
        {/* <img src={userInfo?.qrcodes} alt="" /> */}

        {/* Slider */}
        {/* <Slider {...settings} className="mt-2 flex gap-5">
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
              <img
                src={userInfo?.qrcodes}
                className="h-[100px] w-auto mt-[40px]"
                alt=""
              />
            </div>
          </div>
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
              <img
                src={userInfo?.qrcodes}
                className="h-[100px] w-auto mt-[40px]"
                alt=""
              />
            </div>
          </div>
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
              <img
                src={userInfo?.qrcodes}
                className="h-[100px] w-auto mt-[40px]"
                alt=""
              />
            </div>
          </div>
        </Slider> */}

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
          <button
            className="border border-color-blue text-lg color-blue-500 p-2 rounded-full w-full "
            onClick={copyToClipboard}
          >
            Copy invitation link
          </button>
        </div>
      </div>
      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
    </>
  );
};

export default PromotionLink;
