import connection from "../config/connectDB";
import jwt from "jsonwebtoken";
import md5 from "md5";
import request from "request";
import fs from "fs";
import util from "util";
import path from "path";
import QRcode from "qrcode";

// Create a logs directory if it doesn't exist
const logsDirectory = path.join(path.resolve(), "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Define the path for the log file in the logs directory
const logFilePath = path.join(logsDirectory, "performance_log.txt");

// Promisify the appendFile function to write logs asynchronously
const writeLog = util.promisify(fs.appendFile);

const redis = require("redis");
const QRCode = require("qrcode");

const moment = require("moment-timezone");
const redisClient = redis.createClient();

const axios = require("axios");
let timeNow = Date.now();

const indiaTimeZone = "Asia/Kolkata";

function getCurrentDateInIndia() {
  const currentDateInIndia = moment()
    .tz(indiaTimeZone)
    .format("YYYY-MM-DD HH:mm:ss");
  return currentDateInIndia;
}

function getPreviousDateInIndia() {
  const currentDateInIndia = moment().tz(indiaTimeZone);
  const previousDateInIndia = currentDateInIndia.subtract(1, "days");
  const formattedDate = previousDateInIndia.format("YYYY-MM-DD");
  return formattedDate;
}

// const generateQRCode = async (data) => {
//   try {
//     let qrCodeDataURL = await QRCode.toDataURL(data);
//     console.log("QR Code generated successfully.");
//     return qrCodeDataURL;
//   } catch (err) {
//     console.error("Error generating QR code:", err);
//   }
// };

const userInfo = async (req, res) => {
  const startTime = Date.now(); // Start time in milliseconds
  const randParam = req.query.rand; // Get the 'rand' parameter from the query string
  let logData = `\n\n[Request started at ${new Date(
    startTime
  ).toISOString()} - Rand: ${randParam}]\n`; // Log with rand

  try {
    const timeNow = new Date();
    const auth = req.cookies.auth;

    logData += `Unique request identifier (rand): ${randParam}\n`;
    logData += `Start of request: ${startTime}ms\n`;

    if (!auth) {
      const endTime = Date.now();
      logData += `No auth token provided - Process took: ${
        endTime - startTime
      }ms\n`;
      await writeLog(logFilePath, logData); // Log the data
      return res.status(200).json({
        message: "Token undefined",
        status: false,
        timeStamp: timeNow,
      });
    }

    // Log time before DB query for user token
    const dbQueryStart = Date.now();
    logData += `Start DB query for user token: ${dbQueryStart - startTime}ms\n`;

    // Query user information using the token
    const [users] = await connection.query(
      "SELECT * FROM users WHERE `token` = ?",
      [auth]
    );

    const dbQueryEnd = Date.now();
    logData += `DB query for user token completed in: ${
      dbQueryEnd - dbQueryStart
    }ms\n`;

    if (!users.length) {
      const endTime = Date.now();
      logData += `Invalid token - Process took: ${endTime - startTime}ms\n`;
      await writeLog(logFilePath, logData); // Log the data
      return res.status(200).json({
        message: "Invalid token",
        status: false,
        timeStamp: timeNow,
      });
    }

    // Log time before DB query for settings
    const settingsQueryStart = Date.now();
    logData += `Start DB query for settings: ${
      settingsQueryStart - dbQueryEnd
    }ms\n`;

    // Query for admin settings (e.g., telegram)
    const [settings] = await connection.query(
      "SELECT `telegram`, `cskh` FROM admin"
    );

    const settingsQueryEnd = Date.now();
    logData += `DB query for settings completed in: ${
      settingsQueryEnd - settingsQueryStart
    }ms\n`;

    const telegram = settings.length ? settings[0].telegram : "";
    const {
      code,
      id_user,
      name_user,
      money,
      userPhoto,
      level,
      vip_level,
      needbet,
      isdemo,
      rebate,
      recharge,
      active,
    } = users[0];
    const phone = users[0].phone;

    const originalUrl = `${req.protocol}://${req.get(
      "host"
    )}/#/register?r_code=${code}`;
    const qrcodes = await generateQRCode(originalUrl);

    // Finalize the response
    const responseStart = Date.now();
    logData += `Start sending response: ${
      responseStart - settingsQueryEnd
    }ms\n`;

    if (users[0].needbet < 0) {
      await connection.execute(
        "UPDATE `users` SET `needbet` = 0 WHERE `phone` = ?",
        [users[0].phone]
      );
    }

    const response = res.status(200).json({
      message: "User Details Successful",
      status: true,
      money: parseFloat(money),
      data: {
        code,
        id_user,
        name_user,
        phone_user: phone,
        money_user: parseFloat(money),
        userPhoto,
        level,
        rebate,
        needbet,
        isdemo,
        active,
        qrcodes,
        vip_level,
        recharge,
        telegram,
      },
    });

    const responseEnd = Date.now();
    logData += `Response sent - Total process time: ${
      responseEnd - startTime
    }ms\n`;

    // Write the log data to the file
    await writeLog(logFilePath, logData);

    return response;
  } catch (error) {
    console.error("Server Error:", error.message);

    // Log error details
    logData += `Error occurred: ${error.message}\n`;
    await writeLog(logFilePath, logData);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: false,
    });
  }
};

const randomNumber = (min, max) => {
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

const updateDirectAndTeamSubordinates = async () => {
  try {
    // Fetch all users and their direct subordinates (level 1) in one query
    const [users] = await connection.query(`
      SELECT u.id_user, u.phone, u.code, u.invite,
        (SELECT COUNT(*) FROM users WHERE invite = u.code) as directCount
      FROM users u
    `);

    // Create a map of user invite codes for fast lookups
    const userMap = {};
    for (const user of users) {
      userMap[user.code] = user;
    }

    // Function to find subordinates for levels 2 to 6
    async function findTeamSubordinates(code) {
      let level = 1;
      let teamCount = 0;
      let currentLevelCodes = [code];

      while (level < 6) {
        const [subordinates] = await connection.query(
          "SELECT `code` FROM users WHERE `invite` IN (?)",
          [currentLevelCodes]
        );

        if (subordinates.length === 0) break; // No more subordinates

        // Update teamCount only for levels 2 to 6
        if (level >= 1) {
          teamCount += subordinates.length;
        }

        // Move to next level of subordinates
        currentLevelCodes = subordinates.map((sub) => sub.code);
        level++;
      }

      return teamCount;
    }

    // Loop over each user and calculate their team subordinates
    for (const user of users) {
      const directCount = user.directCount || 0; // Level 1 subordinates
      const teamCount = await findTeamSubordinates(user.code); // Levels 2 to 6 subordinates

      // Insert or update user data in bulk
      await connection.query(
        `
        INSERT INTO user_data (phone, Direct_subordinates, Team_subordinates)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          Direct_subordinates = VALUES(Direct_subordinates), 
          Team_subordinates = VALUES(Team_subordinates)
        `,
        [user.phone, directCount, teamCount]
      );
    }

    console.log("Subordinates count updated successfully!");
  } catch (error) {
    console.error("Error updating subordinates count:", error);
  }
};

const addutr = async (req, res) => {
  let utr = req.body.utr;
  let id = req.body.id;
  const sql = `UPDATE recharge SET utr=? WHERE id=?`;
  await connection.execute(sql, [utr, id]);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "666damangame91@gmail.com",
      pass: "Delhi@123",
    },
  });

  // Email content
  let mailOptions = {
    from: "damangame91@gmail.com",
    to: "adarshpushpendra@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent from Node.js using nodemailer.",
  };

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return res.status(200).json({
    message: "Recharge Successfully!",
    status: true,
    timeStamp: timeNow,
  });
  // res.redirect('/');
};
const verifyCode = async (req, res) => {
  let auth = req.cookies.auth;
  let now = new Date().getTime();
  let timeEnd = +new Date() + 1000 * (60 * 2 + 0) + 500;
  let otp = randomNumber(100000, 999999);

  conswit[rows] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth]
  );
  if (!rows) {
    return res.status(200).json({
      message: "Account does not exist",
      status: false,
      timeStamp: timeNow,
    });
  }
  let user = rows[0];
  if (user.time_otp - now <= 0) {
    request(
      `http://47.243.168.18:9090/sms/batch/v2?appkey=NFJKdK&appsecret=brwkTw&phone=84${user.phone}&msg=Your verification code is ${otp}&extend=${now}`,
      async (error, response, body) => {
        let data = JSON.parse(body);
        if (data.code == "00000") {
          await connection.execute(
            "UPDATE users SET otp = ?, time_otp = ? WHERE phone = ? ",
            [otp, timeEnd, user.phone]
          );
          return res.status(200).json({
            message: "Submitted successfully",
            status: true,
            timeStamp: timeNow,
            timeEnd: timeEnd,
          });
        }
      }
    );
  } else {
    return res.status(200).json({
      message: "Send SMS regularly.",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const aviator = async (req, res) => {
  let auth = req.cookies.auth;
  res.redirect(
    `https://avi.bdg-club.com/theninja/src/api/userapi.php?action=loginandregisterbyauth&token=${auth}`
  );
  //res.redirect(`https://jetx.asia/#/jet/loginbyauth/${auth}`);
};

const changeUser = async (req, res) => {
  let auth = req.cookies.auth;
  let name = req.body.name;

  const [rows] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth]
  );
  if (!rows || !name)
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  await connection.query("UPDATE users SET name_user = ? WHERE `token` = ? ", [
    name,
    auth,
  ]);
  return res.status(200).json({
    message: "Username modification successful",
    status: true,
    timeStamp: timeNow,
  });
};
const changeUserPhoto = async (req, res) => {
  let auth = req.cookies.auth;
  let photo = req.body.photo;

  const [rows] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth]
  );
  if (!rows || !photo)
    return res.status(200).json({
      message: "Invalid photo",
      status: false,
      timeStamp: timeNow,
    });
  await connection.query("UPDATE users SET userPhoto = ? WHERE `token` = ? ", [
    photo,
    auth,
  ]);
  return res.status(200).json({
    message: "User profile modification successful",
    status: true,
    timeStamp: timeNow,
  });
};

const changePassword = async (req, res) => {
  let auth = req.cookies.auth;
  let password = req.body.password;
  let newPassWord = req.body.newPassWord;
  let cPassWord = req.body.cPassWord;
  // let otp = req.body.otp;

  if (!password || !newPassWord)
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? AND `password` = ? ",
    [auth, md5(password)]
  );
  if (rows.length == 0)
    return res.status(200).json({
      message: "Incorrect password",
      status: false,
      timeStamp: timeNow,
    });

  if (newPassWord !== cPassWord) {
    return res.status(200).json({
      message: "Incorrect confirm password ",
      status: false,
    });
  }
  await connection.query(
    "UPDATE users SET otp = ?, password = ?, plain_password = ? WHERE `token` = ? ",
    [randomNumber(100000, 999999), md5(newPassWord), newPassWord, auth]
  );
  return res.status(200).json({
    message: "Password modification successful",
    status: true,
    timeStamp: timeNow,
  });
};

