const express = require("express");
const { addInventory, getInventory } = require("../../controllers/v1/inventory.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

router.post('/add', addInventory);
router.get('/all', getInventory);

module.exports = router;
