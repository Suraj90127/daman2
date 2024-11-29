import express from "express";
import accountController from "../controllers/accountController";
import homeController from "../controllers/homeController";
import winGoController from "../controllers/winGoController";
import userController from "../controllers/userController";
import bettingController from "../controllers/bettingController";
import jilliController from "../controllers/jilliController";
import middlewareController from "../controllers/middlewareController";
import adminController from "../controllers/adminController";
import dailyController from "../controllers/dailyController";
import k5Controller from "../controllers/k5Controller";
import k3Controller from "../controllers/k3Controller";
import paymentController from "../controllers/paymentController";
import { rateLimit } from "express-rate-limit";
import moment from "moment-timezone";

// Time zone for India
const indiaTimeZone = "Asia/Kolkata";

// Function to get current date and time in India time
function getCurrentDateInIndia() {
  const currentDateInIndia = moment()
    .tz(indiaTimeZone)
    .format("YYYY-MM-DD HH:mm:ss");
  return currentDateInIndia;
}

const multer = require("multer");
const upload = multer();

let router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

const allowedIps = [
  "154.80.91.199",
  "2401:4900:8845:bb3e:95b3:bbae:a338:6a5",
  "37.111.141.242",
];

router.get("/gettime_now", (req, res) => {
  const currentDate = getCurrentDateInIndia();
  res.json({
    message: "Current date and time in India",
    currentDate,
  });
});

