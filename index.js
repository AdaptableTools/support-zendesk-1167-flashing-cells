"use strict";

const fs = require("node:fs");
const express = require("express");
const { WebSocketServer } = require("ws");
const { generateSnapshot, generateIncrement } = require("./helpers.js");
const cors = require("cors");

const SERVER_PORT = process.env.PORT || 8081;
const WS_PORT = 8082;
const FRONTEND_PORT = 8080;

const TRADES_COUNT = 20_000;
const INCREMENT_UPDATE_FREQUENCY = 500; // in ms

const app = express();
const wsServer = new WebSocketServer({ port: WS_PORT });

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

wsServer.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("received: %s", data);
  });

  setInterval(function () {
    generateIncrement(TRADES_COUNT / 5);
    const incrementJson = fs.readFileSync(
      "./datasource/increment.json",
      "utf8"
    );
    ws.send(incrementJson);
  }, INCREMENT_UPDATE_FREQUENCY);
});

app.get("/api/trades", (req, res) => {
  generateSnapshot(TRADES_COUNT);
  const tradesJson = fs.readFileSync("./datasource/snapshot.json", "utf8");
  res.status(200).send(tradesJson);
});

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
