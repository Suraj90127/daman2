import React, { useCallback, useEffect, useState } from "react";
import { RxCrossCircled, RxCross2, RxDividerVertical } from "react-icons/rx";
import Logo from "../../assets/banner/logo.png";
import "./home.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { TfiEmail } from "react-icons/tfi";
import Slider from "react-slick";

import { RiHome5Fill } from "react-icons/ri";
import { PiChartBarFill, PiTargetBold } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { FaChessQueen, FaGlobe } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

import Layout from "../../layout/Layout";

import { MdEmail } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import {
  CasinoGameData,
  HotGameData,
  SlotsGameData,
  originalData,
} from "./ImgData";
import { BiSupport } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rechargeList, userDetail } from "../../store/reducer/authReducer";
import { IoIosArrowForward } from "react-icons/io";

import Banner1 from "../../assets/banner/ban1.png";
import Banner2 from "../../assets/banner/ban5.png";
import Banner3 from "../../assets/banner/ban3.png";
import Banner4 from "../../assets/banner/ban4.png";

import LiveVideo from "../../assets/live-video.png";
import Chesss from "../../assets/chess.png";
import FishingIcon from "../../assets/fishing.png";
import MainLoader from "../../components/MainLoader";
import { jilliGame } from "../../store/reducer/gameReducer";
import { Casino, Crash, Fishing, Jilli, Rummy, Slots } from "./AllGameImg";

const ActivityImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726567631/activity_obhlhy.png";
const InviteImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568176/invite_m1m0ob.png";
const WingoImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568344/wingo_uezxs5.png";
const k3Img =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568179/k3_woajts.png";
const FivedImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568051/fived_lztq9g.png";
const TrxImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568311/trx_gmvhqu.png";
const LotterySvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568180/lotter_yljdga.svg";
const HotSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568157/hotsvg_clpzgp.png";
const OriginalSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568226/originalsvg_wupbv4.png";
const casinoSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726567790/casinosvg_pkwzkl.png";
const slotsSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568281/slotssvg_yiccqu.png";
const LeftSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568179/left-arrow_rtktoz.svg";
const RightSvg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568255/right-arrow_fw3ogy.svg";

const Age =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726567707/age_pj4idx.png";
const Telegram =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568286/telegram_tavyrx.png";
const Whatsapp =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568343/whatsapp_zp5fm8.png";

const Esport =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568232/physical_fk6iov.png";
const Avatar =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726567710/avatar5_qhu7ty.png";
const Withdraw =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568185/moneys_hxyeoa.png";
const Recharge =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568247/rech_jwkvtc.svg";

