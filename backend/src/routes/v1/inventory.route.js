const express = require("express");
const { addInventory } = require("../../controllers/v1/inventory.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

router.post('/add', addInventory);

module.exports = router;
