import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";
import "./wingo.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdSupportAgent,
} from "react-icons/md";
import { FaCircle, FaMinus, FaPlus } from "react-icons/fa";
import io from "socket.io-client";
import TimeImg from "../../assets/time.png";
import TimeActiveImg from "../../assets/time_aactive.png";
import ZeroImg from "../../assets/zero.png";
import OneImg from "../../assets/one.png";
import TwoImg from "../../assets/two.png";
import ThreeImg from "../../assets/three.png";
import FourImg from "../../assets/four.png";
import FiveImg from "../../assets/five.png";
import SixImg from "../../assets/six.png";
import SevenImg from "../../assets/seven.png";
import EightImg from "../../assets/eight.png";
import NineImg from "../../assets/nine.png";
import VoiceImg from "../../assets/voice.png";
import VoiceOffImg from "../../assets/voice-off.png";
import Audio1 from "../../assets/audio/di1.mp3";
import Audio2 from "../../assets/audio/di2.mp3";
import { PiCopySimpleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../store/reducer/authReducer";
import CopyCopmponent from "../../components/CopyCopmponent";
import { wingoHistory, wingoPeriodList } from "../../store/reducer/gameReducer";
import { wingoBet } from "../../store/reducer/betReducer";
import HeaderInfo from "./HeaderInfo";
import WinImg from "../../assets/win-popup.png";
import LoseImg from "../../assets/loss-popup.png";
import Img from "../../assets/loader.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import { debounce } from "lodash";
import { host } from "../../store/reducer/api";
const ImgData = [
  ZeroImg,
  OneImg,
  TwoImg,
  ThreeImg,
  FourImg,
  FiveImg,
  SixImg,
  SevenImg,
  EightImg,
  NineImg,
];

const xData = [1, 5, 10, 20, 50, 100];

const socket = io(host);
const Wingo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { wingoPeriodListData, successMessage, wingoHistoryData } = useSelector(
    (state) => state.game
  );
  const { loader } = useSelector((state) => state.bet);
  const [messages, setMessage] = useState("");
  const [activeTime, setActiveTime] = useState("1Min");
  const [activeX, setActiveX] = useState(0);
  const [gameHistory, setGameHistory] = useState("ghistory");
  const [openPopup, setOpenPopup] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openHowtoPlay, setHowtoPlay] = useState(false);
  const [details, setDetails] = useState(null);
  const [refershPopup, setRefeshPopup] = useState(false);
  const [pageno, setPage] = useState(1);
  const [pageto, setPageto] = useState(10);
  const [typeid1, setTypeid1] = useState(1);
  const [minutetime1, setMinutetime1] = useState(0);
  const [minutetime2, setMinutetime2] = useState(0);
  const [secondtime1, setSecondtime1] = useState(0);
  const [secondtime2, setSecondtime2] = useState(0);
  const intervalRef = useRef(null);
  const [betAlert, setBetAlert] = useState(false);
  const [historyPage, setHistoryPage] = useState(0);
  const [activeVoice, setActiveVoice] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [winResult, setWinResult] = useState(null);
  const [resultPopup, setResultPopup] = useState(false);
  const [copyPopup, setCopyPopup] = useState(false);

  const [selectBet, setSelectBet] = useState("");
  const selectBetHandle = async (data) => {
    setSelectBet(data);
    setTimeout(() => {
      setOpenPopup(true);
    }, 100);
  };
  const [animate, setAnimate] = useState(false);
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10);
    setTimeout(() => selectBetHandle(number), 5000);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 5000);
  };

  const handleWingoMinut = async (data) => {
    setActiveTime(data);
    localStorage.setItem("wingominute", data);
    let match = data.match(/\d+/);
    let number = match ? parseInt(match[0], 10) : null;
    setTypeid1(number);
    setPage(1);

    setPageto(10);
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [balance, setBalance] = useState(1);
  // const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);

  const balanceOptions = [1, 10, 100, 1000];

  const totalAmount = balance * multiplier;

  const extractNumber = (str) => {
    const match = str?.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const handleVoice = () => {
    const newVoiceState = !activeVoice;
    setActiveVoice(newVoiceState);
    localStorage.setItem("voice", newVoiceState);
  };
  useEffect(() => {
    const wingominutes = localStorage?.getItem("wingominute");
    if (wingominutes !== null) {
      setActiveTime(wingominutes);
      setTypeid1(extractNumber(wingominutes));
    }

    if (typeid1 !== null) {
      console.log("jojiooi");
      debouncedDispatch(dispatch, typeid1, pageno, pageto);
      updateNumbers();
      openAudio();
    }

    const voiceState = localStorage.getItem("voice");
    if (voiceState !== null) {
      setActiveVoice(JSON.parse(voiceState));
    }

    if (openPopup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto"; // or 'visible' depending on your default
    };
  }, [activeTime, openPopup]);

  const audio1Ref = useRef(new Audio(Audio1));
  const audio2Ref = useRef(new Audio(Audio2));

  const openAudio = () => {
    audio1Ref.current.muted = true;
    audio1Ref.current.play().catch((error) => {
      console.error("Error playing audio1:", error);
    });
    audio2Ref.current.muted = true;
    audio2Ref.current.play().catch((error) => {
      console.error("Error playing audio2:", error);
    });
  };

  const playAudio1 = () => {
    audio1Ref.current.muted = false;
    audio1Ref.current.play().catch((error) => {
      console.error("Error playing audio1:", error);
    });
  };

  const playAudio2 = () => {
    audio2Ref.current.muted = false;
    audio2Ref.current.play().catch((error) => {
      console.error("Error playing audio2:", error);
    });
  };

  const handleDetail = (i) => {
    if (details === i) {
      return setDetails(null);
    }
    setDetails(i);
  };

  const handleRefersh = () => {
    dispatch(userDetail()).then((res) => {
      if (res.payload.status) {
        setRefeshPopup(true);
      }
    });
    setTimeout(() => {
      setRefeshPopup(false);
    }, 2000);
  };
  const fetchNewData = async (pageno, pageto) => {
    await dispatch(wingoPeriodList({ typeid1, pageno, pageto })).then((res) => {
      if (res.payload.status) {
        chartFunction();
      }
    });
    await dispatch(wingoHistory({ typeid1, pageno, pageto }));
  };
  const handleIncrease = async () => {
    const newPageNo = pageno + 10;
    const newPageTo = pageto + 10;
    setPage(newPageNo);
    setPageto(newPageTo);
    await fetchNewData(newPageNo, newPageTo);
    dispatch(wingoHistory({ typeid1, pageno, pageto }));
  };

  const handleDecrease = async () => {
    if (pageno >= 10) {
      const newPageNo = pageno - 10;
      const newPageTo = pageto - 10;
      setPage(newPageNo);
      setPageto(newPageTo);

      await fetchNewData2(newPageNo, newPageTo);
    }
  };

  const fetchNewData2 = async (pageno, pageto) => {
    await dispatch(wingoPeriodList({ typeid1, pageno, pageto })).then((res) => {
      if (res.payload.status) {
        chartFunction();
      }
    });
    await dispatch(wingoHistory({ typeid1, pageno, pageto }));
  };

  const handleBet = async () => {
    dispatch(wingoBet({ typeid1, selectBet, balance, multiplier })).then(
      (res) => {
        setBetAlert(true);
        dispatch(userDetail());
        setOpenPopup(false);
        setMessage(res.payload.message);
        setBalance(1);
        setMultiplier(1);
        setActiveX(0);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        if (res.payload.status) {
          dispatch(wingoHistory({ typeid1, pageno, pageto }));
        }
      }
    );
  };

  const debouncedDispatch = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(wingoPeriodList({ typeid1, pageno, pageto })).then((res) => {
        if (res.payload.status) {
          chartFunction();
        }
      });
      dispatch(wingoHistory({ typeid1, pageno, pageto })).then((res) => {
        setHistoryPage(res?.payload?.page);
      });
      updateNumbers();
    }, 500),
    []
  );

  const debouncedDispatchResult = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(wingoHistory({ typeid1, pageno, pageto })).then((res) => {
        if (res?.payload.data?.gameslist[0]?.status == 1) {
          dispatch(userDetail());
          setWinResult(true);
        } else {
          setWinResult(false);
        }
      });
    }, 500),
    []
  );

  useEffect(() => {
    // dispatch(wingoPeriodList({ typeid1, pageno, pageto }))
    dispatch(wingoHistory({ typeid1, pageno, pageto })).then((res) => {
      setHistoryPage(res?.payload?.page);
    });
    setTimeout(() => {
      setRefeshPopup(false);
      setBetAlert(false);
    }, 2000);

    const handler = (msg) => {
      setPage(1);
      setPageto(10);
      // Realtime data

      console.log("ijjioi", msg);
      console.log("ikkoko", wingoHistoryData?.gameslist[0]);

      if (msg?.data[1]?.period == wingoHistoryData?.gameslist[0]?.stage) {
        debouncedDispatchResult(dispatch, typeid1, pageno, pageto);
        setResultPopup(true);
        // console.log("fff",resultPopup)
      }

      if (
        typeid1 == 1 &&
        Array.isArray(msg?.data) &&
        msg.data[0].game == "wingo"
      ) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);

        console.log("server data received");
      }

      if (
        typeid1 == 3 &&
        Array.isArray(msg?.data) &&
        msg.data[0].game == "wingo3"
      ) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
      }

      if (
        typeid1 == 5 &&
        Array.isArray(msg?.data) &&
        msg.data[0].game == "wingo5"
      ) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
      }
      if (
        typeid1 == 10 &&
        Array.isArray(msg?.data) &&
        msg?.data[0].game == "wingo10"
      ) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
      }
    };

    socket.on("data-server", handler);
    return () => {
      socket.off("data-server", handler);
    };
  }, [
    pageno,
    pageto,
    dispatch,
    betAlert,
    messages,
    debouncedDispatchResult,
    resultPopup,
    winResult,
  ]);

  const chartFunction = () => {
    const trendList = document.getElementById("trendList");

    // Clear any existing SVG lines
    const existingSvg = document.querySelector(".svg-line");
    if (existingSvg) {
      existingSvg.remove();
    }

    const activeElements = document.querySelectorAll(".active");
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("class", "svg-line");

    for (let i = 0; i < activeElements.length - 1; i++) {
      const firstActive = activeElements[i];
      const secondActive = activeElements[i + 1];

      const line = document.createElementNS(svgns, "line");
      line.setAttribute(
        "x1",
        `${firstActive.offsetLeft + firstActive.offsetWidth / 2}px`
      );
      line.setAttribute(
        "y1",
        `${firstActive.offsetTop + firstActive.offsetHeight / 2}px`
      );
      line.setAttribute(
        "x2",
        `${secondActive.offsetLeft + secondActive.offsetWidth / 2}px`
      );
      line.setAttribute(
        "y2",
        `${secondActive.offsetTop + secondActive.offsetHeight / 2}px`
      );
      line.setAttribute("stroke", "red");
      line.setAttribute("stroke-width", "2");

      svg.appendChild(line);
    }
    trendList?.appendChild(svg);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // chart js
  useEffect(() => {
    if (typeid1 !== null) {
      chartFunction();
    }
  }, [gameHistory, openTime, successMessage, wingoPeriodListData?.length]);

  var previousMinute = null;
  var lastLogTime = 0;

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval based on typeid1
    if (typeid1 == 10) {
      intervalRef.current = setInterval(() => {
        const countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const minute = Math.ceil(minutes % 10);
        const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        if (previousMinute !== minute && now - lastLogTime >= 1000) {
          previousMinute = minute;
          lastLogTime = now;

          setMinutetime2(minute);
          setSecondtime1(seconds1);
          setSecondtime2(seconds2);

          if (
            minute === 0 &&
            seconds1 === 0 &&
            seconds2 <= 5 &&
            secondtime2 >= 1
          ) {
            setOpenTime(true);
            console.log("10min");
            setOpenPopup(false);
            if (activeVoice) playAudio1();
          } else {
            setOpenTime(false);
          }

          if (minute === 9 && secondtime1 === 5 && secondtime2 === 9) {
            if (activeVoice) playAudio2();
          }
        }
      }, 1000);
    } else if (typeid1 == 5) {
      intervalRef.current = setInterval(() => {
        const countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const minute = Math.ceil(minutes % 5);
        const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        setMinutetime2(minute);
        setSecondtime1(seconds1);
        setSecondtime2(seconds2);

        if (
          minute === 0 &&
          seconds1 === 0 &&
          seconds2 <= 5 &&
          secondtime2 >= 1
        ) {
          setOpenTime(true);
          setOpenPopup(false);
          if (activeVoice) playAudio1();
        } else {
          setOpenTime(false);
        }

        if (minute === 4 && secondtime1 === 5 && secondtime2 === 9) {
          if (activeVoice) playAudio2();
        }
      }, 1000);
    } else if (typeid1 === 3) {
      intervalRef.current = setInterval(() => {
        const countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const minute = Math.ceil(minutes % 3);
        const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        setMinutetime2(minute);
        setSecondtime1(seconds1);
        setSecondtime2(seconds2);

        if (
          minute === 0 &&
          seconds1 === 0 &&
          seconds2 <= 5 &&
          secondtime2 >= 1
        ) {
          setOpenTime(true);
          console.log("3min");
          setOpenPopup(false);
          if (activeVoice) playAudio1();
        } else {
          setOpenTime(false);
        }

        if (minute === 2 && secondtime1 === 5 && secondtime2 === 9) {
          if (activeVoice) playAudio2();
        }
      }, 1000);
    } else if (typeid1 == 1) {
      intervalRef.current = setInterval(() => {
        const countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const minute = Math.ceil(minutes / 20 - 2);
        const seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        const seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        if (previousMinute !== minute) {
          previousMinute = minute;
          setMinutetime2(0);
          setSecondtime1(seconds1);
          setSecondtime2(seconds2);
        }
      }, 1000);

      if (secondtime1 === 0 && secondtime2 <= 5 && secondtime2 >= 1) {
        setOpenTime(true);
        setOpenPopup(false);
        console.log("1min");
        if (activeVoice) playAudio1();
      } else {
        setOpenTime(false);
      }

      if (secondtime1 === 5 && secondtime2 === 9) {
        if (activeVoice) playAudio2();
      }
    }

    // Cleanup on component unmount or when typeid1 changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [typeid1, secondtime1, secondtime2, minutetime2]);

  // end

  const copyToClipboard = (number) => {
    navigator.clipboard
      .writeText(String(number))
      .then(() => {
        setCopyPopup(true);
        console.log("Copied to clipboard");
        setTimeout(() => {
          setCopyPopup(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  const initialNumbers = [4, 16, 3, 14, 18, 18, 1, 9, 7, 22];
  const initialNumbers2 = [4, 1, 9, 14, 18, 11, 10, 9, 12, 22];
  const initialNumbers3 = [4, 16, 3, 14, 18, 18, 1, 9, 7, 22];
  const initialNumbers4 = [4, 16, 3, 14, 18, 18, 1, 9, 7, 22];
  const [numbers, setNumbers] = useState(initialNumbers);
  const [number2, setNumber2] = useState(initialNumbers2);
  const [number3, setNumber3] = useState(initialNumbers3);
  const [number4, setNumber4] = useState(initialNumbers4);

  const getRandomNumbers = (length, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
  };

  const updateNumbers = () => {
    const newNumbers = getRandomNumbers(numbers.length, 30); // Generate random numbers up to 30
    setNumbers(newNumbers);
    const newNumbers2 = getRandomNumbers(number2.length, 20); // Generate random numbers up to 30
    setNumber2(newNumbers2);
    const newNumbers3 = getRandomNumbers(number3.length, 25); // Generate random numbers up to 30
    setNumber3(newNumbers3);
    const newNumbers4 = getRandomNumbers(number4.length, 29); // Generate random numbers up to 30
    setNumber4(newNumbers4);
  };
  const handleClose = () => {
    setWinResult(null);
    setResultPopup(false);
  };

  return (
    <>
      <div className="blue-linear p-1 py-1 sticky top-0 z-20">
        <div className="container-section flex  items-center relative">
          <button className="absolute">
            <Link to={"/"}>
              {" "}
              <IoIosArrowBack className="text-xl text-white" />
            </Link>
          </button>
          <div className="text-center flex justify-center items-center m-auto">
            <img src="/logo1.png" alt="" className="w-28" />
          </div>
          <p className="absolute right-1 flex items-center">
            <Link to={"/main/CustomerService"} className=" gray-50 ">
              <MdSupportAgent className="text-white text-2xl" />
            </Link>
            <Link>
              <img
                src={activeVoice ? VoiceImg : VoiceOffImg}
                alt=""
                className="ms-1 w-7 h-7"
                onClick={handleVoice}
              />
            </Link>
          </p>
        </div>
      </div>

      {!userInfo && (
        <div className="loader" role="status">
          <img src={Img} alt="" />
        </div>
      )}
      <HeaderInfo
        handleRefersh={handleRefersh}
        money={Number(userInfo?.money_user).toFixed(2)}
      />

      <div className="container-section relative mt-[-75px]">
        {/* time tabs */}
        <div className="grid grid-cols-12 nav-bg rounded-xl">
          <div
            className={`col-span-3 cursor-pointer  flex items-center flex-col justify-center py-2 ${
              activeTime == "1Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            } rounded-xl`}
            onClick={() => handleWingoMinut("1Min")}
          >
            <img
              src={activeTime == "1Min" ? TimeActiveImg : TimeImg}
              alt=""
              className="w-12"
            />
            <p
              className={`text-center  fs-sm font-sans leading-4 ${
                activeTime == "1Min" ? "text-white" : "gray-100"
              }`}
            >
              Win Go <br /> 1Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "3Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            }`}
            onClick={() => handleWingoMinut("3Min")}
          >
            <img
              src={activeTime == "3Min" ? TimeActiveImg : TimeImg}
              alt=""
              className="w-12"
            />
            <p
              className={`text-center  fs-sm font-sans leading-4 ${
                activeTime == "3Min" ? "text-white" : "gray-100"
              }`}
            >
              Win Go <br /> 3Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "5Min"
                ? "blue-linear2 change-img-color"
                : "change-img-color"
            }`}
            onClick={() => handleWingoMinut("5Min")}
          >
            <img
              src={activeTime == "5Min" ? TimeActiveImg : TimeImg}
              alt=""
              className="w-12"
            />
            <p
              className={`text-center  fs-sm font-sans leading-4 ${
                activeTime == "5Min" ? "text-white" : "gray-100"
              }`}
            >
              Win Go <br /> 5Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "10Min"
                ? "blue-linear2 change-img-color"
                : "change-img-color"
            }`}
            onClick={() => handleWingoMinut("10Min")}
          >
            <img
              src={activeTime == "10Min" ? TimeActiveImg : TimeImg}
              alt=""
              className="w-12"
            />
            <p
              className={`text-center  fs-sm font-sans leading-4 ${
                activeTime == "10Min" ? "text-white" : "gray-100"
              }`}
            >
              Win Go <br /> 10Min
            </p>
          </div>
        </div>

        {/* wingo time period */}
        <div className="wingo-period-bg flex justify-between mt-5 rounded-lg p-2">
          <div>
            <button
              className="border flex items-center justify-center rounded-full px-4 py-[1px]"
              onClick={() => setHowtoPlay(true)}
            >
              <svg
                data-v-3e4c6499=""
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 36 36"
                fill="none"
                className="text-white"
              >
                <path
                  data-v-3e4c6499=""
                  d="M23.67 3H12.33C6.66 3 5.25 4.515 5.25 10.56V27.45C5.25 31.44 7.44 32.385 10.095 29.535L10.11 29.52C11.34 28.215 13.215 28.32 14.28 29.745L15.795 31.77C17.01 33.375 18.975 33.375 20.19 31.77L21.705 29.745C22.785 28.305 24.66 28.2 25.89 29.52C28.56 32.37 30.735 31.425 30.735 27.435V10.56C30.75 4.515 29.34 3 23.67 3ZM11.67 18C10.845 18 10.17 17.325 10.17 16.5C10.17 15.675 10.845 15 11.67 15C12.495 15 13.17 15.675 13.17 16.5C13.17 17.325 12.495 18 11.67 18ZM11.67 12C10.845 12 10.17 11.325 10.17 10.5C10.17 9.675 10.845 9 11.67 9C12.495 9 13.17 9.675 13.17 10.5C13.17 11.325 12.495 12 11.67 12ZM24.345 17.625H16.095C15.48 17.625 14.97 17.115 14.97 16.5C14.97 15.885 15.48 15.375 16.095 15.375H24.345C24.96 15.375 25.47 15.885 25.47 16.5C25.47 17.115 24.96 17.625 24.345 17.625ZM24.345 11.625H16.095C15.48 11.625 14.97 11.115 14.97 10.5C14.97 9.885 15.48 9.375 16.095 9.375H24.345C24.96 9.375 25.47 9.885 25.47 10.5C25.47 11.115 24.96 11.625 24.345 11.625Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="fs-sm  text-white">How to play</span>
            </button>
            <p className="fs-sm ms-1 mb-3 mt-2  text-white">
              {" "}
              Win Go {activeTime}
            </p>
            <div className="flex items-center">
              {Array.isArray(wingoPeriodListData?.data?.gameslist) &&
                wingoPeriodListData.data.gameslist
                  .slice(0, 5)
                  .map((item, i) => (
                    <div key={i}>
                      <img
                        src={ImgData[item.amount]}
                        alt={`Image ${i}`}
                        className="w-7 mx-1"
                      />
                    </div>
                  ))}
            </div>
          </div>
          {/* period */}
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold  text-white">Time remaining</p>
            <div className="flex items-center mt-1">
              <span className="nav-bg p-1 text-lg mx-[1px] font-semibold w-5 text-center">
                {minutetime1}
              </span>
              <span className="nav-bg p-1 text-lg mx-[1px] font-semibold w-5 text-center">
                {minutetime2}
              </span>
              <span className="nav-bg p-1 text-lg mx-[1px] font-semibold">
                :
              </span>
              <span className="nav-bg p-1 text-lg mx-[1px] font-semibold w-5 text-center">
                {secondtime1}
              </span>
              <span className="nav-bg p-1 text-lg mx-[1px] font-semibold w-5 text-center">
                {secondtime2}
              </span>
            </div>
            <h5 className="heading-h5 text-lg font-medium mt-2  text-white">
              {wingoPeriodListData?.period}
            </h5>
          </div>
        </div>

        {/* bet period section */}

        <div className="relative">
          <div className="nav-bg mt-5 p-2">
            <div className="flex justify-between items-center  text-white">
              <button
                className="bgs-green text-sm font-medium w-full  py-2 rounded-tr-lg rounded-bl-lg"
                onClick={() => selectBetHandle("x")}
              >
                Green
              </button>
              <button
                className="bgs-violet text-sm font-medium w-full  py-2 rounded-md mx-2"
                onClick={() => selectBetHandle("t")}
              >
                Voilet
              </button>
              <button
                className="bgs-red-200 text-sm font-medium w-full  py-2 rounded-tr-lg rounded-bl-lg"
                onClick={() => selectBetHandle("d")}
              >
                Red
              </button>
            </div>

            <div className="bg-body mt-2 p-2 rounded-lg">
              <div className="grid grid-cols-10 gap-2">
                {ImgData.map((item, i) => (
                  <div
                    key={i}
                    className={`col-span-2 ${animate ? "animate-up-down" : ""}`}
                    onClick={() => selectBetHandle(i)}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <img src={item} alt={`Image ${i}`} className="w-14 mx-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <button
                className="rounded-md border color-red-200 px-2 text-base border-[--red-color-200] mr-2 py-1"
                onClick={generateRandomNumber}
              >
                Random
              </button>
              <div className="flex items-center ">
                {xData.map((item, i) => (
                  <button
                    className={`bg-body gray-50 text-sm mr-1 px-2 py-[5px] rounded-md ${
                      activeX === i ? "bgs-green text-white" : ""
                    }`}
                    key={i}
                    onClick={() => {
                      setActiveX(i);
                      setMultiplier(item);
                    }}
                  >
                    X{item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center mt-3  text-white rounded-full">
              <button
                className="bg-yellow text-sm font-medium w-full  py-3 rounded-s-full  "
                onClick={() => selectBetHandle("l")}
              >
                Big
              </button>
              <button
                className="bg-betblue text-sm font-sans font-medium w-full  py-3 rounded-e-full"
                onClick={() => selectBetHandle("n")}
              >
                Small
              </button>
            </div>
          </div>
          {openTime && (
            <div className="flex items-center blue-color-300 justify-center absolute z-10 m-auto top-0 bottom-0 left-0 right-0 ">
              <span className="text-[150px] bg-color-l font-medium rounded-xl mr-6 w-32 h-[180px] flex items-center justify-center">
                0
              </span>
              <span className="text-[150px] bg-color-l font-medium rounded-xl ms-4 w-32  h-[180px] flex items-center justify-center">
                {secondtime2}
              </span>
            </div>
          )}
          <div className={openTime ? "overlay-section2 block" : "hidden"}></div>
        </div>

        {/* game history */}

        <div className="grid mt-5 grid-cols-12 gap-3">
          <div className="col-span-4 ">
            <button
              className={` flex justify-center items-center h-full w-full py-2 border-none rounded-lg ${
                gameHistory == "ghistory"
                  ? " text-base blue-linear  text-white  font-medium "
                  : "nav-bg text-sm gray-100"
              }`}
              onClick={() => setGameHistory("ghistory")}
            >
              Game history
            </button>
          </div>
          <div className="col-span-4 ">
            <button
              className={` flex justify-center items-center h-full w-full py-2 border-none rounded-lg ${
                gameHistory == "chart"
                  ? "text-base blue-linear  text-white font-medium "
                  : "nav-bg text-sm gray-100"
              }`}
              onClick={() => {
                setGameHistory("chart");
                chartFunction();
              }}
            >
              Chart
            </button>
          </div>
          <div className="col-span-4 ">
            <button
              className={` flex justify-center items-center h-full w-full py-2 border-none rounded-lg ${
                gameHistory == "mhistory"
                  ? " text-base blue-linear  text-white font-medium "
                  : "nav-bg text-sm gray-100"
              }`}
              onClick={() => setGameHistory("mhistory")}
            >
              My history
            </button>
          </div>
        </div>
        {/* result game history */}

        {gameHistory == "ghistory" && (
          <div>
            <div className="grid grid-cols-12 blue-linear text-white rounded-t-md p-2 mt-5">
              <div className="col-span-4 flex text-center justify-center">
                <h5 className="heading-h5 text-sm">Period</h5>
              </div>
              <div className="col-span-2  text-center justify-center">
                <h5 className="heading-h5 text-sm">Number</h5>
              </div>
              <div className="col-span-3  text-center justify-center">
                <h5 className="heading-h5 text-sm">Big Small</h5>
              </div>
              <div className="col-span-3  text-center justify-center">
                <h5 className="heading-h5 text-sm">Color</h5>
              </div>
            </div>

            {Array.isArray(wingoPeriodListData?.data?.gameslist) &&
              wingoPeriodListData.data.gameslist.map((item, i) => (
                <div className="grid grid-cols-12 nav-bg p-1 py-[5px]" key={i}>
                  <div className="col-span-4 flex text-center justify-center items-center">
                    <span className="fs-sm  gray-50  relative flex">
                      {item.period}
                    </span>
                  </div>
                  <div className="col-span-2  text-center justify-center  items-center">
                    <span
                      className={`text-2xl gray-50 font-bold color-red-200 ${
                        item.amount === 0
                          ? "color-red-voilet"
                          : item.amount === 5
                          ? "color-green-voilet"
                          : item.amount === 1 ||
                            item.amount === 3 ||
                            item.amount === 7 ||
                            item.amount === 9
                          ? "color-green"
                          : "color-red-200"
                      }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                  <div className="col-span-3  text-center justify-center  items-center">
                    <span className="text-sm gray-50">
                      {item.amount > 4 ? "Big" : "Small"}
                    </span>
                  </div>
                  <div className="col-span-3 flex text-center justify-center  items-center">
                    <span className="fs-sm gray-50  flex justify-center items-center">
                      {item.amount === 0 || item.amount === 5 ? (
                        <span className="flex justify-center items-center">
                          <FaCircle
                            className={`${
                              item.amount === 0
                                ? "color-red-200 "
                                : "color-green"
                            }`}
                          />
                          <FaCircle className={`ms-2 color-violet`} />
                        </span>
                      ) : (
                        <FaCircle
                          className={`${
                            item.amount === 1 ||
                            item.amount === 3 ||
                            item.amount === 7 ||
                            item.amount === 9
                              ? "color-green"
                              : "color-red-200"
                          } `}
                        />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            <div className="nav-bg p-6 flex items-center justify-center mt-5">
              <button className="bg-color-l p-2 mr-8" onClick={handleDecrease}>
                <Link>
                  {" "}
                  <IoIosArrowBack className="text-lg" />
                </Link>
              </button>
              <span className="fs-sm gray-100">
                {pageto / 10}/{wingoPeriodListData?.page}
              </span>
              <button
                className="bgs-blue-500 p-2 ms-8"
                onClick={handleIncrease}
              >
                <Link>
                  {" "}
                  <IoIosArrowForward className="text-lg" />
                </Link>
              </button>
            </div>
          </div>
        )}

        {gameHistory == "chart" && (
          <div>
            <div className="chart-section mt-5 nav-bg rounded-t-md">
              <div className="flex items-center blue-linear text-white justify-evenly rounded-t-md py-2">
                <h5 className="heading-h5 text-base font-semibold ">Period</h5>
                <h5 className="heading-h5 text-base font-semibold ">Number</h5>
              </div>

              <div className="mx-2 mt-2">
                <p className="text-sm gray-50 font-normal font-sans">
                  Static (last 100 Periods)
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm gray-50">Winning number</p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                      <span
                        key={number}
                        className="rounded-full p-[2px] mx-[2px] fs-sm color-red-200 border w-4 h-4 border-[--red-color-200] flex justify-center items-center"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm gray-50">Missing</p>
                  <div className="grid grid-cols-10 gap-2">
                    {numbers.map((number, index) => (
                      <span
                        key={index}
                        className="col-span-1 flex justify-center items-center fs-sm gray-100"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm gray-50">Avg Missing</p>
                  <div className="grid grid-cols-10 gap-2">
                    {number2.map((number, index) => (
                      <span
                        key={index}
                        className="col-span-1 flex justify-center items-center fs-sm gray-100"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm gray-50">Frequency</p>
                  <div className="grid grid-cols-10 gap-2">
                    {number3.map((number, index) => (
                      <span
                        key={index}
                        className="col-span-1 flex justify-center items-center fs-sm gray-100"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm gray-50">Max consecutive</p>
                  <div className="grid grid-cols-10 gap-2">
                    {number4.map((number, index) => (
                      <span
                        key={index}
                        className="col-span-1 flex justify-center items-center fs-sm gray-100"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="container2 mx-2">
                <div className="trend-record w-full">
                  <ul id="trendList" className="w-full mt-5">
                    {Array.isArray(wingoPeriodListData?.data?.gameslist) &&
                      wingoPeriodListData.data.gameslist.map((item, i) => (
                        <li
                          className="flex justify-between items-center"
                          key={i}
                        >
                          <div className="first  fs-sm gray-50">
                            {item.period}
                          </div>
                          <div className="sec">
                            <span
                              className={`${
                                item.amount === 0 ? "active bg-red-voilet" : ""
                              } `}
                            >
                              0
                            </span>
                            <span
                              className={`${
                                item.amount === 1 ? "active bgs-green" : ""
                              }`}
                            >
                              1
                            </span>
                            <span
                              className={`${
                                item.amount === 2 ? "active bgs-red-200" : ""
                              }`}
                            >
                              2
                            </span>
                            <span
                              className={`${
                                item.amount === 3 ? "active bgs-green" : ""
                              }`}
                            >
                              3
                            </span>
                            <span
                              className={`${
                                item.amount === 4 ? "active bgs-red-200" : ""
                              }`}
                            >
                              4
                            </span>
                            <span
                              className={`${
                                item.amount === 5
                                  ? "active  bg-green-voilet"
                                  : ""
                              }`}
                            >
                              5
                            </span>
                            <span
                              className={`${
                                item.amount === 6 ? "active bgs-red-200" : ""
                              }`}
                            >
                              6
                            </span>
                            <span
                              className={`${
                                item.amount === 7 ? "active bgs-green" : ""
                              }`}
                            >
                              7
                            </span>
                            <span
                              className={`${
                                item.amount === 8 ? "active bgs-red-200" : ""
                              }`}
                            >
                              8
                            </span>
                            <span
                              className={`${
                                item.amount === 9 ? "active bgs-green" : ""
                              }`}
                            >
                              9
                            </span>
                          </div>
                          {item.amount > 4 ? (
                            <div className="third color-yellow-bg-200">B</div>
                          ) : (
                            <div className="third bgs-blue-500">S</div>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="nav-bg p-6 flex items-center justify-center mt-5">
              <button className="bg-color-l p-2 mr-8" onClick={handleDecrease}>
                <Link>
                  {" "}
                  <IoIosArrowBack className="text-lg" />
                </Link>
              </button>
              <span className="fs-sm gray-100">
                {pageto / 10}/{wingoPeriodListData?.page}
              </span>
              <button
                className="bgs-blue-500 p-2 ms-8"
                onClick={handleIncrease}
              >
                <Link>
                  {" "}
                  <IoIosArrowForward className="text-lg" />
                </Link>
              </button>
            </div>
          </div>
        )}
        {gameHistory == "mhistory" && (
          <div className="nav-bg p-2 py-3 mt-5">
            <div className="flex items-end justify-end mb-3">
              <Link className="color-blue-500 fs-sm border rounded-lg border-color-blue px-3 py-1 flex item-center items-end ">
                Details <IoIosArrowDropright className="mb-[2px]" />
              </Link>
            </div>

            {Array.isArray(wingoHistoryData?.gameslist) &&
              wingoHistoryData?.gameslist?.map((item, i) => (
                <div key={i}>
                  <div
                    className="  flex items-center justify-between"
                    onClick={() => handleDetail(i)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex justify-center text-white items-center h-10 w-10 text-sm rounded-md mr-2 
                     ${
                       item.bet == "x"
                         ? "bgs-green"
                         : item.bet == "d"
                         ? "bgs-red-200"
                         : item.bet == "t"
                         ? "bgs-violet"
                         : item.bet == "l"
                         ? "color-yellow-bg-200"
                         : item.bet == "n"
                         ? "bgs-blue-500"
                         : item.bet == "0"
                         ? "bg-red-voilet"
                         : item.bet == "5"
                         ? "bg-green-voilet"
                         : item.bet == 1 ||
                           item.bet == 3 ||
                           item.bet == 7 ||
                           item.bet == 9
                         ? "bgs-green"
                         : "bgs-red-200"
                     }
                      `}
                      >
                        {item.bet == "x"
                          ? "Green"
                          : item.bet == "t"
                          ? "Voilet"
                          : item.bet == "l"
                          ? "Big"
                          : item.bet == "n"
                          ? "Small"
                          : item.bet == "d"
                          ? "Red"
                          : item.bet}
                      </div>
                      <div>
                        <h3 className="heading-h3 gray-50 text-md">
                          {item?.stage}
                        </h3>
                        <p className="fs-sm gray-100">{item.today}</p>
                      </div>
                    </div>
                    {item.status !== 0 && (
                      <div className="flex flex-col items-end">
                        <div
                          className={`border  px-5 py-[2px] rounded-md text-sm  ${
                            item.status === 1
                              ? "color-green border-color-green"
                              : "color-red-200 border-color-red"
                          }`}
                        >
                          {item.status === 1 ? "Succeed" : " Failed"}
                        </div>
                        <p
                          className={`color-red-200  ${
                            item.status === 1 ? "color-green " : "color-red-200"
                          }`}
                        >
                          {item.status === 1
                            ? "+₹" + item.get
                            : "-₹" + item.money}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`mt-3 history-details ${
                      details === i ? "active mb-5" : ""
                    }`}
                  >
                    <h2 className="heading-h2 gray-50 text-lg">Details</h2>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2 rounded-md">
                      <span className=" gray-100 ">Order number</span>
                      <span className=" gray-100 flex item-center">
                        {item.id_product}
                        <PiCopySimpleBold
                          className="mt-[3px]"
                          onClick={() => copyToClipboard(item?.id_product)}
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2 rounded-md">
                      <span className=" gray-100 ">Period</span>
                      <span className=" gray-100 ">{item.stage}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className=" gray-100 ">Purchase amount</span>
                      <span className=" gray-100 ">
                        ₹{Number(item.money) + item.fee}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className=" gray-100 ">Quantiy</span>
                      <span className=" gray-100 ">{item.amount}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Amount after tax</span>
                      <span className="color-red-200 ">₹{item.money}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Tax</span>
                      <span className="gray-100 ">₹{item.fee}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Result</span>
                      {item.status !== 0 && (
                        <div className=" flex text-center justify-center  items-center">
                          <span
                            className={`color-red-200 text-base  ${
                              item.result === 0
                                ? "color-red-voilet"
                                : item.result === 5
                                ? "color-green-voilet"
                                : item.result === 1 ||
                                  item.result === 3 ||
                                  item.result === 7 ||
                                  item.result === 9 ||
                                  item.result == "x"
                                ? "color-green"
                                : item.result == "t"
                                ? "color-voilet"
                                : "color-red-200"
                            }`}
                          >
                            {item.result}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className=" flex items-center justify-between  bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Select</span>
                      <span className=" gray-100 ms-2">
                        {" "}
                        {item.bet == "x"
                          ? "Green"
                          : item.bet == "t"
                          ? "Voilet"
                          : item.bet == "l"
                          ? "Big"
                          : item.bet == "n"
                          ? "Small"
                          : item.bet == "d"
                          ? "Red"
                          : item.bet}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className=" gray-100 ">Status</span>
                      {item.status !== 0 && (
                        <span
                          className={` color-red-200 ${
                            item.status == 1 ? "color-green" : "color-red-200"
                          }`}
                        >
                          {" "}
                          {item.status === 1 ? "Succeed" : " Failed"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className=" gray-100 ">Win/loss</span>
                      {item.status !== 0 && (
                        <span
                          className={` ${
                            item.status === 1 ? "color-green " : "color-red-200"
                          }`}
                        >
                          {item.status === 1
                            ? "+₹" + item.get
                            : "-₹" + item.money}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className=" gray-100 ">Order time</span>
                      <span className=" gray-100 ">{item.today}</span>
                    </div>
                  </div>
                </div>
              ))}
            <div className="nav-bg p-6 flex items-center justify-center mt-5">
              <button className="bg-color-l p-2 mr-8" onClick={handleDecrease}>
                <Link>
                  {" "}
                  <IoIosArrowBack className="text-lg" />
                </Link>
              </button>
              <span className="fs-sm gray-100">
                {pageto / 10}/{historyPage}
              </span>
              <button
                className="bgs-blue-500 p-2 ms-8"
                onClick={handleIncrease}
              >
                <Link>
                  {" "}
                  <IoIosArrowForward className="text-lg" />
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={openPopup ? "overlay-section block" : "hidden"}></div>

      {/* popups */}
      <div
        className={`bg-popup  items-center transition ease-in-out delay-150 justify-center z-10 fixed bottom-0 rounded-t-md filter-section w-[25rem] ${
          openPopup ? "flex" : "hidden"
        }`}
      >
        <div className=" rounded-t-lg  overflow-hidden w-full ">
          <div
            className={`text-center p-4 pb-8 mb-5 popup-select-effect    ${
              selectBet == "x"
                ? "bgs-green"
                : selectBet == "d"
                ? "bgs-red-200"
                : selectBet == "t"
                ? "bgs-violet"
                : selectBet == "l"
                ? "color-yellow-bg-200"
                : selectBet == "n"
                ? "bg-betblue"
                : selectBet == "0"
                ? "bg-red-voilet"
                : selectBet == "5"
                ? "bg-green-voilet"
                : selectBet == 1 ||
                  selectBet == 3 ||
                  selectBet == 7 ||
                  selectBet == 9
                ? "bgs-green"
                : "bgs-red-200"
            }`}
          >
            <h2 className="text-lg font-semibold  text-white">
              Win Go {activeTime}
            </h2>
            <button className=" color-yellow-200 rounded-md w-[80%] px-4 py-1 mt-2 bg-white text-sm text-black">
              Select{" "}
              <span>
                {selectBet == "x"
                  ? "Green"
                  : selectBet == "t"
                  ? "Voilet"
                  : selectBet == "l"
                  ? "Big"
                  : selectBet == "n"
                  ? "Small"
                  : selectBet == "d"
                  ? "Red"
                  : selectBet}
              </span>
            </button>
          </div>
          <div className="p-4  ">
            <div className="flex justify-between items-center mb-4">
              <span>Balance</span>
              <div className="flex space-x-2">
                {balanceOptions.map((value) => (
                  <button
                    key={value}
                    onClick={() => setBalance(value)}
                    className={`gray-50 text-base mx-1 px-2 py-[5px] gray-100 rounded-md ${
                      balance === value
                        ? selectBet == "x"
                          ? "bgs-green"
                          : selectBet == "d"
                          ? "bgs-red-200"
                          : selectBet == "t"
                          ? "bgs-violet"
                          : selectBet == "l"
                          ? "color-yellow-bg-200"
                          : selectBet == "n"
                          ? "bg-betblue"
                          : selectBet == 1 ||
                            selectBet == 3 ||
                            selectBet == 5 ||
                            selectBet == 7 ||
                            selectBet == 9
                          ? "bgs-green"
                          : "bgs-red-200"
                        : "bg-color-l "
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Quantity</span>
              <div className="flex items-center ">
                <button
                  onClick={() =>
                    setMultiplier(multiplier > 1 ? multiplier - 1 : 1)
                  }
                  className={`gray-50 text-lg p-[5px] font-bold mx-1 text-white flex items-center justify-center rounded-md 
                    ${
                      selectBet == "x"
                        ? "bgs-green"
                        : selectBet == "d"
                        ? "bgs-red-200"
                        : selectBet == "t"
                        ? "bgs-violet"
                        : selectBet == "l"
                        ? "color-yellow-bg-200"
                        : selectBet == "n"
                        ? "bg-betblue"
                        : selectBet == 1 ||
                          selectBet == 3 ||
                          selectBet == 5 ||
                          selectBet == 7 ||
                          selectBet == 9
                        ? "bgs-green"
                        : "bgs-red-200"
                    }
                    `}
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={multiplier}
                  className="w-20 text-center  bg-body outline-none border border-[--bg-nav] mx-3"
                  name=""
                  id=""
                  onChange={(e) => setMultiplier(e.target.value)}
                />
                <button
                  onClick={() => setMultiplier(multiplier + 1)}
                  className={`gray-50 text-lg  p-[5px] font-bold mx-1 text-white flex items-center justify-center rounded-md  
                    ${
                      selectBet == "x"
                        ? "bgs-green"
                        : selectBet == "d"
                        ? "bgs-red-200"
                        : selectBet == "t"
                        ? "bgs-violet"
                        : selectBet == "l"
                        ? "color-yellow-bg-200"
                        : selectBet == "n"
                        ? "bg-betblue"
                        : selectBet == 1 ||
                          selectBet == 3 ||
                          selectBet == 5 ||
                          selectBet == 7 ||
                          selectBet == 9
                        ? "bgs-green"
                        : "bgs-red-200"
                    }
                    `}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className=" items-center flex justify-end mb-5 ">
              {xData.map((item, i) => (
                <button
                  className={`gray-50 text-base mx-1 px-2 py-[5px] gray-100 rounded-md ${
                    activeX === i
                      ? selectBet == "x"
                        ? "bgs-green"
                        : selectBet == "d"
                        ? "bgs-red-200"
                        : selectBet == "t"
                        ? "bgs-violet"
                        : selectBet == "l"
                        ? "color-yellow-bg-200"
                        : selectBet == "n"
                        ? "bg-betblue"
                        : selectBet == 1 ||
                          selectBet == 3 ||
                          selectBet == 7 ||
                          selectBet == 5 ||
                          selectBet == 9
                        ? "bgs-green"
                        : "bgs-red-200"
                      : "bg-color-l "
                  }`}
                  key={i}
                  onClick={() => {
                    setActiveX(i);
                    setMultiplier(item);
                  }}
                >
                  X{item}
                </button>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  className="hidden peer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center peer-checked:bg-[#4183F8]">
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
                  I agree
                </span>{" "}
                <Link className="color-red-200 fs-sm flex items-center">
                  <MdKeyboardDoubleArrowLeft /> Pre-sale rules{" "}
                  <MdKeyboardDoubleArrowRight />
                </Link>
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-color-l w-[40%] p-2"
              onClick={() => setOpenPopup(false)}
            >
              Cancel
            </button>
            <button
              className={` w-[60%] p-2 
              ${
                selectBet == "x"
                  ? "bgs-green"
                  : selectBet == "d"
                  ? "bgs-red-200"
                  : selectBet == "t"
                  ? "bgs-violet"
                  : selectBet == "l"
                  ? "color-yellow-bg-200"
                  : selectBet == "n"
                  ? "bg-betblue"
                  : selectBet == 1 ||
                    selectBet == 3 ||
                    selectBet == 5 ||
                    selectBet == 7 ||
                    selectBet == 9
                  ? "bgs-green"
                  : "bgs-red-200"
              }
               text-white
              `}
              disabled={loader ? true : false}
              onClick={handleBet}
            >
              Total amount ₹{totalAmount.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      <div className={openHowtoPlay ? "overlay-section block" : "hidden"}></div>

      <div
        className={resultPopup ? "overlay-section block" : "hidden"}
        onClick={handleClose}
      ></div>

      {/* result popup */}
      {resultPopup && (winResult === true || winResult === false) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]">
          <img
            src={winResult ? WinImg : LoseImg}
            alt=""
            className="w-[21rem] h-[28rem]"
          />
          <div
            className='"top-[50%] left-[50%]"'
            style={{ position: "absolute", top: "37%" }}
          >
            <p
              className={` text-[2rem] text-center font-bold ${
                winResult ? "text-white" : "color-slate-500"
              }`}
            >
              {winResult ? "Congratulations" : "Sorry"}
            </p>

            <div className="flex justify-center items-center mt-8">
              <span
                className={`text-sm  mr-1 ${
                  winResult ? "text-white" : "color-slate-500"
                }`}
              >
                Lottery Result:
              </span>
              <span
                className={`text-sm w-14 text-center py-[1px] text-white rounded-md ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {wingoHistoryData?.gameslist[0]?.result == "0"
                  ? "Violet"
                  : wingoHistoryData?.gameslist[0]?.result == "5"
                  ? "Violet"
                  : wingoHistoryData?.gameslist[0]?.result % 2 == 0
                  ? "Red"
                  : "Green"}
              </span>

              <span
                className={`text-sm w-7 h-7 text-center mx-2  text-white rounded-full flex justify-center items-center ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {Array.isArray(wingoHistoryData?.gameslist) &&
                  wingoHistoryData?.gameslist[0]?.result}
              </span>
              <span
                className={`text-sm w-14 text-center py-[1px] text-white rounded-md ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {wingoHistoryData?.gameslist[0]?.result > 5 ? "Big" : "Small"}
              </span>
            </div>
            <div className="mt-6">
              {winResult ? (
                <div className=" color-red-200 mt-5 text-center font-medium ">
                  <p>Bonus</p>
                  <p className="text-[1.5rem] relative top-[-3px]">
                    ₹
                    {Array.isArray(wingoHistoryData?.gameslist) &&
                      wingoHistoryData?.gameslist[0]?.get}
                  </p>
                </div>
              ) : (
                <p className="text-[2rem] color-slate-500 mt-5 text-center font-medium">
                  Lose
                </p>
              )}
            </div>
            <p
              className={`fs-sm gray-100 text-center ${
                winResult ? "mt-1" : "mt-3"
              }`}
            >
              Period: Wingo {activeTime}{" "}
              {Array.isArray(wingoPeriodListData?.data?.gameslist) &&
                wingoPeriodListData?.data?.gameslist[0]?.period}
            </p>

            <p
              className={`fs-sm mt-14 cursor-pointer flex items-center  ${
                winResult ? "ml-[0px]" : "ml-[-10px] color-slate-500"
              }`}
            >
              <span
                className={`w-5 mr-2 flex h-5 border border-white rounded-full ${
                  winResult ? "" : ""
                }`}
              ></span>{" "}
              3 Seconds auto close
            </p>
          </div>
          <button
            className="color-white absolute bottom-[15%] text-3xl"
            onClick={() => handleClose()}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
      )}

      {openHowtoPlay ? (
        <div className="fixed top-32 bg-popup w-[300px] flex flex-col justify-center items-center m-auto left-0 right-0 rounded-t-2xl rounded-b-2xl z-30">
          <div className=" bg-blues w-full text-center text-white text-xl py-2  rounded-t-2xl">
            How to play
          </div>
          <div className="h-[300px] overflow-auto p-2 fs-sm leading-6">
            <p className="font-bold">
              3 minutes 1 issue, 2minutes 55 seconds to order, 5 seconds waiting
              for the draw. It opens all day. The total number of trade is 480
              issues.
            </p>

            <p className="font-bold">
              <font>
                if you spend 100 to trade, after deducting service fee 2%,
                contract amount : 98
              </font>
            </p>
            <p>
              <span>
                1. Select green: if the result shows 1,3,7,9 you will get
                (98*2)=196;If the result shows 5, you will get (98*1.5) 147
              </span>
            </p>
            <p>
              <span>
                2. Select red: if the result shows 2,4,6,8 you will get
              </span>
              <span>(98*2)=196</span>
              <span>;If the result shows 0, you will get</span>
              <span>(98*1.5) 147</span>
            </p>
            <p>
              <span>
                3. Select violet: if the result shows 0 or 5, you will get
              </span>
              <span>(98*2)=196</span>
            </p>
            <p>
              <span>
                4. Select number: if the result is the same as the number you
                selected, you will get
              </span>
              <span>(98*9)=882</span>
            </p>
            <p>
              <span>
                5. Select big: if the result shows 5,6,7,8,9 you will get
              </span>
              <span>(98*2)=196</span>
            </p>
            <p>
              <span>
                6. Select small: if the result shows 0,1,2,3,4 you will get
              </span>
              <span>(98*2)=196</span>
            </p>
          </div>
          <div className="flex justify-center items-center nav-bg w-full py-3 rounded-b-2xl">
            <button
              className="blue-linear rounded-full w-40  text-white py-2"
              onClick={() => setHowtoPlay(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={`place-bet-popup ${betAlert ? "active" : ""}`}>
        <div className="text-sm">{messages} </div>
      </div>
      <CopyCopmponent copyPopup={refershPopup} message="Refesh successfully" />
      <CopyCopmponent copyPopup={copyPopup} message="Copy successfully" />
    </>
  );
};

export default Wingo;
