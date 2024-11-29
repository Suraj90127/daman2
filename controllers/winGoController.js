import connection from "../config/connectDB";
import moment from "moment-timezone";

// Time zone for India
const indiaTimeZone = "Asia/Kolkata";

function getCurrentDateInIndia() {
  const currentDateInIndia = moment().tz(indiaTimeZone).format("YYYY-MM-DD");
  return currentDateInIndia;
}

// Function to get current date and time in India time

// import jwt from 'jsonwebtoken'
// import md5 from "md5";
// import e from "express";
require("dotenv").config();

const winGoPage = async (req, res) => {
  return res.render("bet/wingo/win.ejs");
};

const winGoPage3 = async (req, res) => {
  return res.render("bet/wingo/win3.ejs");
};

const winGoPage5 = async (req, res) => {
  return res.render("bet/wingo/win5.ejs");
};

const winGoPage10 = async (req, res) => {
  return res.render("bet/wingo/win10.ejs");
};

const trxPage = async (req, res) => {
  return res.render("bet/trx/trx.ejs");
};

const trxPage3 = async (req, res) => {
  return res.render("bet/trx/trx3.ejs");
};

const trxPage5 = async (req, res) => {
  return res.render("bet/trx/trx5.ejs");
};

const trxPage10 = async (req, res) => {
  return res.render("bet/trx/trx10.ejs");
};

const isNumber = (params) => {
  let pattern = /^[0-9]*\d$/;
  return pattern.test(params);
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

const commissions = async (auth, money) => {
  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `user_level`, `total_money` FROM users WHERE token = ?",
    [auth]
  );
  let userInfo = user;

  // commission

  const sumdate = timerJoin(Date.now());

  const [level] = await connection.query("SELECT * FROM level ");

  let uplines2 = userInfo;
  let count = 0;
  for (let i = 0; i < 6; i++) {
    const rosesFs = (money / 100) * level[i].f1;

    if (uplines2.length !== 0) {
      let [upline1] = await connection.query(
        "SELECT * FROM users WHERE code = ?",
        [uplines2[0].invite]
      );

      if (upline1.length > 0) {
        count++;

        const commissions = `INSERT INTO commission SET 
                  phone = ?,
                  bonusby=?,
                  type = ?,
                  commission=?,
                  amount = ?,
                  level = ?,
                  date = ?`;
        await connection.execute(commissions, [
          upline1[0].phone,
          uplines2[0].phone,
          "Bet",
          rosesFs,
          money,
          count,
          sumdate,
        ]);
        await connection.query(
          "UPDATE users SET pending_commission = pending_commission + ? WHERE phone = ? ",
          [rosesFs, upline1[0].phone]
        );
        uplines2 = upline1;
      } else {
        break; // Exit the loop if no further uplines are found
      }
    } else {
      break; // Exit the loop if uplines2 is empty
    }
  }
};
// calculateDownlineBonuses