const checkInHandling = async (req, res) => {
  let auth = req.cookies.auth;
  let data = req.body.data;

  if (!auth)
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? ",
    [auth]
  );
  if (!rows)
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  if (!data) {
    const [point_list] = await connection.query(
      "SELECT * FROM point_list WHERE `phone` = ? ",
      [rows[0].phone]
    );
    const [historys] = await connection.query(
      "SELECT * FROM attendance_history WHERE `phone` = ? ",
      [rows[0].phone]
    );
    return res.status(200).json({
      messages: "No More Data",
      datas: point_list[0],
      data: historys,
      status: true,
      timeStamp: timeNow,
    });
  }

  const [point_listss] = await connection.query(
    "SELECT * FROM point_list WHERE `phone` = ? ",
    [rows[0].phone]
  );
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  if (data && formattedDate !== point_listss[0].today) {
    if (data == 1) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 300;
      if (check >= data && point_list.total1 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total1, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total1 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total1, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total1}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total1 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 300 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total1 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 2) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 3000;
      if (check >= get && point_list.total2 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total2, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total2 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total2, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total2}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total2 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 3000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total2 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 3) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 6000;
      if (check >= get && point_list.total3 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total3, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total3 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total3, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total3}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total3 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 6000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total3 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 4) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 12000;
      if (check >= get && point_list.total4 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total4, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total4 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total4, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total4}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total4 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 12000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total4 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 5) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 28000;
      if (check >= get && point_list.total5 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total5, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total5 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total5, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total5}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total5 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 28000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total5 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 6) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 100000;
      if (check >= get && point_list.total6 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total6, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total6 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        await connection.query(
          "INSERT INTO attendance_history SET phone = ?,amount=?,status=?,date=? ",
          [rows[0].phone, point_list.total6, 1, formattedDate]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total6}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total6 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹ 100000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total6 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
    if (data == 7) {
      const [point_lists] = await connection.query(
        "SELECT * FROM point_list WHERE `phone` = ? ",
        [rows[0].phone]
      );
      let check = rows[0].money;
      let point_list = point_lists[0];
      let get = 200000;
      if (check >= get && point_list.total7 != 0) {
        await connection.query(
          "UPDATE users SET money = money + ? WHERE phone = ? ",
          [point_list.total7, rows[0].phone]
        );
        await connection.query(
          "UPDATE point_list SET total7 = ?, today = ? WHERE phone = ? ",
          [0, formattedDate, rows[0].phone]
        );
        return res.status(200).json({
          message: `You just received ₹ ${point_list.total7}.00`,
          status: true,
          timeStamp: timeNow,
        });
      } else if (check < get && point_list.total7 != 0) {
        return res.status(200).json({
          message: "Please Recharge ₹200000 to claim gift.",
          status: false,
          timeStamp: timeNow,
        });
      } else if (point_list.total7 == 0) {
        return res.status(200).json({
          message: "You have already received this gift",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
  } else {
    return res.status(200).json({
      message: "You have already received this gift",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const rebateCreate = async (req, res) => {
  const { amount } = req.body;
  let auth = req.cookies.auth;
  try {
    if (amount <= 0)
      return res.status(200).json({
        message: "Amount is not",
        status: false,
        timeStamp: timeNow,
      });

    const [rows] = await connection.query(
      "SELECT * FROM users WHERE `token` = ? ",
      [auth]
    );
    if (!rows)
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });

    const sumdate = timerJoin(Date.now());

    await connection.query(
      "INSERT INTO rebate SET phone = ?,amount=?,rate=?,commission=?,type=?, status=?,today=? ",
      [rows[0].phone, amount, 0.01, amount * 0.001, "Lottery", 1, sumdate]
    );

    await connection.query(
      `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time = NOW()`,
      [rows[0].phone, "One click rebet", amount * 0.001]
    );

    await connection.execute(
      "UPDATE `users` SET `money` = `money` + ?,`rebate`=`rebate`-? WHERE `token` = ? ",
      [amount * 0.001, amount, auth]
    );

    return res.status(200).json({
      message: `You just received successful`,
      status: true,
      timeStamp: timeNow,
    });
  } catch (error) {
    return res.status(500).json({
      message: `internal server error`,
      status: false,
      timeStamp: timeNow,
    });
  }
};

const getRebate = async (req, res) => {
  let auth = req.cookies.auth;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE `token` = ? ",
      [auth]
    );
    if (!rows)
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });

    const data = await connection.query(
      "SELECT * FROM rebate WHERE phone = ?",
      [rows[0].phone]
    );
    return res.status(200).json({
      message: `You just received successful`,
      status: true,
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: `internal server error`,
      status: false,
      timeStamp: timeNow,
    });
  }
};

function formateT(params) {
  let result = params < 10 ? "0" + params : params;
  return result;
}

function timerJoin(params = "", addHours = 0) {
  let date = params ? new Date(Number(params)) : new Date();
  if (addHours !== 0) {
    date.setHours(date.getHours() + addHours);
  }

  const options = {
    timeZone: "Asia/Kolkata", // Specify the desired time zone
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(date);

  const getPart = (type) => parts.find((part) => part.type === type).value;

  const formattedDate = `${getPart("year")}-${getPart("month")}-${getPart(
    "day"
  )} ${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;

  return formattedDate;
}

//const promotion = async (req, res) => {
//
//    try {
//
//        let auth = req.cookies.auth;
//        if (!auth) {
//            return res.status(200).json({
//                message: 'Failed',
//                status: false,
//                timeStamp: timeNow,
//            });
//        }
//
//        const [user] = await connection.query('SELECT `phone`, `code`,`invite`, `roses_f`, `roses_f1`, `roses_today` FROM users WHERE `token` = ? ', [auth]);
//        const [level] = await connection.query('SELECT * FROM level');
//
//        if (!user) {
//            return res.status(200).json({
//                message: 'Invalid user',
//                status: false,
//                timeStamp: timeNow,
//            });
//        }
//
//        let userInfo = user[0];
//
//        // Directly referred level-1 users
//        const [f1s] = await connection.query('SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ', [userInfo.code]);
//
//        // Directly referred users today
//        let f1_today = 0;
//        for (let i = 0; i < f1s.length; i++) {
//            const f1_time = f1s[i].time;
//            let check = (timerJoin(f1_time) == timerJoin()) ? true : false;
//            if (check) {
//                f1_today += 1;
//            }
//        }
//
//        // All direct referrals today
//        let f_all_today = 0;
//        for (let i = 0; i < f1s.length; i++) {
//            const f1_code = f1s[i].code;
//            const f1_time = f1s[i].time;
//            let check_f1 = (timerJoin(f1_time) == timerJoin()) ? true : false;
//            if (check_f1) f_all_today += 1;
//
//            // Total level-2 referrals today
//            const [f2s] = await connection.query('SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ', [f1_code]);
//            for (let i = 0; i < f2s.length; i++) {
//                const f2_code = f2s[i].code;
//                const f2_time = f2s[i].time;
//                let check_f2 = (timerJoin(f2_time) == timerJoin()) ? true : false;
//                if (check_f2) f_all_today += 1;
//
//                // Total level-3 referrals today
//                const [f3s] = await connection.query('SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ', [f2_code]);
//                for (let i = 0; i < f3s.length; i++) {
//                    const f3_code = f3s[i].code;
//                    const f3_time = f3s[i].time;
//                    let check_f3 = (timerJoin(f3_time) == timerJoin()) ? true : false;
//                    if (check_f3) f_all_today += 1;
//
//                    // Total level-4 referrals today
//                    const [f4s] = await connection.query('SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ', [f3_code]);
//                    for (let i = 0; i < f4s.length; i++) {
//                        const f4_code = f4s[i].code;
//                        const f4_time = f4s[i].time;
//                        let check_f4 = (timerJoin(f4_time) == timerJoin()) ? true : false;
//                        if (check_f4) f_all_today += 1;
//                    }
//                }
//            }
//        }
//
//        // Total level-2 referrals
//        let f2 = 0;
//        for (let i = 0; i < f1s.length; i++) {
//            const f1_code = f1s[i].code;
//            const [f2s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f1_code]);
//            f2 += f2s.length;
//        }
//
//        // Total level-3 referrals
//        let f3 = 0;
//        for (let i = 0; i < f1s.length; i++) {
//            const f1_code = f1s[i].code;
//            const [f2s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f1_code]);
//            for (let i = 0; i < f2s.length; i++) {
//                const f2_code = f2s[i].code;
//                const [f3s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f2_code]);
//                if (f3s.length > 0) f3 += f3s.length;
//            }
//        }
//
//        // Total level-4 referrals
//        let f4 = 0;
//        for (let i = 0; i < f1s.length; i++) {
//            const f1_code = f1s[i].code;
//            const [f2s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f1_code]);
//            for (let i = 0; i < f2s.length; i++) {
//                const f2_code = f2s[i].code;
//                const [f3s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f2_code]);
//                for (let i = 0; i < f3s.length; i++) {
//                    const f3_code = f3s[i].code;
//                    const [f4s] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ', [f3_code]);
//                    if (f4s.length > 0) f4 += f4s.length;
//                }
//            }
//        }
//
//        let selectedData = [];
//        let level2to6activeuser = 0;
//        const currentDate = new Date().toISOString().slice(0, 10);
//
//        async function fetchInvitesByCode(code, depth = 1) {
//            if (depth > 10) {
//                return;
//            }
//
//            const [inviteData] = await connection.query('SELECT `id_user`,`name_user`,`phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE //`invite` = ?', [code]);
//
//            const [level2to6activeuser_today] = await connection.query('SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ? AND DATE(`today`) = ?', //[code, currentDate]);
//
//            if (level2to6activeuser_today.length > 0) {
//                level2to6activeuser += level2to6activeuser_today.length;
//            }
//            if (inviteData.length > 0) {
//                for (const invite of inviteData) {
//                    selectedData.push(invite);
//                    await fetchInvitesByCode(invite.code, depth + 1);
//                }
//            }
//        }
//
//
//
//        // Query to select today's deposits for each user
//        const [level1_today_rows] = await connection.query('SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ?', [userInfo.code]);
//
//        const [level1_today_rows_today] = await connection.query('SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ? AND DATE(`today`) = ?', //[userInfo.code, currentDate]);
//
//        let totalDepositCount = 0;
//        let totalDepositAmount = 0;
//        let firstDepositCount = 0;
//
//        for (const user of level1_today_rows) {
//            await fetchInvitesByCode(user.code);
//            // Query to select deposits for the current user for today
//            const [deposits] = await connection.query('SELECT `id`, `id_order`, `transaction_id`, `utr`, `phone`, `money`, `type`, `status`, `today`, `url`, `time` //FROM `recharge` WHERE `phone` = ? AND DATE(`today`) = ? AND `status` = 1', [user.phone, currentDate]);
//
//            totalDepositCount += deposits.length;
//
//            deposits.forEach((deposit) => {
//                totalDepositAmount += parseFloat(deposit.money);
//            });
//
//            if (deposits.length > 0) {
//                firstDepositCount++;
//            }
//        }
//
//        const level2_to_level6_today_rows = selectedData;
//
//
//        let level2_to_level6totalDepositCount = 0;
//        let level2_to_level6totalDepositAmount = 0;
//        let level2_to_level6firstDepositCount = 0;
//
//        let level2_to_level6count = 0;
//
//        for (const user of level2_to_level6_today_rows) {
//            const [deposits] = await connection.query('SELECT `id`, `id_order`, `transaction_id`, `utr`, `phone`, `money`, `type`, `status`, `today`, `url`, `time` //FROM `recharge` WHERE `phone` = ? AND DATE(`today`) = ? AND `status` = 1', [user.phone, currentDate]);
//
//            level2_to_level6count++;
//
//            deposits.forEach((deposit) => {
//                level2_to_level6totalDepositAmount += parseFloat(deposit.money);
//            });
//
//            if (deposits.length > 0) {
//                level2_to_level6firstDepositCount++;
//            }
//            level2_to_level6totalDepositCount += deposits.length;
//        }
//
//
//
//
//        async function countLevelOneUsers(code) {
//            const [inviteData] = await connection.query('SELECT COUNT(*) AS count FROM users WHERE `invite` = ?', [code]);
//            return inviteData[0].count;
//        }
//
//        async function countDownlineUsers(code, end = 10, visited = new Set()) {
//            return countDownline(code, 1, end, visited);
//        }
//
//        async function countDownline(code, depth, end, visited) {
//            if (depth > end || visited.has(code)) {
//                return 0;
//            }
//
//            visited.add(code);
//
//            let totalUsers = 1; // Count the current user
//
//            const [inviteData] = await connection.query('SELECT DISTINCT `code` FROM users WHERE `invite` = ?', [code]);
//
//            if (inviteData.length > 0) {
//                for (const invite of inviteData) {
//                    totalUsers += await countDownline(invite.code, depth + 1, end, visited);
//                }
//            }
//
//            return totalUsers;
//        }
//
//        // Usage examples:
//
//        // Count level 1 users
//        const level1Count = await countLevelOneUsers(userInfo.code);
//        console.log("Total level 1 users:", level1Count);
//
//        // Count downline users up to level 6
//        const downlineCount = await countDownlineUsers(userInfo.code);
//        console.log("Total downline users up to level 6:", downlineCount);
//
//        const total_today_count = level2_to_level6count + level1_today_rows.length;
//        const rosesF1 = parseFloat(userInfo.roses_f);
//        const rosesAll = parseFloat(userInfo.roses_f1);
//        let rosesAdd = rosesF1 + rosesAll;
//
//        return res.status(200).json({
//            message: 'Receive success',
//            level: level,
//            info: user,
//            level1Count: level1Count,
//            status: true,
//            total_today_count: total_today_count,
//            level1_count: level1_today_rows_today.length, // Use length directly instead of counting in l
//            level1_today_rows: level1_today_rows,
//            totalDepositCount: totalDepositCount,
//            currentDate: currentDate,
//            totalDepositAmount: totalDepositAmount,
//            firstDepositCount: firstDepositCount,
//            selectedData: selectedData,
//            level2_to_level6count: level2to6activeuser,
//            level2_to_level6totalDepositCount: level2_to_level6totalDepositCount,
//            level2_to_level6totalDepositAmount: level2_to_level6totalDepositAmount,
//            level2_to_level6firstDepositCount: level2_to_level6firstDepositCount,
//            total_downline_count: downlineCount,
//            invite: {
//                f1: f1s.length,
//                total_f: selectedData.length,
//                f1_today: f1_today,
//                f_all_today: f_all_today,
//                roses_f1: userInfo.roses_f1,
//                roses_f: userInfo.roses_f,
//                roses_all: rosesAdd,
//                roses_today: userInfo.roses_today,
//            },
//            timeStamp: timeNow,
//        });
//    }
//    catch (error) {
//        console.error("An error occurred:", error);
//        // You can handle the error here, such as logging it or throwing it further
//        return res.status(200).json({
//            message: error.message,
//            status: false,
//            timeStamp: timeNow,
//        });
//    }
//}

// const promotion = async (req, res) => {
//   try {
//     const auth = req.cookies.auth;
//     const timeNow = Date.now(); // Ensure timeNow is correctly declared

//     if (!auth) {
//       return res.status(200).json({
//         message: "Failed",
//         status: false,
//         timeStamp: timeNow,
//       });
//     }

//     // Fetch user details based on the token
//     const [userResult] = await connection.query(
//       "SELECT `phone`, `code`, `invite`, `roses_f`, `roses_f1`, `roses_today` FROM users WHERE `token` = ?",
//       [auth]
//     );

//     if (!userResult || userResult.length === 0) {
//       return res.status(200).json({
//         message: "Invalid user",
//         status: false,
//         timeStamp: timeNow,
//       });
//     }

//     let userInfo = userResult[0];

//     // Format date for querying
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const formattedDate = yesterday.toISOString().split("T")[0];

//     // Fetch user data for multiple levels of deposits and bets
//     const [userDataResult] = await connection.query(
//       "SELECT * FROM user_data WHERE phone = ? AND date = ?",
//       [userInfo.phone, formattedDate]
//     );

//     if (!userDataResult || userDataResult.length === 0) {
//       return res.status(200).json({
//         message: "No user data found",
//         status: false,
//         timeStamp: timeNow,
//       });
//     }

//     let userData = userDataResult[0];

//     // Initialize counts and amounts
//     let level1Count = parseFloat(userData.depositnumber_today_1) || 0;
//     let total_today_count = parseFloat(userData.totalbetcount_today_1) || 0;
//     let totalDepositCount = parseFloat(userData.depositnumber_today_1) || 0;
//     let totalDepositAmount = parseFloat(userData.depositamount_today_1) || 0;
//     let firstDepositCount = parseFloat(userData.firstrechagepeole_today_1) || 0;

//     // Initialize variables for levels 2 to 6
//     let level2_to_level6totalDepositCount = 0;
//     let level2_to_level6totalDepositAmount = 0;
//     let level2_to_level6firstDepositCount = 0;

//     // Calculate deposits and bets for levels 2 to 6
//     for (let i = 2; i <= 6; i++) {
//       level2_to_level6totalDepositCount +=
//         parseFloat(userData[`depositnumber_today_${i}`]) || 0;
//       level2_to_level6totalDepositAmount +=
//         parseFloat(userData[`depositamount_today_${i}`]) || 0;
//       level2_to_level6firstDepositCount +=
//         parseFloat(userData[`firstrechagepeole_today_${i}`]) || 0;
//     }

//     // Fetch total downline count
//     const [userDataResult_total] = await connection.query(
//       "SELECT SUM(`Direct_subordinates`) AS level1Count, SUM(`Team_subordinates`) AS total_downline_count FROM user_data WHERE phone = ? AND date = ?",
//       [userInfo.phone, formattedDate]
//     );

//     if (!userDataResult_total || userDataResult_total.length === 0) {
//       return res.status(200).json({
//         message: "No user data found",
//         status: false,
//         timeStamp: timeNow,
//       });
//     }

//     let userData_totaluser = userDataResult_total[0];
//     let total_downline_count =
//       parseInt(userData_totaluser.total_downline_count) || 0;
//     let level1CountTotal = parseInt(userData_totaluser.level1Count) || 0; // Renamed to avoid conflict

//     return res.status(200).json({
//       message: "Receive success",
//       info: userData,
//       level1Count: level1CountTotal,
//       status: true,
//       total_today_count: total_today_count,
//       level1_count: userData.Direct_subordinates,
//       level1_today_rows: [], // Placeholder for actual rows if needed
//       totalDepositCount: totalDepositCount,
//       currentDate: new Date().toISOString(),
//       totalDepositAmount: totalDepositAmount,
//       firstDepositCount: firstDepositCount,
//       level2_to_level6count: userData.Team_subordinates,
//       level2_to_level6totalDepositCount: level2_to_level6totalDepositCount,
//       level2_to_level6totalDepositAmount: level2_to_level6totalDepositAmount,
//       level2_to_level6firstDepositCount: level2_to_level6firstDepositCount,
//       total_downline_count: total_downline_count,
//       timeStamp: timeNow,
//     });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({
//       message: "An error occurred while processing your request.",
//       status: false,
//       timeStamp: timeNow,
//     });
//   }
// };

const promotion = async (req, res) => {
  try {
    let auth = req.cookies.auth;
    if (!auth) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }

    const [user] = await connection.query(
      "SELECT `phone`, `code`,`invite`, `roses_f`, `roses_f1`, `roses_today` FROM users WHERE `token` = ? ",
      [auth]
    );
    const [level] = await connection.query("SELECT * FROM level");

    if (!user) {
      return res.status(200).json({
        message: "Invalid user",
        status: false,
        timeStamp: timeNow,
      });
    }

    let userInfo = user[0];

    // Directly referred level-1 users
    const [f1s] = await connection.query(
      "SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ",
      [userInfo.code]
    );

    // Directly referred users today
    let f1_today = 0;
    for (let i = 0; i < f1s.length; i++) {
      const f1_time = f1s[i].time;
      let check = timerJoin(f1_time) == timerJoin() ? true : false;
      if (check) {
        f1_today += 1;
      }
    }

    // All direct referrals today
    let f_all_today = 0;
    for (let i = 0; i < f1s.length; i++) {
      const f1_code = f1s[i].code;
      const f1_time = f1s[i].time;
      let check_f1 = timerJoin(f1_time) == timerJoin() ? true : false;
      if (check_f1) f_all_today += 1;

      // Total level-2 referrals today
      const [f2s] = await connection.query(
        "SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ",
        [f1_code]
      );
      for (let i = 0; i < f2s.length; i++) {
        const f2_code = f2s[i].code;
        const f2_time = f2s[i].time;
        let check_f2 = timerJoin(f2_time) == timerJoin() ? true : false;
        if (check_f2) f_all_today += 1;

        // Total level-3 referrals today
        const [f3s] = await connection.query(
          "SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ",
          [f2_code]
        );
        for (let i = 0; i < f3s.length; i++) {
          const f3_code = f3s[i].code;
          const f3_time = f3s[i].time;
          let check_f3 = timerJoin(f3_time) == timerJoin() ? true : false;
          if (check_f3) f_all_today += 1;

          // Total level-4 referrals today
          const [f4s] = await connection.query(
            "SELECT `phone`, `code`,`invite`, `time` FROM users WHERE `invite` = ? ",
            [f3_code]
          );
          for (let i = 0; i < f4s.length; i++) {
            const f4_code = f4s[i].code;
            const f4_time = f4s[i].time;
            let check_f4 = timerJoin(f4_time) == timerJoin() ? true : false;
            if (check_f4) f_all_today += 1;
          }
        }
      }
    }

    // Total level-2 referrals
    let f2 = 0;
    for (let i = 0; i < f1s.length; i++) {
      const f1_code = f1s[i].code;
      const [f2s] = await connection.query(
        "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
        [f1_code]
      );
      f2 += f2s.length;
    }

    // Total level-3 referrals
    let f3 = 0;
    for (let i = 0; i < f1s.length; i++) {
      const f1_code = f1s[i].code;
      const [f2s] = await connection.query(
        "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
        [f1_code]
      );
      for (let i = 0; i < f2s.length; i++) {
        const f2_code = f2s[i].code;
        const [f3s] = await connection.query(
          "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
          [f2_code]
        );
        if (f3s.length > 0) f3 += f3s.length;
      }
    }

    // Total level-4 referrals
    let f4 = 0;
    for (let i = 0; i < f1s.length; i++) {
      const f1_code = f1s[i].code;
      const [f2s] = await connection.query(
        "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
        [f1_code]
      );
      for (let i = 0; i < f2s.length; i++) {
        const f2_code = f2s[i].code;
        const [f3s] = await connection.query(
          "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
          [f2_code]
        );
        for (let i = 0; i < f3s.length; i++) {
          const f3_code = f3s[i].code;
          const [f4s] = await connection.query(
            "SELECT `phone`, `code`,`invite` FROM users WHERE `invite` = ? ",
            [f3_code]
          );
          if (f4s.length > 0) f4 += f4s.length;
        }
      }
    }

    let selectedData = [];
    let level2to6activeuser = 0;
    let currentDate = new Date();

    // Subtract one day
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    // Format the date as YYYY-MM-DD
    currentDate = previousDate.toISOString().slice(0, 10);

    async function fetchInvitesByCode(code, depth = 1) {
      if (depth > 10) {
        return;
      }

      const [inviteData] = await connection.query(
        "SELECT `id_user`,`name_user`,`phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE `invite` = ?",
        [code]
      );

      const [level2to6activeuser_today] = await connection.query(
        "SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ? AND DATE(`today`) = ?",
        [code, currentDate]
      );

      if (level2to6activeuser_today.length > 0) {
        level2to6activeuser += level2to6activeuser_today.length;
      }
      if (inviteData.length > 0) {
        for (const invite of inviteData) {
          selectedData.push(invite);
          await fetchInvitesByCode(invite.code, depth + 1);
        }
      }
    }

    // Query to select today's deposits for each user
    const [level1_today_rows] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ?",
      [userInfo.code]
    );

    const [level1_today_rows_today] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `time` FROM users WHERE `invite` = ? AND DATE(`today`) = ?",
      [userInfo.code, currentDate]
    );

    let totalDepositCount = 0;
    let totalDepositAmount = 0;
    let firstDepositCount = 0;

    for (const user of level1_today_rows) {
      await fetchInvitesByCode(user.code);
      // Query to select deposits for the current user for today
      const [deposits] = await connection.query(
        "SELECT `id`, `id_order`, `transaction_id`, `utr`, `phone`, `money`, `type`, `status`, `today`, `url`, `time` FROM `recharge` WHERE `phone` = ? AND DATE(`today`) = ? AND `status` = 1",
        [user.phone, currentDate]
      );

      totalDepositCount += deposits.length;

      deposits.forEach((deposit) => {
        totalDepositAmount += parseFloat(deposit.money);
      });

      if (deposits.length > 0) {
        firstDepositCount++;
      }
    }

    const level2_to_level6_today_rows = selectedData;

    let level2_to_level6totalDepositCount = 0;
    let level2_to_level6totalDepositAmount = 0;
    let level2_to_level6firstDepositCount = 0;

    let level2_to_level6count = 0;

    for (const user of level2_to_level6_today_rows) {
      const [deposits] = await connection.query(
        "SELECT `id`, `id_order`, `transaction_id`, `utr`, `phone`, `money`, `type`, `status`, `today`, `url`, `time` FROM `recharge` WHERE `phone` = ? AND DATE(`today`) = ? AND `status` = 1",
        [user.phone, currentDate]
      );

      level2_to_level6count++;

      deposits.forEach((deposit) => {
        level2_to_level6totalDepositAmount += parseFloat(deposit.money);
      });

      if (deposits.length > 0) {
        level2_to_level6firstDepositCount++;
      }
      level2_to_level6totalDepositCount += deposits.length;
    }

    async function countLevelOneUsers(code) {
      const [inviteData] = await connection.query(
        "SELECT COUNT(*) AS count FROM users WHERE `invite` = ?",
        [code]
      );
      return inviteData[0].count;
    }

    async function countDownlineUsers(code, end = 10, visited = new Set()) {
      return countDownline(code, 1, end, visited);
    }

    async function countDownline(code, depth, end, visited) {
      if (depth > end || visited.has(code)) {
        return 0;
      }

      visited.add(code);

      let totalUsers = 1; // Count the current user

      const [inviteData] = await connection.query(
        "SELECT DISTINCT `code` FROM users WHERE `invite` = ?",
        [code]
      );

      if (inviteData.length > 0) {
        for (const invite of inviteData) {
          totalUsers += await countDownline(
            invite.code,
            depth + 1,
            end,
            visited
          );
        }
      }

      return totalUsers;
    }

    // Usage examples:

    // Count level 1 users
    const level1Count = await countLevelOneUsers(userInfo.code);
    console.log("Total level 1 users:", level1Count);

    // Count downline users up to level 6
    const downlineCount = await countDownlineUsers(userInfo.code);
    console.log("Total downline users up to level 6:", downlineCount);

    const total_today_count = level2_to_level6count + level1_today_rows.length;
    const rosesF1 = parseFloat(userInfo.roses_f);
    const rosesAll = parseFloat(userInfo.roses_f1);
    let rosesAdd = rosesF1 + rosesAll;

    return res.status(200).json({
      message: "Receive success",
      level: level,
      info: user,
      level1Count: level1Count,
      status: true,
      total_today_count: total_today_count,
      level1_count: level1_today_rows_today.length, // Use length directly instead of counting in l
      level1_today_rows: level1_today_rows,
      totalDepositCount: totalDepositCount,
      currentDate: currentDate,
      totalDepositAmount: totalDepositAmount,
      firstDepositCount: firstDepositCount,
      selectedData: selectedData,
      level2_to_level6count: level2to6activeuser,
      level2_to_level6totalDepositCount: level2_to_level6totalDepositCount,
      level2_to_level6totalDepositAmount: level2_to_level6totalDepositAmount,
      level2_to_level6firstDepositCount: level2_to_level6firstDepositCount,
      total_downline_count: downlineCount,
      invite: {
        f1: f1s.length,
        total_f: selectedData.length,
        f1_today: f1_today,
        f_all_today: f_all_today,
        roses_f1: userInfo.roses_f1,
        roses_f: userInfo.roses_f,
        roses_all: rosesAdd,
        roses_today: userInfo.roses_today,
      },
      timeStamp: timeNow,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    // You can handle the error here, such as logging it or throwing it further
    return res.status(200).json({
      message: error.message,
      status: false,
      timeStamp: timeNow,
    });
  }
};

const transactionHistory = async (req, res) => {
  try {
    let auth = req.cookies.auth;
    if (!auth) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().toISOString(),
      });
    }

    const [user] = await connection.query(
      "SELECT `phone` FROM users WHERE `token` = ?",
      [auth]
    );

    // Implement pagination
    const limit = parseInt(req.query.limit) || 300; // Number of records per page
    const page = parseInt(req.query.page) || 1; // Current page number
    const offset = (page - 1) * limit;

    const data = await connection.query(
      "SELECT * FROM transaction_history WHERE phone = ?  ORDER BY id DESC LIMIT ? OFFSET ?",
      [user[0].phone, limit, offset] // Corrected here
    );

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    await connection.query(
      "DELETE FROM `roses` WHERE `phone` = ? AND today < ?",
      [user[0].phone, sevenDaysAgo]
    );

    return res.status(200).send({
      success: true,
      message: "Get transaction history successfully",
      data: data[0],
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
      success: false,
      message: "Server error",
    });
  }
};

