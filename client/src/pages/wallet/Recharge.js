import React, { Fragment, useEffect, useState } from "react";
import Wallet from "../../assets/balance.png";
import RefereshImg from "../../assets/refresh.png";
import { IoIosArrowBack, IoMdWallet } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import EWalletIcon from "../../assets/e-wallet.png";
import PaytmIcon from "../../assets/paytm.jpg";
import UpiIcon from "../../assets/upi.png";
import USDt1Img from "../../assets/usdt1.png";
import UsdtIcon from "../../assets/usdt.png";
import { GiSwipeCard, GiWhiteBook } from "react-icons/gi";
import { FaSquare } from "react-icons/fa";
import CopyCopmponent from "../../components/CopyCopmponent";
import { recharge, userDetail } from "../../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import AlertCopmponent from "../../components/AlertComponent";

export default function Recharge() {
  const { userInfo, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("E-Wallet");
  const [activeTab2, setActiveTab2] = useState("LuckyPay-APP");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyPopup, setCopyPopup] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertsuccess, setAlertsuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const tabs = [
    { label: "E-Wallet", Icons: EWalletIcon },
    { label: "Paytm x QR", Icons: PaytmIcon },
    { label: "UPI x QR", Icons: UpiIcon },
    // { label: "USDT", Icons: UsdtIcon },
  ];

  const handleSubmit = async () => {
    const type = "UPI";
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("type", type);

    if (activeTab === "UPI x QR" || activeTab === "Paytm x QR") {
      dispatch(recharge(formData)).then((res) => {
        setSuccessMessage(res.payload.message);
        if (res.payload.status) {
          setAlertsuccess(true);

          navigate("/pay");
        } else {
          setAlerts(true);
        }
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      });
    } else {
      const url = `https://pay.codehello.site/Daman2_sgpay.php?user=${userInfo?.phone_user}&amount=${amount}`;
      window.open(url, "_blank");
    }
  };
  const handleSubmitUSDT = async () => {
    const type = "USDT";
    const formData = new FormData();
    formData.append("amount", amount * 92);
    formData.append("type", type);
    dispatch(recharge(formData)).then((res) => {
      setSuccessMessage(res.payload.message);
      if (res.payload.status) {
        setAlertsuccess(true);
        navigate("/wallet/Recharge/usdt");
      } else {
        setAlerts(true);
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    });
  };

  const handleRefesh = () => {
    setCopyPopup(true);
    dispatch(userDetail());
    setTimeout(() => {
      setCopyPopup(false);
    }, 1500);
  };
  useEffect(() => {
    dispatch(userDetail());
    setTimeout(() => {
      setAlerts(false);
      setAlertsuccess(false);
    }, 2000);
  }, [dispatch, userInfo?.length, successMessage, alerts, alertsuccess]);

  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0">
        <div className="container-section flex  items-center relative">
          <button className="absolute">
            <Link to={"/wallet"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
            Deposit
          </h1>
          <p className="absolute right-1">
            <Link className="fs-sm gray-50" to={"/wallet/RechargeHistory"}>
              Deposit history
            </Link>
          </p>
        </div>
      </div>

      <div className="container-section mt-5  text-white ">
        <div className="total-img p-4">
          <div className="flex items-center">
            <img src={Wallet} alt="" className="w-4 mr-2 mb-[2px]" />
            <p className="fs-sm">Balance</p>
          </div>
          <div className="flex items-center ms-2 mt-2">
            <h3 className="heaing-h3 text-xl font-bold">
              ₹{Number(userInfo?.money_user).toFixed(2)}
            </h3>
            <img
              src={RefereshImg}
              alt=""
              className="w-5 ms-2 mb-[2px]"
              onClick={handleRefesh}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 ">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`col-span-4 py-3 text-sm flex justify-center flex-col items-center rounded ${
                activeTab === tab.label ? "blue-linear" : "nav-bg gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab.label);
                setActiveIndex(0);
              }}
            >
              <img src={tab.Icons} alt="" className="w-10" />
              <span> {tab.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <>
            <div className="nav-bg  p-2 py-3 pb-5 rounded-lg">
              <h2 className="text-lg mb-2 flex items-center gray-50">
                <GiSwipeCard className="color-blue border-b border-blue-500 mr-2" />{" "}
                Select channel
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {channels.map(
                  (channel, i) =>
                    activeTab === channel.label && (
                      <Fragment key={i}>
                        {channel.channelItem.map((item, index) => (
                          <div
                            key={index}
                            className={` p-2 rounded-md cursor-pointer ${
                              index === activeIndex
                                ? "blue-linear"
                                : "bg-color-l"
                            } `}
                            onClick={() => {
                              setActiveTab2(item.label);
                              setActiveIndex(index);
                            }}
                          >
                            <p
                              className={` text-base  ${
                                activeTab2 === item.label ? "" : "gray-50"
                              }`}
                            >
                              {item.label}
                            </p>
                            <p
                              className={`text-base  ${
                                activeTab2 === item.label ? "" : " gray-50"
                              }`}
                            >
                              Balance: {item.balance}
                            </p>
                          </div>
                        ))}
                      </Fragment>
                    )
                )}
              </div>
            </div>
            {activeTab === "USDT" ? (
              <div className="nav-bg p-2 py-3 pb-5 mt-4 rounded-lg">
                <h2 className="text-lg mb-2 flex items-center gray-50">
                  <IoMdWallet className="color-blue text-lg mr-2" /> Select
                  amount of USDT
                </h2>
                <div className="grid grid-cols-12 gap-2">
                  {channels.map((channel, i) => (
                    <Fragment key={i}>
                      {channel.channelItem.map(
                        (item, index) =>
                          activeTab2 === item.label && (
                            <Fragment key={index}>
                              {item.depositAmount.map((data, index2) => (
                                <button
                                  key={index2}
                                  className="border color-blue border-[var(--bg-color-l)] col-span-4 p-2 rounded font-semibold flex items-center justify-center"
                                  onClick={() => setAmount(data.am)}
                                >
                                  <img
                                    src={USDt1Img}
                                    alt=""
                                    className="w-5 mr-2"
                                  />{" "}
                                  {data.am >= 1000
                                    ? `${data.am / 1000}k`
                                    : data.am}
                                </button>
                              ))}
                            </Fragment>
                          )
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="bg-body flex items-center px-5 py-1 rounded-lg mt-4">
                  <img src={USDt1Img} alt="" className="w-5" />

                  <input
                    type="number"
                    className="w-full  bg-body  p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[#ea8b12]"
                    placeholder="Please enter withdrawal amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="bg-body flex items-center px-5 py-1 rounded-lg mt-3">
                  <span className="color-blue text-lg font-bold">₹</span>
                  <input
                    type="number"
                    className="w-full  bg-body  p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[#ea8b12]"
                    placeholder="Please enter USDT amount"
                    value={Number(Number(amount) * 92).toFixed(2)}
                    onChange={(e) => setAmount(e.target)}
                  />
                </div>

                <button
                  className="blue-linear  w-full rounded-full p-2 mt-4"
                  disabled={loader ? true : false}
                  onClick={handleSubmitUSDT}
                >
                  Deposit
                </button>
              </div>
            ) : (
              <div className="nav-bg p-2 py-3 pb-5 mt-4 rounded-lg">
                <h2 className="text-lg mb-2 flex items-center gray-50">
                  <IoMdWallet className="color-blue text-lg mr-2" /> Deposit
                  amount
                </h2>
                <div className="grid grid-cols-12 gap-2">
                  {channels.map((channel, i) => (
                    <Fragment key={i}>
                      {channel.channelItem.map(
                        (item, index) =>
                          activeTab2 === item.label && (
                            <Fragment key={index}>
                              {item.depositAmount.map((data, index2) => (
                                <button
                                  key={index2}
                                  className="border color-blue border-[var(--bg-color-l)] col-span-4 p-2 rounded font-semibold"
                                  onClick={() => setAmount(data.am)}
                                >
                                  ₹{" "}
                                  {data.am >= 1000
                                    ? `${data.am / 1000}k`
                                    : data.am}
                                </button>
                              ))}
                            </Fragment>
                          )
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="bg-body flex items-center mt-4 px-5 py-1 rounded-full">
                  <span className="color-blue text-lg font-bold ">₹</span>{" "}
                  <span className="border-r border-[var(--bg-color-l)] ml-2 w-2 h-4"></span>
                  <input
                    type="number"
                    className="w-full  bg-body p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[#ea8b12]"
                    placeholder="Please enter the amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  className="blue-linear  w-full rounded-full p-2 mt-4"
                  disabled={loader ? true : false}
                  onClick={handleSubmit}
                >
                  Deposit
                </button>
              </div>
            )}
          </>
        </div>

        <div className="nav-bg mt-5 p-2 py-3 ">
          <h3 className="headinng-h3 flex gray-50 text-lg mb-2">
            <GiWhiteBook className="color-blue mt-[2px] mr-1 text-lg" />
            Recharge instructions
          </h3>
          <ul className="border border-[var(--bg-color-l)] p-3 rounded-lg">
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                If the transfer time is up, please fill out the deposit from
                again.
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                The transfer amount must match the order you created, otherwise
                the money cannot be credited successfully.
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                If you transfer the wrong amount, our company will not be
                responsible for the lost amount!
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                Note: do not cancel the depsot order after the money has bess
                transferred.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <CopyCopmponent copyPopup={copyPopup} message="Refesh successfully" />

      <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>
        <div className="text-sm">{successMessage}</div>
      </div>

      <AlertCopmponent alertPopup={alerts} message={successMessage} />
    </>
  );
}

const channels = [
  {
    label: "E-Wallet",
    channelItem: [
      {
        label: "LuckyPay-APP",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "RsPayINR",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },

          {
            am: 20000,
          },
          {
            am: 50000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "OoPay APP",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 20000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "TBIndia-INR",
        balance: "300 - 10K",
        depositAmount: [
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 2000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "FunPay - APP",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "Super-APPpay",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "HappyPayINR2app",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 2000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "HappyPayINR2-app",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 2000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "7days-APP",
        balance: "300 - 100K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
    ],
  },
  {
    label: "Paytm x QR",
    channelItem: [
      {
        label: "FunPay-Paytm x QR",
        balance: "300 - 100K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "LuckyINR-paytm",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 1000,
          },
          {
            am: 2000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 30000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "Super-Paytm x QR",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 5000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },
      {
        label: "7Days-Paytm x QR",
        balance: "300 - 100K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
    ],
  },
  {
    label: "UPI x QR",
    channelItem: [
      {
        label: "OoPay-upi",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "OSPayINR-upi",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "Funpay-UPI",
        balance: "300 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "HappyPayINR2-upi",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "7Days-UPI x QR",
        balance: "500 - 50K",
        depositAmount: [
          {
            am: 300,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
    ],
  },
  {
    label: "USDT",
    channelItem: [
      {
        label: "Upay USDT",
        balance: "10 - 100K",
        depositAmount: [
          {
            am: 10,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
    ],
  },
];
