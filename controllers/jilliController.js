const crypto = require('crypto');
const request = require('request');
import connection from "../config/connectDB";
const moment = require('moment-timezone');

const getRechargeOrderId = () => {
    const date = new Date();
    let id_time = date.getUTCFullYear() + '' + date.getUTCMonth() + 1 + '' + date.getUTCDate();
    let id_order = Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) + 10000000000000;
    return id_time + id_order
}
function getCurrentTimeFormatted() {
    // const currentDate = new Date();
    // const utcMinus4Time = new Date(currentDate.getTime() - (4 * 60 * 60 * 1000)); // Adjust for UTC-4
    // const year = utcMinus4Time.getFullYear().toString().slice(-2); // Get last two digits of the year
    // const month = (utcMinus4Time.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
    // const day = utcMinus4Time.getDate().toString().padStart(2, '0'); // Day (01-31)
    // const formattedDate = year + month + day;
    let currentDate = moment().tz('America/Santo_Domingo');
    let formattedDate = currentDate.format('YYMMD');
    return formattedDate;
}

function generateKeyG(agentId, agentKey) {
    const now = getCurrentTimeFormatted();
    const hash = crypto.createHash('md5');
    hash.update(now + agentId + agentKey);
    return hash.digest('hex');
}

function generateValidationKey(paramsString, keyG) {
    const hash = crypto.createHash('md5');
    hash.update(paramsString + keyG);
    const md5string = hash.digest('hex');
    const randomText1 = "123456";
    const randomText2 = "abcdef";
    const key = randomText1 + md5string + randomText2;
    return key;
}
const agentId = "AVIFLUXTECH_INR";
const agentKey = "12fc1b14359e2750da564b30cfa54952cd1885e8";
const lang = 'en-US';
const api = `https://wb-api-2.k6749ktm.com/api1`

async function login(account, gameId, retryCount = 0) {
    const maxRetries = 3;
    const paramsString = `Account=${account}&GameId=${gameId}&Lang=${lang}&AgentId=${agentId}`;
    const keyG = generateKeyG(agentId, agentKey);
    const key = generateValidationKey(paramsString, keyG);
    const payload = {
        Account: account,
        GameId: gameId,
        Lang: lang,
        AgentId: agentId,
        Key: key
    };

    const apiUrl = `${api}/Login`;
    try {
        const response = await new Promise((resolve, reject) => {
            request.post({
                url: apiUrl,
                form: payload,
                followRedirect: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body });
                }
            });
        });

        if (response.response.statusCode === 200) {
            let responseBody;

            try {
                responseBody = JSON.parse(response.body);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                console.log(response.body);
            }
            if (responseBody && responseBody.ErrorCode === 14 && responseBody.Message === "User not exist or not enabled!") {
                if (retryCount < maxRetries) {
                    console.log("User does not exist or is not enabled. Creating member...");
                    await createMember(account);
                    console.log("Retrying login after member creation...");
                    return await login(account, gameId, retryCount + 1);
                } else {
                    console.log("Maximum retry attempts reached. Login failed.");
                    return {};
                }
            } else {
                return response.body;
            }
        } else if (response.response.statusCode === 302) {
            return {
                url: response.response.headers.location
            };
        } else {
            console.log("Login failed with status code: ", response.response.statusCode);
            console.log("Response body: ", response.body);
            return {};
        }
    } catch (error) {
        console.log("Error during login: ", error);
        return null;
    }
}
async function createMember(account) {
    const paramsString = `Account=${account}&AgentId=${agentId}`;
    const keyG = generateKeyG(agentId, agentKey);
    const key = generateValidationKey(paramsString, keyG);
    const payload = {
        Account: account,
        AgentId: agentId,
        Key: key
    };
    const apiUrl = `${api}/CreateMember`;

    try {
        const response = await new Promise((resolve, reject) => {
            request.post({ url: apiUrl, form: payload }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body });
                }
            });
        });
        return response.body;
    } catch (error) {
        console.log("Error creating member: ", error);
        throw error;
    }
}

async function exchangeTransferByAgentId(account, amount, TransferType, TransactionId) {
    const paramsString = `Account=${account}&TransactionId=${TransactionId}&Amount=${amount}&TransferType=${TransferType}&AgentId=${agentId}`;
    const keyG = generateKeyG(agentId, agentKey);
    const key = generateValidationKey(paramsString, keyG);
    const payload = {
        Account: account,
        TransactionId,
        Amount: amount,
        TransferType,
        AgentId: agentId,
        Key: key
    };
    const apiUrl = `${api}/ExchangeTransferByAgentId`;

    try {
        const response = await new Promise((resolve, reject) => {
            request.post({ url: apiUrl, form: payload }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body });
                }
            });
        });
        return JSON.parse(response.body);
    } catch (error) {
        console.log("Error creating member: ", error);
        throw error;
    }
}