const totalCommission = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  try {
    const [user] = await connection.query(
      "SELECT `phone`, `code`,`invite`, `roses_f`, `roses_f1`, `roses_today` FROM users WHERE `token` = ? ",
      [auth]
    );
    // Query for total balance
    const [total] = await connection.execute(
      `SELECT commission FROM subordinatedata WHERE phone = ? AND type = "bet commission"`,
      [user[0].phone]
    );

    const totalBalance = total.reduce((sum, record) => {
      return sum + parseFloat(record.commission);
    }, 0);

    // Query for yesterday's balance
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];

    const [datas] = await connection.execute(
      `SELECT commission FROM subordinatedata WHERE phone = ? AND DATE(date) = ? AND type = "bet commission"`,
      [user[0].phone, formattedDate]
    );

    const yesterdayBalance = datas.reduce((sum, record) => {
      return sum + parseFloat(record.commission);
    }, 0);

    // Query for last 7 days' balance
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const formattedStartDate = sevenDaysAgo.toISOString().split("T")[0];

    const [weeks] = await connection.execute(
      `SELECT commission FROM subordinatedata WHERE phone = ? AND DATE(date) >= ? AND type = "bet commission"`,
      [user[0].phone, formattedStartDate]
    );

    const weekBalance = weeks.reduce((sum, record) => {
      const balance = parseFloat(record.commission);
      return sum + (isNaN(balance) ? 0 : balance);
    }, 0);

    return res.status(200).send({
      success: true,
      message: "Transaction commissions retrieved successfully",
      totalBalance,
      yesterdayBalance,
      weekBalance,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const myTeam = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  const [level] = await connection.query("SELECT * FROM level");
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  return res.status(200).json({
    message: "Receive success",
    level: level,
    info: user,
    status: true,
    timeStamp: timeNow,
  });
};

const listMyTeam = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  let userInfo = user[0];
  const [f1] = await connection.query(
    "SELECT `id_user`, `phone`, `code`, `invite`,`roses_f`, `rank`, `name_user`,`status`,`total_money`, `time` FROM users WHERE `invite` = ? ORDER BY id DESC",
    [userInfo.code]
  );
  const [mem] = await connection.query(
    "SELECT `id_user`, `phone`, `time` FROM users WHERE `invite` = ? ORDER BY id DESC LIMIT 100",
    [userInfo.code]
  );
  const [total_roses] = await connection.query(
    "SELECT `f1`,`invite`, `code`,`phone`,`time` FROM roses WHERE `invite` = ? ORDER BY id DESC LIMIT 100",
    [userInfo.code]
  );

  const selectedData = [];

  async function fetchUserDataByCode(code, depth = 1) {
    if (depth > 6) {
      return;
    }

    const [userData] = await connection.query(
      "SELECT `id_user`, `name_user`, `phone`, `code`, `invite`, `rank`, `total_money` FROM users WHERE `invite` = ?",
      [code]
    );
    if (userData.length > 0) {
      for (const user of userData) {
        const [turnoverData] = await connection.query(
          "SELECT `phone`, `daily_turn_over`, `total_turn_over` FROM turn_over WHERE `phone` = ?",
          [user.phone]
        );
        const [inviteCountData] = await connection.query(
          "SELECT COUNT(*) as invite_count FROM users WHERE `invite` = ?",
          [user.code]
        );
        const inviteCount = inviteCountData[0].invite_count;

        const userObject = {
          ...user,
          invite_count: inviteCount,
          user_level: depth,
          daily_turn_over: turnoverData[0]?.daily_turn_over || 0,
          total_turn_over: turnoverData[0]?.total_turn_over || 0,
        };

        selectedData.push(userObject);
        await fetchUserDataByCode(user.code, depth + 1);
      }
    }
  }

  await fetchUserDataByCode(userInfo.code);

  let newMem = [];
  mem.map((data) => {
    let objectMem = {
      id_user: data.id_user,
      phone:
        "91" + data.phone.slice(0, 1) + "****" + String(data.phone.slice(-4)),
      time: data.time,
    };

    return newMem.push(objectMem);
  });
  return res.status(200).json({
    message: "Receive success",
    f1: selectedData,
    f1_direct: f1,
    mem: newMem,
    total_roses: total_roses,
    status: true,
    timeStamp: timeNow,
  });
};
const wowpay = async (req, res) => {
  let auth = req.cookies.auth;
  let money = req.body.money;

  // Fetching the user's mobile number from the database using auth token

  // Your existing controller code here
};

