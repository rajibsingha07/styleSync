const express = require("express");
const { addServices, getServices, getServiceByServiceId, getBarberServicesByIDs } = require("../../controllers/v1/services.controller");
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        message: "Pong",
    });
})

router.post('/add', addServices);
router.get('/all', getServices);
router.get('/:serviceId', getServiceByServiceId);
router.post('/byIds', getBarberServicesByIDs);

module.exports = router;
