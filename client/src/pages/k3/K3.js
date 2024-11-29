import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useRef,
} from "react";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import RefereshImg from "../../assets/refresh.png";
import Wallet from "../../assets/wallet.png";
import Logo from "../../assets/logo.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiCopySimpleBold } from "react-icons/pi";
import { FaCircleQuestion } from "react-icons/fa6";
import "./k3.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdSupportAgent,
} from "react-icons/md";
import { FaMinus, FaPlus, FaVolumeUp } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import TimeImg from "../../assets/time.png";
import TimeActiveImg from "../../assets/time_aactive.png";

import N1 from "../../assets/n1.png";
import N2 from "../../assets/n2.png";
import N3 from "../../assets/n3.png";
import N4 from "../../assets/n4.png";
import N5 from "../../assets/n5.png";
import N6 from "../../assets/n6.png";
import WinImg from "../../assets/win-popup.png";
import LoseImg from "../../assets/loss-popup.png";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../store/reducer/authReducer";
import CopyCopmponent from "../../components/CopyCopmponent";
import { k3History, k3PeriodList } from "../../store/reducer/gameReducer";
import { k3Bet } from "../../store/reducer/betReducer";
import io from "socket.io-client";
import VoiceImg from "../../assets/voice.png";
import VoiceOffImg from "../../assets/voice-off.png";
import Audio1 from "../../assets/audio/di1.mp3";
import Audio2 from "../../assets/audio/di2.mp3";
import { debounce } from "lodash";
import Img from "../../assets/loader.png";
import { host } from "../../store/reducer/api";
import Marquee from "react-fast-marquee";

const BallData = [
  {
    number: 3,
    x: 207.36,
  },
  {
    number: 4,
    x: 69.12,
  },
  {
    number: 5,
    x: 34.56,
  },
  {
    number: 6,
    x: 20.74,
  },
  {
    number: 7,
    x: 13.83,
  },
  {
    number: 8,
    x: 9.88,
  },
  {
    number: 9,
    x: 8.3,
  },
  {
    number: 10,
    x: 7.68,
  },
  {
    number: 11,
    x: 7.68,
  },
  {
    number: 12,
    x: 8.3,
  },
  {
    number: 13,
    x: 9.88,
  },
  {
    number: 14,
    x: 13.83,
  },
  {
    number: 15,
    x: 20.74,
  },
  {
    number: 16,
    x: 34.56,
  },
  {
    number: 17,
    x: 69.12,
  },
  {
    number: 18,
    x: 207.36,
  },
];

const xData = [1, 5, 10, 20, 50, 100];

const imgData = {
  1: N1,
  2: N2,
  3: N3,
  4: N4,
  5: N5,
  6: N6,
};

