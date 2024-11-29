import React, { useState, useEffect, useRef } from "react";
import "./lottery.css";
import { IoIosArrowBack } from "react-icons/io";
import WingoImg from "../../../assets/wingo.png";
import k3Img from "../../../assets/k3.png";
import FivedImg from "../../../assets/fived.png";
import TrxImg from "../../../assets/trx.png";
import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from "../WinningInformation";

const Lottery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="container-section">
        <div className="lottery--page-section">
          <button
            className="rounded-3xl border-2 p-1 mt-2 px-3"
            onClick={() =>
              navigate(`/`, {
                state: location.pathname,
              })
            }
          >
            <IoIosArrowBack />
          </button>

          <div className="lottery-banner-section mt-2">
            <div className="insite-banner ">
              <div className="flex ">
                <div className="h-4 w-[3px] mr-2 rounded-md bg-orange-400 mt-1"></div>
                <div>
                  <h3 className="heading-h3 text-white">WIN GO Long</h3>
                  <p className="text-[12px] font-medium text-white">
                    The lottery results for five
                  </p>
                </div>
              </div>
              <button className="clickBtn bg-red-100 rounded-md text-red-600 text-[11px] p-1 px-2 font-medium">
                Enter {">>"}{" "}
              </button>
            </div>
          </div>

          <ul className="mt-5">
            <li
              className=" bg-light flex p-2 rounded-md relative"
              onClick={() => navigate("/WinGo")}
            >
              <img src={WingoImg} alt="" className="w-20" />
              <div className="ml-2">
                <h3 className="heading-h3">Win Go</h3>
                <h5 className="heading-h5">Guess Number</h5>
                <p className="text-font mt-1">Green Red/Voilet to win</p>
              </div>
              <span className="gobtn">Go {">>"}</span>
            </li>
            <li
              className="lottery-item mt-2 bg-light flex p-2 rounded-md relative"
              onClick={() => navigate("/k3")}
            >
              <img src={k3Img} alt="" className="w-20" />
              <div className="ml-2">
                <h3 className="heading-h3">K3</h3>
                <h5 className="heading-h5">Guess Number</h5>
                <p className="text-font mt-1">Green Red/Voilet to win</p>
              </div>
              <span className="gobtn">Go {">>"}</span>
            </li>
            <li
              className="lottery-item mt-2 bg-light flex p-2 rounded-md relative"
              onClick={() => navigate("/5d")}
            >
              <img src={FivedImg} alt="" className="w-20" />
              <div className="ml-2">
                <h3 className="heading-h3">5D</h3>
                <h5 className="heading-h5">Guess Number</h5>
                <p className="text-font mt-1">Big/Small Odd/Even</p>
              </div>
              <span className="gobtn">Go {">>"}</span>
            </li>
            {/* <li className='lottery-item mt-2 bg-light flex p-2 rounded-md relative' onClick={()=>navigate("/trx")}>
              <img src={TrxImg} alt="" className='w-20' />
              <div className='ml-2'>
                <h3 className="heading-h3">Trx Win Go</h3>
                <h5 className="heading-h5">Guess Number</h5>
                <p className='text-font mt-1'>Green/Red/Violet to win</p>
              </div>
              <span className='gobtn'>
                Go {">>"}
              </span>
            </li> */}
          </ul>
          {/* winning information */}

          <WinningInformation />
        </div>
      </div>
    </>
  );
};

export default Lottery;
