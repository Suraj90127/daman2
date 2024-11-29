import React, { useEffect } from "react";
import "./activity.css";
import Layout from "../../layout/Layout";
import Logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

import Banner1 from "../../assets/banner/ban1.png";
import Banner3 from "../../assets/banner/ban3.png";
import Banner4 from "../../assets/banner/ban4.png";
import Banner5 from "../../assets/banner/ban5.png";
import Banner6 from "../../assets/banner/ban6.png";
import Banner7 from "../../assets/banner/ban7.png";
import Banner8 from "../../assets/banner/ban8.png";
import Banner9 from "../../assets/banner/ban9.png";
import Banner10 from "../../assets/banner/ban10.png";
import Banner2 from "../../assets/banner/ban2.jpg";
import Banner11 from "../../assets/banner/ban11.png";

const InvitationImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568176/invitationBonus_b20pwk.png";
const bettingImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568023/BettingRebate_uri4yc.png";
const SupperImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568282/superJackpot_f9hzox.png";
const MemberGiftImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568182/memberGift_ysdchn.png";

const GiftImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568264/signInBanner_x7bj2j.png";
const AttendanceImg =
  "https://res.cloudinary.com/dx1fouxno/image/upload/v1726568061/giftRedeem_q2o8kt.png";

const Activity = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Layout>
      <div className="flex justify-center  blue-linear">
        <img src="/logo1.png" alt="" className="w-36" />
      </div>

      {!userInfo && <Loader />}
      <div className="blue-linear p-3 text-white">
        <h3 className="heading-h3 font-medium mb-1">Activity</h3>
        <p className="fs-sm">Please remember to follow the event page</p>
        <p className="fs-sm">
          We will launch user feedback activities from to time
        </p>
      </div>
      <div className="container-section mt-3">
        <div className="flex justify-between items-center mx-4">
          <div
            className=" flex flex-col justify-center items-center"
            onClick={() => navigate("/main/InvitationBonus")}
          >
            <img src={InvitationImg} alt="" className="w-10" />
            <p className="fs-sm gray-100 text-center leading-3 mt-2">
              Invitation <br /> bonus
            </p>
          </div>
          <div
            className=" flex flex-col justify-center items-center"
            onClick={() => navigate("/main/Laundry")}
          >
            <img src={bettingImg} alt="" className="w-10" />
            <p className="fs-sm gray-100 text-center leading-3 mt-2">
              Betting <br /> rebate
            </p>
          </div>
          <div
            className=" flex flex-col justify-center items-center"
            onClick={() => navigate("/main/SuperJackpot")}
          >
            <img src={SupperImg} alt="" className="w-10" />
            <p className="fs-sm gray-100 text-center leading-3 mt-2">
              Super
              <br />
              Jackpot
            </p>
          </div>
          {/* <div
            className=" flex flex-col justify-center items-center"
            onClick={() => navigate("/activity/MemberPackage")}
          >
            <img src={MemberGiftImg} alt="" className="w-10" />
            <p className="fs-sm gray-100 text-center leading-3 mt-2">
              New member <br />
              gift package
            </p>
          </div> */}
        </div>

        <div className="grid grid-cols-12 gap-3 mt-5">
          <div
            className="col-span-6 nav-bg"
            onClick={() => navigate("/main/RedeemGift")}
          >
            <img src={GiftImg} alt="" />
            <div className="p-2 mb-3">
              <h3 className="heading-h3  mb-1">Gift</h3>
              <p className="gray-100  fs-sm">
                Enter the redemption code to recieve gift rewards
              </p>
            </div>
          </div>
          <div
            className="col-span-6 nav-bg"
            onClick={() => navigate("/activity/DailySignIn")}
          >
            <img src={AttendanceImg} alt="" />
            <div className="p-2 mb-3">
              <h3 className="heading-h3 text-black mb-1">Attendance bonus</h3>
              <p className="gray-100  fs-sm">
                The more consecutive days you sign in, the higher the reward
                will be.
              </p>
            </div>
          </div>
        </div>

        <div
          className="nav-bg mt-3 rounded-xl"
          onClick={() => navigate("/activity/FirstDeposit?id=1")}
        >
          <img src={Banner1} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            {" "}
            First Deposit Bonus
          </h3>
        </div>
        {/* <div
          className="nav-bg mt-3 rounded-xl"
          onClick={() => navigate("/activity/ActivityDetail?id=2")}
        >
          <img src={Banner3} alt="" className="rounded-t-xl w-full" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            {" "}
            Wingo Win Streak Bonus
          </h3>
        </div> */}
        {/* <div
          className="nav-bg mt-3 rounded-xl"
          onClick={() => navigate("/activity/ActivityDetail?id=3")}
        >
          <img src={Banner3} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Member Activities Winning Streak
          </h3>
        </div> */}
        {/* <div
          className="nav-bg mt-3 rounded-xl"
         
        >
          <img src={Banner4} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            daman Creative Video
          </h3>
        </div> */}
        {/* <div
          className="nav-bg mt-3 rounded-xl"
    
        >
          <img src={Banner5} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Lucky "10" Days Of Interest
          </h3>
        </div> */}
        {/* <div
          className="nav-bg mt-3 rounded-xl"
        
        >
          <img src={Banner6} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Aviator Fly High & Win Big
          </h3>
        </div>
        <div
          className="nav-bg mt-3 rounded-xl"
          // onClick={() => navigate("/activity/ActivityDetail?id=7")}
        >
          <img src={Banner7} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">Mysterious Gift</h3>
        </div>
        <div className="nav-bg mt-3 rounded-xl">
          <img src={Banner8} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Agent Gold Reward
          </h3>
        </div> */}

        <div
          className="nav-bg mt-3 rounded-xl"
          onClick={() => navigate("/activity/ActivityDetail?id=2")}
        >
          <img src={Banner10} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Wingo Win Streak Bonus
          </h3>
        </div>
        <div
          className="nav-bg mt-3 rounded-xl"
          onClick={() => navigate("/activity/ActivityDetail?id=3")}
        >
          <img src={Banner9} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Daman Game Youtube
          </h3>
        </div>
        {/* <div className="nav-bg mt-3 rounded-xl">
          <img src={Banner11} alt="" className="rounded-t-xl" />
          <h3 className="heading-h3 gray-100 font-bold p-2">
            Agent Gold Reward
          </h3>
        </div> */}
      </div>
    </Layout>
  );
};

export default Activity;
