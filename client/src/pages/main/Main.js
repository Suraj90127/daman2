import React, { useEffect, useState } from "react";
import AvatarImg from "../../assets/avatar5.png";
import { AiFillExclamationCircle } from "react-icons/ai";
import { PiChartBarFill, PiCopySimpleLight } from "react-icons/pi";
import VIPIcon from "../../assets/vip.png";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import WalletIcon from "../../assets/walletIcon.png";
import DepositIcon from "../../assets/depositIcon.png";
import WithdrawIcon from "../../assets/withdrawIcon.png";
import VIPIcons from "../../assets/vipIcon.png";
import RefereshImg from "../../assets/refresh.png";
import VaulIcon from "../../assets/vaul.png";
import GameHistory from "../../assets/gamehistoryIcon.png";
import TransactionHistory from "../../assets/transactionIcon.png";
import DepositHistory from "../../assets/depositHistoryIcon.png";
import WithdrawHistory from "../../assets/withdrawHistoryicon.png";
import Settingicon from "../../assets/settingIcon.png";
import Feedbackicon from "../../assets/feedbackIcon.png";
import Notificationicon from "../../assets/notificationIcon.png";
import Customericon from "../../assets/customerserviceIcon.png";
import BeginnerGuideicon from "../../assets/beginnerguideIcon.png";
import Abouticon from "../../assets/aboutIcon.png";
import { IoIosArrowForward } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaGift, FaGlobe } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import CopyCopmponent from "../../components/CopyCopmponent";
import { useDispatch, useSelector } from "react-redux";
import { user_reset, userDetail } from "../../store/reducer/authReducer";
import Cookies from "js-cookie";
import { AvatarData, VIPImg } from "./AvatarData";
import Loader from "../../components/Loader";
import TranslateComponent from "./TranslateComponent";
import AdminImg from "../../assets/admin.png";

import DepositImg from "../../assets/rechargeIcon.png";
import WithdrawImg from "../../assets/widthdrawBlue.png";
import DepositHisImg from "../../assets/rechargeHistory.png";
import WithdrawHisImg from "../../assets/withdrawHistory.png";

