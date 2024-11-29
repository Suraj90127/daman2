import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Lottery from "./pages/home/lottery/Lottery";
import Original from "./pages/home/lottery/Original";
import Slots from "./pages/home/lottery/Slots";
import HotGames from "./pages/home/lottery/HotGames";
import Casino from "./pages/home/lottery/Casinos";
import DailyTasks from "./pages/activity/DailyTasks";
import Activity from "./pages/activity/Activity";
import Record from "./pages/activity/Record";
import InvitaionBonus from "./pages/main/InvitaionBonus";
import Rule from "./pages/main/Rule";
import Navbar from "./layout/Navbar";
import Laundry from "./pages/activity/Laundry";
import Superjackpot from "./pages/activity/SuperJackpot";
import JackpotRule from "./pages/activity/JackpotRule";
import JackpotStar from "./pages/activity/JackpotStar";
import MemberPackage from "./pages/activity/MemberPackage";
import RedeemGift from "./pages/activity/RedeemGift";
import DailySignIn from "./pages/activity/DailySignIn";
import Promotion from "./pages/promotion/Promotion";
import TeamReport from "./pages/promotion/TeamReport";
import PromotionRule from "./pages/promotion/PromotionRule";
import Server from "./pages/promotion/Server";
import RebateRatio from "./pages/promotion/RebateRatio";
import Wallet from "./pages/wallet/Wallet";
import Recharge from "./pages/wallet/Recharge";
import Withdraw from "./pages/wallet/Withdraw";
import AddBankCard from "./pages/wallet/AddBankCard";
import Main from "./pages/main/Main";
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import Forgot from "./pages/account/Forgot";
import CustomerService from "./pages/main/CustomerService";
import StrongBox from "./pages/main/StrongBox";
import Notification from "./pages/home/Notification";
import GameStatistics from "./pages/main/GameStatistics";
import Language from "./pages/main/Language";

import "./i18n";
import SettingCenter from "./pages/main/SettingCenter";
import Feedback from "./pages/main/Feedback";
import Notifications from "./pages/main/Notifications";
import About from "./pages/main/about/About";
import ConfidentialityAgreement from "./pages/main/about/ConfidentialityAgreement";
import RiskDisclosureAgreement from "./pages/main/about/RiskDisclosureAgreement";
import ChangePassword from "./pages/account/ChangePassword";
import BindEmail from "./pages/account/BindEmail";
import Subordinate from "./pages/promotion/Subordinate";
import Wingo from "./pages/wingo/Wingo";
import K3 from "./pages/k3/K3";
import FiveD from "./pages/5D/FiveD";
import Trx from "./pages/wingo/Trx";
import BattingRecordWinGo from "./pages/wingo/BettingRecordWinGo";
import BattingRecordTrx from "./pages/wingo/BettingRecordTrx";
import CommissionDetails from "./pages/promotion/CommissionDetails";
import BetRecords from "./pages/main/BetRecords";
import TransAction from "./pages/wallet/TransAction";
import RechargeHistory from "./pages/wallet/RechargeHistory";
import WithdrawHistory from "./pages/wallet/WithdrawHistory";
import Vip from "./pages/vip/Vip";
import PaymentPage from "./pages/wallet/PaymentPage";
import { useDispatch, useSelector } from "react-redux";
import { getSession, userDetail } from "./store/reducer/authReducer";
import Avatar from "./pages/main/Avatar";
import InvitaionRecord from "./pages/main/InvitaionRecord";
import AttendanceHistory from "./pages/activity/AttendanceHistory";

// dashboard
import Sidebar from "./Dashboard/Layout/Sidebar";
import TopBar from "./Dashboard/Layout/Topbar";