const rosesPlus = async (auth, money) => {
  const [level] = await connection.query("SELECT * FROM level ");

  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `user_level`, `total_money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ",
    [auth]
  );
  let userInfo = user[0];
  const [f1] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE code = ? AND veri = 1 LIMIT 1 ",
    [userInfo.invite]
  );
  let timenow_0 = timerJoin(Date.now());

  if (userInfo.total_money >= 100) {
    if (f1.length > 0) {
      let infoF1 = f1[0];

      for (let levelIndex = 1; levelIndex <= 6; levelIndex++) {
        let rosesF = 0;
        if (infoF1.user_level >= levelIndex && infoF1.total_money >= 100) {
          rosesF = (money / 100) * level[levelIndex - 1].f1;
          if (rosesF > 0) {
            await connection.query(
              "UPDATE users SET  roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ",
              [rosesF, rosesF, infoF1.phone]
            );
            let timeNow = timerJoin(Date.now());
            const datasql =
              "INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?";
            await connection.execute(datasql, [
              infoF1.phone,
              "Agent Commission",
              rosesF,
              timenow_0,
            ]);
            const sql2 = `INSERT INTO roses SET 
                            phone = ?,
                            code = ?,
                            invite = ?,
                            f1 = ?,
                            time = ?`;
            await connection.execute(sql2, [
              infoF1.phone,
              infoF1.code,
              infoF1.invite,
              rosesF,
              timeNow,
            ]);

            await connection.execute(
              "INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?",
              [infoF1.phone, "Agent bet Commission", rosesF, timenow_0]
            );

            const sql3 = `
                            INSERT INTO turn_over (phone, code, invite, daily_turn_over, total_turn_over)
                            VALUES (?, ?, ?, ?, ?)
                            ON DUPLICATE KEY UPDATE
                            daily_turn_over = daily_turn_over + VALUES(daily_turn_over),
                            total_turn_over = total_turn_over + VALUES(total_turn_over)
                            `;

            await connection.execute(sql3, [
              infoF1.phone,
              infoF1.code,
              infoF1.invite,
              money,
              money,
            ]);
          }
        }
        const [fNext] = await connection.query(
          "SELECT `phone`, `code`, `invite`, `rank`, `user_level`, `total_money` FROM users WHERE code = ? AND veri = 1 LIMIT 1 ",
          [infoF1.invite]
        );
        if (fNext.length > 0) {
          infoF1 = fNext[0];
        } else {
          break;
        }
      }
    }
  }
};

// needbet

const betWinGo = async (req, res) => {
  let { typeid, join, x, money } = req.body;
  let auth = req.cookies.auth;

  if (![1, 3, 5, 10, 11, 33, 55, 100].includes(typeid)) {
    return res.status(200).json({
      message: "Invalid type id",
      status: false,
    });
  }

  const gameMap = {
    1: "wingo",
    3: "wingo3",
    5: "wingo5",
    10: "wingo10",
    11: "trx",
    33: "trx3",
    55: "trx5",
    100: "trx10",
  };
  const gameJoin = gameMap[typeid];

  try {
    const [winGoNow] = await connection.query(
      `SELECT period FROM wingo WHERE status = 0 AND game = ? ORDER BY id DESC LIMIT 1`,
      [gameJoin]
    );
    const [user] = await connection.query(
      "SELECT id_user, phone, code, invite, level, recharge, needbet, money FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    if (!winGoNow[0] || !user[0] || !isNumber(x) || !isNumber(money)) {
      return res.status(200).json({
        message: "Invalid data",
        winGoNow,
        user,
        // isNumber(x),
        status: false,
      });
    }

    let userInfo = user[0];
    let period = winGoNow[0].period;
    let fee = x * money * 0.02;
    let total = x * money - fee;
    let totalAmount = x * money;
    let timeNow = Date.now();
    let check = userInfo.money - total;

    if (check < 0) {
      return res.status(200).json({
        message: "The amount is not enough",
        status: false,
      });
    }
    //console.log("done_hello");
    let date = new Date();
    let id_product =
      formateT(date.getFullYear()) +
      formateT(date.getMonth() + 1) +
      formateT(date.getDate()) +
      Math.floor(Math.random() * 1000000000000000);
    let checkTime = timerJoin(date.getTime());

    // Insert into minutes_1
    const sql = `INSERT INTO minutes_1 SET 
            id_product = ?,
            phone = ?,
            code = ?,
            invite = ?,
            stage = ?,
            level = ?,
            money = ?,
            amount = ?,
            fee = ?,
            get = ?,
            game = ?,
            bet = ?,
            status = ?,
            today = ?,
            time = ?`;

    await connection.execute(sql, [
      id_product,
      userInfo.phone,
      userInfo.code,
      userInfo.invite,
      period,
      userInfo.level,
      total,
      x,
      fee,
      0,
      gameJoin,
      join,
      0,
      checkTime,
      timeNow,
    ]);

    // Update user's money and rebate
    await connection.execute(
      "UPDATE users SET money = money - ?, rebate = rebate + ? WHERE token = ?",
      [totalAmount, totalAmount, auth]
    );

    // Respond immediately after critical operations
    const [updatedUser] = await connection.query(
      "SELECT * FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    await connection.execute(
      "UPDATE `users` SET `needbet` = `needbet` - ? WHERE `phone` = ?",
      [money * x, userInfo.phone]
    );

    if (userInfo.needbet < 0) {
      await connection.execute(
        "UPDATE `users` SET `needbet` = 0 WHERE `phone` = ?",
        [userInfo.phone]
      );
    }

    res.status(200).json({
      message: "Bet Succeed",
      status: true,
      change: updatedUser[0].level,
      money: updatedUser[0].money,
    });

    // Run background operations after responding
    setImmediate(async () => {
      await rosesPlus(auth, total);
      await commissions(auth, total);
      const datasql =
        "INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?";
      await connection.query(datasql, [
        userInfo.phone,
        "Bet",
        total,
        checkTime,
      ]);

      const [level] = await connection.query("SELECT * FROM level");
      let uplines2 = updatedUser;
      let count = 0;

      // Count rows for today's date

      //yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = getCurrentDateInIndia();

      let rowCount;

      const countSql = `SELECT COUNT(*) AS rowCount 
                              FROM minutes_1 
                              WHERE phone = ? 
                                AND DATE(today) = ?`;

      try {
        const [countResult] = await connection.query(countSql, [
          userInfo.phone,
          formattedDate,
        ]);
        rowCount = countResult[0].rowCount;
        console.log(
          `Row count for ${userInfo.phone} on ${formattedDate}:`,
          rowCount
        );
      } catch (error) {
        console.error("Error executing query:", error);
      }

      const [existingRecord1] = await connection.query(
        "SELECT id FROM user_data WHERE phone = ? AND date = ? LIMIT 1",
        [userInfo.phone, formattedDate]
      );

      if (existingRecord1.length > 0) {
        // If the record exists, update it with the corresponding level fields
        await connection.execute(
          `UPDATE user_data 
                     SET own_bet = own_bet + ?, 
                         ownbet_count = ownbet_count + 1
                     WHERE phone = ? AND date = ?`,
          [total, userInfo.phone, formattedDate]
        );
      } else {
        // If no record exists, insert a new one
        await connection.execute(
          `INSERT INTO user_data 
                     (phone,own_bet,ownbet_count,date) 
                     VALUES (?, ?, ?, ?)`,
          [userInfo.phone, total, 1, formattedDate]
        );
      }

      for (let i = 0; i < 6; i++) {
        let rosesF = (total / 100) * level[i].f1;
        if (uplines2.length === 0) break;

        let [upline1] = await connection.query(
          "SELECT * FROM users WHERE code = ?",
          [uplines2[0].invite]
        );
        if (upline1.length === 0) break;

        count++;

        await connection.query(
          "INSERT INTO subordinatedata SET phone = ?, bonusby = ?, type = ?, commission = ?, amount = ?, level = ?, `date` = ?",
          [
            upline1[0].phone,
            uplines2[0].phone,
            "bet commission",
            rosesF,
            totalAmount,
            count,
            checkTime,
          ]
        );

        let levelIndex = count;
        if (levelIndex >= 1 && levelIndex <= 6) {
          const [existingRecord] = await connection.query(
            "SELECT id, bet_sources FROM user_data WHERE phone = ? AND date = ? LIMIT 1",
            [upline1[0].phone, formattedDate]
          );

          // Parse the JSON object to update it
          let betSources =
            existingRecord.length > 0
              ? JSON.parse(existingRecord[0].bet_sources || "[]")
              : [];

          // Check if the current phone and level combination is already in the bet sources
          let sourceExists = betSources.some(
            (source) =>
              source.phone === userInfo.phone && source.level === levelIndex
          );

          if (!sourceExists) {
            // Add the phone number and level to the JSON array
            betSources.push({
              phone: userInfo.phone,
              level: levelIndex,
              userid: userInfo.id_user,
            });
          }

          if (existingRecord.length > 0) {
            await connection.execute(
              `UPDATE user_data 
                             SET totalbetamount_today_${levelIndex} = totalbetamount_today_${levelIndex} + ?, 
                                 totalbetamount_today = totalbetamount_today + ?, 
                                 totalbetcount_today_${levelIndex} = totalbetcount_today_${levelIndex} + 1, 
                                 totalbetcount_today = totalbetcount_today + 1, 
                                 bet_commission_today_${levelIndex} = bet_commission_today_${levelIndex} + ?, 
                                 bet_commission = bet_commission + ?,
                                 bet_sources = ?
                             WHERE phone = ? AND date = ?`,
              [
                total,
                total,
                rosesF,
                rosesF,
                JSON.stringify(betSources),
                upline1[0].phone,
                formattedDate,
              ]
            );

            if (rowCount == 1) {
              await connection.execute(
                `UPDATE user_data 
                                 SET numberofbeter_today_${levelIndex} = numberofbeter_today_${levelIndex} + 1, 
                                     numberofbeter_today = numberofbeter_today + 1 
                                 WHERE phone = ? AND date = ?`,
                [upline1[0].phone, formattedDate]
              );
            }
          } else {
            await connection.execute(
              `INSERT INTO user_data 
                             (phone, date, totalbetamount_today_${levelIndex}, totalbetamount_today, 
                              totalbetcount_today_${levelIndex}, totalbetcount_today, 
                              numberofbeter_today_${levelIndex}, numberofbeter_today, 
                              bet_commission, bet_commission_today_${levelIndex}, bet_sources) 
                             VALUES (?, ?, ?, ?, 1, 1, ?, 1, ?, ?, ?)`,
              [
                upline1[0].phone,
                formattedDate,
                total,
                total,
                1,
                rosesF,
                rosesF,
                JSON.stringify([{ phone: userInfo.phone, level: levelIndex }]),
              ]
            );
          }
        }

        uplines2 = upline1;
      }
    });
  } catch (error) {
    console.error("Error in betWinGo function:", error);
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

const listOrderOld = async (req, res) => {
  let { typeid, pageno, pageto } = req.body;

  // Validate typeid
  if (![1, 3, 5, 10, 11, 33, 55, 100].includes(typeid)) {
    return res.status(200).json({
      message: "Invalid type id",
      status: false,
    });
  }

  // Validate pageno and pageto
  if (pageno < 1 || pageto < 1) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }

  let auth = req.cookies.auth;
  const [user] = await connection.query(
    "SELECT phone, code, invite, level, money FROM users WHERE token = ? AND veri = 1 LIMIT 1",
    [auth]
  );

  if (!user[0]) {
    return res.status(200).json({
      message: "Error! user is missing.",
      status: false,
    });
  }

  let game = "";
  if (typeid == 1) game = "wingo";
  if (typeid == 3) game = "wingo3";
  if (typeid == 5) game = "wingo5";
  if (typeid == 10) game = "wingo10";
  if (typeid == 11) game = "trx";
  if (typeid == 33) game = "trx3";
  if (typeid == 55) game = "trx5";
  if (typeid == 100) game = "trx10";

  const offset = pageno - 1; // Adjust for 1-based index
  const limit = pageto - pageno + 1; // Number of rows to fetch

  const [wingo] = await connection.query(`
        SELECT * 
        FROM wingo 
        WHERE status != 0 AND game = '${game}' 
        ORDER BY id DESC 
        LIMIT ${limit} OFFSET ${offset}
    `);

  const [wingoAll] = await connection.query(
    `SELECT * FROM wingo WHERE status != 0 AND game = '${game}'`
  );
  const [period] = await connection.query(
    `SELECT period, time FROM wingo WHERE status = 0 AND game = '${game}' ORDER BY id DESC LIMIT 1`
  );

  if (!wingo.length) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }

  if (!period.length) {
    return res.status(200).json({
      message: "Error! period is missing.",
      status: false,
    });
  }

  let page = Math.ceil(wingoAll.length / limit);

  return res.status(200).json({
    code: 0,
    msg: "Get success",
    data: {
      gameslist: wingo,
    },
    period: period[0].period,
    page: page,
    time: period[0].time,
    status: true,
  });
};

const GetMyEmerdList = async (req, res) => {
  let { typeid, pageno, pageto } = req.body;

  // if (!pageno || !pageto) {
  //     pageno = 0;
  //     pageto = 10;
  // }

  if (
    typeid != 1 &&
    typeid != 3 &&
    typeid != 5 &&
    typeid != 10 &&
    typeid != 11 &&
    typeid != 33 &&
    typeid != 55 &&
    typeid != 100 &&
    typeid != 15
  ) {
    return res.status(200).json({
      message: "Invalid type id",
      status: false,
    });
  }

  if (pageno < 0 || pageto < 0) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }
  let auth = req.cookies.auth;

  let game = "";
  if (typeid == 1) game = "wingo";
  if (typeid == 3) game = "wingo3";
  if (typeid == 5) game = "wingo5";
  if (typeid == 10) game = "wingo10";
  if (typeid == 11) game = "trx";
  if (typeid == 33) game = "trx3";
  if (typeid == 55) game = "trx5";
  if (typeid == 100) game = "trx10";
  if (typeid == 15) {
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1",
      [auth]
    );

    if (!user[0]) {
      return res.status(200).json({
        code: 0,
        msg: "User not found",
        data: {
          gameslist: [],
        },
        status: false,
      });
    }

    const phone = user[0].phone;

    const [minutess_1] = await connection.query(
      `SELECT * FROM minutes_1 WHERE phone = ? ORDER BY id DESC`,
      [phone]
    );
    const [result_k3] = await connection.query(
      `
    SELECT *,
    CASE 
        WHEN game = 1 THEN 'K3 1'
        WHEN game = 3 THEN 'K3 3'
        WHEN game = 5 THEN 'K3 5'
        WHEN game = 10 THEN 'K3 10'
        ELSE game
    END AS game
    FROM result_k3 
    WHERE phone = ? 
    ORDER BY id DESC`,
      [phone]
    );

    const [result_5d] = await connection.query(
      `
    SELECT *,
    CASE 
        WHEN game = 1 THEN '5D 1'
        WHEN game = 3 THEN '5D 3'
        WHEN game = 5 THEN '5D 5'
        WHEN game = 10 THEN '5D 10'
        ELSE game
    END AS game
    FROM result_5d 
    WHERE phone = ? 
    ORDER BY id DESC`,
      [phone]
    );

    const combinedData = [...minutess_1, ...result_5d, ...result_k3];

    return res.status(200).json({
      code: 0,
      msg: "Get success",
      data: {
        gameslist: combinedData,
      },
      status: true,
    });
  }

  const [user] = await connection.query(
    "SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ",
    [auth]
  );

  const offset = pageno - 1; // Adjust for 1-based index
  const limit = pageto - pageno + 1; // Number of rows to fetch

  // const [wingo] = await connection.query(`
  //     SELECT *
  //     FROM wingo
  //     WHERE status != 0 AND game = '${game}'
  //     ORDER BY id DESC
  //     LIMIT ${limit} OFFSET ${offset}
  // `);

  const [minutes_1] = await connection.query(
    `SELECT * FROM minutes_1 WHERE phone = ? AND game = '${game}' ORDER BY id DESC  LIMIT ${limit} OFFSET ${offset}`,
    [user[0].phone]
  );
  const [minutes_1All] = await connection.query(
    `SELECT * FROM minutes_1 WHERE phone = ? AND game = '${game}' ORDER BY id DESC `,
    [user[0].phone]
  );

  if (minutes_1[0] === undefined || minutes_1[0] === null) {
    return res.status(200).json({
      code: 0,
      msg: "No more data",
      data: {
        gameslist: [],
      },
      status: false,
    });
  }

  if (
    pageno === undefined ||
    pageno === null ||
    pageto === undefined ||
    pageto === null ||
    user[0] === undefined ||
    user[0] === null ||
    minutes_1[0] === undefined ||
    minutes_1[0] === null
  ) {
    return res.status(200).json({
      message: "Error!",
      status: false,
    });
  }
  let page = Math.ceil(minutes_1All.length / 10);

  let datas = minutes_1.map((data) => {
    let { id, phone, code, invite, level, game, ...others } = data;
    return others;
  });

  return res.status(200).json({
    code: 0,
    msg: "Get success data",
    data: {
      gameslist: minutes_1,
    },
    page: page,
    status: true,
  });
};

