import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaMobile } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { MdKeyboardArrowDown, MdVerifiedUser } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
const Forgot = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="blue-linear p-1 py-1 sticky top-0">
        <div className="container-section flex  items-center relative py-2">
          <button className="absolute">
            <Link to={"/login"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <div className="  text-center flex justify-center items-center m-auto">
            <img src="/logo.png" alt="" className="w-28" />
          </div>
        </div>
      </div>
      <div className="blue-linear px-4 pb-10">
        <h1 className="heading-h1">Forgot password</h1>
        <p className="fs-sm">
          Please retrieve/change your password through your mobile phone number
          or email
        </p>
      </div>
      <div className="container-section mt-5">
        <div className="flex flex-col justify-center items-center">
          <span>
            <ImMobile className="color-blue-500 text-2xl" />
          </span>
          <h3 className="heading-h3 text-lg  font-semibold mt-1 leading-10 color-blue-500 border-b-2 w-full text-center border-[var(--bg-blue-500)]">
            phone reset
          </h3>
        </div>

        <form action="" className="mt-5">
          <div>
            <div className="flex items-center">
              <span>
                <ImMobile className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                Phone number
              </label>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-[24%] flex items-center justify-center font-bold text-sm gray-100 nav-bg rounded-lg p-2">
                +91 <MdKeyboardArrowDown className="ms-1 text-lg" />
              </div>
              <input
                type="number"
                className="w-[75%] py-3  nav-bg border border-slate-900 rounded-lg p-2 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the phone number"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <span>
                <TbLockFilled className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                A new Password
              </label>
            </div>
            <div className="mt-3 flex justify-between relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="A new password"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute right-4 text-lg top-4 gray-50 cursor-pointer"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span>
                <TbLockFilled className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                Confirm new password
              </label>
            </div>
            <div className="mt-3 flex justify-between relative">
              <input
                type={showPassword2 ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please new password"
              />
              <span
                onClick={toggleShowPassword2}
                className="absolute right-4 text-lg top-4 gray-50 cursor-pointer"
              >
                {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center ">
              <span>
                <MdVerifiedUser className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                Verification Code
              </label>
            </div>
            <div className="mt-3 flex justify-between relative">
              <input
                type="text"
                className="w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the confirmation code"
              />
              <button className="absolute blue-linear right-3 top-2 gray-50 cursor-pointer text-sm px-6 py-2 rounded-full">
                Send
              </button>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <label className="flex items-center ">
              <input
                type="checkbox"
                className="hidden peer"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                <svg
                  className={`w-4 h-4 text-white ${
                    isChecked ? "block" : "hidden"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.586l6.793-6.793a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="gray-100 ms-2 mr-2 text-sm cursor-pointer">
                I have read and agree
              </span>{" "}
              <Link className="color-red-200 ">[Privacy Agreement]</Link>
            </label>
          </div>

          <button className="blue-linear flex justify-center  text-xl  w-80   m-auto font-bold text-center  rounded-full p-2 mt-5 tracking-[3px]">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