const getImageFromNumber = (number) => {
  if (number) {
    return number
      ?.toString()
      ?.split("")
      .map((num) => imgData[num]);
  } else {
    throw new Error("Input is not a valid number or string");
  }
};
const socket = io(host);
const K3 = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { k3PeriodListData, k3HistoryData } = useSelector(
    (state) => state.game
  );
  const { loader } = useSelector((state) => state.bet);
  const [activeTime, setActiveTime] = useState("1Min");
  const [activeX, setActiveX] = useState(0);
  const [messages, setMessage] = useState("");
  const [gameHistory, setGameHistory] = useState("ghistory");
  const [openPopup, setOpenPopup] = useState(false);
  const [openTime, setOpenTime] = useState(null);
  const [openHowtoPlay, setHowtoPlay] = useState(false);
  const [selectTab, setSelectTab] = useState(1);
  const [refershPopup, setRefeshPopup] = useState(false);
  const [betAlert, setBetAlert] = useState(false);
  const [pageno, setPage] = useState(1);
  const [pageto, setPageto] = useState(10);
  const [typeid1, setTypeid1] = useState(1);
  const [secondtime1, setSecondtime1] = useState(0);
  const [secondtime2, setSecondtime2] = useState(0);
  const [minutetime2, setMinutetime2] = useState(0);
  const [changeTime, setChangeTime] = useState(false);
  const [changeDice, setChangeDice] = useState(true);
  const [details, setDetails] = useState(null);
  const [copyPopup, setCopyPopup] = useState(false);
  const [winResult, setWinResult] = useState(null);
  const [resultPopup, setResultPopup] = useState(false);
  const [activeVoice, setActiveVoice] = useState(true);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleK3Minut = async (data) => {
    setActiveTime(data);
    localStorage.setItem("k3minute", data);
    let match = data.match(/\d+/);
    let number = match ? parseInt(match[0], 10) : null;
    setTypeid1(number);
    setPage(1);
    setPageto(10);
    debouncedDispatch(dispatch, number, pageno, pageto);
  };
  const handleGameHistory = (data) => {
    setGameHistory(data);
    setPage(1);
    setPageto(10);
  };

  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [balance, setBalance] = useState(1);
  const [multiplier, setMultiplier] = useState(1);

  const balanceOptions = [1, 10, 100, 1000];

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
    const k3minutes = localStorage.getItem("k3minute");
    if (k3minutes !== null) {
      setActiveTime(k3minutes);
      setTypeid1(extractNumber(k3minutes));
    }
    const voiceState = localStorage.getItem("voice");
    if (voiceState !== null) {
      setActiveVoice(JSON.parse(voiceState));
    }

    if (typeid1 !== null) {
      debouncedDispatch(dispatch, typeid1, pageno, pageto);
      openAudio();
    }

    // if(openPopup){
    //     document.body.style.overflow = 'hidden';
    //    }

    //    return () => {
    //     document.body.style.overflow = 'auto'; // or 'visible' depending on your default
    //   };
  }, [activeTime, resultPopup, openPopup, winResult]);

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

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedNumbers3, setSelectedNumbers3] = useState([]);

  let totalAmount =
    selectedNumbers.length > 0
      ? selectedNumbers.length * balance * multiplier
      : balance * multiplier;
  totalAmount =
    selectedNumbers3.length > 0
      ? selectedNumbers3.length * totalAmount
      : totalAmount;

  let totalbalance =
    selectedNumbers.length > 0 ? selectedNumbers.length * balance : balance;
  totalbalance =
    selectedNumbers3.length > 0 ? selectedNumbers3.length * balance : balance;

  const numbers1 = [11, 22, 33, 44, 55, 66];
  const numbers3 = [1, 2, 3, 4, 5, 6];
  const numbers33 = [1111, 2222, 3333, 4444, 5555, 6666];

  var selectBets = [...selectedNumbers, ...selectedNumbers3];
  const selectBet = selectBets.join(",");

  const handleBet = async () => {
    dispatch(
      k3Bet({ typeid1, selectTab, selectBet, totalbalance, multiplier })
    ).then((res) => {
      setBetAlert(true);
      setOpenPopup(false);
      setMessage(res.payload.message);
      setBalance(1);
      setMultiplier(1);
      setActiveX(0);
      setSelectedNumbers([]);
      setSelectedNumbers3([]);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      dispatch(userDetail());
      debouncedDispatch(dispatch, typeid1, pageno, pageto);
      setTimeout(() => {
        setBetAlert(false);
      }, 2000);
    });
  };

  const handleSelectNumber = (number) => {
    setSelectedNumbers((prevSelected) =>
      prevSelected.includes(number)
        ? prevSelected.filter((n) => n !== number)
        : [...prevSelected, number]
    );
    setTimeout(() => {
      setOpenPopup(true);
    }, 100);
  };
  const handleSelectNumber3 = (number) => {
    setSelectedNumbers3((prevSelected) => {
      const isSingleDigit = number < 10;
      const correspondingNumber = isSingleDigit
        ? number * 10 + number
        : Math.floor(number / 10);

      // Determine if the number or its corresponding number is selected
      const isNumberSelected = prevSelected.includes(number);
      const isCorrespondingNumberSelected =
        prevSelected.includes(correspondingNumber);

      if (isNumberSelected) {
        // If the number is already selected, remove it and its corresponding number
        return prevSelected.filter(
          (n) => n !== number && n !== correspondingNumber
        );
      } else if (number == "s") {
        return prevSelected.filter((n) => n !== "b").concat("s");
      } else if (number == "b") {
        // If 'b' is selected, remove 's' if present
        return prevSelected.filter((n) => n !== "s").concat("b");
      } else if (number == "l") {
        // If 'b' is selected, remove 's' if present
        return prevSelected.filter((n) => n !== "c").concat("l");
      } else if (number == "c") {
        // If 'b' is selected, remove 's' if present
        return prevSelected.filter((n) => n !== "l").concat("c");
      } else {
        // If the number is not selected, add it and remove the corresponding number if it's selected
        return [
          ...prevSelected.filter((n) => n !== correspondingNumber),
          number,
        ];
      }
    });
    setTimeout(() => {
      setOpenPopup(true);
    }, 100);
  };

  const copyToClipboard = (number) => {
    navigator.clipboard
      .writeText(String(number))
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

  const handleRefersh = () => {
    dispatch(userDetail()).then((res) => {
      if (res.payload.status) {
        setRefeshPopup(true);
      }
      setTimeout(() => {
        setRefeshPopup(false);
      }, 2000);
    });
  };

  const debouncedDispatch = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(k3PeriodList({ typeid1, pageno, pageto }));
      dispatch(k3History({ typeid1, pageno, pageto }));
    }, 500),
    []
  );

  const debouncedDispatchResult = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(k3History({ typeid1, pageno, pageto })).then((res) => {
        if (res?.payload.data?.gameslist[0]?.status == 1) {
          setWinResult(true);
          dispatch(userDetail());
        } else {
          setWinResult(false);
        }
      });
    }, 500),
    []
  );
  useEffect(() => {
    dispatch(userDetail());
  }, []);

  useEffect(() => {
    // Dispatch userDetail only once when the component mounts

    setTimeout(() => {
      setRefeshPopup(false);
    }, 2000);

    const handler = (msg) => {
      setPage(1);
      setPageto(10);
      // Realtime data
      console.log(
        "msg?.data[1]?.period ",
        msg?.data[1]?.period,
        " k3HistoryData?.data?.gameslist[0]",
        k3HistoryData?.data?.gameslist[0]
      );
      if (msg?.data[1]?.period == k3HistoryData?.data?.gameslist[0]?.stage) {
        setResultPopup(true);
        debouncedDispatchResult(dispatch, typeid1, pageno, pageto);
        setChangeDice(true);
      }
      if (typeid1 === 1 && Array.isArray(msg?.data) && msg.game == 1) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
        setChangeTime(true);
        setChangeDice(true);

        console.log("server data received");
      }

      if (typeid1 == 3 && Array.isArray(msg?.data) && msg.game == 3) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
        setChangeTime(true);
        setChangeDice(true);
      }

      if (typeid1 == 5 && Array.isArray(msg?.data) && msg.game == 5) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
        setChangeTime(true);
        setChangeDice(true);
      }
      if (typeid1 == 10 && Array.isArray(msg?.data) && msg?.game == 10) {
        debouncedDispatch(dispatch, typeid1, pageno, pageto);
        setChangeTime(true);
        setChangeDice(true);
      }
    };

    socket.on("data-server-k3", handler);

    return () => {
      socket.off("data-server-k3", handler);
    };
  }, [dispatch, debouncedDispatch, debouncedDispatchResult, k3HistoryData]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // time count
    if (typeid1 == 1) {
      intervalRef.current = setInterval(() => {
        var countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        var previousMinute = null;
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes / 20 - 2);
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        if (previousMinute !== minute) {
          setMinutetime2(0);

          previousMinute = 0; // Update the previous minute
          const miii = document.getElementById("minute");
          if (miii) {
            miii.innerText = 0; // Append the new minute value
          }
          setSecondtime1(seconds1);
          setSecondtime2(seconds2);
        }
      }, 1000);

      if (secondtime1 == 0 && secondtime2 <= 5 && secondtime2 >= 1) {
        setOpenTime(true);
        console.log("1min");
        setOpenPopup(false);
        if (activeVoice) {
          playAudio1();
        }
      } else {
        setOpenTime(false);
      }
      if (secondtime1 == 5 && secondtime2 == 9) {
        setChangeDice(false);
        if (activeVoice) {
          playAudio2();
        }
      }
    }

    if (typeid1 == 3) {
      intervalRef.current = setInterval(() => {
        var countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        var previousMinute = null;
        var lastLogTime = 0;

        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes % 3);
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        if (previousMinute !== minute) {
          previousMinute = minute;

          // Ensure the update only happens once per minute change
          if (now - lastLogTime >= 1000) {
            setMinutetime2(minute);

            const miii = document.getElementById("minute");
            if (miii) {
              // Update the inner text directly
              miii.innerText = minute;
            }

            setSecondtime1(seconds1);
            setSecondtime2(seconds2);

            if (
              minute == 0 &&
              seconds1 == 0 &&
              seconds2 <= 5 &&
              secondtime2 >= 1
            ) {
              setOpenTime(true);
              console.log("3min");
              setOpenPopup(false);
              if (activeVoice) {
                playAudio1();
              }
            } else {
              setOpenTime(false);
            }

            if (minute == 2 && seconds1 == 5 && seconds2 == 9) {
              setChangeDice(false);
              if (activeVoice) {
                playAudio2();
              }
            }

            lastLogTime = now;
          }
        }
      }, 1000);
    }
    if (typeid1 == 5) {
      intervalRef.current = setInterval(() => {
        var countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        var previousMinute = null; // Initialize to track the previous minute
        var lastLogTime = 0; // Initialize last log time
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes % 5);
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        if (previousMinute !== minute) {
          setMinutetime2(minute);
          previousMinute = minute; // Update the previous minute

          setSecondtime1(seconds1);
          setSecondtime2(seconds2);
          if (now - lastLogTime >= 1000) {
            const miii = document.getElementById("minute");
            if (miii) {
              miii.innerText = minute; // Set the new minute value as HTML
            }

            lastLogTime = now;
            if (
              minute == 0 &&
              seconds1 == 0 &&
              seconds2 <= 5 &&
              secondtime2 >= 1
            ) {
              setOpenTime(true);
              setOpenPopup(false);
              if (activeVoice) {
                playAudio1();
              }
            } else {
              setOpenTime(false);
            }
            if (minute == 4 && secondtime1 == 5 && secondtime2 == 9) {
              setChangeDice(false);
              if (activeVoice) {
                playAudio2();
              }
            }
          }
        }
      }, 1000);
    }
    if (typeid1 == 10) {
      intervalRef.current = setInterval(() => {
        var countDownDate = new Date(
          "2030-07-16T23:59:59.9999999+01:00"
        ).getTime();
        var previousMinute = null; // Initialize to track the previous minute
        var lastLogTime = 0; // Initialize last log time
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes % 10);

        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);

        // Log only when the minute changes
        if (previousMinute !== minute) {
          previousMinute = minute; // Update the previous minute

          setMinutetime2(minute);
          previousMinute = minute; // Update the previous minute
          if (now - lastLogTime >= 1000) {
            const miii = document.getElementById("minute");
            if (miii) {
              miii.innerText = minute; // Set the new minute value as HTML
            }
            lastLogTime = now;
            setSecondtime1(seconds1);
            setSecondtime2(seconds2);
            if (
              minute == 0 &&
              seconds1 == 0 &&
              seconds2 <= 5 &&
              secondtime2 >= 1
            ) {
              setOpenTime(true);
              setOpenPopup(false);
              console.log("10min");
              if (activeVoice) {
                playAudio1();
              }
            } else {
              setOpenTime(false);
            }
            if (minute == 9 && secondtime1 == 5 && secondtime2 == 9) {
              setChangeDice(false);
              if (activeVoice) {
                playAudio2();
              }
            }
          }
        }
      }, 1000);
    }
    // Cleanup on component unmount or when typeid1 changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [secondtime1, secondtime2, typeid1, minutetime2]);

  const fetchNewData = async (pageno, pageto) => {
    await dispatch(k3PeriodList({ typeid1, pageno, pageto }));
    await dispatch(k3History({ typeid1, pageno, pageto }));
  };

  const handleIncrease = async () => {
    const newPageNo = pageno + 10;
    const newPageTo = pageto + 10;
    setPage(newPageNo);
    setPageto(newPageTo);
    await fetchNewData(newPageNo, newPageTo);
  };

  const handleDecrease = async () => {
    if (pageno > 10) {
      const newPageNo = pageno - 10;
      const newPageTo = pageto - 10;
      setPage(newPageNo);
      setPageto(newPageTo);
      await fetchNewData(newPageNo, newPageTo);
    }
  };

  const [diceValues, setDiceValues] = useState([1, 2, 3]);

  const rollDice = () => {
    setDiceValues(diceValues.map(() => Math.floor(Math.random() * 6) + 1));
  };

  const handleDetail = (i) => {
    if (details === i) {
      return setDetails(null);
    }
    setDetails(i);
  };

  const mappings = {
    s: "small",
    l: "odd",
    c: "even",
    b: "big",
  };

  // Use effect to roll dice at an interval
  useEffect(() => {
    const interval = setInterval(rollDice, 100); // Change dice every second
    return () => clearInterval(interval);
  }, [diceValues, changeTime, changeDice, pageno, pageto]);

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

      <div className="blue-linear pb-24 rounded-b-[60px]">
        <div className="container-section pt-5">
          <div className="wallet-bg-section bg-color-l pb-5 rounded-2xl  flex flex-col justify-center items-center w-full">
            <div className="flex items-center ms-2 mt-4 mb-2">
              <h3 className="heaing-h3 text-xl font-bold">
                ₹{Number(userInfo?.money_user).toFixed(2)}
              </h3>
              <img
                src={RefereshImg}
                alt=""
                className="w-5 ms-2 mb-[2px]"
                onClick={handleRefersh}
              />
            </div>
            <div className="flex items-center">
              <img src={Wallet} alt="" className="w-4 mr-2 mb-[2px]" />
              <p className="fs-sm">Wallet balance</p>
            </div>
            <div className="flex w-full justify-around items-center mt-4">
              <button
                className="text-base flex  text-white justify-center items-center px-6 py-1 border-none font-bold red-linear rounded-full "
                onClick={() => navigate("/wallet/Recharge")}
              >
                Deposit
              </button>
              <button
                className="text-base flex  text-white justify-center items-center px-6 py-1 border-none font-bold bgs-green rounded-full "
                onClick={() => navigate("/wallet/Withdraw")}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-color-l mt-5 p-2 items-center flex justify-between rounded-full">
            <FaVolumeUp className="color-blue-500" />
            <Marquee className="gray-50 text-sm">
              Welcome To daman If you need any help contact our Support team,
              Thanks.
            </Marquee>

            <button className="flex items-center blue-linear rounded-full p-1 px-3">
              <BsFire className="text-white mr-1" />{" "}
              <span className="text-white fs-sm">Details</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container-section relative mt-[-75px]">
        {/* time tabs */}
        <div className="grid grid-cols-12 nav-bg rounded-xl">
          <div
            className={`col-span-3 cursor-pointer  flex items-center flex-col justify-center py-2 ${
              activeTime == "1Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            } rounded-xl`}
            onClick={() => handleK3Minut("1Min")}
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
              K3 Lotre <br /> 1Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "3Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            }`}
            onClick={() => handleK3Minut("3Min")}
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
              K3 Lotre <br /> 3Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "5Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            }`}
            onClick={() => handleK3Minut("5Min")}
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
              K3 Lotre <br /> 5Min
            </p>
          </div>
          <div
            className={`col-span-3  cursor-pointer flex items-center flex-col justify-center py-2  rounded-xl  ${
              activeTime == "10Min"
                ? "blue-linear2 change-img-color"
                : " change-img-color"
            }`}
            onClick={() => handleK3Minut("10Min")}
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
              K3 Lotre <br /> 10Min
            </p>
          </div>
        </div>

        {/* wingo tim */}
        <div className="relative">
          <div className="nav-bg p-3 mt-5">
            <div className="flex justify-between  rounded-lg ">
              <div>
                <div className="flex items-center">
                  <span className="text-sm gray-100">Period</span>
                  <button
                    className="border flex items-center ms-2 border-[--bgs-blue-500] color-blue-500 justify-center rounded-full px-4 py-[1px]"
                    onClick={() => setHowtoPlay(true)}
                  >
                    <svg
                      data-v-3e4c6499=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        data-v-3e4c6499=""
                        d="M23.67 3H12.33C6.66 3 5.25 4.515 5.25 10.56V27.45C5.25 31.44 7.44 32.385 10.095 29.535L10.11 29.52C11.34 28.215 13.215 28.32 14.28 29.745L15.795 31.77C17.01 33.375 18.975 33.375 20.19 31.77L21.705 29.745C22.785 28.305 24.66 28.2 25.89 29.52C28.56 32.37 30.735 31.425 30.735 27.435V10.56C30.75 4.515 29.34 3 23.67 3ZM11.67 18C10.845 18 10.17 17.325 10.17 16.5C10.17 15.675 10.845 15 11.67 15C12.495 15 13.17 15.675 13.17 16.5C13.17 17.325 12.495 18 11.67 18ZM11.67 12C10.845 12 10.17 11.325 10.17 10.5C10.17 9.675 10.845 9 11.67 9C12.495 9 13.17 9.675 13.17 10.5C13.17 11.325 12.495 12 11.67 12ZM24.345 17.625H16.095C15.48 17.625 14.97 17.115 14.97 16.5C14.97 15.885 15.48 15.375 16.095 15.375H24.345C24.96 15.375 25.47 15.885 25.47 16.5C25.47 17.115 24.96 17.625 24.345 17.625ZM24.345 11.625H16.095C15.48 11.625 14.97 11.115 14.97 10.5C14.97 9.885 15.48 9.375 16.095 9.375H24.345C24.96 9.375 25.47 9.885 25.47 10.5C25.47 11.115 24.96 11.625 24.345 11.625Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="fs-sm">How to play</span>
                  </button>
                </div>
                <h3 className="heading-h5 text-2xl font-medium mt-2 gray-50 ">
                  {k3PeriodListData?.period}
                </h3>
              </div>
              {/* period */}
              <div className="flex flex-col items-end">
                <p className="text-sm gray-100">Time remaining</p>
                <div className="flex items-center mt-1">
                  <span className="bg-color-l p-1 text-lg mx-[2px] font-semibold w-5 color-blue-500">
                    0
                  </span>
                  <span
                    className="bg-color-l p-1 text-lg mx-[2px] font-semibold w-5 color-blue-500"
                    id="minute"
                  >
                    0
                  </span>
                  <span className=" p-1 text-lg mx-[1px] font-semibold color-blue-500">
                    :
                  </span>
                  <span className="bg-color-l p-1 text-lg mx-[2px] font-semibold w-5 color-blue-500">
                    {secondtime1}
                  </span>
                  <span className="bg-color-l p-1 text-lg mx-[2px] font-semibold w-5 color-blue-500">
                    {secondtime2}
                  </span>
                </div>
              </div>
            </div>

            <div className="bgs-green k3tl-box mt-5">
              <div className="box">
                {changeDice ? (
                  <>
                    {Array.isArray(k3PeriodListData?.data?.gameslist)
                      ? Array.isArray(k3PeriodListData?.data?.gameslist) &&
                        String(k3PeriodListData?.data?.gameslist[0]?.result)
                          .split("")
                          .map((value, index) => (
                            <div key={index}>
                              <div className={`num${value} rotate-dice`}></div>
                            </div>
                          ))
                      : diceValues.map((value, index) => (
                          <div key={index}>
                            <div className={`num${value} rotate-dice`}></div>
                          </div>
                        ))}
                  </>
                ) : (
                  diceValues.map((value, index) => (
                    <div key={index}>
                      <div className={`num${value} rotate-dice`}></div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                className={` fs-sm gray-100  w-full  py-3 rounded-t-md ${
                  selectTab == 1 ? "bgs-blue-500 text-white" : "bg-color-l"
                }`}
                onClick={() => setSelectTab(1)}
              >
                Total
              </button>
              <button
                className={` fs-sm gray-100 mx-1 w-full  py-3 rounded-t-md ${
                  selectTab == 2 ? "bgs-blue-500 text-white" : "bg-color-l"
                }`}
                onClick={() => {
                  setSelectTab(2);
                  setSelectedNumbers([]);
                  setSelectedNumbers3([]);
                }}
              >
                2 same
              </button>
              <button
                className={` fs-sm gray-100 mr-1 w-full  py-3 rounded-t-md ${
                  selectTab == 3 ? "bgs-blue-500 text-white" : "bg-color-l"
                }`}
                onClick={() => {
                  setSelectTab(3);
                  setSelectedNumbers([]);
                  setSelectedNumbers3([]);
                }}
              >
                3 same
              </button>
              <button
                className={` fs-sm gray-100  w-full  py-3 rounded-t-md ${
                  selectTab == 4 ? "bgs-blue-500 text-white" : "bg-color-l"
                }`}
                onClick={() => {
                  setSelectTab(4);
                  setSelectedNumbers([]);
                  setSelectedNumbers3([]);
                }}
              >
                Different
              </button>
            </div>
            {selectTab == 1 && (
              <div>
                <div className="grid grid-cols-12 gap-2 ball-section mt-3">
                  {BallData.map((item, i) => (
                    <div
                      className="col-span-3 flex flex-col justify-center items-center num "
                      key={i}
                    >
                      <div
                        className="flex flex-col justify-center items-center cursor-pointer ball"
                        onClick={() => handleSelectNumber(item.number)}
                      >
                        <div className="text">{item.number}</div>
                      </div>
                      <div className="fs-sm gray-100">{item.x}X</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button
                    className={` fs-sm   text-white w-full  py-2 rounded-md bg-yellow`}
                    onClick={() => handleSelectNumber3("b")}
                  >
                    Big <br />
                    1.92X{" "}
                  </button>
                  <button
                    className={` fs-sm  text-white  mx-1 w-full  py-2 rounded-md bgs-blue-500`}
                    onClick={() => handleSelectNumber3("s")}
                  >
                    Small <br />
                    1.92X{" "}
                  </button>
                  <button
                    className={` fs-sm  text-white mr-1 w-full  py-2 rounded-md bgs-red-200`}
                    onClick={() => handleSelectNumber3("l")}
                  >
                    Odd <br />
                    1.92X{" "}
                  </button>
                  <button
                    className={` fs-sm  text-white  w-full  py-2 rounded-md bgs-green`}
                    onClick={() => handleSelectNumber3("c")}
                  >
                    Even <br />
                    1.92X{" "}
                  </button>
                </div>
              </div>
            )}
            {selectTab == 2 && (
              <div>
                <p className="fs-sm gray-50 flex items-center mt-2">
                  2 matching numbers: odds(13.83){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mt-2">
                  {numbers1.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers.includes(number)
                          ? "bg-purple-500 text-white"
                          : "bg-purple-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers.includes(number) && (
                        <span className="absolute bottom-[0px] text-xl right-[0px]">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="fs-sm gray-50 flex items-center my-2">
                  A pair of unique numbers: odds(69.12){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mb-2">
                  {numbers1.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber3(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers3.includes(number)
                          ? "bg-red-500 text-white"
                          : "bg-red-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers3.includes(number) && (
                        <span className="absolute bottom-0 text-xl right-0">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2 ">
                  {numbers3.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber3(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers3.includes(number)
                          ? "bg-green-500 text-white"
                          : "bg-green-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers3.includes(number) && (
                        <span className="absolute bottom-0 text-xl right-0">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectTab == 3 && (
              <div>
                <p className="fs-sm gray-50 flex items-center mt-2">
                  3 of the same number: odds(207.36){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mt-2">
                  {numbers33.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers.includes(number)
                          ? "bg-purple-500 text-white"
                          : "bg-purple-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers.includes(number) && (
                        <span className="absolute bottom-[0px] text-xl right-[0px]">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="fs-sm gray-50 flex items-center my-2">
                  Any 3 of the same number: odds(34.56){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={() => handleSelectNumber3("@3")}
                    className={`relative p-2 w-full h-10 flex items-center justify-center rounded-md ${
                      selectedNumbers3.includes("@3")
                        ? "bg-red-500 text-white"
                        : "bg-red-900 gray-100"
                    }`}
                  >
                    Any 3 of the same number: odds
                    {selectedNumbers3.includes("@3") && (
                      <span className="absolute bottom-0 text-xl right-0">
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {selectTab == 4 && (
              <div>
                <p className="fs-sm gray-50 flex items-center mt-2">
                  3 different numbers: odds(34.56){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mt-2">
                  {numbers3.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers.includes(number)
                          ? "bg-purple-500 text-white"
                          : "bg-purple-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers.includes(number) && (
                        <span className="absolute bottom-[0px] text-xl right-[0px]">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="fs-sm gray-50 flex items-center my-2">
                  3 continuous numbers: odds(8.64){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={() => handleSelectNumber3("@u@")}
                    className={`relative p-2 w-full h-10 flex items-center justify-center rounded-md ${
                      selectedNumbers3.includes("@u@")
                        ? "bg-red-500 text-white"
                        : "bg-red-900 gray-100"
                    }`}
                  >
                    3 continuous numbers
                    {selectedNumbers3.includes("@u@") && (
                      <span className="absolute bottom-0 text-xl right-0">
                        <IoIosCheckmarkCircle />
                      </span>
                    )}
                  </button>
                </div>
                <p className="fs-sm gray-50 flex items-center my-2">
                  2 different numbers: odds(6.91){" "}
                  <FaCircleQuestion className="ms-1 color-red-200" />
                </p>
                <div className="flex space-x-2 mb-2">
                  {numbers3.map((number) => (
                    <button
                      key={number}
                      onClick={() => handleSelectNumber3(number)}
                      className={`relative p-2 w-14 h-10 flex items-center justify-center rounded-md ${
                        selectedNumbers3.includes(number)
                          ? "bg-purple-500 text-white"
                          : "bg-purple-900 gray-100"
                      }`}
                    >
                      {number}
                      {selectedNumbers3.includes(number) && (
                        <span className="absolute bottom-0 text-xl right-0">
                          <IoIosCheckmarkCircle />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* bet period section */}

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
                  ? " text-base blue-linear  text-white font-medium "
                  : "nav-bg text-sm gray-100"
              }`}
              onClick={() => handleGameHistory("ghistory")}
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
              onClick={() => handleGameHistory("chart")}
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
              onClick={() => handleGameHistory("mhistory")}
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
                <h5 className="heading-h5 text-base">Period</h5>
              </div>

              <div className="col-span-4  text-center justify-center">
                <h5 className="heading-h5 text-base">Sum</h5>
              </div>
              <div className="col-span-4  text-center justify-center">
                <h5 className="heading-h5 text-base">Results</h5>
              </div>
            </div>

            {Array.isArray(k3PeriodListData?.data?.gameslist) &&
              k3PeriodListData?.data?.gameslist.map((item, i) => (
                <div className="grid grid-cols-12 nav-bg p-2 py-3" key={i}>
                  <div className="col-span-4 flex text-center justify-center items-center">
                    <span className="text-sm gray-100  relative flex">
                      {item?.period}
                    </span>
                  </div>
                  <div className="col-span-1 text-center justify-center items-center">
                    <span className="text-sm gray-1000  ">
                      {String(item.result)
                        .split("")
                        .reduce((acc, digit) => acc + parseInt(digit), 0)}
                    </span>
                  </div>
                  <div className="col-span-2  text-center justify-center  items-center">
                    <span className="text-sm gray-100  ">
                      {String(item.result)
                        .split("")
                        .reduce((acc, digit) => acc + parseInt(digit), 0) > 10
                        ? "Big"
                        : "Small"}
                    </span>
                  </div>
                  <div className="col-span-2  text-center justify-center  items-center">
                    <span className="text-sm gray-100">
                      {String(item.result)
                        .split("")
                        .reduce((acc, digit) => acc + parseInt(digit), 0) %
                        2 ==
                      0
                        ? "Even"
                        : "Odd"}
                    </span>
                  </div>
                  <div className="col-span-3 flex text-center justify-center  items-center">
                    <span className="fs-sm gray-100  flex justify-center items-center">
                      {getImageFromNumber(item.result).map((img, i) => (
                        <img
                          src={img}
                          alt=""
                          key={i}
                          className="w-[20px] h-[20px] mx-1"
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            <div className="nav-bg p-6 flex items-center justify-center mt-5">
              <button
                className={`p-2 mr-8 ${
                  pageto / 10 > 1 ? "bgs-blue-500" : "bg-color-l"
                } `}
                disabled={pageto / 10 > 1 ? false : true}
                onClick={handleDecrease}
              >
                <Link>
                  {" "}
                  <IoIosArrowBack className="text-lg" />
                </Link>
              </button>
              <span className="fs-sm gray-100">
                {pageto / 10}/{k3PeriodListData?.page}
              </span>
              <button
                className={`p-2 ms-8 ${
                  k3PeriodListData?.page > pageto / 10
                    ? "bgs-blue-500"
                    : "bg-color-l"
                } `}
                disabled={k3PeriodListData?.page > pageto / 10 ? false : true}
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
            <div className="grid grid-cols-12 blue-linear text-white rounded-t-md p-2 mt-5">
              <div className="col-span-4 flex text-center justify-center">
                <h5 className="heading-h5 text-base">Period</h5>
              </div>

              <div className="col-span-4  text-center justify-center">
                <h5 className="heading-h5 text-base">Results</h5>
              </div>
              <div className="col-span-4  text-center justify-center">
                <h5 className="heading-h5 text-base">Number</h5>
              </div>
            </div>
            {Array.isArray(k3PeriodListData?.data?.gameslist) &&
              k3PeriodListData?.data?.gameslist.map((item, i) => (
                <div className="grid grid-cols-11 nav-bg p-2 py-3" key={i}>
                  <div className="col-span-4 flex text-center justify-center items-center">
                    <span className="text-sm gray-100  relative flex">
                      {item.period}
                    </span>
                  </div>

                  <div className="col-span-3 flex text-center justify-center  items-center">
                    <span className="fs-sm gray-100  flex justify-center items-center">
                      {getImageFromNumber(item.result).map((img, i) => (
                        <img
                          src={img}
                          alt=""
                          key={i}
                          className="w-[20px] h-[20px] mx-1"
                        />
                      ))}
                    </span>
                  </div>
                  <div className="col-span-4  text-center justify-center  items-center">
                    <span className="text-sm gray-100">
                      {new Set(String(item.result)).size == 1
                        ? "3 same numbers"
                        : new Set(String(item.result)).size == 2
                        ? "2 same numbers"
                        : new Set(String(item.result)).size == 3
                        ? "3 different numbers"
                        : item.result}
                    </span>
                  </div>
                </div>
              ))}
            <div className="nav-bg p-6 flex items-center justify-center mt-5">
              <button
                className={`p-2 mr-8 ${
                  pageto / 10 > 1 ? "bgs-blue-500" : "bg-color-l"
                } `}
                disabled={pageto / 10 > 1 ? false : true}
                onClick={handleDecrease}
              >
                <Link>
                  {" "}
                  <IoIosArrowBack className="text-lg" />
                </Link>
              </button>
              <span className="fs-sm gray-100">
                {pageto / 10}/{k3PeriodListData?.page}
              </span>
              <button
                className={`p-2 ms-8 ${
                  k3PeriodListData?.page > pageto / 10
                    ? "bgs-blue-500"
                    : "bg-color-l"
                } `}
                disabled={k3PeriodListData?.page > pageto / 10 ? false : true}
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

            {Array.isArray(k3HistoryData?.data?.gameslist) &&
              k3HistoryData?.data?.gameslist?.map((item, i) => (
                <div key={i}>
                  <div
                    className="  flex items-center justify-between"
                    onClick={() => handleDetail(i)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex text-sm justify-center text-white  items-center h-10 w-10 rounded-md mr-2 
                              ${
                                item.bet.split(",")[0] == "c"
                                  ? "bgs-green"
                                  : item.bet.split(",")[0] == "l"
                                  ? "bgs-red-200"
                                  : item.bet.split(",")[0] == "b"
                                  ? "color-yellow-bg-200"
                                  : "bgs-blue-500"
                              }
                               `}
                      >
                        {item.bet.split(",")[0] == "c"
                          ? "Even"
                          : item.bet.split(",")[0] == "l"
                          ? "Odd"
                          : item.bet.split(",")[0] == "b"
                          ? "Big"
                          : item.bet.split(",")[0] == "s"
                          ? "Small"
                          : item.bet.split(",")[0]}
                      </div>
                      <div>
                        <h3 className="heading-h3 gray-50 text-md">
                          {item?.stage}
                        </h3>
                        <p className="fs-sm gray-100">{item.time}</p>
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
                            : "-₹" + item.price}
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
                          onClick={() =>
                            copyToClipboard(String(item.id_product))
                          }
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
                      <span className="color-red-200 ">₹{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Tax</span>
                      <span className="gray-100 ">₹{item.fee}</span>
                    </div>
                    <div className="flex items-center justify-between bg-color-l p-1 mb-2  rounded-md">
                      <span className="gray-100 ">Result</span>
                      {item.status !== 0 && (
                        <div className=" flex text-center justify-center  items-center">
                          {getImageFromNumber(item.result).map((img, i) => (
                            <img
                              src={img}
                              alt=""
                              key={i}
                              className="w-[20px] h-[20px] mx-1"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className=" flex flex-col   bg-color-l p-1 mb-2  rounded-md">
                      <p className="gray-100">Select</p>
                      <span className=" gray-100 flex">
                        {item.typeGame}:{" "}
                        {item.bet.split(",")[0] == "c"
                          ? "Even"
                          : item.bet.split(",")[0] == "l"
                          ? "Odd"
                          : item.bet.split(",")[0] == "b"
                          ? "Big"
                          : item.bet.split(",")[0] == "s"
                          ? item.bet
                              .split(",")
                              .map((char) => mappings[char])
                              .join(" ")
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
                      <span className=" gray-100 ">{item.time}</span>
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
                {pageto / 10}/{k3HistoryData?.page}
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

      {/* <div className={openPopup ? "overlay-section block" : "hidden"}></div> */}

      {/* popups */}
      <div
        className={`bg-popup  items-center transition ease-in-out delay-150 justify-center z-10 fixed bottom-0 rounded-t-md filter-section w-[25rem] ${
          openPopup ? "flex" : "hidden"
        }`}
      >
        <div className=" rounded-t-lg  overflow-hidden w-full ">
          {selectTab == 1 && (
            <div className="px-4 pt-4">
              <h5>Total:</h5>
              <div className="flex items-center flex-wrap ">
                {selectedNumbers.map((item, i) => (
                  <div
                    key={i}
                    className={`w-7 mt-2 h-7 mx-1  text-white fs-sm rounded-full flex items-center justify-center ${
                      i % 2 == 0 ? "bgs-red-200" : "bgs-green"
                    }`}
                  >
                    {item}
                  </div>
                ))}
                {selectedNumbers3?.map((item, i) => (
                  <div
                    key={i}
                    className={` mt-2 mx-1 w-10 py-1  text-white fs-sm rounded-md flex items-center justify-center ${
                      item == "l"
                        ? "bgs-red-200"
                        : item == "c"
                        ? "bgs-green"
                        : item == "b"
                        ? "bg-yellow"
                        : "bgs-blue-500"
                    }`}
                  >
                    {item == "l"
                      ? "Odd"
                      : item == "c"
                      ? "Even"
                      : item == "b"
                      ? "Big"
                      : "Small"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectTab == 2 && (
            <div className="px-4 pt-4">
              <h5>{selectedNumbers.length > 0 ? "2 matching numbers:" : ""}</h5>

              <div className="flex items-center flex-wrap ">
                {selectedNumbers?.map((item, i) => (
                  <div
                    key={i}
                    className={` mt-2 mx-1 w-8 py-1 fs-sm rounded-md flex items-center justify-center bgs-violet`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {selectedNumbers3.filter((num) => num >= 10 && num < 100).length >
                0 &&
                selectedNumbers3.filter((num) => num >= 0 && num < 10).length >
                  0 && (
                  <>
                    <h5>A unique number:</h5>
                    <div className="flex items-center flex-wrap ">
                      {selectedNumbers3
                        .filter((num) => num >= 10 && num < 100)
                        .map((item, i) => (
                          <>
                            <div
                              key={i}
                              className={`  mt-2 mx-1 fs-sm rounded-md flex items-center justify-center `}
                            >
                              <span className="bgs-red-200 p-1 px-2 rounded-s-md">
                                {item}
                              </span>{" "}
                              <span className="bgs-green p-1 px-2 rounded-e-md">
                                {selectedNumbers3
                                  .filter((num) => num >= 0 && num < 10)
                                  .join(", ")}
                              </span>
                            </div>
                          </>
                        ))}
                    </div>
                  </>
                )}
            </div>
          )}
          {selectTab == 3 && (
            <div className="px-4 pt-4">
              <h5>
                {selectedNumbers.length > 0 ? "3 of the same number:" : ""}
              </h5>

              <div className="flex items-center flex-wrap ">
                {selectedNumbers?.map((item, i) => (
                  <div
                    key={i}
                    className={` mt-2 mx-1 w-10 py-1 fs-sm rounded-md flex items-center justify-center bgs-violet`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {selectedNumbers3.length > 0 && (
                <>
                  <h5>Any 3 of the same number:</h5>
                  <div className="flex items-center flex-wrap ">
                    {selectedNumbers3.map((item, i) => (
                      <>
                        <div
                          key={i}
                          className={`  mt-2 mx-1 py-1 px-5 fs-sm rounded-md flex items-center justify-center bgs-red-200`}
                        >
                          {item == "@3" ? "3 continuous numbers" : item}
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {selectTab == 4 && (
            <div className="px-4 pt-4">
              {selectedNumbers.length > 2 && (
                <>
                  <h5>3 different numbers:</h5>

                  <div className="flex items-center flex-wrap ">
                    {selectedNumbers?.map((item, i) => (
                      <div
                        key={i}
                        className={` mt-2 mx-1 w-7 py-1 fs-sm rounded-md flex items-center justify-center bgs-violet`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedNumbers3.map((item, i) => (
                <Fragment key={i}>
                  {item == "@u@" && (
                    <>
                      <h5>3 continuous numbers:</h5>
                      <div className="flex items-center flex-wrap ">
                        <>
                          <div
                            key={i}
                            className={`  mt-2 mx-1 py-1 px-5 fs-sm rounded-md flex items-center justify-center bgs-red-200`}
                          >
                            3 continuous numbers
                          </div>
                        </>
                      </div>
                    </>
                  )}
                </Fragment>
              ))}

              {selectedNumbers3.filter((item) => item !== "@u@").length > 1 && (
                <>
                  <h5 className="mt-1">2 different numbers:</h5>
                  <div className="flex items-center flex-wrap ">
                    {selectedNumbers3
                      .filter((item) => item !== "@u@")
                      .map((item, i) => (
                        <div
                          key={i}
                          className={`  mt-2 mx-1 py-1 px-5 fs-sm rounded-md flex items-center justify-center bgs-violet`}
                        >
                          {item}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div className="p-4  ">
            <div className="flex justify-between items-center mb-4">
              <span>Balance</span>
              <div className="flex space-x-2">
                {balanceOptions.map((value) => (
                  <button
                    key={value}
                    onClick={() => setBalance(value)}
                    className={`gray-50 text-base mx-1 px-2 py-[5px]  gray-100  rounded-md ${
                      balance === value ? "bgs-blue-500" : "bg-color-l "
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
                  className={`gray-50 text-lg p-[5px] font-bold mx-1  gray-100  flex items-center justify-center rounded-md 
                   bgs-blue-500
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
                  className={`gray-50 text-lg  p-[5px] font-bold mx-1  gray-100  flex items-center justify-center rounded-md  
                   bgs-blue-500
                    `}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className=" items-center flex justify-end mb-5 ">
              {xData.map((item, i) => (
                <button
                  className={`gray-50 text-base mx-1 px-2 py-[5px]  gray-100  rounded-md ${
                    activeX === i ? "bgs-blue-500" : "bg-color-l "
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
              onClick={() => {
                setOpenPopup(false);
                setSelectedNumbers3([]);
                setSelectedNumbers([]);
              }}
            >
              Cancel
            </button>
            <button
              className={` w-[60%] p-2 bgs-blue-500  text-white `}
              disabled={loader ? true : false}
              onClick={handleBet}
            >
              Total amount ₹{totalAmount.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

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

            <div className="fs-sm gray-100  flex justify-center items-center mt-3">
              {Array.isArray(k3PeriodListData?.data?.gameslist) &&
                getImageFromNumber(
                  k3PeriodListData?.data?.gameslist[0]?.result
                ).map((img, i) => (
                  <img
                    src={img}
                    alt=""
                    key={i}
                    className="w-[20px] h-[20px] mx-1"
                  />
                ))}
            </div>
            <div className="flex justify-center items-center mt-2">
              <span
                className={`text-sm w-14 text-center py-[1px] text-white rounded-md ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {(Array.isArray(k3PeriodListData?.data?.gameslist) &&
                  String(k3PeriodListData?.data?.gameslist[0].result)
                    .split("")
                    .reduce((acc, digit) => acc + parseInt(digit), 0)) > 10
                  ? "Big"
                  : "Small"}
              </span>
              <span
                className={`text-sm w-7 h-7 text-center mx-2  text-white rounded-full flex justify-center items-center ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {Array.isArray(k3PeriodListData?.data?.gameslist) &&
                  String(k3PeriodListData?.data?.gameslist[0].result)
                    .split("")
                    .reduce((acc, digit) => acc + parseInt(digit), 0)}
              </span>
              <span
                className={`text-sm w-14 text-center py-[1px] text-white rounded-md ${
                  winResult
                    ? "color-yellow-bg-200"
                    : "bgs-slate-500 border border-white"
                }`}
              >
                {(Array.isArray(k3PeriodListData?.data?.gameslist) &&
                  String(k3PeriodListData?.data?.gameslist[0].result)
                    .split("")
                    .reduce((acc, digit) => acc + parseInt(digit), 0)) %
                  2 ==
                0
                  ? "Even"
                  : "Odd"}
              </span>
            </div>
            <div>
              {winResult ? (
                <div className=" color-red-200 mt-5 text-center font-medium ">
                  <p>Bonus</p>
                  <p className="text-[1.5rem] relative top-[-3px]">
                    ₹
                    {Array.isArray(k3HistoryData?.data?.gameslist) &&
                      k3HistoryData?.data?.gameslist[0]?.get}
                  </p>
                </div>
              ) : (
                <p className="text-[2rem] gray-color mt-5 text-center font-medium">
                  Lose
                </p>
              )}
            </div>
            <p
              className={`fs-sm gray-100 text-center ${
                winResult ? "mt-1" : "mt-3"
              }`}
            >
              Period: K3 {typeid1} Minute{" "}
              {Array.isArray(k3PeriodListData?.data?.gameslist) &&
                k3PeriodListData?.data?.gameslist[0]?.period}
            </p>

            <p
              className={`fs-sm mt-14 cursor-pointer flex items-center  ${
                winResult ? "ml-[0px]" : "ml-[-20px]"
              }`}
            >
              <span className="w-5 mr-2 flex h-5 border border-white rounded-full"></span>{" "}
              3 Seconds auto close
            </p>
          </div>
          <button
            className="color-white absolute bottom-[15%] text-2xl"
            onClick={() => handleClose()}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
      )}
      {/* how to play section */}
      <div className={openHowtoPlay ? "overlay-section block" : "hidden"}></div>

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
              className="blue-linear rounded-full w-40 py-2"
              onClick={() => setHowtoPlay(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <CopyCopmponent copyPopup={refershPopup} message="Refesh successfully" />
      <CopyCopmponent copyPopup={copyPopup} message="Copy successfully" />
      <div className={`place-bet-popup ${betAlert ? "active" : ""}`}>
        <div className="text-sm">{messages} </div>
      </div>
    </>
  );
};

export default K3;
