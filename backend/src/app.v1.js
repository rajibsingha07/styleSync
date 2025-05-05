// const compression = require("compression");
const express = require("express");
// const cors = require("cors");
const cookieParser = require('cookie-parser');

const helmet = require("helmet");
require('dotenv').config()

const app = express();




const bodyParser = require("body-parser");
// const corsOptions = require("./middleware/cors.options");
const routesV1 = require("./routes/v1/routes");

if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerSpec = require("./utils/swaggerOptions");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.disable("etag");


// app.use(cors(corsOptions));
// app.use(compression());
app.use(helmet({ contentSecurityPolicy: false, xDownloadOptions: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    version: "1.0.0",
  });
});

// Routes
app.use("/", routesV1);

module.exports = app;
