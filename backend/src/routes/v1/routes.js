const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const servicesRoute = require("./services.route");
const inventoryRoute = require("./inventory.route");
const customerRoute = require("./customer.route");
const verifyBarber = require("../../middlewares/auth.middleware");

router.use("/auth", authRoute);
router.use("/service", verifyBarber, servicesRoute);
router.use("/inventory", verifyBarber, inventoryRoute);
router.use("/customer", verifyBarber, customerRoute);

module.exports = router;