import D from "./Dashboard/Pages/5D";
import Member from "./Dashboard/Members/Member";
import Agent from "./Dashboard/Agents/Agent";
import CreatedSalery from "./Dashboard/Pages/CreatedSalery";
import LevelSetting from "./Dashboard/Pages/LevelSetting";
import Loader from "./Dashboard/Pages/Loader";
import BusnesMange from "./Dashboard/Pages/BusnesMange";
import PendingRecharge from "./Dashboard/Pages/PendingRecharge";
import PendingWithdraws from "./Dashboard/Pages/PendingWithdraws";
import RechargeApproved from "./Dashboard/Pages/RechargeApproved";
import WithdrawalApproved from "./Dashboard/Pages/WithdrawalApproved";
import Turnover from "./Dashboard/Pages/Turnover";
import BettingHistory from "./Dashboard/Pages/BettingHistory";
import GiftCode from "./Dashboard/Pages/GiftCode";
import Setting from "./Dashboard/Pages/Setting";
import Profile from "./Dashboard/Members/Profile";
import AgentProfile from "./Dashboard/Agents/AgentProfile";
import TodayReport from "./Dashboard/Pages/TodayReport";
import BankUpi from "./Dashboard/Pages/BankUpi";
import Wingos from "./Dashboard/Pages/Wingo";
import K3s from "./Dashboard/Pages/K3";
import PrivateRoute from "./layout/PrivateRoute";
import axios from "axios";
import Login2 from "./pages/account/Login2";
import ActivityDetail from "./pages/activity/ActivityDetail";
import GameRules from "./pages/activity/GameRules";
import FirstDeposit from "./pages/activity/FirstDeposit";
import Beginner from "./pages/main/Beginner";
import TeamSubordinate2 from "./pages/promotion/TemaSubordinate2";
import ESport from "./pages/home/lottery/ESport";
import Chess from "./pages/home/lottery/Chess";
import Fishing from "./pages/home/lottery/Fishing";
import AllOnlineGames from "./pages/home/AllOnlineGames";
import MainLoader from "./components/MainLoader";
import PromotionLink from "./pages/promotion/PromotionLink";