function generateRandomHash(length) {
  const characters = "abcdef0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function timerJoins(params = "", addHours = 0) {
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

  const formattedDate = `${getPart("year")}${getPart("month")}${getPart(
    "day"
  )}`;

  return formattedDate;
}

const addWinGo = async (game) => {
  try {
    let join = "";
    if (game == 1) join = "wingo";
    if (game == 3) join = "wingo3";
    if (game == 5) join = "wingo5";
    if (game == 10) join = "wingo10";
    if (game == 11) join = "trx";
    if (game == 33) join = "trx3";
    if (game == 55) join = "trx5";
    if (game == 100) join = "trx10";

    // const [winGoNow] = await connection.query(`SELECT period FROM wingo WHERE status = 0 AND game = "${join}" ORDER BY id DESC LIMIT 1 `);

    let updatenum = 1;

    if (game == 1) updatenum = 1;
    if (game == 3) updatenum = 2;
    if (game == 5) updatenum = 3;
    if (game == 10) updatenum = 4;
    if (game == 11) updatenum = 3;
    if (game == 33) updatenum = 4;
    if (game == 55) updatenum = 5;
    if (game == 100) updatenum = 6;

    const [winGoNow] = await connection.query(
      `SELECT period FROM wingo WHERE status = 0 AND game = "${join}" ORDER BY id DESC LIMIT 1 `
    );

    let period = winGoNow[0].period;

    const currentDates = new Date();
    const years = currentDates.getFullYear();
    const months = String(currentDates.getMonth() + 1).padStart(2, "0");
    const days = String(currentDates.getDate()).padStart(2, "0");
    const formattedDates = `${years}${months}${days}`;
    let blockhight = "0";

    let times = timerJoins(Date.now());

    const [setting] = await connection.query("SELECT * FROM `admin` ");
    // let period = winGoNow[0].period; // cầu hiện tại
    let amount = Math.floor(Math.random() * 10);
    const [minPlayers] = await connection.query(
      `SELECT * FROM minutes_1 WHERE status = 0 AND game = "${join}"`
    );
    if (minPlayers.length >= 2) {
      const betColumns = [
        // red_small
        { name: "red_0", bets: ["0", "t", "d", "n"] },
        { name: "red_2", bets: ["2", "d", "n"] },
        { name: "red_4", bets: ["4", "d", "n"] },
        // green small
        { name: "green_1", bets: ["1", "x", "n"] },
        { name: "green_3", bets: ["3", "x", "n"] },
        // green big
        { name: "green_5", bets: ["5", "x", "t", "l"] },
        { name: "green_7", bets: ["7", "x", "l"] },
        { name: "green_9", bets: ["9", "x", "l"] },
        // red big
        { name: "red_6", bets: ["6", "d", "l"] },
        { name: "red_8", bets: ["8", "d", "l"] },
      ];

      const totalMoneyPromises = betColumns.map(async (column) => {
        const [result] = await connection.query(`
                SELECT SUM(money) AS total_money
                FROM minutes_1
                WHERE game = "${join}" AND status = 0 AND bet IN (${column.bets
          .map((bet) => `"${bet}"`)
          .join(",")})
            `);
        return {
          name: column.name,
          total_money: result[0].total_money
            ? parseInt(result[0].total_money)
            : 0,
        };
      });

      const categories = await Promise.all(totalMoneyPromises);
      let smallestCategory = categories.reduce(
        (smallest, category) =>
          smallest === null || category.total_money < smallest.total_money
            ? category
            : smallest,
        null
      );
      const colorBets = {
        red_6: [6],
        red_8: [8],
        red_2: [2], //0 removed
        red_4: [4],
        green_3: [3],
        green_7: [7], //5 removed
        green_9: [9], //
        green_1: [1],
        green_5: [5],
        red_0: [0],
      };

      const betsForCategory = colorBets[smallestCategory.name] || [];
      const availableBets = betsForCategory.filter(
        (bet) =>
          !categories.find(
            (category) =>
              category.name === smallestCategory.name &&
              category.total_money < smallestCategory.total_money
          )
      );
      let lowestBet;
      if (availableBets.length > 0) {
        lowestBet = availableBets[0];
      } else {
        lowestBet = betsForCategory.reduce((lowest, bet) =>
          bet < lowest ? bet : lowest
        );
      }

      amount = lowestBet;
    } else if (
      minPlayers.length === 1 &&
      parseFloat(minPlayers[0].money) >= 20
    ) {
      const betColumns = [
        { name: "red_small", bets: ["0", "2", "4", "d", "n"] },
        { name: "red_big", bets: ["6", "8", "d", "l"] },
        { name: "green_big", bets: ["5", "7", "9", "x", "l"] },
        { name: "green_small", bets: ["1", "3", "x", "n"] },
        { name: "violet_small", bets: ["0", "t", "n"] },
        { name: "violet_big", bets: ["5", "t", "l"] },
      ];

      const categories = await Promise.all(
        betColumns.map(async (column) => {
          const [result] = await connection.query(`
                    SELECT SUM(money) AS total_money
                    FROM minutes_1
                    WHERE game = "${join}" AND status = 0 AND bet IN (${column.bets
            .map((bet) => `"${bet}"`)
            .join(",")})
                `);
          return {
            name: column.name,
            total_money: parseInt(result[0]?.total_money) || 0,
          };
        })
      );

      const colorBets = {
        red_big: [6, 8],
        red_small: [2, 4], //0 removed
        green_big: [7, 9], //5 removed
        green_small: [1, 3],
        violet_big: [5],
        violet_small: [0],
      };

      const smallestCategory = categories.reduce((smallest, category) =>
        !smallest || category.total_money < smallest.total_money
          ? category
          : smallest
      );

      const betsForCategory = colorBets[smallestCategory.name] || [];
      const availableBets = betsForCategory.filter(
        (bet) =>
          !categories.find(
            (category) =>
              category.name === smallestCategory.name &&
              category.total_money < smallestCategory.total_money
          )
      );

      const lowestBet =
        availableBets.length > 0
          ? availableBets[0]
          : Math.min(...betsForCategory);
      amount = lowestBet;
    }

    let nextResult = "-1";
    if (game == 1) nextResult = setting[0].wingo1;
    if (game == 3) nextResult = setting[0].wingo3;
    if (game == 5) nextResult = setting[0].wingo5;
    if (game == 10) nextResult = setting[0].wingo10;
    if (game == 11) nextResult = setting[0].trx1;
    if (game == 33) nextResult = setting[0].trx3;
    if (game == 55) nextResult = setting[0].trx5;
    if (game == 100) nextResult = setting[0].trx10;

    let newArr = "";
    if (nextResult == "-1") {
      await connection.execute(
        `UPDATE wingo SET amount = ?,status = ? WHERE period = ? AND game = "${join}"`,
        [amount, 1, period]
      );
      newArr = "-1";
    } else {
      let result = "";
      let arr = nextResult.split("|");
      let check = arr.length;
      if (check == 1) {
        newArr = "-1";
      } else {
        for (let i = 1; i < arr.length; i++) {
          newArr += arr[i] + "|";
        }
        newArr = newArr.slice(0, -1);
      }
      result = arr[0];
      await connection.execute(
        `UPDATE wingo SET amount = ?,status = ? WHERE period = ? AND game = "${join}"`,
        [result, 1, period]
      );
    }

    let checkTime2 = timerJoin(Date.now());

    if (winGoNow[0] === undefined) {
      // If no previous period exists, start with formattedDate + game + 0000
      period = `${times}1${updatenum}0000`;
      blockhight = "100000";
    } else {
      // Get the period from the database
      let dbPeriod = winGoNow[0].period;

      // Extract the date part from the database period
      let dbDatePart = dbPeriod.slice(0, 8);

      if (dbDatePart === times) {
        // If the date part matches the current date, use the database period
        period = dbPeriod;
      } else {
        // If the date part does not match, start with formattedDate + game + 0000
        period = `${times}1${updatenum}0000`;

        // Delete records from wingo table if date doesn't match
        //           const yesterday = new Date();
        // yesterday.setDate(yesterday.getDate() - 1);
        // const formattedYesterday = yesterday.toISOString().split('T')[0];

        // await connection.execute(`DELETE FROM wingo WHERE status = 0 AND game = "${join}" AND DATE(time) = "${formattedYesterday}"`);
      }

      // Determine the blockhight value based on winGoNow
      if (winGoNow[0].blocs === 0 || winGoNow[0].blocs === undefined) {
        blockhight = "100000";
      } else {
        blockhight = winGoNow[0].blocs;
      }
    }

    const sql = `INSERT INTO wingo SET 
        period = ?,
        amount = ?,
        game = ?,
        status = ?,
        hashvalue=?,
        blocs=?,
        time = ?`;
    await connection.execute(sql, [
      Number(period) + 1,
      0,
      join,
      0,
      generateRandomHash(10),
      Number(blockhight) + 20,
      checkTime2,
    ]);

    if (game == 1) join = "wingo1";
    if (game == 3) join = "wingo3";
    if (game == 5) join = "wingo5";
    if (game == 10) join = "wingo10";
    if (game == 11) join = "trx1";
    if (game == 33) join = "trx3";
    if (game == 55) join = "trx5";
    if (game == 100) join = "trx10";

    await connection.execute(`UPDATE admin SET ${join} = ?`, [newArr]);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

const handlingWinGo1P = async (typeid) => {
  let game = "";
  if (typeid == 1) game = "wingo";
  if (typeid == 3) game = "wingo3";
  if (typeid == 5) game = "wingo5";
  if (typeid == 10) game = "wingo10";
  if (typeid == "11") game = "trx";
  if (typeid == "33") game = "trx3";
  if (typeid == "55") game = "trx5";
  if (typeid == "100") game = "trx10";
  const [winGoNow] = await connection.query(
    `SELECT * FROM wingo WHERE status != 0 AND game = '${game}' ORDER BY id DESC LIMIT 1 `
  );

  // update ket qua
  await connection.execute(
    `UPDATE minutes_1 SET result = ? WHERE status = 0 AND game = '${game}'`,
    [winGoNow[0].amount]
  );
  let result = Number(winGoNow[0].amount);
  switch (result) {
    case 0:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "0" AND bet != "t" `,
        []
      );

      break;
    case 1:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "1" `,
        []
      );
      break;
    case 2:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "2" `,
        []
      );
      break;
    case 3:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "3" `,
        []
      );
      break;
    case 4:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "4" `,
        []
      );
      break;
    case 5:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "5" AND bet != "t" `,
        []
      );
      break;
    case 6:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "6" `,
        []
      );
      break;
    case 7:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "7" `,
        []
      );
      break;
    case 8:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "d" AND bet != "8" `,
        []
      );
      break;
    case 9:
      await connection.execute(
        `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet != "l" AND bet != "n" AND bet != "x" AND bet != "9" `,
        []
      );
      break;
    default:
      break;
  }

  if (result < 5) {
    await connection.execute(
      `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet = "l" `,
      []
    );
  } else {
    await connection.execute(
      `UPDATE minutes_1 SET status = 2 WHERE status = 0 AND game = "${game}" AND bet = "n" `,
      []
    );
  }

  // lấy ra danh sách đặt cược chưa xử lý
  const [orders] = await connection.execute(
    `SELECT * FROM minutes_1 WHERE status = 0 AND game = '${game}'`
  );

  const processBet = async (orders) => {
    let result = orders.result;
    let bet = orders.bet;
    let total = orders.money;
    let id = orders.id;
    let phone = orders.phone;
    let nhan_duoc = 0;

    if (bet == "l" || bet == "n") {
      nhan_duoc = total * 2;
    } else {
      if (result == 0 || result == 5) {
        if (bet == "d" || bet == "x") {
          nhan_duoc = total * 1.5;
        } else if (bet == "t") {
          nhan_duoc = total * 4.5;
        } else if (bet == "0" || bet == "5") {
          nhan_duoc = total * 4.5;
        }
      } else {
        if (result == 1 && bet == "1") {
          nhan_duoc = total * 9;
        } else if (result == 1 && bet == "x") {
          nhan_duoc = total * 2;
        }
        if (result == 2 && bet == "2") {
          nhan_duoc = total * 9;
        } else if (result == 2 && bet == "d") {
          nhan_duoc = total * 2;
        }
        if (result == 3 && bet == "3") {
          nhan_duoc = total * 9;
        } else if (result == 3 && bet == "x") {
          nhan_duoc = total * 2;
        }
        if (result == 4 && bet == "4") {
          nhan_duoc = total * 9;
        } else if (result == 4 && bet == "d") {
          nhan_duoc = total * 2;
        }
        if (result == 6 && bet == "6") {
          nhan_duoc = total * 9;
        } else if (result == 6 && bet == "d") {
          nhan_duoc = total * 2;
        }
        if (result == 7 && bet == "7") {
          nhan_duoc = total * 9;
        } else if (result == 7 && bet == "x") {
          nhan_duoc = total * 2;
        }
        if (result == 8 && bet == "8") {
          nhan_duoc = total * 9;
        } else if (result == 8 && bet == "d") {
          nhan_duoc = total * 2;
        }
        if (result == 9 && bet == "9") {
          nhan_duoc = total * 9;
        } else if (result == 9 && bet == "x") {
          nhan_duoc = total * 2;
        }
      }
    }

    let checkTime2 = timerJoin(Date.now());

    let totalsGet = parseFloat(nhan_duoc);

    await connection.execute(
      "UPDATE `minutes_1` SET `get` = ?, `status` = 1 WHERE `id` = ? ",
      [totalsGet, id]
    );
    await connection.execute(
      "INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?",
      [phone, "Win", totalsGet, checkTime2]
    );
    await connection.execute(
      "UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ?",
      [totalsGet, phone]
    );
  };

  const promises = orders.map((order) => processBet(order));

  await Promise.all(promises);
};

const tradeCommission = async () => {
  const [users] = await connection.execute(
    "SELECT * FROM `users` WHERE `pending_commission` > 0"
  );

  const sumdate = timerJoin(Date.now());
  // Loop through the users and update their money and pending_commission
  for (let user of users) {
    // Update the user's money and reset pending_commission to 0
    await connection.execute(
      "UPDATE `users` SET `money` = `money`+?, `pending_commission` = 0 WHERE `phone` = ?",
      [user.pending_commission, user.phone]
    );

    const datasql =
      "INSERT INTO transaction_history SET phone = ?, detail = ?, balance = ?, `time` = ?";

    await connection.execute(datasql, [
      user.phone,
      "Team trade commission",
      user.pending_commission,
      sumdate,
    ]);
  }
};

module.exports = {
  winGoPage,
  betWinGo,
  listOrderOld,
  GetMyEmerdList,
  handlingWinGo1P,
  addWinGo,
  winGoPage3,
  winGoPage5,
  winGoPage10,
  trxPage,
  trxPage3,
  trxPage5,
  trxPage10,
  tradeCommission,
};