const recharge = async (req, res) => {
  let auth = req.cookies.auth;
  let rechid = req.cookies.orderid;
  let money = req.body.amount;
  let type = req.body.type;
  let typeid = req.body.typeid;
  let utr = req.body.utr;
  console.log("req.body:", req.body);
  if (type != "cancel" && type != "submit" && type != "submitauto") {
    if (!auth || !money || money <= 299) {
      return res.status(200).json({
        message: "Minimum recharge 300",
        status: false,
        timeStamp: timeNow,
      });
    }
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite`,`isdemo` FROM users WHERE `token` = ?",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  if (userInfo.isdemo == 1) {
    let time = new Date().getTime();
    const date = new Date();

    let checkTime = timerJoin(Date.now());
    let id_time =
      date.getUTCFullYear() +
      "" +
      date.getUTCMonth() +
      1 +
      "" +
      date.getUTCDate();
    let id_order =
      Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) +
      10000000000000;
    // let vat = Math.floor(Math.random() * (2000 - 0 + 1) ) + 0;

    money = Number(money);
    let client_transaction_id = id_time + id_order;

    const sql = `INSERT INTO recharge SET
            id_order = ?,
            transaction_id = ?,
            phone = ?,
            money = ?,
            type = ?,
            status = ?,
            today = ?,
            url = ?,
            isdemo=?,
            time = ?`;
    await connection.execute(sql, [
      client_transaction_id,
      "0",
      userInfo.phone,
      money,
      "demo",
      1,
      checkTime,
      "1",
      userInfo.isdemo,
      checkTime,
    ]);

    await connection.execute(
      "UPDATE users SET money = money + ? WHERE phone = ? ",
      [money, userInfo.phone]
    );
    return res.status(200).json({
      message: "Demo Amount is added",
      status: false,
      timeStamp: timeNow,
    });
  }
  if (type == "bank") {
    return res.status(200).json({
      message: "Order creation successful",
      pay: true,
      phone: userInfo.phone,
      orderid: client_transaction_id,
      status: true,
      timeStamp: timeNow,
    });
  }
  if (type == "submit") {
    const [utrcount] = await connection.query(
      "SELECT * FROM recharge WHERE utr = ? ",
      [utr]
    );
    if (utrcount.length == 0) {
      await connection.query(
        "UPDATE recharge SET utr = ? WHERE phone = ? AND id_order = ? AND status = ? ",
        [utr, userInfo.phone, typeid, 0]
      );
      return res.status(200).json({
        message: "Submit successful",
        status: true,
        timeStamp: timeNow,
      });
    } else {
      return res.status(200).json({
        message: "UTR already submitted",
        status: true,
        timeStamp: timeNow,
      });
    }
  }

  let time = new Date().getTime();
  const date = new Date();

  let checkTime = timerJoin(Date.now());
  let id_time =
    date.getUTCFullYear() +
    "" +
    date.getUTCMonth() +
    1 +
    "" +
    date.getUTCDate();
  let id_order =
    Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) +
    10000000000000;
  // let vat = Math.floor(Math.random() * (2000 - 0 + 1) ) + 0;

  money = Number(money);
  let client_transaction_id = id_time + id_order;

  const sql = `INSERT INTO recharge SET
      id_order = ?,
      transaction_id = ?,
      phone = ?,
      money = ?,
      type = ?,
      status = ?,
      today = ?,
      url = ?,
      isdemo=?,
      time = ?`;
  await connection.execute(sql, [
    client_transaction_id,
    "0",
    userInfo.phone,
    money,
    type,
    0,
    checkTime,
    "0",
    userInfo.isdemo,
    checkTime,
  ]);
  return res.status(200).json({
    message: "Order creation successful",
    pay: true,
    orderid: client_transaction_id,
    status: true,
    timeStamp: timeNow,
  });
};

const cancelRecharge = async (req, res) => {
  try {
    let auth = req.cookies.auth;

    if (!auth) {
      return res.status(200).json({
        message: "Authorization is required to access this API!",
        status: false,
        timeStamp: timeNow,
      });
    }

    const [user] = await connection.query(
      "SELECT `phone`, `code`,`name_user`,`invite` FROM users WHERE `token` = ? ",
      [auth]
    );

    if (!user) {
      return res.status(200).json({
        message: "Authorization is required to access this API!",
        status: false,
        timeStamp: timeNow,
      });
    }

    let userInfo = user[0];

    const result = await connection.query(
      "DELETE FROM recharge WHERE phone = ? AND status = ?",
      [userInfo.phone, 0]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "All the pending recharges has been deleted successfully!",
        status: true,
        timeStamp: timeNow,
      });
    } else {
      return res.status(200).json({
        message:
          "There was no pending recharges for this user or delete operation has been failed!",
        status: true,
        timeStamp: timeNow,
      });
    }
  } catch (error) {
    console.error("API error: ", error);
    return res.status(500).json({
      message: "API Request failed!",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const addBank = async (req, res) => {
  let auth = req.cookies.auth;
  let name_bank = req.body.name_bank;
  let name_user = req.body.name_user;
  let stk = req.body.stk;
  let email = req.body.email;
  let sdt = req.body.sdt;
  let tinh = req.body.tinh;
  let chi_nhanh = req.body.usdt;

  let time = timerJoin(Date.now());

  if (!auth || !name_bank || !name_user || !stk || !email || !tinh) {
    return res.status(200).json({
      message: "Please enter all field",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Invalid user",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user_bank] = await connection.query(
    "SELECT * FROM user_bank WHERE tinh = ? ",
    [tinh]
  );

  const [user_bank2] = await connection.query(
    "SELECT * FROM user_bank WHERE phone = ? ",
    [userInfo.phone]
  );

  const [banks] = await connection.query(
    "SELECT * FROM user_bank WHERE stk = ? ",
    [stk]
  );

  if (tinh != userInfo.phone) {
    return res.status(200).json({
      message: "Invalid phone number",
      status: false,
    });
  }

  if (banks.length > 0) {
    return res.status(200).json({
      message: "Your bank is Already used in another account",
      status: false,
    });
  }

  if (user_bank.length == 0 && user_bank2.length == 0) {
    const sql = `INSERT INTO user_bank SET 
        phone = ?,
        name_bank = ?,
        name_user = ?,
        stk = ?,
        email = ?,
        sdt = ?,
        tinh = ?,
        chi_nhanh=?,
        time = ?`;
    await connection.execute(sql, [
      userInfo.phone,
      name_bank,
      name_user,
      stk,
      email,
      "0",
      tinh,
      "0",
      time,
    ]);

    return res.status(200).json({
      message: "Successfully added bank",
      status: true,
      timeStamp: timeNow,
    });
    // } else if (user_bank.length == 0) {
    //     await connection.query('UPDATE user_bank SET tinh = ? WHERE phone = ? ', [tinh, userInfo.phone]);
    //     return res.status(200).json({
    //         message: 'KYC Already Done',
    //         status: false,
    //         timeStamp: timeNow,
    //     });
  } else if (user_bank2.length > 0) {
    await connection.query(
      "UPDATE user_bank SET name_bank = ?, name_user = ?, stk = ?, email = ?, sdt = ?, tinh = ?,chi_nhanh=?, time = ? WHERE phone = ?",
      [name_bank, name_user, stk, email, "0", tinh, "0", time, userInfo.phone]
    );
    return res.status(200).json({
      message: "your account is updated",
      status: true,
      timeStamp: timeNow,
    });
  }
};

const infoUserBank = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite`, `money` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  function formateT(params) {
    let result = params < 10 ? "0" + params : params;
    return result;
  }

  function timerJoin(params = "", addHours = 0) {
    let date = "";
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

    return (
      years +
      "-" +
      months +
      "-" +
      days +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      ampm
    );
  }
  let date = new Date().getTime();
  let checkTime = timerJoin(date);
  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? AND status = 1",
    [userInfo.phone]
  );
  const [minutes_1] = await connection.query(
    "SELECT * FROM minutes_1 WHERE phone = ?",
    [userInfo.phone]
  );
  let total = 0;
  recharge.forEach((data) => {
    total += parseFloat(data.money);
  });
  let total2 = 0;
  minutes_1.forEach((data) => {
    total2 += parseFloat(data.money);
  });
  let fee = 0;
  minutes_1.forEach((data) => {
    fee += parseFloat(data.fee);
  });

  result = Math.max(result, 0);
  let result = 0;
  if (total - total2 > 0) result = total - total2 - fee;

  const [userBank] = await connection.query(
    "SELECT * FROM user_bank WHERE phone = ? ",
    [userInfo.phone]
  );
  return res.status(200).json({
    message: "Received successfully",
    datas: userBank,
    userInfo: user,
    result: result,
    status: true,
    timeStamp: timeNow,
  });
};

const withdrawal3 = async (req, res) => {
  let auth = req.cookies.auth;
  let type = req.body.type;
  let money = req.body.money;
  let password = req.body.password;
  if (!auth || !money || money < 309) {
    return res.status(200).json({
      message: "Minimum amount 310",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT * FROM users WHERE `token` = ? AND password = ?",
    [auth, md5(password)]
  );

  if (user.length == 0) {
    return res.status(200).json({
      message: "Invalid user",
      status: false,
      timeStamp: timeNow,
    });
  }

  let userInfo = user[0];

  const date = new Date();
  let id_time =
    date.getUTCFullYear() +
    "" +
    date.getUTCMonth() +
    1 +
    "" +
    date.getUTCDate();
  let id_order =
    Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) +
    10000000000000;

  let dates = timerJoin(Date.now());
  let checkTime = timerJoin(Date.now());

  function timerJoin4(params = "", addHours = 0) {
    let date = "";
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

    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());

    return years + "-" + months + "-" + days;
  }

  let checkTime4 = timerJoin4(Date.now());

  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? AND status = 1",
    [userInfo.phone]
  );
  const [minutes_1] = await connection.query(
    "SELECT * FROM minutes_1 WHERE phone = ?",
    [userInfo.phone]
  );
  let total = 0;
  recharge.forEach((data) => {
    total += parseFloat(data.money);
  });
  let total2 = 0;
  minutes_1.forEach((data) => {
    total2 += parseFloat(data.money);
  });
  let result = 0;
  if (total - total2 > 0) result = total - total2;
  result = Math.max(result, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
  const [user_bank] = await connection.query(
    "SELECT * FROM user_bank WHERE `phone` = ?",
    [userInfo.phone]
  );
  let needbet = userInfo.needbet;
  const [withdraw] = await connection.query(
    "SELECT * FROM withdraw WHERE `phone` = ? AND DATE(time)=?",
    [userInfo.phone, checkTime4]
  );

  if (userInfo.isdemo == 1) {
    let infoBank = user_bank[0];

    const sql = `INSERT INTO withdraw SET 
                            id_order = ?,
                            phone = ?,
                            money = ?,
                            stk = ?,
                            sdt = ?,
                            type=?,
                            usdt=?,
                            name_bank = ?,
                            ifsc = ?,
                            name_user = ?,
                            status = ?,
                            today = ?,
                            isdemo=?,
                            time = ?`;
    await connection.execute(sql, [
      id_time + "" + id_order,
      userInfo.phone,
      money,
      "demo",
      "demo",
      "demo",
      "demo",
      "demo",
      "demo",
      "demo",
      "1",
      checkTime,
      userInfo.isdemo,
      dates,
    ]);

    await connection.execute(
      "UPDATE users SET money = money - ? WHERE phone = ? ",
      [money, userInfo.phone]
    );
    return res.status(200).json({
      message: "Withdrawal successful",
      status: true,
      money: userInfo.money - money,
      timeStamp: timeNow,
    });
  }

  if (user_bank.length != 0) {
    if (withdraw.length < 3) {
      if (userInfo.money - money >= 0) {
        if (needbet == 0) {
          let infoBank = user_bank[0];
          const sql = `INSERT INTO withdraw SET 
                            id_order = ?,
                            phone = ?,
                            money = ?,
                            stk = ?,
                            sdt = ?,
                            type=?,
                            usdt=?,
                            name_bank = ?,
                            ifsc = ?,
                            name_user = ?,
                            status = ?,
                            today = ?,
                            isdemo=?,
                            time = ?`;
          await connection.execute(sql, [
            id_time + "" + id_order,
            userInfo.phone,
            money,
            infoBank.stk,
            infoBank.sdt,
            type,
            infoBank.chi_nhanh,
            infoBank.name_bank,
            infoBank.email,
            infoBank.name_user,
            0,
            checkTime,
            userInfo.isdemo,
            dates,
          ]);

          await connection.execute(
            "UPDATE users SET money = money - ? WHERE phone = ? ",
            [money, userInfo.phone]
          );
          return res.status(200).json({
            message: "Withdrawal successful",
            status: true,
            money: userInfo.money - money,
            timeStamp: timeNow,
          });
        } else {
          return res.status(200).json({
            message: "The total bet is not enough to fulfill the request",
            status: false,
            result: result,
            timeStamp: timeNow,
          });
        }
      } else {
        return res.status(200).json({
          message: "The balance is not enough to fulfill the request",
          status: false,
          timeStamp: timeNow,
        });
      }
    } else {
      return res.status(200).json({
        message: "You can only make 3 withdrawals  request per day",
        status: false,
        timeStamp: timeNow,
      });
    }
  } else {
    return res.status(200).json({
      message: "Please link your bank first",
      status: false,
      timeStamp: timeNow,
    });
  }
};
const transfer = async (req, res) => {
  let auth = req.cookies.auth;
  let amount = req.body.amount;
  let receiver_phone = req.body.phone;
  const date = new Date();
  // let id_time = date.getUTCFullYear() + '' + (date.getUTCMonth() + 1) + '' + date.getUTCDate();
  let id_order =
    Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) +
    10000000000000;
  let time = timerJoin(Date.now());
  let client_transaction_id = id_order;

  const [user] = await connection.query(
    "SELECT `phone`,`money`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  let sender_phone = userInfo.phone;
  let sender_money = parseInt(userInfo.money);
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }

  function formateT(params) {
    let result = params < 10 ? "0" + params : params;
    return result;
  }

  function timerJoin(params = "", addHours = 0) {
    let date = "";
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

    return (
      years +
      "-" +
      months +
      "-" +
      days +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      ampm
    );
  }

  let dates = timerJoin(Date.now());
  let checkTime = timerJoin(Date.now());
  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? AND status = 1 ",
    [userInfo.phone]
  );
  const [minutes_1] = await connection.query(
    "SELECT * FROM minutes_1 WHERE phone = ? ",
    [userInfo.phone]
  );
  let total = 0;
  recharge.forEach((data) => {
    total += data.money;
  });
  let total2 = 0;
  minutes_1.forEach((data) => {
    total2 += data.money;
  });

  let result = 0;
  if (total - total2 > 0) result = total - total2;

  // console.log('date:', result);
  if (result == 0) {
    if (sender_money >= amount) {
      let [receiver] = await connection.query(
        "SELECT * FROM users WHERE `phone` = ?",
        [receiver_phone]
      );
      if (receiver.length === 1 && sender_phone !== receiver_phone) {
        let money = sender_money - amount;
        let total_money = amount + receiver[0].total_money;
        // await connection.query('UPDATE users SET money = ? WHERE phone = ?', [money, sender_phone]);
        // await connection.query(`UPDATE users SET money = money + ? WHERE phone = ?`, [amount, receiver_phone]);
        const sql =
          "INSERT INTO balance_transfer (sender_phone, receiver_phone, amount) VALUES (?, ?, ?)";
        await connection.execute(sql, [sender_phone, receiver_phone, amount]);
        const sql_recharge =
          "INSERT INTO recharge (id_order, transaction_id, phone, money, type, status, today, url, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await connection.execute(sql_recharge, [
          client_transaction_id,
          0,
          receiver_phone,
          amount,
          "wallet",
          0,
          checkTime,
          0,
          time,
        ]);

        return res.status(200).json({
          message: `Requested ${amount} sent successfully`,
          status: true,
          timeStamp: timeNow,
        });
      } else {
        return res.status(200).json({
          message: `${receiver_phone} is not a valid user mobile number`,
          status: false,
          timeStamp: timeNow,
        });
      }
    } else {
      return res.status(200).json({
        message: "Your balance is not enough",
        status: false,
        timeStamp: timeNow,
      });
    }
  } else {
    return res.status(200).json({
      message: "The total bet is not enough to fulfill the request",
      status: false,
      timeStamp: timeNow,
    });
  }
};

// get transfer balance data
const transferHistory = async (req, res) => {
  let auth = req.cookies.auth;

  const [user] = await connection.query(
    "SELECT `phone`,`money`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [history] = await connection.query(
    "SELECT * FROM balance_transfer WHERE sender_phone = ?",
    [userInfo.phone]
  );
  const [receive] = await connection.query(
    "SELECT * FROM balance_transfer WHERE receiver_phone = ?",
    [userInfo.phone]
  );
  if (receive.length > 0 || history.length > 0) {
    return res.status(200).json({
      message: "Success",
      receive: receive,
      datas: history,
      status: true,
      timeStamp: timeNow,
    });
  }
};
// const recharge2 = async (req, res) => {
//   let auth = req.cookies.auth;
//   let money = req.body.money;
//   if (!auth) {
//     return res.status(200).json({
//       message: "Failed",
//       status: false,
//       timeStamp: timeNow,
//     });
//   }
//   const [user] = await connection.query(
//     "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
//     [auth]
//   );
//   let userInfo = user[0];
//   if (!user) {
//     return res.status(200).json({
//       message: "Failed",
//       status: false,
//       timeStamp: timeNow,
//     });
//   }
//   const [recharge] = await connection.query(
//     "SELECT * FROM recharge WHERE phone = ? AND status = ? ORDER BY id DESC LIMIT 1",
//     [userInfo.phone, 0]
//   );

