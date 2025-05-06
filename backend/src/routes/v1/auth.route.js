const express = require("express");
const { signupUsingGoogle, barberRegistration, logout, login } = require("../../controllers/v1/auth.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

// router.post('/register', signupUsingGoogle)
router.post('/register', barberRegistration);
router.post('/logout', logout);
router.post('/login', login);

module.exports = router;
