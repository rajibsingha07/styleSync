const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const servicesRoute = require("./services.route");
const verifyBarber = require("../../middlewares/auth.middleware");

router.use("/auth", authRoute);
router.use("/service", verifyBarber, servicesRoute);

module.exports = router;
