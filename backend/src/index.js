// require("./instrument");
// const Sentry = require("@sentry/node");
const express = require("express");
const app = express();
const serverV1 = require("./app.v1.js");
const connectDB = require("./config/mongo.config.js");
const host = "localhost";
const port = 7860;


app.use("/api/v1", serverV1);

// Sentry.setupExpressErrorHandler(app);

const start = () => {
  connectDB();
  app.listen(port, host, () => {
    console.log(`app is running in http://${host}:${port}`);
  });
};

start();
