import React, { useEffect, useState } from "react";
import "./promotion.css";
import Layout from "../../layout/Layout";
import {
  PiBookmarksSimpleFill,
  PiCopySimpleLight,
  PiNoteFill,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaUsers } from "react-icons/fa";
import { HiMiniCurrencyDollar, HiUsers } from "react-icons/hi2";
import {
  MdOutlineArrowForwardIos,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";

import CopyCodeImg from "../../assets/copyinvitationcode.png";
import SubordinateImg from "../../assets/subordinatedata.png";
import CommissionDetailImg from "../../assets/commisiondetail.png";
import InvitationRuleImg from "../../assets/invitationrule.png";
import CustomerServiceImg from "../../assets/customerserviceIcon.png";
import RebaterationImg from "../../assets/rebateratio.png";
import promotindataImg from "../../assets/promotiondeal.png";
import CopyCopmponent from "../../components/CopyCopmponent";
import { useDispatch, useSelector } from "react-redux";
import { promotions, totalCommission } from "../../store/reducer/authReducer";
import Loader from "../../components/Loader";
const Promotion = () => {
  const { promotionsData, totalCommissionData, userInfo } = useSelector(
    (state) => state.auth
  );
  console.log("promotionsData", promotionsData);
  const [copyPopup, setCopyPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = window.location.origin;
  const invitationLink = `${currentUrl}/#/register?r_code=${userInfo?.code}`;
  console.log("object", promotionsData);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(invitationLink)
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

  const copyToClipCode = () => {
    navigator.clipboard
      .writeText(userInfo?.code)
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
  //   const copyToClipboard = () => {
  //     navigator.clipboard
  //       .writeText(invitationLink)
  //       .then(() => {
  //         setCopyPopup(true);
  //         setTimeout(() => {
  //           setCopyPopup(false);
  //         }, 1500);
  //       })
  //       .catch((err) => {
  //         console.error("Failed to copy the text: ", err);
  //       });
  //   };
  useEffect(() => {
    dispatch(promotions());
    dispatch(totalCommission());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  return (
    <Layout>
      {/* this is promotion page design by maxify web solution and developed by Engineer Jitendra kumar */}
      <div className="nav-bg p-1 py-3 sticky top-0 z-30">
        <div className="container-section flex  items-center">
          {/* <button><Link to={"/activity"}>  <IoIosArrowBack className='text-xl' /></Link></button> */}
          <h3 className="heading-h3  text-center flex justify-center items-center m-auto">
            Agency
          </h3>
          <Link to="/promotion/Subordinate">
            <PiNoteFill className="color-blue text-2xl" />
          </Link>
        </div>
      </div>

      {!userInfo && <Loader />}

      <div className="promotion-banner">
        <div className="flex flex-col justify-center items-center">
          <h3 className="heading-h3 text-2xl text-white">
            {totalCommissionData?.yesterdayBalance?.toFixed(2)}
          </h3>
          <p className="text-sm bg-body color-blue rounded-full px-3  pb-[1px] flex items-center imgfilter justify-center text-center">
            Yesterday's total commission
          </p>
          <p className="fs-sm  text-white">
            Upgrade the level to increase commission income
          </p>

          <div className="promotion-member mt-2 flex items-center imgfilter nav-bg w-[100%] rounded-lg relative z-10">
            <div className="w-[50%]">
              <div className="bg-color-l flex items-center imgfilter p-1 rounded-tl-lg">
                <HiUsers className="color-blue text-2xl" />
                <p className="text-sm ms-2 font-normal">Direct subordinates</p>
              </div>

              <div className="flex  items-center justify-center flex-col text-center p-2">
                <div>
                  <h5 className="heading-h5 text-base">
                    {promotionsData?.level1_count
                      ? promotionsData?.level1_count
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">number of register</p>
                </div>
                <div>
                  <h5 className="heading-h5 text-green-600 text-base">
                    {promotionsData?.totalDepositCount
                      ? promotionsData?.totalDepositCount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">Deposit number</p>
                </div>
                <div>
                  <h5 className="heading-h5 color-yellow-200 text-base">
                    {promotionsData?.totalDepositAmount
                      ? promotionsData?.totalDepositAmount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">Deposit amount</p>
                </div>
                <div>
                  <h5 className="heading-h5 text-base">
                    {promotionsData?.firstDepositCount
                      ? promotionsData?.firstDepositCount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">
                    Number of people making first deposit
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[50%] border-l border-slate-800">
              <div className="bg-color-l flex items-center imgfilter p-1 rounded-tr-lg">
                <FaUsers className="color-blue text-2xl" />
                <p className="text-sm ms-2 font-normal">Team subordinates</p>
              </div>
              <div className="flex  items-center justify-center flex-col text-center p-2">
                <div>
                  <h5 className="heading-h5 text-base">
                    {promotionsData?.level2_to_level6count
                      ? promotionsData?.level2_to_level6count
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">number of register</p>
                </div>
                <div>
                  <h5 className="heading-h5 text-green-600 text-base">
                    {promotionsData?.level2_to_level6totalDepositCount
                      ? promotionsData?.level2_to_level6totalDepositCount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">Deposit number</p>
                </div>
                <div>
                  <h5 className="heading-h5 color-yellow-200 text-base">
                    {promotionsData?.level2_to_level6totalDepositAmount
                      ? promotionsData?.level2_to_level6totalDepositAmount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">Deposit amount</p>
                </div>
                <div>
                  <h5 className="heading-h5 text-base">
                    {promotionsData?.level2_to_level6firstDepositCount
                      ? promotionsData?.level2_to_level6firstDepositCount
                      : "0"}
                  </h5>
                  <p className="gray-100 fs-sm">
                    Number of people making first deposit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-section">
        <button
          className="blue-linear w-full p-2 text-lg font-bold my-2 rounded-full text-white"
          //   onClick={() => navigate("/promotion/PromotionShare")}
          onClick={copyToClipboard}
        >
          INVITAION LINK
        </button>

        <ul className="mt-3 promotsio">
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link className="flex justify-between items-center  ">
              <div className="flex items-center imgfilter">
                <img src={CopyCodeImg} alt="" className="w-7" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Copy invitation code
                </span>
              </div>
              <div
                className="flex items-center imgfilter"
                onClick={copyToClipCode}
              >
                <span className="text-sm gray-100 mr-2">{userInfo?.code}</span>
                <PiCopySimpleLight />
              </div>
            </Link>
          </li>
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link
              className="flex justify-between items-center "
              to={"/promotion/TeamReport"}
            >
              <div className="flex items-center imgfilter">
                <img src={SubordinateImg} alt="" className="w-7" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Subordinate data
                </span>
              </div>
              <div className="flex items-center imgfilter">
                <MdOutlineArrowForwardIos className="text-xl" />
              </div>
            </Link>
          </li>
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link
              className="flex justify-between items-center"
              to={"/promotion/MyCommission"}
            >
              <div className="flex items-center imgfilter">
                <img src={CommissionDetailImg} alt="" className="w-7" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Commission detail
                </span>
              </div>
              <div className="flex items-center imgfilter">
                <MdOutlineArrowForwardIos className="text-xl" />
              </div>
            </Link>
          </li>
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link
              className="flex justify-between items-center  "
              to={"/promotion/PromotionRule"}
            >
              <div className="flex items-center imgfilter">
                <img src={InvitationRuleImg} alt="" className="w-7 h-8" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Invitation rules
                </span>
              </div>
              <div className="flex items-center imgfilter">
                <MdOutlineArrowForwardIos className="text-xl" />
              </div>
            </Link>
          </li>
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link
              className="flex justify-between items-center  "
              to={"/main/CustomerService"}
            >
              <div className="flex items-center imgfilter">
                <img src={CustomerServiceImg} alt="" className="w-7" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Agent line customer service
                </span>
              </div>
              <div className="flex items-center imgfilter">
                <MdOutlineArrowForwardIos className="text-xl" />
              </div>
            </Link>
          </li>
          <li className="mt-2 nav-bg p-3 py-4 rounded-lg">
            <Link
              className="flex justify-between items-center  "
              to={"/promotion/RebateRatio"}
            >
              <div className="flex items-center imgfilter">
                <img src={RebaterationImg} alt="" className="w-7" />
                <span className="text-sm font-semibold gray-50 ms-2 font-sans">
                  Rebate ratio
                </span>
              </div>
              <div className="flex items-center imgfilter">
                <MdOutlineArrowForwardIos className="text-xl" />
              </div>
            </Link>
          </li>
        </ul>

        <div className="mt-2 nav-bg p-2 rounded-lg">
          <div className="flex items-center imgfilter">
            <img src={promotindataImg} alt="" className="w-7 mr-2" />
            <h5 className="heading-h5 text-base gray-50 font-sans">
              promotion data
            </h5>
          </div>

          <div className="flex justify-between mt-2">
            <div className="text-center w-[50%]">
              <h5 className="heading-h5  text-base gray-50">
                {totalCommissionData?.weekBalance?.toFixed(2)}
              </h5>
              <p className="fs-sm gray-100">This Week</p>
            </div>
            <div className="text-center  w-[50%] border-l border-slate-800">
              <h5 className="heading-h5 text-base gray-50">
                {totalCommissionData?.totalBalance?.toFixed(2)}
              </h5>
              <p className="fs-sm gray-100">Total commission</p>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <div className="text-center w-[50%]">
              <h5 className="heading-h5  text-base gray-50">
                {promotionsData?.level1Count}
              </h5>
              <p className="fs-sm gray-100">direct subordinate</p>
            </div>
            <div className="text-center  w-[50%] border-l border-slate-800 px-4">
              <h5 className="heading-h5 text-base gray-50">
                {promotionsData?.total_downline_count}
              </h5>
              <p className="fs-sm gray-100">
                Total number of subordinate in the team
              </p>
            </div>
          </div>
        </div>
      </div>
      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
    </Layout>
  );
};

export default Promotion;
