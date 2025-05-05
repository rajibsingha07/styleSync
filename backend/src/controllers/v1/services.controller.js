const { createService, editServiceReference } = require("../../repositories/v1/services.repository");

const addServices = async (req, res) => {
    const services = req.body;

    if (!services) {
        return res.status(400).json({
            message: "Services data is required",
        });
    }

    try {
        const barberId = req.barber;
        const service = await createService(barberId, services);
        const addServiceReference = await editServiceReference(barberId,service._id);
      
        return res.status(201).json({
            message: "Service created successfully",
            service,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    addServices,
};