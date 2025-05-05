const express = require("express");
const { addServices } = require("../../controllers/v1/services.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

router.post('/add', addServices);

module.exports = router;