//   const [bank_recharge] = await connection.query("SELECT * FROM bank_recharge");
//   if (recharge.length != 0) {
//     return res.status(200).json({
//       message: "Received successfully",
//       datas: recharge[0],
//       infoBank: bank_recharge,
//       status: true,
//       timeStamp: timeNow,
//     });
//   } else {
//     return res.status(200).json({
//       message: "Failed",
//       status: false,
//       timeStamp: timeNow,
//     });
//   }
// };

const generateQRCode = async (data) => {
  try {
    let qrCodeDataURL = await QRCode.toDataURL(data);
    console.log("QR Code generated successfully.");
    return qrCodeDataURL;
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

const recharge2 = async (req, res) => {
  let auth = req.cookies.auth;
  let money = req.body.money;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? AND status = ? ORDER BY id DESC LIMIT 1",
    [userInfo.phone, 0]
  );

  const [bank_recharge] = await connection.query("SELECT * FROM bank_recharge");

  const upiUrl1 = `upi://pay?pa=${bank_recharge[0]?.stk}&pn="bdg"&am=${recharge[0].money}`;
  const qrcode1 = await generateQRCode(upiUrl1);

  const upiUrl2 = `upi://pay?pa=${bank_recharge[0]?.upi2}&pn="bdg"&am=${recharge[0].money}`;
  const qrcode2 = await generateQRCode(upiUrl2);
  const upiUrl3 = `upi://pay?pa=${bank_recharge[0]?.upi3}&pn="bdg"&am=${recharge[0].money}`;
  const qrcode3 = await generateQRCode(upiUrl3);

  if (recharge.length != 0) {
    return res.status(200).json({
      message: "Received successfully",
      datas: recharge[0],
      infoBank: bank_recharge,
      qrcode1: qrcode1,
      qrcode2: qrcode2,
      qrcode3: qrcode3,
      status: true,
      timeStamp: timeNow,
    });
  } else {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const listRecharge = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? ORDER BY id DESC ",
    [userInfo.phone]
  );
  return res.status(200).json({
    message: "Receive success",
    datas: recharge,
    status: true,
    timeStamp: timeNow,
  });
};

const search = async (req, res) => {
  let auth = req.cookies.auth;
  let phone = req.body.phone;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite`, `level` FROM users WHERE `token` = ? ",
    [auth]
  );
  if (user.length == 0) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  let userInfo = user[0];
  if (userInfo.level == 1) {
    const [users] = await connection.query(
      `SELECT * FROM users WHERE phone = ? ORDER BY id DESC `,
      [phone]
    );
    return res.status(200).json({
      message: "Receive success",
      datas: users,
      status: true,
      timeStamp: timeNow,
    });
  } else if (userInfo.level == 2) {
    const [users] = await connection.query(
      `SELECT * FROM users WHERE phone = ? ORDER BY id DESC `,
      [phone]
    );
    if (users.length == 0) {
      return res.status(200).json({
        message: "Receive success",
        datas: [],
        status: true,
        timeStamp: timeNow,
      });
    } else {
      if (users[0].ctv == userInfo.phone) {
        return res.status(200).json({
          message: "Receive success",
          datas: users,
          status: true,
          timeStamp: timeNow,
        });
      } else {
        return res.status(200).json({
          message: "Failed",
          status: false,
          timeStamp: timeNow,
        });
      }
    }
  } else {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const downlinerecharge = async (req, res) => {
  let auth = req.cookies.auth;

  let date = getPreviousDateInIndia();

  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: new Date().getTime(),
    });
  }

  try {
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite` FROM users WHERE `token` = ?",
      [auth]
    );
    if (!user) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    let userInfo = user[0];

    // Fetch all users up to 6 levels in one query
    const [allUsers] = await connection.query(
      `
        WITH RECURSIVE InviteCTE AS (
            SELECT id_user, name_user, phone, code, invite, rank, total_money, 1 AS depth
            FROM users
            WHERE invite = ?
            UNION ALL
            SELECT u.id_user, u.name_user, u.phone, u.code, u.invite, u.rank, u.total_money, c.depth + 1
            FROM users u
            INNER JOIN InviteCTE c ON u.invite = c.code
            WHERE c.depth < 6
        )
        SELECT * FROM InviteCTE;
    `,
      [userInfo.code]
    );

    // Collect recharge data for each user using Promises
    const rechargePromises = allUsers.map(async (user) => {
      const [userCombinedTotal] = await connection.query(
        `
        SELECT IFNULL(SUM(overall_total_money), 0) as grand_total_money
        FROM (
            SELECT SUM(\`money\`) as overall_total_money 
            FROM minutes_1 
            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_k3 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_5d 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
        ) combined_table
        `,
        [user.phone, date, user.phone, date, user.phone, date]
      );

      const [rechargeRecord] = await connection.query(
        `
        SELECT IFNULL(SUM(\`money\`), 0) as grand_total_money 
        FROM \`recharge\` 
        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
        `,
        [user.phone, date]
      );

      const [deposits] = await connection.query(
        `
        SELECT \`id\`, \`id_order\`, \`transaction_id\`, \`utr\`, \`phone\`, \`money\`, \`type\`, \`status\`, \`today\`, \`url\`, \`time\` 
        FROM \`recharge\` 
        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
        `,
        [user.phone, date]
      );

      const [userCombinedTotalCount] = await connection.query(
        `
        SELECT COUNT(*) AS row_count
        FROM (
            SELECT phone 
            FROM minutes_1 
            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
            UNION ALL
            SELECT phone 
            FROM result_k3 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
            UNION ALL
            SELECT phone 
            FROM result_5d 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
        ) AS combined_table
        `,
        [user.phone, date, user.phone, date, user.phone, date]
      );

      const [commissions] = await connection.query(
        `
        SELECT SUM(\`commission\`) as total_subordinatedata_amount
        FROM \`subordinatedata\`
        WHERE \`phone\` = ? AND DATE(\`date\`) = ?
        `,
        [user.phone, date]
      );

      const totalCommissionsAmount =
        commissions[0]?.total_subordinatedata_amount || 0;
      const rowCount = userCombinedTotalCount[0]?.row_count || 0;
      const isBetter =
        parseFloat(userCombinedTotal[0]?.grand_total_money || 0) > 0;

      return {
        totalBetAmount: parseFloat(
          userCombinedTotal[0]?.grand_total_money || 0
        ),
        totalRechargeAmount: parseFloat(
          rechargeRecord[0]?.grand_total_money || 0
        ),
        totalCommissionsAmount,
        userLevel: user.depth, // Using depth as level
        userId: user.id_user,
        dates: user.time,
        rechargeCount: deposits.length,
        betCount: rowCount,
        isBetter,
        firstRecharge: deposits.length > 0,
      };
    });

    let rechargeData = await Promise.all(rechargePromises);

    rechargeData = rechargeData.filter(
      (data) =>
        data.totalBetAmount > 0 ||
        data.totalRechargeAmount > 0 ||
        data.totalCommissionsAmount > 0
    );

    // Calculate totals
    const total_first_recharge_count = rechargeData.filter(
      (data) => data.firstRecharge
    ).length;
    const total_recharge_count = rechargeData.reduce(
      (sum, data) => sum + data.rechargeCount,
      0
    );
    const total_recharge_amount = rechargeData.reduce(
      (sum, data) => sum + data.totalRechargeAmount,
      0
    );
    const total_bet_count = rechargeData.reduce(
      (sum, data) => sum + data.betCount,
      0
    );
    const total_bet_amount = rechargeData.reduce(
      (sum, data) => sum + data.totalBetAmount,
      0
    );
    const better_number = rechargeData.filter((data) => data.isBetter).length;

    // Group data by levels for the additional array
    const levelData = rechargeData.reduce((acc, data) => {
      const level = data.userLevel;
      if (!acc[level]) {
        acc[level] = {
          total_first_recharge_count: 0,
          total_recharge_count: 0,
          total_recharge_amount: 0,
          total_bet_count: 0,
          total_bet_amount: 0,
          better_number: 0,
        };
      }

      acc[level].total_first_recharge_count += data.firstRecharge ? 1 : 0;
      acc[level].total_recharge_count += data.rechargeCount;
      acc[level].total_recharge_amount += data.totalRechargeAmount;
      acc[level].total_bet_count += data.betCount;
      acc[level].total_bet_amount += data.totalBetAmount;
      acc[level].better_number += data.isBetter ? 1 : 0;
      return acc;
    }, {});

    // Convert levelData object into an array
    const levelDataArray = Object.keys(levelData).map((level) => ({
      level: parseInt(level),
      ...levelData[level],
    }));

    return res.status(200).json({
      message: "Success",
      status: true,
      timeStamp: new Date().getTime(),
      total_first_recharge_count,
      total_recharge_count,
      total_recharge_amount,
      date,
      total_bet_count,
      total_bet_amount,
      better_number,
      datas: rechargeData,
      levelData: levelDataArray, // Additional array with level-specific data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message: error.message,
      status: false,
      timeStamp: new Date().getTime(),
    });
  }
};

//const downlinerecharge_data = async (req, res) => {
//  let auth = req.cookies.auth;
//  const { date } = req.body;
//
//  if (!auth) {
//    return res.status(200).json({
//      message: "Failed",
//      status: false,
//      timeStamp: new Date().getTime(),
//    });
//  }
//
//  try {
//    // Fetch user information based on the provided token
//    const [user] = await connection.query(
//      "SELECT `phone`, `code`, `invite` FROM users WHERE `token` = ?",
//      [auth]
//    );
//
//    if (!user.length) {
//      return res.status(200).json({
//        message: "Failed",
//        status: false,
//        timeStamp: new Date().getTime(),
//      });
//    }
//
//    let userInfo = user[0];
//
//    // Fetch all downline users up to 6 levels deep
//    const [allUsers] = await connection.query(
//      `
//        WITH RECURSIVE InviteCTE AS (
//            SELECT id_user, name_user, phone, code, invite, rank, total_money, 1 AS depth
//            FROM users
//            WHERE invite = ?
//            UNION ALL
//            SELECT u.id_user, u.name_user, u.phone, u.code, u.invite, u.rank, u.total_money, c.depth + 1
//            FROM users u
//            INNER JOIN InviteCTE c ON u.invite = c.code
//            WHERE c.depth < 6
//        )
//        SELECT * FROM InviteCTE;
//      `,
//      [userInfo.code]
//    );
//    const commissionRatios = {
//      1: 0.006,
//      2: 0.0018,
//      3: 0.00054,
//      4: 0.00016,
//      5: 0.000048,
//      6: 0.000014,
//    };
//    // Collect recharge data for each user using Promises
//    const rechargePromises = allUsers.map(async (user) => {
//
//        const levelRatio = commissionRatios[user.depth] || 0;
//      const [userCombinedTotal] = await connection.query(
//        `
//        SELECT IFNULL(SUM(overall_total_money), 0) as grand_total_money
//        FROM (
//            SELECT SUM(\`money\`) as overall_total_money
//            FROM minutes_1
//            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
//            UNION ALL
//            SELECT SUM(\`money\`) as overall_total_money
//            FROM result_k3
//            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
//            UNION ALL
//            SELECT SUM(\`money\`) as overall_total_money
//            FROM result_5d
//            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
//        ) combined_table
//        `,
//        [user.phone, date, user.phone, date, user.phone, date]
//      );
//
//      const [rechargeRecord] = await connection.query(
//        `
//        SELECT IFNULL(SUM(\`money\`), 0) as grand_total_money
//        FROM \`recharge\`
//        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
//        `,
//        [user.phone, date]
//      );
//
//      const [deposits] = await connection.query(
//        `
//        SELECT \`id\`, \`id_order\`, \`transaction_id\`, \`utr\`, \`phone\`, \`money\`, \`type\`, \`status\`, //\`today\`, \`url\`, \`time\`
//        FROM \`recharge\`
//        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
//        `,
//        [user.phone, date]
//      );
//
//      const [userCombinedTotalCount] = await connection.query(
//        `
//        SELECT COUNT(*) AS row_count
//        FROM (
//            SELECT phone
//            FROM minutes_1
//            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
//            UNION ALL
//            SELECT phone
//            FROM result_k3
//            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
//            UNION ALL
//            SELECT phone
//            FROM result_5d
//            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
//        ) AS combined_table
//        `,
//        [user.phone, date, user.phone, date, user.phone, date]
//      );
//
//      //const [commissions] = await connection.query(
//      //  `
//      //  SELECT SUM(\`commission\`) as total_subordinatedata_amount
//      //  FROM \`subordinatedata\`
//      //  WHERE \`phone\` = ? AND DATE(\`date\`) = ?
//      //  `,
//      //  [user.phone, date]
//      //);
////
//      //const totalCommissionsAmount = parseFloat(commissions[0]?.total_subordinatedata_amount || 0).toFixed(2);
//
//      const rowCount = userCombinedTotalCount[0]?.row_count || 0;
//      const isBetter = parseFloat(userCombinedTotal[0]?.grand_total_money || 0) > 0;
//      const totalCommissionsAmount = parseFloat((parseFloat(userCombinedTotal[0]?.grand_total_money || 0) * //levelRatio).toFixed(2));
//        let date1 = new Date(date);
//        date1.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
//
//
//        let timestamp = date1.getTime();
//
//
//        //console.log(timestamp);
//      return {
//        totalBetAmount: parseFloat(userCombinedTotal[0]?.grand_total_money || 0).toFixed(2),
//        totalRechargeAmount: parseFloat(rechargeRecord[0]?.grand_total_money || 0).toFixed(2),
//        totalCommsionsAmount: totalCommissionsAmount,
//        userLevel: user.depth, // Using depth as level
//        userId: user.id_user,
//        dates: timestamp,
//        rechargeCount: deposits.length,
//        betCount: rowCount,
//        isBetter,
//        firstRecharge: deposits.length > 0,
//      };
//    });
//
//    let rechargeData = await Promise.all(rechargePromises);
//
//    // Filter users with non-zero values
//    rechargeData = rechargeData.filter(
//      (data) =>
//        data.totalBetAmount > 0 ||
//        data.totalRechargeAmount > 0 ||
//        data.totalCommissionsAmount > 0
//    );
//
//    // Calculate totals
//    const total_first_recharge_count = rechargeData.filter((data) => data.firstRecharge).length;
//    const total_recharge_count = rechargeData.reduce((sum, data) => sum + data.rechargeCount, 0);
//    const total_recharge_amount = rechargeData.reduce((sum, data) => sum + parseFloat(data.totalRechargeAmount), //0).toFixed(2);
//    const total_bet_count = rechargeData.reduce((sum, data) => sum + data.betCount, 0);
//    const total_bet_amount = rechargeData.reduce((sum, data) => sum + parseFloat(data.totalBetAmount), 0//).toFixed(2);
//    const better_number = rechargeData.filter((data) => data.isBetter).length;
//
//    // Group data by levels for the additional array
//    const levelData = rechargeData.reduce((acc, data) => {
//      const level = data.userLevel;
//      if (!acc[level]) {
//        acc[level] = {
//          total_first_recharge_count: 0,
//          total_recharge_count: 0,
//          total_recharge_amount: 0,
//          total_bet_count: 0,
//          total_bet_amount: 0,
//          better_number: 0,
//        };
//      }
//
//      acc[level].total_first_recharge_count += data.firstRecharge ? 1 : 0;
//      acc[level].total_recharge_count += data.rechargeCount;
//      acc[level].total_recharge_amount += parseFloat(data.totalRechargeAmount);
//      acc[level].total_bet_count += data.betCount;
//      acc[level].total_bet_amount += parseFloat(data.totalBetAmount);
//      acc[level].better_number += data.isBetter ? 1 : 0;
//      return acc;
//    }, {});
//
//    // Convert levelData object into an array
//    const levelDataArray = Object.keys(levelData).map((level) => ({
//      level: parseInt(level),
//      total_first_recharge_count: levelData[level].total_first_recharge_count,
//      total_recharge_count: levelData[level].total_recharge_count,
//      total_recharge_amount: levelData[level].total_recharge_amount.toFixed(2),
//      total_bet_count: levelData[level].total_bet_count,
//      total_bet_amount: levelData[level].total_bet_amount.toFixed(2),
//      better_number: levelData[level].better_number,
//    }));
//
//    // Return the results
//    return res.status(200).json({
//      message: "Success",
//      status: true,
//      timeStamp: new Date().getTime(),
//      total_first_recharge_count,
//      total_recharge_count,
//      total_recharge_amount,
//      date,
//      total_bet_count,
//      total_bet_amount,
//      better_number,
//      datas: rechargeData,
//      levelData: levelDataArray, // Additional array with level-specific data
//    });
//  } catch (error) {
//    console.error("Error fetching data:", error);
//    return res.status(500).json({
//      message: error.message,
//      status: false,
//      timeStamp: new Date().getTime(),
//    });
//  }
//};