const Home = () => {
  const { userInfo, rechargelistData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [topup, setTopup] = useState(false);
  const [topup2, setTopup2] = useState(false);
  const [betAlert, setBetAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Without deposit you can’t play"
  );

  const [apps, setApp] = useState(true);
  const [jilliPopup, setJilliPopup] = useState(false);
  const [gameId, setGameId] = useState();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const debouncedDispatch = useCallback(() => {
    dispatch(userDetail());
  }, [dispatch]); // Include dispatch here to avoid ESLint warnings

  useEffect(() => {
    debouncedDispatch(); // Call the debounced dispatch function
    window.scrollTo({ top: 0, behavior: "smooth" });
    const data = localStorage.getItem("topup");
    if (data == "true") {
      setTopup(true);
    }
  }, [debouncedDispatch]); // Empty dependency array ensures it runs only once
  const handleTopup = () => {
    localStorage.setItem("topup", false);
    setTopup(false);
    setTopup2(true);
  };

  const handleCloseApp = () => {
    setApp(false);
    localStorage.setItem("app", "closed"); // Provide a value, like "closed"
  };

  useEffect(() => {
    const data = localStorage.getItem("app");

    if (data === "closed") {
      // Check for the specific value you set
      setApp(false);
    } else {
      setApp(true);
    }
  }, []);

  useEffect(() => {
    if (topup || topup2) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable background scroll
      document.body.style.overflow = "";
    }

    // Cleanup to enable scroll again when component unmounts or modal closes
    return () => {
      document.body.style.overflow = "";
    };
  }, [topup, topup2]);

  const handleJilliOpen = (data) => {
    setGameId(data);
    setJilliPopup(true);
  };

  const handleJilliSubmit = () => {
    if (userInfo === undefined || userInfo === "") {
      navigate("/login");
    } else {
      if (userInfo?.isdemo == 0) {
        dispatch(jilliGame(gameId)).then((res) => {
          if (res.payload.status) {
            window.open(res.payload.data.url, "_blank");
            setJilliPopup(false);
          }
        });
      } else {
        setBetAlert(true);
        setTimeout(() => {
          setBetAlert(false);
        }, 2000);
      }
    }
  };

  const handleCheck = (path) => {
    if (userInfo) {
      navigate(path);
    } else {
      // setBetAlert(true);
      navigate("/login");

      // setTimeout(() => {
      //   setBetAlert(false);
      // }, 2000);
    }
  };

  return (
    <Layout>
      <div className={`place-bet-popup z-20 ${betAlert ? "active" : ""}`}>
        <div className="text-sm">{successMessage} </div>
      </div>

      <div className="container-section">
        {userInfo && userInfo ? (
          <div className="home-nav flex items-center justify-between rounded-md px-3 py-1">
            <div className="flex items-center">
              <div className="logo">
                <img src={Avatar} alt="" className="w-[35px]" />
              </div>
              <div className="gray-100 ms-2">
                <p>{userInfo?.name_user}</p>
                <p className="fs-sm font-medium ">
                  ₹{Number(userInfo.money_user).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className=" mr-1 flex items-center justify-center flex-col "
                onClick={() => navigate("/wallet/Withdraw")}
              >
                <img src={Withdraw} alt="" />
                <p className="fs-sm gray-50 font-medium">Withdraw</p>
              </button>{" "}
              <span>
                <RxDividerVertical className="gray-100" />
              </span>
              <button
                className=" mr-1 flex items-center justify-center flex-col "
                onClick={() => navigate("/wallet/Recharge")}
              >
                <img src={Recharge} alt="" />
                <p className="fs-sm gray-50 font-medium">Deposit</p>
              </button>{" "}
            </div>
          </div>
        ) : (
          <div className="home-nav flex items-center justify-between rounded-md px-3">
            <div className="logo py-2">
              <img src="/logo.png" alt="" className="w-[100px]" />
            </div>
            <div className="flex items-center">
              <button
                className="btn-blue mr-1 text-white"
                onClick={() => navigate("/register")}
              >
                Register
              </button>{" "}
              <span>
                <RxDividerVertical className="gray-100" />
              </span>
              <button
                className="gray-100 ml-1"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* bannner */}
      <div className="container-section mt-5">
        {apps && (
          <div className="flex nav-bg items-center justify-between p-2">
            <p className="flex items-center ">
              <RxCross2 onClick={handleCloseApp} />{" "}
              <span className="fs-sm">downloadMobileApp</span>
            </p>
            <Link className="flex blue-linear fs-sm rounded p-1 px-2 text-white">
              Download
            </Link>
          </div>
        )}

        <div className="home-slider-banner">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-full">
                <img src={Banner1} className="w-full" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full">
                <img src={Banner2} className="w-full" alt="" />
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="w-full">
                <img src={Banner3} className="w-full" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full">
                <img src={Banner4} className="w-full" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="banner-notice nav-bg">
            <div className="overflow-hidden relative h-10 px-2">
              <p className="text-sm animate-slideUp gray-100">
                Withdrawal: Please Fill In The Correct Bank Card Information.
                The Platfor m Will Process Withdrawals Within 1-24 Hours Or
                More. The Withdrawal Status Is "Completed" And The Transaction
                Has Been Approved By The Platform. The Bank Will Complete T he
                Transfer Within 1-7 Working Days, But Delays May Occur,
                Especially During Holidays. But You Are Guaranteed To Rece ive
                Your Funds.
                <br />
                <span className="text-sm  color-yellow-200">
                  Deposit: Please Remember The Upi Id Of Your Payment And Fill
                  In Th e Correct Utr Number And Amount To Submit. When You Ne
                  ed To Continue Recharging, Please Be Sure To Go To GWG Game To
                  Get A New Upi Account Again! Please Make Sure To Follow The
                  Above Steps So That Your
                </span>
              </p>
              <p className="animate-slideUp fs-sm  color-yellow-200"></p>
            </div>

            <span
              className="float-end text-xl  relative mr-2"
              onClick={() => navigate("/main/Notification")}
            >
              <TfiEmail />
              <div className="ponter-event"></div>
            </span>
          </div>
        </div>
      </div>

      {/* lottery tabs  */}
      <div className="container-section">
        <div className="grid  grid-cols-10 gap-2 mt-2">
          <div
            className="col-span-2 bg-blue flex items-center flex-col rounded-md py-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <RiHome5Fill className="text-2xl text-white " />
            <span className="text-sm font-medium text-white">Home</span>
          </div>
          <div
            className="col-span-2 flex items-center flex-col text-gray-500 py-2 cursor-pointer"
            onClick={() => navigate("/home/Lottery")}
          >
            <PiTargetBold className="text-2xl " />
            <span className="text-sm font-medium">Lottery</span>
          </div>
          <div
            className="col-span-2 flex items-center flex-col text-gray-500 py-2 cursor-pointer"
            onClick={() => navigate("/home/Original")}
          >
            <FaChessQueen className="text-2xl " />
            <span className="text-sm font-medium">Originals</span>
          </div>
          <div
            className="col-span-2 flex items-center flex-col text-gray-500 py-2 cursor-pointer"
            onClick={() => navigate("/home/Slots")}
          >
            <IoGameController className="text-2xl " />
            <span className="text-sm font-medium">Slots</span>
          </div>
          <div
            className="col-span-2 flex items-center flex-col text-gray-500 py-2 cursor-pointer"
            onClick={handleClick}
          >
            <RiDashboardFill className="text-2xl " />
            <span className="text-sm font-medium">More</span>
          </div>

          {/* <div className="col-span-5 mr-1">
            <img
              src={ActivityImg}
              alt=""
              className="rounded-md w-full"
              onClick={() => navigate("/activity/DailyTasks")}
            />
            <h3 className="heading-h3 mt-1">Activity</h3>
            <p className="color-gray text-font">Rich reward activities.</p>
          </div>
          <div className="col-span-5 ml-1">
            <img
              src={InviteImg}
              alt=""
              className="rounded-md w-full"
              onClick={() => navigate("/main/InvitationBonus")}
            />
            <h3 className="heading-h3 mt-1">Invite</h3>
            <p className="color-gray text-font">
              Invite friends to receive huge rewards.
            </p>
          </div> */}
        </div>
      </div>

      {/* Lottery Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={LotterySvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1">
                Lottery Game
              </h2>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              <div>
                <div className="grid grid-cols-12 gap-2">
                  <div
                    className="col-span-4 cursor-pointer"
                    onClick={() => handleCheck("/WinGo")}
                  >
                    <img
                      src={WingoImg}
                      alt=""
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                  <div
                    className="col-span-4"
                    onClick={() => handleCheck("/k3")}
                  >
                    <img src={k3Img} alt="" loading="lazy" className="w-full" />
                  </div>
                  <div
                    className="col-span-4"
                    onClick={() => handleCheck("/5d")}
                  >
                    <img
                      src={FivedImg}
                      alt=""
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                {/* <div
                  className="grid grid-cols-12 gap-2"
                  onClick={() => handleCheck("/trx")}
                >
                  <div className="col-span-4">
                    <img
                      src={TrxImg}
                      alt=""
                      loading="lazy"
                      className="w-full imgfilter"
                    />
                  </div>
                </div> */}
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* slots Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section slots-game-sections">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={slotsSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Slots</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Slots")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Slots.length}
                </span>
              </div>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              {SlotsGameData.map((item, i) => (
                <div key={i}>
                  {i === 0 ? (
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4">
                        <img
                          src={item?.Img1}
                          alt=""
                          className="w-full  h-full  "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Slots")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img2}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Crash")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img3}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=MG_Fish")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img4}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Rummy")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img5}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Jilli")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img6}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Casino")
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4">
                        <img
                          src={item?.Img1}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Rummy")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img2}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Jilli")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img3}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=MG_Fish")
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* <div>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4">
                    <img src={TrxImg} alt="" className="w-full" />
                  </div>
                </div>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>

      {/* original Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={OriginalSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Original
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/Original")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {originalData?.length}
                </span>
              </div>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              {originalData.map((item, i) => (
                <div key={i}>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <img
                        src={item?.Img1}
                        alt=""
                        className="w-full  h-[150px]   rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(224)}
                      />
                    </div>
                    <div className="col-span-4">
                      <img
                        src={item?.Img2}
                        alt=""
                        className="w-full  h-[150px]    rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(242)}
                      />
                    </div>
                    <div className="col-span-4">
                      <img
                        src={item?.Img3}
                        alt=""
                        className="w-full  h-[150px]   rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(235)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* <div>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4">
                    <img src={TrxImg} alt="" className="w-full" />
                  </div>
                </div>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>

      {/* Hot  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={HotSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Hot Games
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/HotGames")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  6
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {HotGameData.map((items, i) => (
                  <div className="col-span-4" key={i}>
                    <img
                      src={items?.Img}
                      alt=""
                      className="w-full h-full  rounded-lg"
                      onClick={() => {
                        i === 0 && handleJilliOpen(9);
                        i === 1 && handleJilliOpen(51);
                        i === 2 && handleJilliOpen(27);
                        i === 3 && handleJilliOpen(232);
                        i === 4 && handleJilliOpen(236);
                        i === 5 && handleJilliOpen(233);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Casino  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Casino</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/Casino")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Casino?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Casino.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(207);
                        index === 1 && handleJilliOpen(216);
                        index === 2 && handleJilliOpen(204);
                        index === 3 && handleJilliOpen(197);
                        index === 4 && handleJilliOpen(200);
                        index === 5 && handleJilliOpen(195);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Fishiing  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Fishing
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=MG_Fish")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Fishing?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Fishing.slice(0, 3).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(882);
                        index === 1 && handleJilliOpen(212);
                        index === 2 && handleJilliOpen(119);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>
      {/* Crash  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Crash</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Crash")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Crash?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Crash.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(261);
                        index === 1 && handleJilliOpen(254);
                        index === 2 && handleJilliOpen(242);
                        index === 3 && handleJilliOpen(241);
                        index === 4 && handleJilliOpen(236);
                        index === 5 && handleJilliOpen(235);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Rummy  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Rummy</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Rummy")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Rummy?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Rummy.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(253);
                        index === 1 && handleJilliOpen(220);
                        index === 2 && handleJilliOpen(211);
                        index === 3 && handleJilliOpen(231);
                        index === 4 && handleJilliOpen(221);
                        index === 5 && handleJilliOpen(219);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* game text  */}
      <div className="container-section">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-36 m-1" />
          <img src={Age} alt="" className="m-1" />
          <img src={Telegram} alt="" className="m-1" />
          <img src={Whatsapp} alt="" className="m-1" />
        </div>

        <p className=" text-sm font-medium">
          Justice, and openness. We mainly operate fair lottery.The platform
          advocates fairness, blockchain games, live casinos, and slot machine
          games.{" "}
        </p>
        <br />
        <p className="text-sm font-medium">
          Blockchain games, live casinos,and slot machine Works with over 10,000
          online live game dealers and slot games, all verified fair games.
        </p>
      </div>

      {/* game notification section */}
      <div className="container-section">
        <ul className="bg-light mt-5 rounded-md divide-y divide-slate-700 ...">
          <li
            className="flex justify-between items-center p-3 py-4"
            onClick={() => navigate("/home/Messages")}
          >
            <div className="flex items-center">
              <MdEmail className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Notification</span>
            </div>
            <div className="flex items-center">
              <h5 className="mr-2 bg-red-600  rounded-full w-5 h-5 flex items-center text-center justify-center  px-3">
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
              <FaGift className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Gifts</span>
            </div>
            <div>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
          <li
            className="flex justify-between items-center p-3 py-4"
            onClick={() => navigate("/main/GameStats")}
          >
            <div className="flex items-center">
              <PiChartBarFill className="text-2xl text-[#5891f0]" />
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
              <FaGlobe className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">English</span>
              <IoIosArrowForward className="text-sm font-thin gray-100" />
            </div>
          </li>
        </ul>
      </div>

      {/* more menu */}

      <div className={open ? "more-menu-section active" : "more-menu-section"}>
        <div className="close-btn" onClick={handleClick}></div>
        <div className="menus-left bg-color-l">
          <div className="flex justify-between items-center">
            <h3 className="heading-h3">Menu</h3>
            <div>
              <BiSupport className="text-xl" />
            </div>
          </div>
          <h4 className="text-base font-medium text-gray-300 mt-2">Popular</h4>
          <div className="wingo-container">
            <div className="bottom-container flex justify-between items-center p-2">
              <div>
                <h3 className="text-base font-medium text-white">
                  WIN GO Long{" "}
                </h3>
                <p className="text-[11px] font-medium text-white">
                  The lottery results for five
                </p>
              </div>
              <button className="clickBtn bg-white rounded-md text-blue-500 text-[11px] p-1 px-2 font-medium">
                Enter {">>"}{" "}
              </button>
            </div>
          </div>

          <div className="e-tours-container ">
            <div className="bottom-container flex justify-between items-center p-2">
              <div>
                <h3 className="text-base font-medium text-white">
                  e-Tournament{" "}
                </h3>
                <p className="text-[11px] font-medium text-white">
                  Participate in tournament events
                </p>
              </div>
              <button className="clickBtn bg-white rounded-md text-red-400 text-[11px] p-1 px-2 font-medium">
                Enter {">>"}{" "}
              </button>
            </div>
          </div>

          <h4 className="text-base font-medium text-gray-300 mt-2">Games</h4>
          <ul>
            <li className="flex justify-between items-center mt-2 bg-light p-2">
              <div className="flex justify-between items-center">
                <img src={Esport} alt="" loading="lazy" />
                <p className="text-font ml-2">Slots</p>
              </div>
              <div
                className="flex justify-between items-center"
                onClick={() => navigate("/home/AllOnlineGames?game=Slots")}
              >
                <h4 className="gray-color text-sm mr-1">All</h4>{" "}
                <span className="color-blue  text-[13px] font-medium">
                  {Slots.length}
                  {">>"}
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center mt-2 bg-light p-2">
              <div className="flex justify-between items-center">
                <img src={LiveVideo} alt="" loading="lazy" />
                <p className="text-font ml-2">Crash</p>
              </div>
              <div
                className="flex justify-between items-center"
                onClick={() => navigate("/home/AllOnlineGames?game=Crash")}
              >
                <h4 className="gray-color text-sm mr-1">All</h4>{" "}
                <span className="color-blue  text-[13px] font-medium">
                  {Crash.length}
                  {">>"}
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center mt-2 bg-light p-2">
              <div className="flex justify-between items-center">
                <img src={Chesss} alt="" loading="lazy" />
                <p className="text-font ml-2">Rummy</p>
              </div>
              <div
                className="flex justify-between items-center"
                onClick={() => navigate("/home/AllOnlineGames?game=Rummy")}
              >
                <h4 className="gray-color text-sm mr-1">All</h4>{" "}
                <span className="color-blue  text-[13px] font-medium">
                  {Rummy.length}
                  {">>"}
                </span>
              </div>
            </li>
            <li className="flex justify-between items-center mt-2 bg-light p-2">
              <div className="flex justify-between items-center">
                <img src={FishingIcon} alt="" loading="lazy" />
                <p className="text-font ml-2">Fishing</p>
              </div>
              <div
                className="flex justify-between items-center"
                onClick={() => navigate("/home/AllOnlineGames?game=MG_Fish")}
              >
                <h4 className="gray-color text-sm mr-1">All</h4>{" "}
                <span className="color-blue  text-[13px] font-medium">
                  {Fishing.length}
                  {">>"}
                </span>
              </div>
            </li>
          </ul>

          <h4 className="text-base font-medium text-gray-300 mt-2">Games</h4>

          <div className="mainactivity">
            <div className="mainactivityimg"></div>
            <div className="flex justify-between p-1 items-center">
              <span className="text-[11px] font-medium mt-2">
                Super Jackpot
              </span>{" "}
              <button
                className="text-[11px] font-medium rounded-md  p-1 px-2 clickbtn "
                onClick={() => navigate("/main/SuperJackpot")}
              >
                Enter {">>"}
              </button>
            </div>
          </div>
          <div className="mainactivity2 mt-2">
            <div className="mainactivityimg"></div>
            <div className="flex justify-between p-1 items-center">
              <span className="text-[11px] font-medium mt-2">
                Super Jackpot
              </span>{" "}
              <button
                className="text-[11px] font-medium rounded-md  p-1 px-2 clickbtn "
                onClick={() => navigate("/activity/DailyTasks")}
              >
                Enter {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={topup ? "overlay-section block" : "hidden"}></div>
      <div className={topup2 ? "overlay-section block" : "hidden"}></div>
      {topup && (
        <div className="absolute top-20 left-0 right-0 flex m-auto flex-col bg-color-l z-20 mx-5 pb-5 rounded-lg">
          <div className="blue-linear text-center p-2 font-bold text-lg rounded-t-lg  text-white">
            Notification
          </div>
          <div className="px-3 py-2 font-medium text-center text-lg text-black">
            Join daman Official Channel Click <br /> To Join 👉
            <Link className="text-black">daman</Link> 👈 To Get <br />
            Updated With Spectacular Events, <br /> Good News And Various <br />{" "}
            Announcement.
            <br />
            <br />
            <br />
            Participate daman VIP Events
            <br />
            Period : July - August 2024
            <br />
            Check The Link Below
            <br />
            <Link className="text-black">daman.VIP</Link>
          </div>
          <button
            className="blue-linear flex justify-center  text-lg  w-64   text-white m-auto font-semibold text-center  rounded-full p-2 mt-10 tracking-widest"
            onClick={handleTopup}
          >
            Confirm
          </button>
        </div>
      )}

      {topup2 && (
        <div id="popup" className="popup bg-color-l">
          <div className="header-section blue-linear text-white">
            <h4>Extra first deposit bonus</h4>
            <p>Each account can only receive rewards once</p>
          </div>
          <div className="middle-content-section">
            <ul>
              {depositBonus?.map((item, i) => (
                <li key={i} onClick={() => navigate("/wallet/Recharge")}>
                  <div className="first-c">
                    <p className="gray-50">
                      First deposit{" "}
                      <span className="color-blue">
                        {item.deposit.toLocaleString()}
                      </span>
                    </p>
                    <p className="color-blue">
                      +₹{item.bonus.toLocaleString()}.00
                    </p>
                  </div>
                  <p className="color-gray">
                    Deposit {item.deposit.toLocaleString()} for the first time
                    in your account and you can receive
                    {item.deposit + item.bonus.toLocaleString()}
                  </p>
                  <div className="bottom-c">
                    <div className="slider-box border  border-color-slat">
                      0/{item.deposit.toLocaleString()}
                    </div>
                    <button className="border fs-sm border-color-blue ">
                      Deposit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-section">
            <div>
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
                <span className="gray-100 ms-2 mr-2 fs-sm cursor-pointer">
                  No more reminders today
                </span>
              </label>
            </div>
            <button
              className="activity blue-linear text-white"
              onClick={() => setTopup2(false)}
            >
              Activity
            </button>
          </div>
          <span onClick={() => setTopup2(false)}>
            <RxCrossCircled className="m-auto flex text-center absolute left-0 right-0 justify-center text-2xl mt-4 " />
          </span>
        </div>
      )}

      <div className={jilliPopup ? "overlay-section block" : "hidden"}></div>

      {jilliPopup && (
        <div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            Are you sure you want to join the game?
          </p>

          <div className="w-full mt-5">
            <button
              className="bgs-blue-500 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setJilliPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue p-2 rounded-br-lg  w-[50%]"
              onClick={handleJilliSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;

const depositBonus = [
  {
    deposit: 50000,
    bonus: 5000,
  },
  {
    deposit: 10000,
    bonus: 1000,
  },
  {
    deposit: 5000,
    bonus: 500,
  },
  {
    deposit: 3000,
    bonus: 300,
  },
  {
    deposit: 1000,
    bonus: 100,
  },
  {
    deposit: 500,
    bonus: 50,
  },
  {
    deposit: 300,
    bonus: 30,
  },
];
