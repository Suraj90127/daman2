import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaMobile } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/reducer/authReducer";
import AlertCopmponent from "../../components/AlertComponent";
import Cookies from "js-cookie";
const Register = () => {
  const { loader, successMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(false);
  const [alertsuccess, setAlertsuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("r_code");
  const [state, setState] = useState({
    username: "",
    pwd: "",
    cpass: "",
    invitecode: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async () => {
    dispatch(register(state)).then((res) => {
      if (res.payload.status) {
        setAlertsuccess(true);
        const url = window.location.origin;
        window.open(`${url}/#/`);
      } else {
        setAlerts(true);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setAlerts(false);
      setAlertsuccess(false);
    }, 2000);
    setState({
      ...state,
      invitecode: code,
    });
  }, [successMessage, dispatch, alerts, alertsuccess]);

  return (
    <>
      <div className="blue-linear p-1 py-1 sticky top-0">
        <div className="container-section flex  items-center relative">
          <button className="absolute">
            <Link to={"/login"}>
              {" "}
              <IoIosArrowBack className="text-xl text-white" />
            </Link>
          </button>
          <div className="  text-center flex justify-center items-center m-auto">
            <img src="/logo1.png" alt="" className="w-28" />
          </div>
        </div>
      </div>
      <div className="blue-linear px-4 pb-10">
        <h1 className="heading-h1 text-white">Register</h1>
        <p className="fs-sm text-white">
          Please register by phone number or email
        </p>
      </div>
      <div className="container-section mt-5">
        <div className="flex flex-col justify-center items-center">
          <span>
            <ImMobile className="color-blue-500 text-2xl" />
          </span>
          <h3 className="heading-h3 text-lg  font-semibold mt-1 leading-10 color-blue-500 border-b-2 w-full text-center border-[var(--bg-blue-500)]">
            Register your phone
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
                type="text"
                className="w-[75%] py-3  nav-bg  rounded-lg p-2  ps-6 flex items-center  focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the phone number"
                name="username"
                onChange={inputHandle}
                value={state.username}
              />
            </div>
          </div>
          <p className="fs-sm mt-1 color-blue-500 leading-3">
            The phone number cannot start with 0 when registering! <br />
            1234567890
          </p>
          <div className="mt-4">
            <div className="flex items-center">
              <span>
                <TbLockFilled className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                Set Password
              </label>
            </div>
            <div className="mt-3 flex justify-between relative">
              <input
                type={showPassword ? "text" : "password"}
                name="pwd"
                onChange={inputHandle}
                value={state.pwd}
                className="w-full  nav-bg  rounded-lg p-2 py-3  ps-6 flex items-center focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the password"
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
                Confirm Password
              </label>
            </div>
            <div className="mt-3 flex justify-between relative">
              <input
                type={showPassword2 ? "text" : "password"}
                name="cpass"
                onChange={inputHandle}
                value={state.cpass}
                className="w-full  nav-bg  rounded-lg p-2 py-3  ps-6 flex items-center focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the confirm password"
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
            <div className="flex items-center">
              <span>
                <TbLockFilled className="color-blue-500 text-2xl" />
              </span>
              <label htmlFor="" className="font-medium ms-1 gray-50">
                Invite code
              </label>
            </div>
            <div className="mt-3 flex justify-between">
              <input
                type="text"
                className="w-full  nav-bg  rounded-lg p-2 py-3  ps-6 flex items-center  focus:outline-none  placeholder:text-sm placeholder:text-slate-500"
                placeholder="Please enter the invitation code"
                name="invitecode"
                onChange={inputHandle}
                value={state.invitecode}
              />
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
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[#434FEE] peer-checked:bg-[#434FEE]">
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
        </form>
        <button
          className="blue-linear flex justify-center  text-lg  w-80   m-auto font-semibold text-center  rounded-full p-2 mt-5 tracking-widest  text-white"
          disabled={loader ? true : false}
          onClick={() => handleSubmit()}
        >
          Register
        </button>

        <button
          className="border  w-80 flex color-blue-500 font-semibold  justify-center items-center border-[var(--bg-blue-500)] m-auto rounded-full p-2 mt-6 "
          onClick={() => navigate("/login")}
        >
          <span className="text-sm font-normal mr-2 gray-100 tracking-widest">
            I have an account
          </span>{" "}
          <span className="tracking-widest font-bold text-lg">Login</span>
        </button>
      </div>

      <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>
        <div className="text-sm">{successMessage}</div>
      </div>

      <AlertCopmponent alertPopup={alerts} message={successMessage} />
    </>
  );
};

export default Register;