const downlinerecharge_data = async (req, res) => {
  let auth = req.cookies.auth;
  const { date } = req.body;

  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: new Date().getTime(),
    });
  }

  try {
    // Fetch user information based on the provided token
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite` FROM users WHERE `token` = ?",
      [auth]
    );

    if (!user.length) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    let userInfo = user[0];

    // Set the date to yesterday for fetching data

    const formattedDate = date;

    // Fetch user data for multiple levels of deposits and bets
    const [userDataResult] = await connection.query(
      "SELECT * FROM user_data WHERE phone = ? AND date = ?",
      [userInfo.phone, formattedDate]
    );

    if (!userDataResult || userDataResult.length === 0) {
      return res.status(200).json({
        message: "No user data found",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    let userData = userDataResult[0];

    // Initialize overall counts and amounts
    let total_first_recharge_count = 0;
    let total_recharge_count = 0;
    let total_recharge_amount = 0.0;
    let total_bet_count = 0;
    let total_bet_amount = 0.0;
    let better_number = 0;
    let totalCommissions = 0.0;

    // Initialize level data array to hold data for each level
    let levelDataArray = [];

    // Iterate through levels 1 to 6 and calculate the relevant values
    for (let i = 1; i <= 6; i++) {
      let levelData = {
        level: i,
        total_first_recharge_count:
          parseFloat(userData[`firstrechagepeole_today_${i}`]) || 0,
        total_recharge_count:
          parseFloat(userData[`depositnumber_today_${i}`]) || 0,
        total_recharge_amount:
          parseFloat(userData[`depositamount_today_${i}`]) || 0,
        total_bet_count: parseFloat(userData[`totalbetcount_today_${i}`]) || 0,
        total_bet_amount:
          parseFloat(userData[`totalbetamount_today_${i}`]) || 0,
        better_number: parseFloat(userData[`numberofbeter_today_${i}`]) || 0,
      };

      // Accumulate the totals for overall data
      total_first_recharge_count += levelData.total_first_recharge_count;
      total_recharge_count += levelData.total_recharge_count;
      total_recharge_amount += levelData.total_recharge_amount;
      total_bet_count += levelData.total_bet_count;
      total_bet_amount += levelData.total_bet_amount;
      better_number += levelData.better_number;

      // Add the level data to the array
      levelDataArray.push(levelData);
    }

    // Parse the bet_source column to get detailed user data
    let betSources = JSON.parse(userData.bet_sources || "[]");
    let dataResponseArray = [];

    // Define the commission percentages per level
    const commissionRates = {
      1: 0.6,
      2: 0.18,
      3: 0.054,
      4: 0.016,
      5: 0.0048,
      6: 0.0014,
    };

    // Loop through each source in bet_sources
    for (let source of betSources) {
      const { phone, level, userid } = source;

      // Fetch individual user data based on phone number
      const [individualDataResult] = await connection.query(
        "SELECT own_bet, own_recharge FROM user_data WHERE phone = ? AND date = ?",
        [phone, formattedDate]
      );

      if (individualDataResult && individualDataResult.length > 0) {
        let individualData = individualDataResult[0];
        let totalBetAmount = parseFloat(individualData.own_bet) || 0.0;
        let totalRechargeAmount =
          parseFloat(individualData.own_recharge) || 0.0;
        let commissionAmount = totalBetAmount * (commissionRates[level] || 0);

        // Add data to the response array
        dataResponseArray.push({
          totalBetAmount: totalBetAmount.toFixed(2),
          totalRechargeAmount: totalRechargeAmount.toFixed(2),
          totalCommsionsAmount: commissionAmount.toFixed(2),
          userLevel: level,
          phone: phone,
          userId: String(userid),
          dates: new Date(formattedDate).getTime(),
        });

        // Accumulate total commissions
        totalCommissions += commissionAmount;
      }
    }

    // Return the results
    return res.status(200).json({
      message: "Success",
      status: true,
      timeStamp: new Date().getTime(),
      total_first_recharge_count,
      total_recharge_count,
      total_recharge_amount: total_recharge_amount.toFixed(2),
      date: formattedDate,
      total_bet_count,
      total_bet_amount: total_bet_amount.toFixed(2),
      better_number,
      totalCommissions: totalCommissions.toFixed(2),
      levelData: levelDataArray, // Array with level-specific data
      datas: dataResponseArray, // Array with individual user data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message: error.message,
      status: false,
      timeStamp: new Date().getTime(),
    });
  }
};

const downlinerecharge_data_new = async (req, res) => {
  const { date, auth } = req.body;

  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: new Date().getTime(),
    });
  }

  try {
    // Fetch user information based on the provided token
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite` FROM users WHERE `token` = ?",
      [auth]
    );

    if (!user.length) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    let userInfo = user[0];

    // Fetch all downline users up to 6 levels deep
    const [allUsers] = await connection.query(
      `
        WITH RECURSIVE InviteCTE AS (
            SELECT id_user, name_user, phone, code, invite, rank, total_money, 1 AS depth
            FROM users
            WHERE invite = ?
            UNION ALL
            SELECT u.id_user, u.name_user, u.phone, u.code, u.invite, u.rank, u.total_money, c.depth + 1
            FROM users u
            INNER JOIN InviteCTE c ON u.invite = c.code
            WHERE c.depth < 6
        )
        SELECT * FROM InviteCTE;
      `,
      [userInfo.code]
    );
    const commissionRatios = {
      1: 0.006,
      2: 0.0018,
      3: 0.00054,
      4: 0.00016,
      5: 0.000048,
      6: 0.000014,
    };
    // Collect recharge data for each user using Promises
    const rechargePromises = allUsers.map(async (user) => {
      const levelRatio = commissionRatios[user.depth] || 0;
      const [userCombinedTotal] = await connection.query(
        `
        SELECT IFNULL(SUM(overall_total_money), 0) as grand_total_money
        FROM (
            SELECT SUM(\`money\`) as overall_total_money 
            FROM minutes_1 
            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_k3 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_5d 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
        ) combined_table
        `,
        [user.phone, date, user.phone, date, user.phone, date]
      );

      const [rechargeRecord] = await connection.query(
        `
        SELECT IFNULL(SUM(\`money\`), 0) as grand_total_money 
        FROM \`recharge\` 
        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
        `,
        [user.phone, date]
      );

      const [deposits] = await connection.query(
        `
        SELECT \`id\`, \`id_order\`, \`transaction_id\`, \`utr\`, \`phone\`, \`money\`, \`type\`, \`status\`, \`today\`, \`url\`, \`time\` 
        FROM \`recharge\` 
        WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
        `,
        [user.phone, date]
      );

      const [userCombinedTotalCount] = await connection.query(
        `
        SELECT COUNT(*) AS row_count
        FROM (
            SELECT phone 
            FROM minutes_1 
            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
            UNION ALL
            SELECT phone 
            FROM result_k3 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
            UNION ALL
            SELECT phone 
            FROM result_5d 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
        ) AS combined_table
        `,
        [user.phone, date, user.phone, date, user.phone, date]
      );

      //const [commissions] = await connection.query(
      //  `
      //  SELECT SUM(\`commission\`) as total_subordinatedata_amount
      //  FROM \`subordinatedata\`
      //  WHERE \`phone\` = ? AND DATE(\`date\`) = ?
      //  `,
      //  [user.phone, date]
      //);
      //
      //const totalCommissionsAmount = parseFloat(commissions[0]?.total_subordinatedata_amount || 0).toFixed(2);

      const rowCount = userCombinedTotalCount[0]?.row_count || 0;
      const isBetter =
        parseFloat(userCombinedTotal[0]?.grand_total_money || 0) > 0;
      const totalCommissionsAmount = parseFloat(
        (
          parseFloat(userCombinedTotal[0]?.grand_total_money || 0) * levelRatio
        ).toFixed(2)
      );
      let date1 = new Date(date);
      date1.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC

      let timestamp = date1.getTime();

      //console.log(timestamp);
      return {
        totalBetAmount: parseFloat(
          userCombinedTotal[0]?.grand_total_money || 0
        ).toFixed(2),
        totalRechargeAmount: parseFloat(
          rechargeRecord[0]?.grand_total_money || 0
        ).toFixed(2),
        totalCommsionsAmount: totalCommissionsAmount,
        userLevel: user.depth, // Using depth as level
        userId: user.id_user,
        dates: timestamp,
        rechargeCount: deposits.length,
        betCount: rowCount,
        isBetter,
        firstRecharge: deposits.length > 0,
      };
    });

    let rechargeData = await Promise.all(rechargePromises);

    // Filter users with non-zero values
    rechargeData = rechargeData.filter(
      (data) =>
        data.totalBetAmount > 0 ||
        data.totalRechargeAmount > 0 ||
        data.totalCommissionsAmount > 0
    );

    // Calculate totals
    const total_first_recharge_count = rechargeData.filter(
      (data) => data.firstRecharge
    ).length;
    const total_recharge_count = rechargeData.reduce(
      (sum, data) => sum + data.rechargeCount,
      0
    );
    const total_recharge_amount = rechargeData
      .reduce((sum, data) => sum + parseFloat(data.totalRechargeAmount), 0)
      .toFixed(2);
    const total_bet_count = rechargeData.reduce(
      (sum, data) => sum + data.betCount,
      0
    );
    const total_bet_amount = rechargeData
      .reduce((sum, data) => sum + parseFloat(data.totalBetAmount), 0)
      .toFixed(2);
    const better_number = rechargeData.filter((data) => data.isBetter).length;

    // Group data by levels for the additional array
    const levelData = rechargeData.reduce((acc, data) => {
      const level = data.userLevel;
      if (!acc[level]) {
        acc[level] = {
          total_first_recharge_count: 0,
          total_recharge_count: 0,
          total_recharge_amount: 0,
          total_bet_count: 0,
          total_bet_amount: 0,
          better_number: 0,
        };
      }

      acc[level].total_first_recharge_count += data.firstRecharge ? 1 : 0;
      acc[level].total_recharge_count += data.rechargeCount;
      acc[level].total_recharge_amount += parseFloat(data.totalRechargeAmount);
      acc[level].total_bet_count += data.betCount;
      acc[level].total_bet_amount += parseFloat(data.totalBetAmount);
      acc[level].better_number += data.isBetter ? 1 : 0;
      return acc;
    }, {});

    // Convert levelData object into an array
    const levelDataArray = Object.keys(levelData).map((level) => ({
      level: parseInt(level),
      total_first_recharge_count: levelData[level].total_first_recharge_count,
      total_recharge_count: levelData[level].total_recharge_count,
      total_recharge_amount: levelData[level].total_recharge_amount.toFixed(2),
      total_bet_count: levelData[level].total_bet_count,
      total_bet_amount: levelData[level].total_bet_amount.toFixed(2),
      better_number: levelData[level].better_number,
    }));

    // Return the results
    return res.status(200).json({
      message: "Success",
      status: true,
      timeStamp: new Date().getTime(),
      total_first_recharge_count,
      total_recharge_count,
      total_recharge_amount,
      date,
      total_bet_count,
      total_bet_amount,
      better_number,
      datas: rechargeData,
      levelData: levelDataArray, // Additional array with level-specific data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message: error.message,
      status: false,
      timeStamp: new Date().getTime(),
    });
  }
};

// subordinate data
const subordinatedata = async (req, res) => {
  let auth = req.cookies.auth;
  const timeNow = new Date().toISOString();
  let currentDate = getPreviousDateInIndia();

  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }

  try {
    // Fetch user info based on token
    const [user] = await connection.query(
      "SELECT `phone`, `money`, `code`, `invite`, `user_level` FROM users WHERE `token` = ?",
      [auth]
    );

    if (!user.length) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }

    let userInfo = user[0];

    // Fetch downline users up to 6 levels in one query using depth
    const [allInvites] = await connection.query(
      `
        WITH RECURSIVE InviteCTE AS (
          SELECT id_user, name_user, phone, code, invite, rank, total_money, 1 AS depth
          FROM users
          WHERE invite = ?
          UNION ALL
          SELECT u.id_user, u.name_user, u.phone, u.code, u.invite, u.rank, u.total_money, c.depth + 1
          FROM users u
          INNER JOIN InviteCTE c ON u.invite = c.code
          WHERE c.depth < 6
        )
        SELECT * FROM InviteCTE;
      `,
      [userInfo.code]
    );

    const commissionRatios = {
      1: 0.006,
      2: 0.0018,
      3: 0.00054,
      4: 0.00016,
      5: 0.000048,
      6: 0.000014,
    };

    // Collect recharge data for each downline user
    const rechargePromises = allInvites.map(async (user) => {
      const levelRatio = commissionRatios[user.depth] || 0;
      const [userCombinedTotal] = await connection.query(
        `
          SELECT IFNULL(SUM(overall_total_money), 0) as grand_total_money
          FROM (
            SELECT SUM(\`money\`) as overall_total_money 
            FROM minutes_1 
            WHERE \`phone\` = ? AND DATE(\`today\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_k3 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
            UNION ALL
            SELECT SUM(\`money\`) as overall_total_money 
            FROM result_5d 
            WHERE \`phone\` = ? AND DATE(\`bet_data\`) = ?
          ) combined_table
        `,
        [
          user.phone,
          currentDate,
          user.phone,
          currentDate,
          user.phone,
          currentDate,
        ]
      );

      const [rechargeRecord] = await connection.query(
        `
          SELECT IFNULL(SUM(\`money\`), 0) as grand_total_money 
          FROM \`recharge\` 
          WHERE \`phone\` = ? AND \`status\` = 1 AND DATE(\`today\`) = ?
        `,
        [user.phone, currentDate]
      );

      //const [commissions] = await connection.query(
      //  `
      //    SELECT SUM(\`commission\`) as total_subordinatedata_amount
      //    FROM \`subordinatedata\`
      //    WHERE \`phone\` = ? AND \`bonusby\` = ? AND DATE(\`date\`) = ?
      //  `,
      //  [userInfo.phone, user.phone, currentDate]
      //);
      //
      // const totalCommissionsAmount = await calculateTotalAmount(user.phone, userInfo.phone, currentDate);
      const isBetter =
        parseFloat(userCombinedTotal[0]?.grand_total_money || 0) > 0;
      const totalCommissionsAmount = parseFloat(
        (
          parseFloat(userCombinedTotal[0]?.grand_total_money || 0) * levelRatio
        ).toFixed(2)
      );

      return {
        phone: user.phone,
        name: user.name_user,
        userLevel: user.depth,
        userId: user.id_user,
        totalRechargeAmount: parseFloat(
          rechargeRecord[0]?.grand_total_money || 0
        ),
        totalBetAmount: parseFloat(
          userCombinedTotal[0]?.grand_total_money || 0
        ),
        totalCommsionsAmount: totalCommissionsAmount,
        isBetter,
        dates: currentDate,
      };
    });

    let rechargeData = await Promise.all(rechargePromises);

    // Filter users with non-zero values
    rechargeData = rechargeData.filter(
      (data) =>
        data.totalBetAmount > 0 ||
        data.totalRechargeAmount > 0 ||
        data.totalCommissionsAmount > 0
    );

    // Calculate totals
    const betterNumber = rechargeData.filter((data) => data.isBetter).length;

    // Group data by levels

    // Return the results
    return res.status(200).json({
      message: "Success",
      status: true,
      timeStamp: "2024-09-03T19:18:33.524Z",
      better_number: betterNumber,
      datas: rechargeData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      message: error.message,
      status: false,
      timeStamp: timeNow,
    });
  }
};