const Main = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo", userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refesh, setRefesh] = useState(false);
  const [copyPopup, setCopyPopup] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("token");
    dispatch(userDetail());
    dispatch(user_reset());
    setShowPopup(false);
    if (!userInfo) {
      navigate("/login");
    }
  };

  const copyToClipCode = () => {
    navigator.clipboard
      .writeText(userInfo.id_user)
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
  const handleRefesh = () => {
    dispatch(userDetail());
    setRefesh(true);
    dispatch(user_reset());
    setTimeout(() => {
      setRefesh(false);
    }, 1500);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlGo = () => {
    const currentUrl = window.location.origin;
    const url = `${currentUrl}/manager/index`;
    window.open(url, "_blank");
  };

  return (
    <Layout>
      <div className="blue-linear py-10 pb-28 rounded-b-[60px]">
        <div className="container-section">
          <div className="flex items-center">
            <img
              src={AvatarData[userInfo?.userPhoto]}
              alt=""
              className="w-24 rounded-full h-24"
              // onClick={() => navigate("/main/avatar")}
            />
            <div className="ms-2">
              <h3 className="heaing-h3 flex items-center text-xl  text-white">
                {userInfo?.name_user}{" "}
                <img
                  src={VIPImg[userInfo?.vip_level]}
                  alt=""
                  className="w-16  "
                />
              </h3>
              <div className="bg-yellow text-sm justify-between items-center px-2 rounded-full inline-flex">
                <span className=" text-white">UID</span>
                <span className="px-3 text-white">|</span>
                <span className=" text-white">{userInfo?.id_user}</span>
                <span className="ps-2 text-white" onClick={copyToClipCode}>
                  <PiCopySimpleLight className=" text-white" />
                </span>
              </div>
              <p className="text-sm mt-1  text-white">
                Last login: {localStorage.getItem("currentDate")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TranslateComponent />

      {!userInfo && <Loader />}
      <div className="container-section relative mt-[-100px]">
        <div className="nav-bg p-3 rounded-lg pb-5">
          <div>
            <p className="gray-100 text-sm">Total balance</p>
            <div className="flex items-center ms-2 mt-2">
              <h3 className="heaing-h3 text-xl font-bold">
                ₹{Number(userInfo?.money_user).toFixed(2)}
              </h3>
              <img
                src={RefereshImg}
                alt=""
                onClick={handleRefesh}
                className="w-5 ms-2 mb-[2px]"
              />
            </div>
          </div>
          <hr className=" border-gray-800 mt-5" />
          <div className="flex justify-between mt-4 mx-2">
            <div
              onClick={() => navigate("/wallet")}
              className=" cursor-pointer flex flex-col items-center justify-center"
            >
              <img src={WalletIcon} alt="" className="w-7 opacity-[0.8]" />
              <p className="text-sm gray-100 text-center mt-2 op">Wallet</p>
            </div>
            <div
              onClick={() => navigate("/wallet/Recharge")}
              className=" cursor-pointer flex flex-col items-center justify-center"
            >
              <img src={DepositImg} alt="" className="w-7" />
              <p className="text-sm gray-100 text-center mt-2">Deposit</p>
            </div>
            <div
              onClick={() => navigate("/wallet/Withdraw")}
              className="flex flex-col items-center justify-center  cursor-pointer"
            >
              <img src={WithdrawImg} alt="" className="w-7" />
              <p className="text-sm gray-100 text-center mt-2">Withdraw</p>
            </div>
            <div
              onClick={() => navigate("/vip")}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <img src={VIPIcons} alt="" className="w-7 opacity-[0.7]" />
              <p className="text-sm gray-100 text-center mt-2">VIP</p>
            </div>
          </div>
        </div>

        {/* <div className="blue-linear rounded-md flex items-center p-2 py-4 mt-4" onClick={() => navigate("/main/StrongBox")}>
          <img src={VaulIcon} alt="" className='w-10 h-10' />
          <div className='ms-2 '>
            <div className='flex justify-between items-center'>
              <h3 className="heading-h3 text-lg font-bold text-white">Safe</h3>
              <div className='flex items-center justify-center'>
                <h3 className='bg-yellow text-sm justify-between  text-white items-center px-2 rounded-full inline-flex'>
                  ₹0.00
                </h3>
                <span>
                  <IoIosArrowForward className='gray-50 text-base  text-white' />
                </span>
              </div>
            </div>
            <p className="fs-sm gray-50  text-white">
              Daily rate 0.1%+VIP extra income safe, calculate every 1 minute
            </p>
          </div>
        </div> */}
        <div className="grid grid-cols-12 gap-2 mt-3">
          <div
            className="col-span-6 nav-bg p-3 py-4 flex items-center"
            //  onClick={() => navigate("/main/BetRecors")}
          >
            <img src={GameHistory} alt="" className="w-7 opacity-[0.8]" />
            <div className="ms-2">
              <h3 className="heaing-h3 gray-50 font-semibold leading-4">
                Game History
              </h3>
              <p className="text-sm gray-100  leading-4">My game history</p>
            </div>
          </div>
          <div
            className="col-span-6 nav-bg p-3 py-4 flex items-center"
            onClick={() => navigate("/wallet/TransAction")}
          >
            <img
              src={TransactionHistory}
              alt=""
              className="w-7 opacity-[0.8]"
            />
            <div className="ms-2">
              <h3 className="heaing-h3 gray-50 font-semibold leading-4">
                Transaction
              </h3>
              <p className="text-sm gray-100 leading-4">
                My transaction history
              </p>
            </div>
          </div>
          <div
            className="col-span-6 nav-bg p-3 py-4 flex items-center"
            onClick={() => navigate("/wallet/RechargeHistory")}
          >
            <img src={DepositHisImg} alt="" className="w-8" />
            <div className="ms-2">
              <h3 className="heaing-h3 gray-50 font-semibold leading-4">
                Deposit
              </h3>
              <p className="text-sm gray-100 leading-4">My deposit history</p>
            </div>
          </div>
          <div
            className="col-span-6 nav-bg p-3 py-4 flex items-center"
            onClick={() => navigate("/wallet/WithdrawalHistory")}
          >
            <img src={WithdrawHisImg} alt="" className="w-8" />
            <div className="ms-2">
              <h3 className="heaing-h3 gray-50 font-semibold leading-4">
                Withdraw
              </h3>
              <p className="text-sm gray-100 leading-4">My withdraw history</p>
            </div>
          </div>
        </div>
      </div>

      {/* game notification section */}
      <div className="container-section">
        <ul className="bg-light mt-5 rounded-md divide-y divide-slate-700 ...">
          <li
            className="flex justify-between items-center p-3 py-4"
            onClick={() => navigate("/home/Messages")}
          >
            <div className="flex items-center">
              <MdEmail className="text-2xl text-[#ff0000]" />
              <span className="text-sm font-medium ml-2">Notification</span>
            </div>
            <div className="flex items-center">
              <h5 className="mr-2 bg-red-600  text-white rounded-full w-5 h-5 flex items-center text-center justify-center  px-3">
                1
              </h5>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
          {/* <hr className="border"/> */}
          <li
            className="flex justify-between items-center p-3 py-4"
            onClick={() => navigate("/main/RedeemGift")}
          >
            <div className="flex items-center">
              <FaGift className="text-2xl text-[#ff0000]" />
              <span className="text-sm font-medium ml-2">Gifts</span>
            </div>
            <div>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
          <li
            className="flex justify-between items-center p-3 py-4"
            // onClick={() => navigate("/main/GameStats")}
          >
            <div className="flex items-center">
              <PiChartBarFill className="text-2xl text-[#ff0000]" />
              <span className="text-sm font-medium ml-2">Games statistics</span>
            </div>
            <div>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
          <li
            className="flex justify-between items-center p-3 py-4"
            onClick={() => navigate("/main/Language")}
          >
            <div className="flex items-center">
              <FaGlobe className="text-2xl text-[#ff0000]" />
              <span className="text-sm font-medium ml-2">Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">English</span>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
        </ul>
      </div>

      <div className="container-section mt-4">
        <div className="nav-bg p-3 rounded-lg pb-5">
          <h3 className="heading-h3 gray-50 font-medium mb-2 ">
            Service center
          </h3>
          <div className="grid grid-cols-12 gap-2">
            {userInfo?.level == 2 && (
              <div
                className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
                onClick={() => handlGo()}
              >
                <img src={AdminImg} alt="" className="w-6 mb-2 imgfilter" />
                <p className="gray-100 text-sm">Collaborator</p>
              </div>
            )}

            <div
              className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
              onClick={() => navigate("/main/SettingCenter")}
            >
              <img src={Settingicon} alt="" className="w-6 mb-2 imgfilter" />
              <p className="gray-100 text-sm">Setting</p>
            </div>
            <div
              className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
              onClick={() => navigate("/main/Feedback")}
            >
              <img src={Feedbackicon} alt="" className="w-6 mb-2 imgfilter" />
              <p className="gray-100 text-sm">Feedback</p>
            </div>
            <div
              className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
              onClick={() => navigate("/main/Notification")}
            >
              <img
                src={Notificationicon}
                alt=""
                className="w-6 mb-2 imgfilter"
              />
              <p className="gray-100 text-sm">Notification</p>
            </div>
            <div
              className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
              onClick={() => navigate("/main/CustomerService")}
            >
              <img src={Customericon} alt="" className="w-6 mb-2 imgfilter" />
              <p className="gray-100 text-sm text-center">
                24/7 Customer <br />
                service
              </p>
            </div>
            <div className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2">
              <img
                src={BeginnerGuideicon}
                alt=""
                className="w-6 mb-2 imgfilter"
              />
              <p className="gray-100 text-sm  text-center">Beginner's guide</p>
            </div>
            <div
              className="col-span-4  flex flex-col justify-center items-center ms-2 mt-2"
              onClick={() => navigate("/main/About")}
            >
              <img src={Abouticon} alt="" className="w-6 mb-2 imgfilter" />
              <p className="gray-100 text-sm">About us</p>
            </div>
          </div>
        </div>

        <button
          className="border flex color-blue-500 font-semibold  justify-center items-center border-[var(--bg-blue-500)] w-full rounded-full p-2 mt-6"
          onClick={() => setShowPopup(true)}
        >
          {" "}
          <BiLogOutCircle className="rotate-90 text-xl mr-2" /> Log Out
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 px-10 rounded-lg text-center">
              <AiFillExclamationCircle
                className="mx-auto text-[#fb5b5b]"
                size={80}
              />
              <h2 className="text-white font-semibold text-xl mt-4">
                Do you want to log out?
              </h2>
              <div className="mt-6 gap-3 flex flex-col">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#4572cd] font-medium text-white rounded-full"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border border-[#4572cd] font-medium text-[#4572cd] rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
      <CopyCopmponent copyPopup={refesh} message="Refesh successfully" />
    </Layout>
  );
};

export default Main;