const maintenanceMode = (req, res, next) => {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (allowedIps.includes(clientIp)) {
    // Allow access if IP is in the allowed list
    return next();
  }

  // Return a beautiful HTML page for maintenance mode
  res.status(503).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Maintenance Mode</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    text-align: center;
                }
                h1 {
                    font-size: 3em;
                    margin-bottom: 0.5em;
                }
                p {
                    font-size: 1.2em;
                }
                .logo {
                    width: 100px;
                    height: auto;
                    margin-bottom: 1em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://img.lovepik.com/free-png/20211215/lovepik-child-asleep-waiting-for-a-gift-png-image_401649100_wh1200.png" alt="Logo" class="logo">
                <h1>We're currently undergoing maintenance</h1>
                <p>Our site is currently being updated. We'll be back online shortly. Thank you for your patience!</p>
            </div>
        </body>
        </html>
    `);
};

const initWebRouter = (app) => {
  //app.use(maintenanceMode);
  // page account
  router.get("/keFuMenu", accountController.keFuMenu);
  router.get("/admin/login", accountController.login2Page);

  router.post("/api/sent/otp/verify", accountController.verifyCode);
  router.post("/api/sent/otp/verify/reset", accountController.verifyCodePass);
  router.post("/api/resetPasword", accountController.forGotPassword);

  // router.get('/salery_send', homeController.salerySend);
  router.post("/api/sent/otp/verify1", accountController.verifyCodeforregister);
  router.post("/api/addutr", userController.addutr);

  router.get("/aviator", userController.aviator);
  router.get(
    "/add_data_in_user",
    userController.updateDirectAndTeamSubordinates
  );

  // page home
  // router.get('/', (req, res) => {
  //     return res.redirect('/#');
  // });

  router.get("/checkDes", middlewareController, homeController.checkDes);
  router.get("/checkRecord", middlewareController, homeController.checkRecord);
  // router.get('/wallet/transfer', middlewareController, homeController.transfer);
  router.get(
    "/api/webapi/commissiondata",
    middlewareController,
    userController.commissiondata
  );

  router.get(
    "/api/webapi/downlinerecharge/list",
    middlewareController,
    userController.downlinerecharge
  );
  router.post(
    "/api/webapi/downlinerecharge-data/list-data",
    middlewareController,
    userController.downlinerecharge_data
  );

  router.post(
    "/api/webapi/downlinerecharge-data/list-data-new",

    userController.downlinerecharge_data_new
  );

  router.get(
    "/api/webapi/subordinatedata",
    middlewareController,
    userController.subordinatedata
  );
  router.get("/api/webapi/get-Notification", adminController.getNotification);
  router.get(
    "/api/webapi/vip-level",
    middlewareController,
    userController.vipLevel
  );
  router.post(
    "/api/webapi/email-otp",
    middlewareController,
    accountController.sendOTPOnEmail
  );
  router.post(
    "/api/webapi/email",
    middlewareController,
    accountController.submitEmail
  );
  router.post("/api/webapi/login-email", accountController.loginEmail);
  router.post("/api/webapi/login-admin", accountController.loginAdmin);

  router.get("/wallet", middlewareController, homeController.walletPage);
  router.get(
    "/wallet/recharge",
    middlewareController,
    homeController.rechargePage
  );
  router.get(
    "/wallet/withdrawal",
    middlewareController,
    homeController.withdrawalPage
  );
  router.get(
    "/wallet/rechargerecord",
    middlewareController,
    homeController.rechargerecordPage
  );
  router.get(
    "/wallet/withdrawalrecord",
    middlewareController,
    homeController.withdrawalrecordPage
  );
  router.get("/wallet/addBank", middlewareController, homeController.addBank);
  router.get(
    "/wallet/downlinerecharge",
    middlewareController,
    homeController.downlinerechargePage
  );
  router.get(
    "/wallet/transactionhistory",
    middlewareController,
    homeController.transactionhistoryPage
  );

  router.get(
    "/wallet/paynow/manual_upi",
    middlewareController,
    paymentController.initiateManualUPIPayment
  );
  router.get(
    "/wallet/paynow/manual_usdt",
    middlewareController,
    paymentController.initiateManualUSDTPayment
  );
  router.post(
    "/wallet/paynow/manual_upi_request",
    middlewareController,
    paymentController.addManualUPIPaymentRequest
  );
  router.post(
    "/wallet/paynow/manual_usdt_request",
    middlewareController,
    paymentController.addManualUSDTPaymentRequest
  );
  router.post(
    "/wallet/paynow/wowpay",
    middlewareController,
    paymentController.initiateWowPayPayment
  );
  router.post(
    "/wallet/verify/wowpay",
    middlewareController,
    paymentController.verifyWowPayPayment
  );
  router.get(
    "/wallet/verify/wowpay",
    middlewareController,
    paymentController.verifyWowPayPayment
  );
  router.post(
    "/wallet/paynow/upi",
    middlewareController,
    paymentController.initiateUPIPayment
  );
  router.post(
    "/wallet/paynow/verify-sunpay",
    limiter,
    paymentController.verifySunpayPayment
  );
  router.post(
    "/wallet/paynow/sunpay",
    middlewareController,
    paymentController.initiateSunpayPayment
  );
  router.get(
    "/wallet/verify/upi",
    middlewareController,
    paymentController.verifyUPIPayment
  );

  router.get("/mian", middlewareController, homeController.mianPage);

  router.get(
    "/recordsalary",
    middlewareController,
    homeController.recordsalary
  );
  router.get(
    "/getrecord",
    middlewareController,
    homeController.getSalaryRecord
  );
  router.get("/about", middlewareController, homeController.aboutPage);
  router.get(
    "/redenvelopes",
    middlewareController,
    homeController.redenvelopes
  );
  router.get("/mian/forgot", middlewareController, homeController.forgot);
  router.get("/newtutorial", homeController.newtutorial);
  router.get(
    "/about/privacyPolicy",
    middlewareController,
    homeController.privacyPolicy
  );
  router.get(
    "/about/riskAgreement",
    middlewareController,
    homeController.riskAgreement
  );

  router.get("/myProfile", middlewareController, homeController.myProfilePage);

  // BET wingo
  router.get("/win", middlewareController, winGoController.winGoPage);
  router.get("/win/3", middlewareController, winGoController.winGoPage3);
  router.get("/win/5", middlewareController, winGoController.winGoPage5);
  router.get("/win/10", middlewareController, winGoController.winGoPage10);

  // BET trx
  router.get("/trx", middlewareController, winGoController.trxPage);
  router.get("/trx/3", middlewareController, winGoController.trxPage3);
  router.get("/trx/5", middlewareController, winGoController.trxPage5);
  router.get("/trx/10", middlewareController, winGoController.trxPage10);

  // BET K5D
  router.get("/5d", middlewareController, k5Controller.K5DPage);
  router.post(
    "/api/webapi/action/5d/join",
    middlewareController,
    k5Controller.betK5D
  ); // register
  router.post(
    "/api/webapi/5d/GetNoaverageEmerdList",
    middlewareController,
    k5Controller.listOrderOld
  ); // register
  router.post(
    "/api/webapi/5d/GetMyEmerdList",
    middlewareController,
    k5Controller.GetMyEmerdList
  ); // register

  // BET K3
  router.get("/k3", middlewareController, k3Controller.K3Page);

  router.post(
    "/api/webapi/action/k3/join",
    middlewareController,
    k3Controller.betK3
  ); // register
  router.post(
    "/api/webapi/k3/GetNoaverageEmerdList",
    middlewareController,
    k3Controller.listOrderOld
  ); // register
  router.post(
    "/api/webapi/k3/GetMyEmerdList",
    middlewareController,
    k3Controller.GetMyEmerdList
  ); // register

  // login | register
  router.post("/api/webapi/login", accountController.login); // login
  router.post(
    "/api/webapi/notification",
    middlewareController,
    accountController.deleteLoginDetail
  ); // delete
  router.get(
    "/api/webapi/notification",
    middlewareController,
    accountController.getLoginDetail
  ); //show
  router.post("/api/webapi/register", accountController.register); // register
  router.get("/aviator", middlewareController, userController.aviator);
  router.get(
    "/api/webapi/GetUserInfo",
    middlewareController,
    userController.userInfo
  ); // get info account
  router.post(
    "/api/webapi/change/userInfo",
    middlewareController,
    userController.changeUser
  ); // get info account
  router.post(
    "/api/webapi/change/pass",
    middlewareController,
    userController.changePassword
  ); // get info account
  router.post(
    "/api/webapi/change/userPhoto",
    middlewareController,
    userController.changeUserPhoto
  ); // get info account

  router.post(
    "/api/webapi/rebateCreate",
    middlewareController,
    userController.rebateCreate
  ); // get info account
  router.get(
    "/api/webapi/getRebate",
    middlewareController,
    userController.getRebate
  ); // get info account

  // bet wingo
  router.post(
    "/api/webapi/action/join",
    middlewareController,
    winGoController.betWinGo
  ); // register
  router.post(
    "/api/webapi/GetNoaverageEmerdList",
    middlewareController,
    winGoController.listOrderOld
  ); // register
  router.post(
    "/api/webapi/GetMyEmerdList",
    middlewareController,
    winGoController.GetMyEmerdList
  ); // register

  router.get(
    "/api/webapi/totalcommission",
    middlewareController,
    userController.totalCommission
  ); // register
  // promotion
  router.get(
    "/api/webapi/promotion",
    middlewareController,
    userController.promotion
  ); // register
  router.get(
    "/api/webapi/totalcommission",
    middlewareController,
    userController.totalCommission
  ); // register
  router.get(
    "/api/webapi/transactionhistory",
    middlewareController,
    userController.transactionHistory
  ); // register
  router.post(
    "/api/webapi/checkIn",
    middlewareController,
    userController.checkInHandling
  ); // register
  router.get(
    "/api/webapi/check/Info",
    middlewareController,
    userController.infoUserBank
  ); // register
  router.post(
    "/api/webapi/addBank",
    middlewareController,
    userController.addBank
  ); // register
  router.post(
    "/api/webapi/otp",
    middlewareController,
    userController.verifyCode
  ); // register
  router.post(
    "/api/webapi/use/redenvelope",
    middlewareController,
    userController.useRedenvelope
  ); // register
  router.get(
    "/api/webapi/get/redenvelope",
    middlewareController,
    userController.getRedenvelope
  ); // register
  router.get(
    "/api/webapi/new-subordinate",
    middlewareController,
    userController.newSubordinateData
  ); // register
  router.get(
    "/api/webapi/calculateDownlineBonuses",
    middlewareController,
    userController.calculateDownlineBonuses
  );
  // wallet
  router.post(
    "/api/webapi/recharge",
    middlewareController,
    upload.none(),
    userController.recharge
  );
  router.post(
    "/api/webapi/cancel_recharge",
    middlewareController,
    userController.cancelRecharge
  ); // register
  router.post("/wowpay/create", middlewareController, userController.wowpay);
  router.post(
    "/api/webapi/confirm_recharge",
    middlewareController,
    userController.confirmRecharge
  );
  router.get(
    "/api/webapi/myTeam",
    middlewareController,
    userController.listMyTeam
  ); // register
  router.get(
    "/api/webapi/recharge/list",
    middlewareController,
    userController.listRecharge
  ); // register
  router.get(
    "/api/webapi/withdraw/list",
    middlewareController,
    userController.listWithdraw
  ); // register
  router.get(
    "/api/webapi/recharge/check",
    middlewareController,
    userController.recharge2
  ); // register
  router.post(
    "/api/webapi/withdrawal",
    middlewareController,
    userController.withdrawal3
  ); // register
  router.post(
    "/api/webapi/callback_bank",
    middlewareController,
    userController.callback_bank
  ); // register
  router.post(
    "/api/webapi/recharge/update",
    middlewareController,
    userController.updateRecharge
  ); // update recharge
  // router.post('/api/webapi/transfer', middlewareController, userController.transfer); // register
  // router.get('/api/webapi/transfer_history', middlewareController, userController.transferHistory); //
  router.get(
    "/api/webapi/confirm_recharge_usdt",
    middlewareController,
    userController.confirmUSDTRecharge
  ); //
  router.post(
    "/api/webapi/confirm_recharge_usdt",
    middlewareController,
    userController.confirmUSDTRecharge
  ); //

  router.post(
    "/api/webapi/search",
    middlewareController,
    userController.search
  ); // register

  // daily
  router.get(
    "/manager/index",
    dailyController.middlewareDailyController,
    dailyController.dailyPage
  );
  router.get(
    "/manager/listRecharge",
    dailyController.middlewareDailyController,
    dailyController.listRecharge
  );
  router.get(
    "/manager/listWithdraw",
    dailyController.middlewareDailyController,
    dailyController.listWithdraw
  );
  router.get(
    "/manager/members",
    dailyController.middlewareDailyController,
    dailyController.listMeber
  );
  router.get(
    "/manager/profileMember",
    dailyController.middlewareDailyController,
    dailyController.profileMember
  );
  router.get(
    "/manager/settings",
    dailyController.middlewareDailyController,
    dailyController.settingPage
  );
  router.get(
    "/manager/gifts",
    dailyController.middlewareDailyController,
    dailyController.giftPage
  );
  router.get(
    "/manager/support",
    dailyController.middlewareDailyController,
    dailyController.support
  );
  router.get(
    "/manager/member/info/:phone",
    dailyController.middlewareDailyController,
    dailyController.pageInfo
  );

  router.post(
    "/manager/member/info/:phone",
    dailyController.middlewareDailyController,
    dailyController.userInfo
  );
  router.post(
    "/manager/member/listRecharge/:phone",
    dailyController.middlewareDailyController,
    dailyController.listRechargeMem
  );
  router.post(
    "/manager/member/listWithdraw/:phone",
    dailyController.middlewareDailyController,
    dailyController.listWithdrawMem
  );
  router.post(
    "/manager/member/redenvelope/:phone",
    dailyController.middlewareDailyController,
    dailyController.listRedenvelope
  );
  router.post(
    "/manager/member/bet/:phone",
    dailyController.middlewareDailyController,
    dailyController.listBet
  );

  router.post(
    "/manager/settings/list",
    dailyController.middlewareDailyController,
    dailyController.settings
  );
  router.post(
    "/manager/createBonus",
    dailyController.middlewareDailyController,
    dailyController.createBonus
  );
  router.post(
    "/manager/listRedenvelops",
    dailyController.middlewareDailyController,
    dailyController.listRedenvelops
  );

  router.post(
    "/manager/listRecharge",
    dailyController.middlewareDailyController,
    dailyController.listRechargeP
  );
  router.post(
    "/manager/listWithdraw",
    dailyController.middlewareDailyController,
    dailyController.listWithdrawP
  );

  router.post(
    "/api/webapi/statistical",
    dailyController.middlewareDailyController,
    dailyController.statistical
  );
  router.post(
    "/manager/infoCtv",
    dailyController.middlewareDailyController,
    dailyController.infoCtv
  ); // get info account
  router.post(
    "/manager/infoCtv/select",
    dailyController.middlewareDailyController,
    dailyController.infoCtv2
  ); // get info account
  router.post(
    "/api/webapi/manager/listMember",
    dailyController.middlewareDailyController,
    dailyController.listMember
  ); // get info account

  router.post(
    "/api/webapi/manager/buff",
    dailyController.middlewareDailyController,
    dailyController.buffMoney
  ); // get info account

  // admin
  router.get(
    "/admin/manager/index",
    adminController.middlewareAdminController,
    adminController.adminPage
  ); // get info account
  router.get(
    "/admin/manager/index/3",
    adminController.middlewareAdminController,
    adminController.adminPage3
  ); // get info account
  router.get(
    "/admin/manager/index/5",
    adminController.middlewareAdminController,
    adminController.adminPage5
  ); // get info account
  router.get(
    "/admin/manager/index/10",
    adminController.middlewareAdminController,
    adminController.adminPage10
  ); // get info account

  // trx
  router.get(
    "/admin/manager/trx",
    adminController.middlewareAdminController,
    adminController.admintrxPage
  ); // get info account
  router.get(
    "/admin/manager/trx/3",
    adminController.middlewareAdminController,
    adminController.admintrxPage3
  ); // get info account
  router.get(
    "/admin/manager/trx/5",
    adminController.middlewareAdminController,
    adminController.admintrxPage5
  ); // get info account
  router.get(
    "/admin/manager/trx/10",
    adminController.middlewareAdminController,
    adminController.admintrxPage10
  ); // get info account

  router.get(
    "/admin/manager/5d",
    adminController.middlewareAdminController,
    adminController.adminPage5d
  ); // get info account
  router.get(
    "/admin/manager/k3",
    adminController.middlewareAdminController,
    adminController.adminPageK3
  ); // get info account

  router.get(
    "/admin/manager/members",
    adminController.middlewareAdminController,
    adminController.membersPage
  ); // get info account
  router.get(
    "/admin/manager/createBonus",
    adminController.middlewareAdminController,
    adminController.giftPage
  ); // get info account
  router.get(
    "/admin/manager/ctv",
    adminController.middlewareAdminController,
    adminController.ctvPage
  ); // get info account
  router.get(
    "/admin/manager/ctv/profile/:phone",
    adminController.middlewareAdminController,
    adminController.ctvProfilePage
  ); // get info account

  router.get(
    "/admin/manager/turnover",
    adminController.middlewareAdminController,
    adminController.turnover
  ); // get info account
  router.get(
    "/admin/manager/betting",
    adminController.middlewareAdminController,
    adminController.betting
  ); // get info account
  router.get(
    "/admin/manager/today_report",
    adminController.middlewareAdminController,
    adminController.todayreport
  ); // get info account
  router.post(
    "/admin/manager/settings/message",
    adminController.middlewareAdminController,
    adminController.settingMessage
  ); // get info account
  router.get(
    "/admin/manager/settings",
    adminController.middlewareAdminController,
    adminController.settings
  ); // get info account
  router.get(
    "/admin/manager/listRedenvelops",
    adminController.middlewareAdminController,
    adminController.listRedenvelops
  ); // get info account
  router.post(
    "/admin/manager/infoCtv",
    adminController.middlewareAdminController,
    adminController.infoCtv
  ); // get info account
  router.post(
    "/admin/manager/infoCtv/select",
    adminController.middlewareAdminController,
    adminController.infoCtv2
  ); // get info account
  router.post(
    "/admin/manager/settings/bank",
    adminController.middlewareAdminController,
    adminController.settingBank
  ); // get info account
  router.post(
    "/admin/manager/settings/cskh",
    adminController.middlewareAdminController,
    adminController.settingCskh
  ); // get info account
  router.post(
    "/admin/manager/settings/buff",
    adminController.middlewareAdminController,
    adminController.settingbuff
  ); // get info account
  router.post(
    "/admin/manager/settings/demo",
    adminController.middlewareAdminController,
    adminController.settingdemo
  );
  router.post(
    "/admin/hello/settings/demo",
    dailyController.middlewareDailyController,
    adminController.settingdemo
  );
  router.post(
    "/admin/manager/settings/need",
    adminController.middlewareAdminController,
    adminController.settingneed
  ); // get info account
  router.post(
    "/admin/manager/create/ctv",
    adminController.middlewareAdminController,
    adminController.register
  ); // get info account
  router.post(
    "/admin/manager/settings/get",
    adminController.middlewareAdminController,
    adminController.settingGet
  ); // get info account
  router.post(
    "/admin/manager/createBonus",
    adminController.middlewareAdminController,
    adminController.createBonus
  ); // get info account

  router.post(
    "/admin/member/listRecharge/:phone",
    adminController.middlewareAdminController,
    adminController.listRechargeMem
  );
  router.post(
    "/admin/member/listWithdraw/:phone",
    adminController.middlewareAdminController,
    adminController.listWithdrawMem
  );
  router.post(
    "/admin/member/redenvelope/:phone",
    adminController.middlewareAdminController,
    adminController.listRedenvelope
  );
  router.post(
    "/admin/member/bet/:phone",
    adminController.middlewareAdminController,
    adminController.listBet
  );

  router.get(
    "/admin/manager/export/todayrecharge",
    adminController.middlewareAdminController,
    adminController.todayrechargeexport
  ); // get info account
  router.get(
    "/admin/manager/recharge",
    adminController.middlewareAdminController,
    adminController.rechargePage
  ); // get info account
  router.get(
    "/admin/manager/withdraw",
    adminController.middlewareAdminController,
    adminController.withdraw
  ); // get info account
  // router.get('/admin/manager/level', adminController.middlewareAdminController, adminController.level); // get info account
  router.get(
    "/admin/manager/levelSetting",
    adminController.middlewareAdminController,
    adminController.levelSetting
  );
  router.get(
    "/admin/manager/CreatedSalaryRecord",
    adminController.middlewareAdminController,
    adminController.CreatedSalaryRecord
  );
  router.get(
    "/admin/manager/rechargeRecord",
    adminController.middlewareAdminController,
    adminController.rechargeRecord
  ); // get info account
  router.get(
    "/admin/manager/withdrawRecord",
    adminController.middlewareAdminController,
    adminController.withdrawRecord
  ); // get info account
  router.get(
    "/admin/manager/statistical",
    adminController.middlewareAdminController,
    adminController.statistical
  ); // get info account
  router.get(
    "/admin/member/info/:id",
    adminController.middlewareAdminController,
    adminController.infoMember
  );
  router.get(
    "/api/webapi/admin/getLevelInfo",
    adminController.middlewareAdminController,
    adminController.getLevelInfo
  );
  router.get(
    "/api/webapi/admin/getSalary",
    adminController.middlewareAdminController,
    adminController.getSalary
  );

  router.post(
    "/admin/member/editbank",
    adminController.middlewareAdminController,
    adminController.editbank
  );
  router.post(
    "/api/webapi/admin/updateLevel",
    adminController.middlewareAdminController,
    adminController.updateLevel
  ); // get info account
  router.post(
    "/api/webapi/admin/CreatedSalary",
    adminController.middlewareAdminController,
    adminController.CreatedSalary
  ); // get info account
  router.post(
    "/api/webapi/admin/listMember",
    adminController.middlewareAdminController,
    adminController.listMember
  ); // get info account
  router.post(
    "/api/webapi/admin/listctv",
    adminController.middlewareAdminController,
    adminController.listCTV
  ); // get info account
  router.post(
    "/api/webapi/admin/withdraw",
    adminController.middlewareAdminController,
    adminController.handlWithdraw
  ); // get info account
  router.post(
    "/api/webapi/admin/recharge",
    adminController.middlewareAdminController,
    adminController.recharge
  ); // get info account
  router.post(
    "/api/webapi/admin/rechargeDuyet",
    adminController.middlewareAdminController,
    adminController.rechargeDuyet
  ); // get info account
  router.post(
    "/api/webapi/admin/member/info",
    adminController.middlewareAdminController,
    adminController.userInfo
  ); // get info account
  router.post(
    "/api/webapi/admin/statistical",
    adminController.middlewareAdminController,
    adminController.statistical2
  ); // get info account

  router.post(
    "/api/webapi/admin/banned",
    adminController.middlewareAdminController,
    adminController.banned
  ); // get info account
  router.post(
    "/api/webapi/admin/turnover",
    adminController.middlewareAdminController,
    adminController.turnover_report
  ); // get info account
  router.post(
    "/api/webapi/admin/betting",
    adminController.middlewareAdminController,
    adminController.betting_report
  ); // get info account
  router.post(
    "/api/webapi/admin/todayreport",
    adminController.middlewareAdminController,
    adminController.today_report
  ); // get info account

  router.post(
    "/api/webapi/admin/totalJoin",
    adminController.middlewareAdminController,
    adminController.totalJoin
  ); // get info account
  router.post(
    "/api/webapi/admin/change",
    adminController.middlewareAdminController,
    adminController.changeAdmin
  ); // get info account
  router.post(
    "/api/webapi/admin/profileUser",
    adminController.middlewareAdminController,
    adminController.profileUser
  ); // get info account

  // admin 5d
  router.post(
    "/api/webapi/admin/5d/listOrders",
    adminController.middlewareAdminController,
    adminController.listOrderOld
  ); // get info account
  router.post(
    "/api/webapi/admin/k3/listOrders",
    adminController.middlewareAdminController,
    adminController.listOrderOldK3
  ); // get info account
  router.post(
    "/api/webapi/admin/5d/editResult",
    adminController.middlewareAdminController,
    adminController.editResult
  ); // get info account
  router.post(
    "/api/webapi/admin/k3/editResult",
    adminController.middlewareAdminController,
    adminController.editResult2
  ); // get info account
  // my admin code
  router.get(
    "/admin/manager/notification",
    adminController.middlewareAdminController,
    adminController.notificationPage
  ); // get info account
  router.get(
    "/admin/manager/usdt",
    adminController.middlewareAdminController,
    adminController.usdtPage
  ); // get info account

  router.post(
    "/api/webapi/admin/add-usdt",
    adminController.middlewareAdminController,
    adminController.addUSDT
  );

  router.post(
    "/api/webapi/admin/create-notification",
    adminController.middlewareAdminController,
    adminController.createNotification
  ); // get info account
  router.post(
    "/api/webapi/admin/delete-notification/:id",
    adminController.middlewareAdminController,
    adminController.singleNotificationDelete
  ); // get info account

  router.get(
    "/api/webapi/GetTopBettingboardGame/:app_id",
    middlewareController,
    bettingController.boardGame
  );
  router.get(
    "/api/webapi/GetJilliboardGame/:gameId",
    middlewareController,
    jilliController.boardGame
  );
  router.get(
    "/api/webapi/getboardGameInfo",
    middlewareController,
    jilliController.getboardGameInfo
  );
  router.get(
    "/api/webapi/transferMoneyToMainWallet",
    middlewareController,
    jilliController.transferMoneyToMainWallet
  );
  router.get(
    "/api/webapi/transferMoneyToMainWallet",
    middlewareController,
    jilliController.transferMoneyToMainWallet
  );

  return app.use("/", router);
};

module.exports = {
  initWebRouter,
};
