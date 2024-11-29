import "dotenv/config";
import express from "express";
import configViewEngine from "./config/configEngine";
import routes from "./routes/web";
import cronJobContronler from "./controllers/cronJobContronler";
import socketIoController from "./controllers/socketIoController";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

// import heapdump from 'heapdump';

import { fileURLToPath } from "url";
require("dotenv").config();
let cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
// import fileUpload from "express-fileupload";
// const __filename = __filename;
// const __dirname = path.dirname(__filename);

const server = http.createServer(app);
app.use(
  cors({
    // origin: "https://daman2.vip",
    origin: "http://localhost:3000",
    // origin: "/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    // origin: "/", // Allow requests from this origin
    methods: ["GET", "POST"],
  },
});

// heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

app.use(express.static(path.join(__dirname, "public")));
app.options("*", cors());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Surrogate-Control", "no-store");
  next();
});

const port = process.env.PORT || 4066;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.JWT_ACCESS_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// setup viewEngine
configViewEngine(app);
// init Web Routes
routes.initWebRouter(app);

// Cron game 1 Phut
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever
socketIoController.sendMessageAdmin(io);

// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// app.use(express.static(path.join(__dirname, "/")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/text.html"));
// });

server.listen(port, () => {
  console.log("Connected success port: " + port);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Log the error, but continue running the server
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // Log the error, but continue running the server
});

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down server gracefully.");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0); // Exit the process with a success exit code
  });
});
