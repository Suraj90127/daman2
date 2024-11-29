import connection from "../config/connectDB";
import jwt from 'jsonwebtoken'
import md5 from "md5";
// import e from "express";

const homePage = async (req, res) => {
    const [settings] = await connection.query('SELECT `app`,`message` FROM admin');
    let app = settings[0].app;
    let message = settings[0].message;
    let bonus = 0;
    let fist_time = 1;
    let user;
    let showPopUp = false
    let auth = req.cookies.auth;
    if (auth) {
        user = await connection.query('SELECT `bonus_gain`,`bonus` FROM users WHERE token = ?', [auth]);
        if (user && user[0].length) {
            showPopUp = true
            bonus = user[0][0].bonus;
            fist_time = user[0][0].bonus_gain;
        }
    }
    return res.render("home/index.ejs", { app, message, bonus, fist_time, auth, showPopUp });
}

const betrecordPage = async (req, res) => {
    return res.render("wallet/betrecordPage.ejs");
}

const slotjiliPage = async (req, res) => {
    return res.render("home/slot.ejs");
}
const lotteryPage = async (req, res) => {
    return res.render("home/lottery.ejs");
}
const casinoPage = async (req, res) => {
    return res.render("home/casino.ejs");
}
const fishingPage = async (req, res) => {
    return res.render("home/fishing.ejs");
}
const crashPage = async (req, res) => {
    return res.render("home/crash.ejs");
}
const rummyPage = async (req, res) => {
    return res.render("home/rummy.ejs");
}
const activityPage = async (req, res) => {
    return res.render("checkIn/activity.ejs");
}

const rebatePage = async (req, res) => {
    return res.render("checkIn/rebate.ejs");
}

const vipPage = async (req, res) => {
    return res.render("checkIn/vip.ejs");
}

const jackpotPage = async (req, res) => {
    return res.render("checkIn/jackpot.ejs");
}

const dailytaskPage = async (req, res) => {
    return res.render("checkIn/dailytask.ejs");
}

const invibonusPage = async (req, res) => {
    return res.render("checkIn/invibonus.ejs");
}

const checkInPage = async (req, res) => {
    return res.render("checkIn/checkIn.ejs");
}

const checkDes = async (req, res) => {
    return res.render("checkIn/checkDes.ejs");
}

const checkRecord = async (req, res) => {
    return res.render("checkIn/checkRecord.ejs");
}

const addBank = async (req, res) => {
    return res.render("wallet/addbank.ejs");
}

// promotion
const promotionPage = async (req, res) => {
    return res.render("promotion/promotion.ejs");
}

const promotion1Page = async (req, res) => {
    return res.render("promotion/promotion1.ejs");
}

const promotionmyTeamPage = async (req, res) => {
    return res.render("promotion/myTeam.ejs");
}

const promotionDesPage = async (req, res) => {
    return res.render("promotion/promotionDes.ejs");
}

const comhistoryPage = async (req, res) => {
    return res.render("promotion/comhistory.ejs");
}

const tutorialPage = async (req, res) => {
    return res.render("promotion/tutorial.ejs");
}

const bonusRecordPage = async (req, res) => {
    return res.render("promotion/bonusrecord.ejs");
}

// wallet


const transactionhistoryPage = async (req, res) => {
    return res.render("wallet/transactionhistory.ejs");
}


const walletPage = async (req, res) => {
    return res.render("wallet/index.ejs");
}

const rechargePage = async (req, res) => {
    return res.render("wallet/recharge.ejs", {
        MinimumMoney: process.env.MINIMUM_MONEY
    });
}

const rechargerecordPage = async (req, res) => {
    return res.render("wallet/rechargerecord.ejs");
}
const downlinerechargePage = async (req, res) => {
    return res.render("wallet/downlinerecharge.ejs");
}



const withdrawalPage = async (req, res) => {
    return res.render("wallet/withdrawal.ejs");
}

const withdrawalrecordPage = async (req, res) => {
    return res.render("wallet/withdrawalrecord.ejs");
}
// const transfer = async (req, res) => {
//     return res.render("wallet/transfer.ejs");
// }

// member page
const mianPage = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `level` FROM users WHERE `token` = ? ', [auth]);
    const [settings] = await connection.query('SELECT `cskh` FROM admin');
    let cskh = settings[0].cskh;
    let level = user[0].level;
    return res.render("member/index.ejs", { level, cskh });
}
const aboutPage = async (req, res) => {
    return res.render("member/about/index.ejs");
}

const recordsalary = async (req, res) => {
    return res.render("member/about/recordsalary.ejs");
}

const privacyPolicy = async (req, res) => {
    return res.render("member/about/privacyPolicy.ejs");
}

const newtutorial = async (req, res) => {
    return res.render("member/newtutorial.ejs");
}

const forgot = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `time_otp` FROM users WHERE token = ? ', [auth]);
    let time = user[0].time_otp;
    return res.render("member/forgot.ejs", { time });
}

const redenvelopes = async (req, res) => {
    return res.render("member/redenvelopes.ejs");
}

const riskAgreement = async (req, res) => {
    return res.render("member/about/riskAgreement.ejs");
}

const myProfilePage = async (req, res) => {
    return res.render("member/myProfile.ejs");
}

const getSalaryRecord = async (req, res) => {
    const auth = req.cookies.auth;

    const [rows] = await connection.query(`SELECT * FROM users WHERE token = ?`, [auth]);
    let rowstr = rows[0];
    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,

        });
    }
    const [getPhone] = await connection.query(
        `SELECT * FROM salary WHERE phone = ? ORDER BY time DESC`,
        [rowstr.phone]
    );
    return res.status(200).json({
        message: 'Success',
        status: true,
        data: {

        },
        rows: getPhone,
    })
}
module.exports = {
    homePage,
    checkInPage,
    invibonusPage,
    rebatePage,
    jackpotPage,
    vipPage,
    activityPage,
    dailytaskPage,
    promotionPage,
    promotion1Page,
    walletPage,
    mianPage,
    myProfilePage,
    promotionmyTeamPage,
    promotionDesPage,
    comhistoryPage,
    tutorialPage,
    bonusRecordPage,
    rechargePage,
    rechargerecordPage,
    withdrawalPage,
    withdrawalrecordPage,
    aboutPage,
    privacyPolicy,
    riskAgreement,
    newtutorial,
    redenvelopes,
    forgot,
    checkDes,
    checkRecord,
    addBank,
    recordsalary,
    getSalaryRecord,
    crashPage,
    rummyPage,
    fishingPage,
    casinoPage,
    lotteryPage,
    slotjiliPage,
    downlinerechargePage,
    transactionhistoryPage,
    betrecordPage,
}