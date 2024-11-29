import React, { useEffect, useState } from "react";
import { recharge, rechargeGet } from "../../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import CopyCopmponent from "../../components/CopyCopmponent";
import AlertCopmponent from "../../components/AlertComponent";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
// import Googlepay from "../../assets/google-pay.png";
const PaymentPage = () => {
  const { rechargegetData } = useSelector((state) => state.auth);
  const [upi, setUpi] = useState("");
  const [usdt, setUsdt] = useState("");
  const [copyPopup, setCopyPopup] = useState(false);
  const [typeid, setTypeid] = useState("");
  const [utr, setUtr] = useState("");
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(false);
  const [alertsuccess, setAlertsuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [qrcode1, setQrcode1] = useState("");
  const [pay1, setPay1] = useState("");
  const dispatch = useDispatch();

  const copyToClipCode = () => {
    navigator.clipboard
      .writeText(upi)
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

  const handleSubmit = async () => {
    const type = "submit";

    if (utr.length > 10) {
      const formData = new FormData();
      formData.append("utr", utr);
      formData.append("typeid", rechargegetData?.id_order);
      formData.append("type", type);

      dispatch(recharge(formData)).then((res) => {
        setSuccessMessage(res.payload.message);

        if (res.payload.status) {
          setAlertsuccess(true);

          setTimeout(() => {
            navigate("/wallet/RechargeHistory");
          }, 1000);
        } else {
          setAlerts(true);
        }

        setTimeout(() => {
          setAlertsuccess("");
        }, 4000);
      });
    } else {
      alert("Please enter 12 digit utr number");
    }
  };

  useEffect(() => {
    dispatch(rechargeGet()).then((res) => {
      setUpi(res.payload.infoBank[0].stk);

      setQrcode1(res.payload.qrcode1);

      const upiLink = `upi://pay?pa=${encodeURIComponent(
        res.payload.infoBank[0].stk
      )}&pn=${encodeURIComponent("Merchant")}&am=${encodeURIComponent(
        rechargegetData?.money
      )}&cu=INR`;
      setPay1(upiLink);
    });
    setTypeid(rechargegetData?.id_order);
    setTimeout(() => {
      setAlerts(false);
      setAlertsuccess(false);
    }, 2000);
  }, [successMessage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [rechargegetData, typeid, qrcode1, utr, pay1]);

  console.log("typeid", typeid, rechargegetData);

  return (
    <div className=" h-[120vh]">
      <div className=" ">
        <div className="nav-bg p-1 py-3 sticky top-0">
          <div className="container-section flex  items-center relative">
            <button className="absolute">
              <Link to={"/wallet/Recharge"}>
                {" "}
                <IoIosArrowBack className="text-xl" />
              </Link>
            </button>
            <h1 className="heading-h1 gray-100 text-center flex justify-center items-center m-auto">
              Pay
            </h1>
          </div>
        </div>
        <div className="bgs-green mt-3 p-4">
          <div className="flex justify-between py-2">
            <div>
              <p className="text-base">2024-07-28 14:26</p>
              <p className="text-base">S20240728140742hSVBTruamqopwK3P1</p>
            </div>
            <p className="text-base font-bold">Time is up!</p>
          </div>
          <div className=" text-white py-4">
            <p className="text-3xl font-bold">
              ₹{rechargegetData?.money?.toFixed(2)}
              {/* {rechargegetData?.type == "UPI"
                ? `₹${rechargegetData?.money?.toFixed(2)}`
                : `$${(rechargegetData?.money / 92)?.toFixed(2)}`}{" "} */}
            </p>
          </div>
        </div>
        <div className=" my-4"></div>
        <div className="text-center mb-4">
          <p className="font-semibold">QR</p>
          <p className="text-sm text-gray-500">Scan Code To Pay</p>

          <img src={qrcode1} alt="QR Code" className="mx-auto my-2" />
          <p className="text-xs text-gray-500">
            Do not use same QR code to pay multiple times
          </p>
          {/* <p className="font-semibold mt-3">Pay with upi pay</p> */}
          {/* <Link to={pay1}>
              <img src={Googlepay} alt="QR Code" className="mx-auto my-2 w-28" />
            </Link> */}
        </div>
        <div className=" my-4 mt-5"></div>

        <div className="text-center mb-4">
          <p className="font-semibold">Copy Account To Pay</p>
          <div className="flex items-center justify-center mt-2">
            <input
              type="text"
              value={upi}
              readOnly
              className="bg-color-l gray-50 focus:outline-none rounded px-3 py-1 w-full max-w-xs"
            />
            <button
              className="ml-2 bgs-green px-3 py-1 rounded"
              onClick={copyToClipCode}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 mx-2">
          <input
            type="text"
            placeholder="input 12-digit here"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="bg-color-l gray-50 focus:outline-none rounded px-3 py-1 w-full max-w-xs"
          />
          <button
            className="ml-2 bgs-green text-white px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          if chip isn't added, input the UTR and click submit.
        </div>
        <div className=" my-4"></div>
        <div className="text-center text-xs text-gray-500">
          <p>Contact us</p>
          <p>
            1. please, contact us if you have any payment issue:
            icicibankcomplaintdeal@gmail.com
          </p>
          <p>
            2. Please select the payment method you need and make sure your
            phone has the corresponding wallet software installed.
          </p>
        </div>
      </div>
      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
      <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>
        <div className="text-sm">{successMessage}</div>
      </div>

      <AlertCopmponent alertPopup={alerts} message={successMessage} />
    </div>
  );
};

export default PaymentPage;