function AppComponent() {
  const [mainLoader, setMainloader] = useState(false);

  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight - 100,
  }); // Initial position
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [dragStarted, setDragStarted] = useState(false); // Track if dragging occurred
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset to ensure smooth dragging
  const navigate = useNavigate(); // For manual navigation in React Router
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Calculate new position
      let newX = clientX - offset.x;
      let newY = clientY - offset.y;

      // Ensure the new position stays within the viewport (boundaries)
      const maxX = window.innerWidth - 64; // 64 is the width of the image (adjust if needed)
      const maxY = window.innerHeight - 64; // 64 is the height of the image (adjust if needed)

      newX = Math.max(0, Math.min(newX, maxX)); // Constrain X to be within [0, maxX]
      newY = Math.max(0, Math.min(newY, maxY)); // Constrain Y to be within [0, maxY]

      setPosition({ x: newX, y: newY });
      setDragStarted(true); // Mark dragging as started

      e.preventDefault(); // Prevent default behavior to stop scrolling
    };

    const handleStopDragging = () => {
      setDragging(false); // Stop dragging when mouse/touch ends
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleStopDragging);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleStopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleStopDragging);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleStopDragging);
    };
  }, [dragging, offset]);

  const handleStartDragging = (e) => {
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    setOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });

    setDragging(true);
    setDragStarted(false); // Reset drag started state when dragging starts
  };

  // Handle link click based on whether dragging occurred
  const handleClick = (e) => {
    if (dragStarted) {
      e.preventDefault(); // Prevent navigation if the user dragged
    } else {
      navigate("/main/CustomerService"); // Navigate on normal click
    }
  };

  // zoom app
  useEffect(() => {
    // Set viewport meta tag dynamically
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    const handleTouch = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "+" || event.key === "-")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouch, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(userDetail());
  }, [dispatch]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMinimize = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  const handleOutsideClick = (e) => {
    if (
      isSidebarOpen &&
      !e.target.closest(".sidebar") &&
      !e.target.closest(".topbar-button")
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Simulate loading data for 1 second (1000ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");

  useEffect(() => {
    // Function to handle when the page has fully loaded
    const handleLoad = () => {
      console.log("Loading complete.");
      setMainloader(false);
    };

    if (performance.getEntriesByType("navigation")[0].type === "navigate") {
      console.log("Loading started in a new tab...");
      setMainloader(true);
      setTimeout(() => {
        setMainloader(false);
      }, 1000);
      window.addEventListener("load", handleLoad);
    } else {
      setMainloader(false);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // zoom app
  useEffect(() => {
    // Set viewport meta tag dynamically
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(meta);

    const handleTouch = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "+" || event.key === "-")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouch, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <>
      <div className={`body ${isDashboard ? "dashboard" : "gamesection"}`}>
        {!isDashboard && (
          <>
            <div className="root-main">
              {mainLoader && <MainLoader />}
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/home/Lottery" element={<Lottery />} />
                <Route path="/home/Original" element={<Original />} />
                <Route path="/home/Slots" element={<Slots />} />
                <Route path="/home/HotGames" element={<HotGames />} />
                <Route path="/home/Casino" element={<Casino />} />

                <Route path="/home/eSports" element={<ESport />} />
                <Route path="/home/Chess" element={<Chess />} />
                <Route path="/home/Fishing" element={<Fishing />} />
                {/* private route */}
                <Route path="/" element={<PrivateRoute />}>
                  <Route
                    path="home/AllOnlineGames"
                    element={<AllOnlineGames />}
                  />

                  <Route path="home/Messages" element={<Notification />} />
                  {/* Other routes */}
                  {/* activity */}
                  <Route path="activity" element={<Activity />} />
                  <Route path="activity/DailyTasks" element={<DailyTasks />} />
                  <Route
                    path="activity/DailyTasks/Record"
                    element={<Record />}
                  />
                  <Route
                    path="activity/DailyTasks/Record"
                    element={<Record />}
                  />
                  <Route path="main/SuperJackpot" element={<Superjackpot />} />
                  <Route
                    path="main/SuperJackpot/rule"
                    element={<JackpotRule />}
                  />
                  <Route
                    path="main/SuperJackpot/star"
                    element={<JackpotStar />}
                  />
                  <Route path="main/RedeemGift" element={<RedeemGift />} />
                  <Route
                    path="activity/DailySignIn"
                    element={<DailySignIn />}
                  />
                  <Route
                    path="activity/MemberPackage"
                    element={<MemberPackage />}
                  />
                  <Route
                    path="main/InvitationBonus/record"
                    element={<InvitaionRecord />}
                  />
                  <Route
                    path="activity/DailySignIn/record"
                    element={<AttendanceHistory />}
                  />
                  <Route
                    path="activity/ActivityDetail"
                    element={<ActivityDetail />}
                  />
                  <Route
                    path="activity/DailySignIn/Rules"
                    element={<GameRules />}
                  />
                  <Route
                    path="activity/FirstDeposit"
                    element={<FirstDeposit />}
                  />

                  {/* main */}

                  <Route path="main" element={<Main />} />
                  <Route
                    path="main/InvitationBonus"
                    element={<InvitaionBonus />}
                  />
                  <Route path="main/InvitationBonus/Rule" element={<Rule />} />
                  <Route path="main/Laundry" element={<Laundry />} />
                  <Route
                    path="main/CustomerService"
                    element={<CustomerService />}
                  />
                  <Route path="main/StrongBox" element={<StrongBox />} />
                  <Route path="main/GameStats" element={<GameStatistics />} />
                  <Route path="main/Language" element={<Language />} />
                  <Route
                    path="main/SettingCenter"
                    element={<SettingCenter />}
                  />
                  <Route path="main/Feedback" element={<Feedback />} />
                  <Route path="main/Notification" element={<Notifications />} />
                  <Route path="main/About" element={<About />} />
                  <Route
                    path="main/About/AboutDetail"
                    element={<ConfidentialityAgreement />}
                  />
                  <Route
                    path="main/About/RiskDisclosure"
                    element={<RiskDisclosureAgreement />}
                  />
                  <Route path="main/BetRecors" element={<BetRecords />} />
                  <Route path="main/avatar" element={<Avatar />} />
                  <Route path="main/Guide" element={<Beginner />} />

                  <Route path="wallet/TransAction" element={<TransAction />} />

                  <Route path="vip" element={<Vip />} />

                  {/* promotion */}
                  <Route path="promotion" element={<Promotion />} />
                  <Route path="promotion/TeamReport" element={<TeamReport />} />
                  <Route
                    path="promotion/PromotionRule"
                    element={<PromotionRule />}
                  />
                  <Route path="promotion/Server" element={<Server />} />
                  <Route
                    path="promotion/RebateRatio"
                    element={<RebateRatio />}
                  />
                  <Route
                    path="promotion/Subordinate"
                    element={<Subordinate />}
                  />
                  <Route
                    path="promotion/MyCommission"
                    element={<CommissionDetails />}
                  />
                  <Route
                    path="promotion/TeamSubrodinate"
                    element={<TeamSubordinate2 />}
                  />
                  <Route
                    path="promotion/PromotionShare"
                    element={<PromotionLink />}
                  />

                  {/* wallet */}
                  <Route path="wallet" element={<Wallet />} />
                  <Route path="wallet/Recharge" element={<Recharge />} />
                  <Route path="wallet/Withdraw" element={<Withdraw />} />
                  <Route
                    path="wallet/Withdraw/AddBankCard"
                    element={<AddBankCard />}
                  />
                  <Route
                    path="wallet/RechargeHistory"
                    element={<RechargeHistory />}
                  />
                  <Route
                    path="wallet/WithdrawalHistory"
                    element={<WithdrawHistory />}
                  />
                  <Route path="pay" element={<PaymentPage />} />

                  <Route
                    path="main/SettingCenter/changePassword"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="main/SettingCenter/BindEmail"
                    element={<BindEmail />}
                  />

                  {/* wingo  */}
                  <Route path="WinGo" element={<Wingo />} />
                  <Route
                    path="BattingRecordWinGo"
                    element={<BattingRecordWinGo />}
                  />
                  <Route path="k3" element={<K3 />} />
                  <Route path="5d" element={<FiveD />} />
                  <Route path="trx" element={<Trx />} />
                  <Route
                    path="BattingRecordTrx"
                    element={<BattingRecordTrx />}
                  />
                </Route>

                {/* account */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} />

                <Route path="/admin/login" element={<Login2 />} />
              </Routes>
            </div>
          </>
        )}

        {/* admin dashboard */}

        {isDashboard && (
          <div className="bg-body">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex relative" onClick={handleOutsideClick}>
                <Sidebar
                  isOpen={isSidebarOpen}
                  isMinimized={isSidebarMinimized}
                  toggleSidebar={toggleSidebar}
                  toggleMinimize={toggleMinimize}
                />
                <div
                  className={`flex flex-col h-[100vh] overflow-x-hidden overflow-y-auto w-full min-h-screen transition-all duration-300`}
                >
                  <TopBar
                    toggleSidebar={toggleSidebar}
                    toggleMinimize={toggleMinimize}
                    isSidebarMinimized={isSidebarMinimized}
                  />
                  <div className="p-4">
                    <Routes>
                      <Route path="/dashboard" element={<Wingos />} />
                      <Route path="/dashboard/5d" element={<D />} />
                      <Route path="/dashboard/k3" element={<K3s />} />
                      <Route path="/dashboard/members" element={<Member />} />
                      <Route path="/dashboard/profile" element={<Profile />} />
                      <Route path="/dashboard/agents" element={<Agent />} />
                      <Route
                        path="/dashboard/agentprofile"
                        element={<AgentProfile />}
                      />
                      <Route
                        path="/dashboard/salery"
                        element={<CreatedSalery />}
                      />
                      <Route
                        path="/dashboard/level"
                        element={<LevelSetting />}
                      />
                      <Route
                        path="/dashboard/business"
                        element={<BusnesMange />}
                      />
                      <Route
                        path="/dashboard/pendingRecharge"
                        element={<PendingRecharge />}
                      />
                      <Route
                        path="/dashboard/pendingWithdraws"
                        element={<PendingWithdraws />}
                      />
                      <Route
                        path="/dashboard/rechargeapproved"
                        element={<RechargeApproved />}
                      />
                      <Route
                        path="/dashboard/withdrawapproved"
                        element={<WithdrawalApproved />}
                      />
                      <Route
                        path="/dashboard/turnover"
                        element={<Turnover />}
                      />
                      <Route
                        path="/dashboard/bethistory"
                        element={<BettingHistory />}
                      />
                      <Route
                        path="/dashboard/giftcode"
                        element={<GiftCode />}
                      />
                      <Route path="/dashboard/setting" element={<Setting />} />
                      <Route
                        path="/dashboard/report"
                        element={<TodayReport />}
                      />
                      <Route path="/dashboard/bankupi" element={<BankUpi />} />
                    </Routes>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AppComponent;
