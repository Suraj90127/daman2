import request from 'request';
import crypto from 'crypto';
import connection from "../config/connectDB";

const pid = 'TBTEST';
const appKey = '87F5E9F3BA234A9EA58444DF1D67299B';

function curlApiInfo(url, postData) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        },
        body: postData
    };

    return new Promise((resolve, reject) => {
        request(url, options, (error, response, body) => {
            if (error) {
                reject({ status: 0, data: "CURL Error String: " + error.message });
            } else {
                resolve({ status: 1, data: body, header: response.statusCode });
            }
        });
    });
}

const topbetgame = async (params, method) => {
    try {

        const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

        const paramsString = JSON.stringify(sortedParams);
        const cipher = crypto.createCipheriv('aes-128-cbc', appKey.substring(0, 16), appKey.substring(0, 16));
        let encryptedParams = cipher.update(paramsString, 'utf8', 'base64');
        encryptedParams += cipher.final('base64');

        const postData = JSON.stringify({
            pid: pid,
            method,
            ver: '1.0.0',
            data: encodeURIComponent(encryptedParams)
        });
        const result = await curlApiInfo("https://tsdc.topbetgame.com/api/ChessGame", postData);
        if (result.status === 0) {
            console.log('CURL was not executed successfully: ' + result.data);
            return;
        }

        if (result.header !== 200) {
            console.log('The server did not execute successfully: ' + result.data);
            return;
        }

        let parsedData = JSON.parse(result.data);
        return parsedData
    } catch (error) {
        console.error(error);
    }
};

const boardGame = async (req, res) => {
    let auth = req.cookies.auth;
    let app_id = req.params.app_id;

    if (!auth) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
            timeStamp: timeNow,
        });
    }
    if (!app_id) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
            timeStamp: timeNow,
        });
    }
    app_id = parseInt(app_id)
    const [rows] = await connection.query('SELECT * FROM users WHERE `token` = ? ', [auth]);

    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,
            timeStamp: timeNow,
        });
    }
    const { id, password, ip, veri, ip_address, status, time, token, ...others } = rows[0];
    let username = others.id_user
    let login = {
        username,
        app_id: app_id,
        ip: ip_address || '192.168.1.123',
        lang: 'en'
    }

    let response = await topbetgame(login, 'login')

    if (response.message == 'User is not created') {
        let register = {
            username,
            currency: 'CNY',
            org: 1,
            ip: ip_address || '192.168.1.123',
        };
        let registerResponse = await topbetgame(register, 'register')
        if (registerResponse.message == 'User is not created') {
        } else {

            if (registerResponse.data) {
                const decryptedData = decodeURIComponent(registerResponse.data)
                const decipher = crypto.createDecipheriv('aes-128-cbc', appKey.substring(0, 16), appKey.substring(0, 16));
                let decrypted = decipher.update(decryptedData, 'base64', 'utf8');
                decrypted += decipher.final('utf8');
                const responseData = JSON.parse(decrypted);

                response = await topbetgame(login, 'login')
            }

        }

    }
    const decryptedData = decodeURIComponent(response.data)
    const decipher = crypto.createDecipheriv('aes-128-cbc', appKey.substring(0, 16), appKey.substring(0, 16));
    let decrypted = decipher.update(decryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    const responseData = JSON.parse(decrypted);
    return res.status(200).json({
        message: 'Send SMS regularly.',
        status: true,
        data: responseData,
    });
}

module.exports = {
    boardGame
}