function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
}

function timerJoin(params = '', addHours = 0) {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }

    date.setHours(date.getHours() + addHours);

    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    let ampm = date.getHours() < 12 ? "AM" : "PM";

    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());

    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

function roundDecimal(number, precision) {
    const multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
}

async function getMemberInfo(account) {
    const paramsString = `Accounts=${account}&AgentId=${agentId}`;
    const keyG = generateKeyG(agentId, agentKey);
    const key = generateValidationKey(paramsString, keyG);
    const payload = {
        Accounts: account,
        AgentId: agentId,
        Key: key
    };
    const apiUrl = `${api}/GetMemberInfo`;

    try {
        const response = await new Promise((resolve, reject) => {
            request.post({ url: apiUrl, form: payload }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body: JSON.parse(body) });
                }
            });
        });
        return response.body; //'{"ErrorCode":0,"Message":"","Data":[{"Account":"Testss0ssssa6","Balance":0,"Status":2}]}'
    } catch (error) {
        console.log("Error creating member: ", error);
        throw error;
    }
}

const boardGame = async (req, res) => {
    let auth = req.cookies.auth;
    let gameId = req.params.gameId;

    if (!auth) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }
    if (!gameId) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }
    gameId = parseInt(gameId)
    const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ? ', [auth]);

    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }
    const { id, password, ip, veri, ip_address, status, time, token, ...others } = rows[0];
    let username = `${others.id_user}${others.phone}`
    let response = await login(username, gameId);
    if (response && response.url && response.url.length) {
        let transactionId = getRechargeOrderId()
        let money = others.money.toFixed(4)
        const sql = `INSERT INTO withdrawgame SET 
                    id_order = ?,
                    phone = ?,
                    money = ?,
                    gameName=?,
                    status = ?,
                    today = ?,
                    time = ?`;
        let dates = new Date().getTime();
        let checkTime = timerJoin(dates);
        let { Data } = await exchangeTransferByAgentId(username, money, 2, transactionId);
        if (Data && Object.keys(Data)) {
            await connection.execute(sql, [transactionId, others.phone, money, 'jilli', Data.Status, checkTime, dates]);
            await connection.query('UPDATE users SET money = money - ? WHERE phone = ? ', [money, others.phone]);
        }
    }
    return res.status(200).json({
        message: 'Send SMS regularly.',
        status: true,
        data: response,
    });
}

const getboardGameInfo = async (req, res) => {
    let auth = req.cookies.auth;


    if (!auth) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }

    const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ? ', [auth]);

    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }
    const { id, password, ip, veri, ip_address, status, time, token, ...others } = rows[0];
    let username = `${others.id_user}${others.phone}`
    let response = await getMemberInfo(username);

    return res.status(200).json({
        message: 'Send SMS regularly.',
        status: true,
        data: response,
    });
}

const transferMoneyToMainWallet = async (req, res) => {
    let auth = req.cookies.auth;


    if (!auth) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }

    const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ? ', [auth]);

    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
        });
    }
    const { id, password, ip, veri, ip_address, status, time, token, ...others } = rows[0];
    let username = `${others.id_user}${others.phone}`
    let response = await getMemberInfo(username);
    if (response.Data && response.Data.length) {
        let data = response.Data[0]
        let transactionId = getRechargeOrderId()
        let aaa = await exchangeTransferByAgentId(username, data.Balance, 1, transactionId)
        let { Data } = aaa
        if (Data && Object.keys(Data)) {//Data: {TransactionId: '2024413166526384000408', CoinBefore: 525, CoinAfter: 0, CurrencyBefore: 525, CurrencyAfter: 0, …}
            const sql = `INSERT INTO rechargefromgame SET 
            transaction_id = ?,
            phone = ?,
            money = ?,
            type = ?,
            status = ?,
            today = ?,
            url = ?,
            time = ?`;
            let dates = new Date().getTime();
            let checkTime = timerJoin(dates);
            await connection.execute(sql, [transactionId, others.phone, data.Balance, 'jilli', Data.Status, checkTime, 111, dates]);
            await connection.query('UPDATE users SET money = money + ? WHERE phone = ? ', [data.Balance, others.phone]);
            return res.status(200).json({
                message: 'Send SMS regularly.',
                status: true,
                data: aaa,
            });
        }
        return res.status(200).json({
            message: 'Send SMS regularly.',
            status: true,
            data: aaa,
        });
    }
}

module.exports = {
    boardGame,
    getboardGameInfo,
    transferMoneyToMainWallet,
}