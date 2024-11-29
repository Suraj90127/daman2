import React from "react";
import ServerBg from "../../assets/customerBg.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import LiveChatImg from "../../assets/liveChat.png";
import TelegramImg from "../../assets/telegram2.png";

import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
const CustomerService = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const handle = () => {
    window.history.back();
  };
  return (
    <>
      <div className="blue-linear p-1 py-3 sticky top-0">
        <div className="container-section flex  items-center relative ">
          <button className="absolute">
            <Link onClick={handle}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50 text-center flex justify-center items-center m-auto">
            Customer Service
          </h1>
        </div>
      </div>
      <div>
        <img src={ServerBg} alt="" />
      </div>
      <div className="container-section">
        <Link
          to="https://tawk.to/chat/66f5276a4cbc4814f7df34dd/1i8mq3vch"
          className="flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg "
        >
          <div className="flex items-center">
            <img src={LiveChatImg} className="w-8" alt="" />
            <span className="text-base gray-50 ms-2 font-sans font-medium">
              LiveChat
            </span>
          </div>
          <div className="flex items-center">
            <MdOutlineArrowForwardIos className="text-lg gay-100" />
          </div>
        </Link>
        <Link
          className="flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg"
          to={userInfo?.telegram}
        >
          <div className="flex items-center">
            <img src={TelegramImg} className="w-8" alt="" />
            <span className="text-base gray-50 ms-2 font-sans font-medium">
              Telegram
            </span>
          </div>
          <div className="flex items-center">
            <MdOutlineArrowForwardIos className="text-lg gay-100" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default CustomerService;
