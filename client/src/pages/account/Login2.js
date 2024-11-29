import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { ImMobile } from "react-icons/im";
import { MdKeyboardArrowDown, MdLock } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { loginAdmin } from "../../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import AlertCopmponent from "../../components/AlertComponent";
import axios from "axios";
import Spinner from "../../layout/Spinner";
const Login2 = ({ path = "login" }) => {
  const { successMessage, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [tabs, setTabs] = useState("phone");
  const [alerts, setAlerts] = useState(false);
  const [alertsuccess, setAlertsuccess] = useState(false);
  const location = useLocation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    username: "",
    pwd: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    dispatch(loginAdmin(state)).then((res) => {
      if (res.payload.status) {
        setAlertsuccess(true);
        navigate("/admin/manager/index");
      } else {
        setAlerts(true);
      }
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      localStorage.removeItem("phone");
      localStorage.removeItem("pass");
    } else {
      localStorage.setItem("phone", state.username);
      localStorage.setItem("pass", state.pwd);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlerts(false);
      setAlertsuccess(false);
    }, 2000);

    setState({
      ...state,
      username: localStorage.getItem("phone"),
      pwd: localStorage.getItem("pass"),
    });
    const phones = localStorage.getItem("phone");
    if (phones) {
      setIsChecked(true);
    }
  }, [successMessage, dispatch, alerts, alertsuccess]);

  useEffect(() => {
    if (userInfo && location.pathname === "/admin/login") {
      navigate("/admin/manager/index");
    } else if (!userInfo && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    }
  }, [userInfo, location.pathname, navigate]);

  return (
    <>
      <div className="blue-linear p-1 py-1 sticky top-0">
        <div className="container-section flex  items-center relative py-2">
          <button className="absolute">
            <Link>
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
        <h1 className="heading-h1">Log in</h1>
        <p className="fs-sm">
          Please log in with your phone number or email <br />
          If you forget your password, please contact customer service
        </p>
      </div>
      <div className="container-section mt-5">
        <div className="flex items-center justify-center border-b border-[var(--bg-color-l)]">
          <div
            className={`flex flex-col justify-center items-center cursor-pointer  w-[50%] ${
              tabs == "phone"
                ? "border-b-2 border-[var(--bg-blue-500)]"
                : "border-b-2 border-transparent"
            }`}
          >
            <span>
              <ImMobile
                className={`${
                  tabs == "phone" ? "color-blue-500" : "gray-50"
                } text-2xl`}
              />
            </span>
            <h3
              className={`heading-h3 text-lg  font-medium font-sans  mt-1 leading-10 ${
                tabs == "phone" ? "color-blue-500" : "gray-50"
              } w-full text-center `}
            >
              Log in with phone
            </h3>
          </div>
        </div>
        <div>
          <form action="" className="mt-5">
            <div>
              <div className="flex items-center">
                <span>
                  <ImMobile className="color-blue-500 text-2xl" />
                </span>
                <label htmlFor="" className="font-sans  ms-1 gray-50">
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
                  placeholder="Please enter your phone number"
                  name="username"
                  onChange={inputHandle}
                  value={state.username}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <span>
                  <TbLockFilled className="color-blue-500 text-2xl" />
                </span>
                <label htmlFor="" className="font-sans ms-1 gray-50">
                  Password
                </label>
              </div>
              <div className="mt-3 flex justify-between relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="pwd"
                  onChange={inputHandle}
                  value={state.pwd}
                  className="w-full  nav-bg border border-slate-900 rounded-lg p-2 py-3 focus:border-slate-700 ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                  placeholder=" Password"
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute right-4 text-lg top-4 gray-50 cursor-pointer"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
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
                  Remember password
                </span>
              </label>
            </div>
          </form>
          <button
            className="blue-linear flex justify-center  text-lg  w-80   m-auto font-bold text-center  rounded-full p-2 mt-5 tracking-[3px]"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </div>

      <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>
        <div className="text-sm">{successMessage}</div>
      </div>

      <AlertCopmponent alertPopup={alerts} message={successMessage} />
    </>
  );
};

export default Login2;
