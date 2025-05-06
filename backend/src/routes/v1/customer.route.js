const express = require("express");
const { addCustomer, getCustomer, getCustomerById } = require("../../controllers/v1/customer.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

router.post('/add', addCustomer);
router.get('/all', getCustomer);
router.get('/:customerId', getCustomerById);


module.exports = router;