async function calculateTotalAmount(
  downlinePhone,
  uplinePhone,
  searchDate,
  level = 1
) {
  try {
    // Base case: stop if level exceeds 6
    if (level > 6) {
      console.log("Exceeded maximum levels.");
      return 0;
    }

    // Query to find records where bonusby is the currentPhone
    const [rows] = await connection.execute(
      `SELECT phone, bonusby, commission 
       FROM subordinatedata 
       WHERE bonusby = ? AND DATE(date) = ?`,
      [downlinePhone, searchDate]
    );

    // If no records are found, return 0
    if (rows.length === 0) {
      console.log("No more uplines found.");
      return 0;
    }

    let totalAmount = 0; // Initialize total amount for this call

    // Process each record
    for (const row of rows) {
      const { phone, bonusby, commission } = row;

      // Convert commission to float
      const commissionAmount = parseFloat(commission) || 0;

      // Check if the phone matches the target uplinePhone
      if (phone === uplinePhone) {
        totalAmount += commissionAmount; // Add commission to the total amount
        console.log(`Amount from ${phone} to ${bonusby}: ${commissionAmount}`);
      } else {
        // Recursively calculate total amount from the subtree
        const amountFromSubtree = await calculateTotalAmount(
          phone,
          uplinePhone,
          searchDate,
          level + 1
        );
        totalAmount += amountFromSubtree;
      }
    }

    // Print the total amount
    console.log(
      `Total amount from ${downlinePhone} to ${uplinePhone}: ${totalAmount}`
    );
    return totalAmount;
  } catch (error) {
    console.error("Error:", error.message);
    return 0; // Return 0 in case of an error
  }
}

// Example usage
//calculateTotalAmount('5432167890', '7394872897', '2024-09-03');

//calculateTotalAmount('5432167890', '7394872897', '2024-09-03');

const vipLevel = async (req, res) => {
  let auth = req.cookies.auth;
  try {
    // Fetch user info based on token
    const [user] = await connection.query(
      "SELECT `phone`, `money`, `code`, `invite`, `user_level` FROM users WHERE `token` = ?",
      [auth]
    );
    let userInfo = user[0];
    if (!userInfo) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }
    // Calculate total bet amount for the current user
    // Calculate total bet amount for the current user
    let validDepositsCount = 0;
    const [userCombinedTotal] = await connection.query(
      `SELECT SUM(overall_total_money) as total_bet_amount
             FROM (
                 SELECT SUM(\`money\`) as overall_total_money FROM minutes_1 WHERE \`phone\` = ? 
                 UNION 
                 SELECT SUM(\`money\`) as overall_total_money FROM result_k3 WHERE \`phone\` = ?
                 UNION 
                 SELECT SUM(\`money\`) as overall_total_money FROM result_5d WHERE \`phone\` = ?
             ) combined_table`,
      [userInfo.phone, userInfo.phone, userInfo.phone]
    );
    validDepositsCount =
      userCombinedTotal[0].total_bet_amount !== null
        ? userCombinedTotal[0].total_bet_amount
        : 0;

    const [data] = await connection.query(
      "SELECT * FROM vip_record WHERE `phone` = ?",
      [userInfo.phone]
    );
    return res.status(200).json({
      message: "Success",
      data: data,
      levels: Math.ceil(validDepositsCount),
      success: true,
      timeStamp: timeNow,
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",

      success: true,
      timeStamp: timeNow,
    });
  }
};

const vipLevelEvery = async () => {
  try {
    // Fetch data from tables
    const [minutesData] = await connection.execute(
      "SELECT phone, money FROM minutes_1"
    );
    const [resultK3Data] = await connection.execute(
      "SELECT phone, money FROM result_k3"
    );
    const [result5DData] = await connection.execute(
      "SELECT phone, money FROM result_5d"
    );

    const alldata = [...minutesData, ...resultK3Data, ...result5DData];

    let validDepositsCount = {}; // Total money per person
    let phoneCount = {}; // Count of records per phone

    // Process all data
    for (const item of alldata) {
      const { phone, money } = item;
      const moneyValue = parseInt(money); // Convert money to a float number

      // If phone already exists in validDepositsCount, add the money value
      if (validDepositsCount[phone]) {
        validDepositsCount[phone] += moneyValue;
        phoneCount[phone] += 1; // Increment the count for that phone number
      } else {
        // Otherwise, initialize the money value and count for that phone number
        validDepositsCount[phone] = moneyValue;
        phoneCount[phone] = 1; // Initialize the count for that phone number
      }
    }

    // Get the current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const sumdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Update user's money and insert bonus record if eligible and not already given
    for (const phone in validDepositsCount) {
      const totalAmount = validDepositsCount[phone]; // Get the total amount for this phone number
      let bonusAmount = 0;
      let level = 0;

      // Determine bonus amount based on the total amount for this phone number
      if (totalAmount >= 9999999999) {
        bonusAmount = 1690000;
        level = 10;
      } else if (totalAmount >= 5000000000) {
        bonusAmount = 690000;
        level = 9;
      } else if (totalAmount >= 1000000000) {
        bonusAmount = 169000;
        level = 8;
      } else if (totalAmount >= 100000000) {
        bonusAmount = 69000;
        level = 7;
      } else if (totalAmount >= 50000000) {
        bonusAmount = 16900;
        level = 6;
      } else if (totalAmount >= 20000000) {
        bonusAmount = 6900;
        level = 5;
      } else if (totalAmount >= 2000000) {
        bonusAmount = 12900;
        level = 4;
      } else if (totalAmount >= 200000) {
        bonusAmount = 690;
        level = 3;
      } else if (totalAmount >= 30000) {
        bonusAmount = 180;
        level = 2;
      } else if (totalAmount >= 3000) {
        bonusAmount = 60;
        level = 1;
      }

      if (bonusAmount > 0) {
        const [user] = await connection.execute(
          "SELECT * FROM users WHERE phone = ?",
          [phone]
        );

        let userInfo = user[0];

        if (userInfo) {
          if (userInfo.vip_level === 0 && totalAmount >= 3000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount + 30, level, bonusAmount + 60, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, 30, level, sumdate]
            );

            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", 30, sumdate]
            );
          } else if (userInfo.vip_level === 1 && totalAmount >= 30000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount + 90, level, bonusAmount + 90, phone]
            );
            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, 90, level, sumdate]
            );

            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", 90, sumdate]
            );
          } else if (userInfo.vip_level === 2 && totalAmount >= 200000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 3 && totalAmount >= 2000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 4 && totalAmount >= 20000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 5 && totalAmount >= 50000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 6 && totalAmount >= 100000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 7 && totalAmount >= 1000000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 8 && totalAmount >= 5000000000) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          } else if (userInfo.vip_level === 9 && totalAmount >= 9999999999) {
            await connection.execute(
              "UPDATE users SET money = money + ?, vip_level = ?, needbet = needbet + ? WHERE phone = ?",
              [bonusAmount, level, bonusAmount, phone]
            );

            await connection.execute(
              "INSERT INTO vip_record (phone, amount, level, date) VALUES (?, ?, ?, ?)",
              [phone, bonusAmount, level, sumdate]
            );
            await connection.query(
              `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
              [phone, "VIP", bonusAmount, sumdate]
            );
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const vipLevelMonthly = async (req, res) => {
  try {
    // Fetch user info based on token
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const sumdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Fetch users with vip_level >= 1
    const [userData] = await connection.query(
      "SELECT * FROM users WHERE vip_level >= 1"
    );

    // Bonus amounts corresponding to VIP levels 1-10
    const bonusAmounts = [
      30, 90, 290, 690, 1690, 6900, 16900, 69000, 169000, 690000,
    ];

    // Iterate through the fetched user data
    for (const userInfo of userData) {
      const level = userInfo.vip_level;

      // Ensure level is between 1 and 10
      if (level >= 1 && level <= 10) {
        const bonusAmount = bonusAmounts[level - 1]; // Get corresponding bonus amount

        // Update user's money
        await connection.query(
          "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ?",
          [bonusAmount, userInfo.phone]
        );

        // Insert bonus record
        await connection.query(
          "INSERT INTO vip_record SET phone=?, amount=?, level=?, type=?, date=?",
          [userInfo.phone, bonusAmount, level, "Month", sumdate]
        );

        await connection.query(
          `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
          [userInfo.phone, "VIP", bonusAmount, sumdate]
        );
      }
    }

    res.send({ message: "VIP monthly bonuses processed successfully." });
  } catch (err) {
    console.error("Error processing VIP bonuses:", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing VIP bonuses." });
  }
};

// subordinate data
const newSubordinateData = async (req, res) => {
  let auth = req.cookies.auth;
  try {
    const [user] = await connection.query(
      "SELECT `phone`,`money`, `code`,`invite` FROM users WHERE `token` = ? ",
      [auth]
    );
    let userInfo = user[0];
    if (!user) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }

    let [data] = await connection.query(
      "SELECT * FROM users WHERE invite = ? ",
      [userInfo.code]
    );
    return res.status(200).json({
      message: "new subordinate Successfull",
      datas: data,
      success: true,
      timeStamp: timeNow,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server",

      success: false,
    });
  }
};

