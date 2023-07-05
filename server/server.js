require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { db } = require("./db/db.JS");
const { readdirSync } = require("fs");
const {
  presentValueQueryAndUpdate,
} = require("./controllers/investments/presentValue");

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
//middlewares

//scheduled tasks
cron.schedule(
  "00 20 16-11 * * 0-5",
  () => {
    presentValueQueryAndUpdate();
  },
  {
    scheduled: true,
    timezone: "Turkey",
  }
);
//scheduled tasks

//routes
readdirSync("./routes").map((route) =>
  app.use("/", require("./routes/" + route))
);
//routes

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server ${PORT} Portunda Çalışıyor`);
  });
};

server();