const calculateDownlineBonuses = async (req, res) => {
  try {
    const auth = req.cookies.auth;

    if (!auth) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    // Fetch user details based on token
    const [userResults] = await connection.query(
      "SELECT `phone`, `code`, `invite` FROM `users` WHERE `token` = ?",
      [auth]
    );

    if (!userResults || !userResults.length) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: new Date().getTime(),
      });
    }

    const userinfo = userResults[0];

    // Fetch all downline users for the given invite code
    const [downlineResults] = await connection.query(
      "SELECT `id`, `phone`, `invite` FROM `users` WHERE `invite` = ?",
      [userinfo.code]
    );

    const downlineUsers = downlineResults || [];

    // Function to get total deposits for a given user phone
    const getTotalDeposits = async (phone) => {
      const [totalDeposits] = await connection.query(
        "SELECT IFNULL(SUM(money), 0) AS total_deposits FROM `recharge` WHERE `phone` = ? AND `status` = 1",
        [phone]
      );
      return totalDeposits[0].total_deposits;
    };

    // Function to check if a bonus has already been given
    const hasBonusBeenGiven = async (userPhone, bonusAmount) => {
      const [bonusRecord] = await connection.query(
        "SELECT COUNT(*) AS count FROM `activity_bonus` WHERE `phone` = ? AND `amount` = ?",
        [userPhone, bonusAmount]
      );
      return bonusRecord[0].count > 0;
    };

    // Bonus thresholds and amounts
    const bonusThresholds = [
      { threshold: 50000, amount: 3555555 },
      { threshold: 20000, amount: 1555555 },
      { threshold: 10000, amount: 755555 },
      { threshold: 5000, amount: 355555 },
      { threshold: 1000, amount: 48555 },
      { threshold: 500, amount: 25555 },
      { threshold: 200, amount: 10955 },
      { threshold: 70, amount: 3355 },
      { threshold: 30, amount: 1555 },
      { threshold: 10, amount: 555 },
      { threshold: 3, amount: 155 },
      { threshold: 1, amount: 55 },
    ];

    let validDepositsCount = 0;

    // Calculate the number of valid deposits
    for (const downlineUser of downlineUsers) {
      const totalDeposits = await getTotalDeposits(downlineUser.phone);
      if (totalDeposits >= 500) {
        validDepositsCount++;
      }
    }

    // Determine and award applicable bonuses
    let bonusesGiven = [];
    for (const { threshold, amount } of bonusThresholds) {
      if (validDepositsCount >= threshold) {
        if (!(await hasBonusBeenGiven(userinfo.phone, amount))) {
          // Award the bonus if not already given
          await connection.query(
            "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ?",
            [amount, userinfo.phone]
          );

          const now = new Date();
          const sumDate = `${now.getFullYear()}-${String(
            now.getMonth() + 1
          ).padStart(2, "0")}-${String(now.getDate()).padStart(
            2,
            "0"
          )} ${String(now.getHours()).padStart(2, "0")}:${String(
            now.getMinutes()
          ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

          await connection.query(
            "INSERT INTO `activity_bonus` (`phone`, `amount`, `description`, `type`, `status`, `date`) VALUES (?, ?, ?, ?, ?, ?)",
            [
              userinfo.phone,
              amount,
              "Downline deposit bonus",
              "Downline",
              1,
              sumDate,
            ]
          );

          await connection.query(
            `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time =?`,
            [userInfo.phone, "Invitation Bonus", amount, sumDate]
          );

          bonusesGiven.push({ amount, date: sumDate });
        }
      }
    }

    console.log(
      `Valid deposits count: ${validDepositsCount}, Bonuses given: ${bonusesGiven}`
    );

    // Fetch all bonus records for the current user
    const [bonusRecordAll] = await connection.query(
      "SELECT * FROM `activity_bonus` WHERE `phone` = ?",
      [userinfo.phone]
    );

    return res.status(200).json({
      message: "Success",
      status: true,
      timeStamp: new Date().getTime(),
      validDepositsCount,
      downline: downlineUsers.length,
      bonusesGiven,
      data: bonusRecordAll,
    });
  } catch (error) {
    console.error("Error in calculateDownlineBonuses function:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
      error: error.message,
      timeStamp: new Date().getTime(),
    });
  }
};

const feedback = async (req, res) => {
  let auth = req.cookies.auth;
  const { title } = req.body;
  try {
    if (!auth) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }
    const [user] = await connection.query(
      "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
      [auth]
    );
    let userInfo = user[0];
    if (!user) {
      return res.status(200).json({
        message: "Invalid user",
        status: false,
        timeStamp: timeNow,
      });
    }
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const sumdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const [feedback] = await connection.query(
      "INSERT INTO  feedback SET phone = ?,title=?,date=",
      [userInfo.phone, title, sumdate]
    );
    return res.status(200).json({
      message: "Feedback successful",
      data: feedback,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      status: false,
    });
  }
};

const listWithdraw = async (req, res) => {
  let auth = req.cookies.auth;
  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [recharge] = await connection.query(
    "SELECT * FROM withdraw WHERE phone = ? ORDER BY id DESC ",
    [userInfo.phone]
  );
  return res.status(200).json({
    message: "Receive success",
    datas: recharge,
    status: true,
    timeStamp: timeNow,
  });
};

const useRedenvelope = async (req, res) => {
  try {
    let auth = req.cookies.auth;
    let code = req.body.code;
    const timeNow = new Date();

    if (!auth || !code) {
      return res.status(400).json({
        message: "Please Enter Gift Code ",
        status: false,
        timeStamp: timeNow,
      });
    }

    const [user] = await connection.query(
      "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ?",
      [auth]
    );
    if (!user.length) {
      return res.status(404).json({
        message: "User not found",
        status: false,
        timeStamp: timeNow,
      });
    }
    let userInfo = user[0];

    const [redenvelopes_usedbyuser] = await connection.query(
      "SELECT * FROM redenvelopes_used WHERE id_redenvelops = ? AND phone_used = ?",
      [code, userInfo.phone]
    );

    if (redenvelopes_usedbyuser.length > 0) {
      return res.status(200).json({
        message: "Gift code already used on your id",
        status: true,
        timeStamp: timeNow,
      });
    }

    const [redenvelopes] = await connection.query(
      "SELECT * FROM redenvelopes WHERE id_redenvelope = ?",
      [code]
    );
    if (redenvelopes.length === 0) {
      return res.status(200).json({
        message: "Red envelope not found",
        status: true,
        timeStamp: timeNow,
      });
    }

    if (redenvelopes[0].used == 0) {
      return res.status(200).json({
        message: "Red envelope already used",
        status: true,
        timeStamp: timeNow,
      });
    }

    const infoRe = redenvelopes[0];

    const currentDate = new Date();

    // Format date components
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = currentDate.getFullYear();

    // Format time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Combine date and time components into the desired format
    const currentTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    if (infoRe.used !== 0) {
      await connection.query(
        "UPDATE redenvelopes SET used=used-?, status = 0 WHERE `id_redenvelope` = ? ",
        [1, infoRe.id_redenvelope]
      );
      await connection.query(
        "UPDATE users SET money = money + ? WHERE `phone` = ? ",
        [infoRe.money, userInfo.phone]
      );

      const sql =
        "INSERT INTO redenvelopes_used SET phone = ?, phone_used = ?, id_redenvelops = ?, money = ?, `time` = ? ";
      await connection.query(sql, [
        infoRe.phone,
        userInfo.phone,
        infoRe.id_redenvelope,
        infoRe.money,
        currentTime,
      ]);

      await connection.query(
        `INSERT INTO transaction_history SET phone=?, detail=?,balance=?, time = NOW()`,
        [userInfo.phone, "Red envelope", infoRe.money]
      );

      if (infoRe.used - 1 === 0) {
        await connection.query(
          "UPDATE redenvelopes SET status = 1 WHERE `id_redenvelope` = ?",
          [infoRe.id_redenvelope]
        );
      }

      return res.status(200).json({
        message: `Successfully received +${infoRe.money}`,
        status: true,
        timeStamp: timeNow,
      });
    } else {
      return res.status(200).json({
        message: "Gift code already used",
        status: false,
        timeStamp: timeNow,
      });
    }
  } catch (error) {
    console.error("Error in useRedenvelope:", error);
    return res.status(200).json({
      message: "Internal Server Error",
      error: error,
      status: false,
      timeStamp: timeNow,
    });
  }
};

// subordinate data
const commissiondata = async (req, res) => {
  let auth = req.cookies.auth;
  try {
    // Fetch user info based on token
    const [user] = await connection.query(
      "SELECT `phone`, `money`, `code`, `invite`, `user_level` FROM users WHERE `token` = ?",
      [auth]
    );
    let userInfo = user[0];
    if (!userInfo) {
      return res.status(200).json({
        message: "Failed",
        status: false,
        timeStamp: timeNow,
      });
    }

    const [commsions] = await connection.query(
      "SELECT * FROM `subordinatedata` WHERE `phone` = ?",
      [userInfo.phone]
    );
    // Return the results
    return res.status(200).json({
      message: "Success",
      datas: commsions,
      success: true,
      timeStamp: timeNow,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getRedenvelope = async (req, res) => {
  let auth = req.cookies.auth;

  if (!auth) {
    return res.status(200).json({
      message: "Invalid token ",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "Invalid user",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [redenvelopes] = await connection.query(
    "SELECT * FROM redenvelopes_used WHERE phone_used = ?",
    [userInfo?.phone]
  );

  return res.status(200).json({
    message: "get redenvelopes_used successfull",
    datas: redenvelopes,
    status: true,
  });
};

const callback_bank = async (req, res) => {
  let transaction_id = req.body.transaction_id;
  let client_transaction_id = req.body.client_transaction_id;
  let amount = req.body.amount;
  let requested_datetime = req.body.requested_datetime;
  let expired_datetime = req.body.expired_datetime;
  let payment_datetime = req.body.payment_datetime;
  let status = req.body.status;
  if (!transaction_id) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
  if (status == 2) {
    await connection.query(
      `UPDATE recharge SET status = 1 WHERE id_order = ?`,
      [client_transaction_id]
    );
    const [info] = await connection.query(
      `SELECT * FROM recharge WHERE id_order = ?`,
      [client_transaction_id]
    );
    await connection.query(
      "UPDATE users SET money = money + ?, total_money = total_money + ? WHERE phone = ? ",
      [info[0].money, info[0].money, info[0].phone]
    );
    return res.status(200).json({
      message: 0,
      status: true,
    });
  } else {
    await connection.query(`UPDATE recharge SET status = 2 WHERE id = ?`, [id]);

    return res.status(200).json({
      message: "Cancellation successful",
      status: true,
      datas: recharge,
    });
  }
};

const confirmRecharge = async (req, res) => {
  let auth = req.cookies.auth;
  //let money = req.body.money;
  //let paymentUrl = req.body.payment_url;
  let client_txn_id = req.body?.client_txn_id;

  if (!client_txn_id) {
    return res.status(200).json({
      message: "client_txn_id is required",
      status: false,
      timeStamp: timeNow,
    });
  }

  if (!auth) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }

  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];

  if (!user) {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }

  const [recharge] = await connection.query(
    "SELECT * FROM recharge WHERE phone = ? AND status = ? ",
    [userInfo.phone, 0]
  );

  if (recharge.length != 0) {
    const rechargeData = recharge[0];
    const date = new Date(rechargeData.today);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    const apiData = {
      key: "0c79da69-fdc1-4a07-a8b4-7135a0168385",
      client_txn_id: client_txn_id,
      txn_date: formattedDate,
    };
    try {
      const apiResponse = await axios.post(
        "https://api.ekqr.in/api/check_order_status",
        apiData
      );
      console.log(apiResponse.data);
      const apiRecord = apiResponse.data.data;
      if (apiRecord.status === "scanning") {
        return res.status(200).json({
          message: "Waiting for confirmation",
          status: false,
          timeStamp: timeNow,
        });
      }
      if (
        apiRecord.client_txn_id === rechargeData.id_order &&
        apiRecord.customer_mobile === rechargeData.phone &&
        apiRecord.amount === rechargeData.money
      ) {
        if (apiRecord.status === "success") {
          await connection.query(
            `UPDATE recharge SET status = 1 WHERE id = ? AND id_order = ? AND phone = ? AND money = ?`,
            [
              rechargeData.id,
              apiRecord.client_txn_id,
              apiRecord.customer_mobile,
              apiRecord.amount,
            ]
          );
          // const [code] = await connection.query(`SELECT invite, total_money from users WHERE phone = ?`, [apiRecord.customer_mobile]);
          // const [data] = await connection.query('SELECT recharge_bonus_2, recharge_bonus FROM admin WHERE id = 1');
          // let selfBonus = info[0].money * (data[0].recharge_bonus_2 / 100);
          // let money = info[0].money + selfBonus;
          let money = apiRecord.amount;
          await connection.query(
            "UPDATE users SET money = money + ?, total_money = total_money + ? WHERE phone = ? ",
            [money, money, apiRecord.customer_mobile]
          );
          // let rechargeBonus;
          // if (code[0].total_money <= 0) {
          //     rechargeBonus = apiRecord.customer_mobile * (data[0].recharge_bonus / 100);
          // }
          // else {
          //     rechargeBonus = apiRecord.customer_mobile * (data[0].recharge_bonus_2 / 100);
          // }
          // const percent = rechargeBonus;
          // await connection.query('UPDATE users SET money = money + ?, total_money = total_money + ? WHERE code = ?', [money, money, code[0].invite]);

          return res.status(200).json({
            message: "Successful application confirmation",
            status: true,
            datas: recharge,
          });
        } else if (
          apiRecord.status === "failure" ||
          apiRecord.status === "close"
        ) {
          console.log(apiRecord.status);
          await connection.query(
            `UPDATE recharge SET status = 2 WHERE id = ? AND id_order = ? AND phone = ? AND money = ?`,
            [
              rechargeData.id,
              apiRecord.client_txn_id,
              apiRecord.customer_mobile,
              apiRecord.amount,
            ]
          );
          return res.status(200).json({
            message: "Payment failure",
            status: true,
            timeStamp: timeNow,
          });
        }
      } else {
        return res.status(200).json({
          message: "Mismtach data",
          status: true,
          timeStamp: timeNow,
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.status(200).json({
      message: "Failed",
      status: false,
      timeStamp: timeNow,
    });
  }
};

const confirmUSDTRecharge = async (req, res) => {
  console.log(res?.body);
  console.log(res?.query);
  console.log(res?.cookies);
  // let auth = req.cookies.auth;
  // //let money = req.body.money;
  // //let paymentUrl = req.body.payment_url;
  // let client_txn_id = req.body?.client_txn_id;

  // if (!client_txn_id) {
  //     return res.status(200).json({
  //         message: 'client_txn_id is required',
  //         status: false,
  //         timeStamp: timeNow,
  //     })
  // }

  // if (!auth) {
  //     return res.status(200).json({
  //         message: 'Failed',
  //         status: false,
  //         timeStamp: timeNow,
  //     })
  // }

  // const [user] = await connection.query('SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ', [auth]);
  // let userInfo = user[0];

  // if (!user) {
  //     return res.status(200).json({
  //         message: 'Failed',
  //         status: false,
  //         timeStamp: timeNow,
  //     });
  // };

  // const [recharge] = await connection.query('SELECT * FROM recharge WHERE phone = ? AND status = ? ', [userInfo.phone, 0]);

  // if (recharge.length != 0) {
  //     const rechargeData = recharge[0];
  //     const date = new Date(rechargeData.today);
  //     const dd = String(date.getDate()).padStart(2, '0');
  //     const mm = String(date.getMonth() + 1).padStart(2, '0');
  //     const yyyy = date.getFullYear();
  //     const formattedDate = `${dd}-${mm}-${yyyy}`;
  //     const apiData = {
  //         key: process.env.PAYMENT_KEY,
  //         client_txn_id: client_txn_id,
  //         txn_date: formattedDate,
  //     };
  //     try {
  //         const apiResponse = await axios.post('https://api.ekqr.in/api/check_order_status', apiData);
  //         const apiRecord = apiResponse.data.data;
  //         if (apiRecord.status === "scanning") {
  //             return res.status(200).json({
  //                 message: 'Waiting for confirmation',
  //                 status: false,
  //                 timeStamp: timeNow,
  //             });
  //         }
  //         if (apiRecord.client_txn_id === rechargeData.id_order && apiRecord.customer_mobile === rechargeData.phone && apiRecord.amount === rechargeData.money) {
  //             if (apiRecord.status === 'success') {
  //                 await connection.query(`UPDATE recharge SET status = 1 WHERE id = ? AND id_order = ? AND phone = ? AND money = ?`, [rechargeData.id, apiRecord.client_txn_id, apiRecord.customer_mobile, apiRecord.amount]);
  //                 // const [code] = await connection.query(`SELECT invite, total_money from users WHERE phone = ?`, [apiRecord.customer_mobile]);
  //                 // const [data] = await connection.query('SELECT recharge_bonus_2, recharge_bonus FROM admin WHERE id = 1');
  //                 // let selfBonus = info[0].money * (data[0].recharge_bonus_2 / 100);
  //                 // let money = info[0].money + selfBonus;
  //                 let money = apiRecord.amount;
  //                 await connection.query('UPDATE users SET money = money + ?, total_money = total_money + ? WHERE phone = ? ', [money, money, apiRecord.customer_mobile]);
  //                 // let rechargeBonus;
  //                 // if (code[0].total_money <= 0) {
  //                 //     rechargeBonus = apiRecord.customer_mobile * (data[0].recharge_bonus / 100);
  //                 // }
  //                 // else {
  //                 //     rechargeBonus = apiRecord.customer_mobile * (data[0].recharge_bonus_2 / 100);
  //                 // }
  //                 // const percent = rechargeBonus;
  //                 // await connection.query('UPDATE users SET money = money + ?, total_money = total_money + ? WHERE code = ?', [money, money, code[0].invite]);

  //                 return res.status(200).json({
  //                     message: 'Successful application confirmation',
  //                     status: true,
  //                     datas: recharge,
  //                 });
  //             } else if (apiRecord.status === 'failure' || apiRecord.status === 'close') {
  //                 console.log(apiRecord.status)
  //                 await connection.query(`UPDATE recharge SET status = 2 WHERE id = ? AND id_order = ? AND phone = ? AND money = ?`, [rechargeData.id, apiRecord.client_txn_id, apiRecord.customer_mobile, apiRecord.amount]);
  //                 return res.status(200).json({
  //                     message: 'Payment failure',
  //                     status: true,
  //                     timeStamp: timeNow,
  //                 });
  //             }
  //         } else {
  //             return res.status(200).json({
  //                 message: 'Mismtach data',
  //                 status: true,
  //                 timeStamp: timeNow,
  //             });
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // } else {
  //     return res.status(200).json({
  //         message: 'Failed',
  //         status: false,
  //         timeStamp: timeNow,
  //     });
  // }
};

const updateRecharge = async (req, res) => {
  let auth = req.cookies.auth;
  let money = req.body.money;
  let order_id = req.body.id_order;
  let data = req.body.inputData;

  // if (type != 'upi') {
  //     if (!auth || !money || money < 300) {
  //         return res.status(200).json({
  //             message: 'upi failed',
  //             status: false,
  //             timeStamp: timeNow,
  //         })
  //     }
  // }
  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite` FROM users WHERE `token` = ? ",
    [auth]
  );
  let userInfo = user[0];
  if (!user) {
    return res.status(200).json({
      message: "user not found",
      status: false,
      timeStamp: timeNow,
    });
  }
  const [utr] = await connection.query(
    "SELECT * FROM recharge WHERE `utr` = ? ",
    [data]
  );
  let utrInfo = utr[0];

  if (!utrInfo) {
    await connection.query(
      "UPDATE recharge SET utr = ? WHERE phone = ? AND id_order = ?",
      [data, userInfo.phone, order_id]
    );
    return res.status(200).json({
      message: "UTR updated",
      status: true,
      timeStamp: timeNow,
    });
  } else {
    return res.status(200).json({
      message: "UTR is already in use",
      status: false,
      timeStamp: timeNow,
    });
  }
};

module.exports = {
  userInfo,
  changeUser,
  changePassword,
  changeUserPhoto,
  promotion,
  myTeam,
  wowpay,
  recharge,
  recharge2,
  listRecharge,
  listWithdraw,
  checkInHandling,
  infoUserBank,
  addBank,
  withdrawal3,
  transfer,
  transferHistory,
  callback_bank,
  listMyTeam,
  verifyCode,
  aviator,
  useRedenvelope,
  getRedenvelope,
  search,
  updateRecharge,
  confirmRecharge,
  addutr,
  cancelRecharge,
  downlinerecharge,
  downlinerecharge_data,
  downlinerecharge_data_new,
  confirmUSDTRecharge,
  totalCommission,
  transactionHistory,
  subordinatedata,
  newSubordinateData,
  calculateDownlineBonuses,
  getRebate,
  rebateCreate,
  feedback,
  updateDirectAndTeamSubordinates,
  vipLevel,
  vipLevelEvery,
  vipLevelMonthly,
  commissiondata,
};
