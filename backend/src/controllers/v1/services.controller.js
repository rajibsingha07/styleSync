const { getBarberById } = require("../../repositories/v1/auth.repository");
const { createService, editServiceReference, getServiceByBarberId, getServiceById, getServicesByIDs, pushNewService } = require("../../repositories/v1/services.repository");

const addServices = async (req, res) => {
    const services = req.body;

    const barberId = req.barber;

    const doesServiceExist = await getBarberById(barberId);

    if (doesServiceExist.services) {
        try {
            const updatedService = await pushNewService(barberId, services);

            if (!updatedService) {
                return res.status(404).json({
                    message: "Service not found",
                });
            }
            return res.status(200).json({
                message: "Service updated successfully",
                service: updatedService,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
            
        }
    }


    if (!services) {
        return res.status(400).json({
            message: "Services data is required",
        });
    }

    try {
        const barberId = req.barber;
        const service = await createService(barberId, services);
        await editServiceReference(barberId,service._id);
      
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

const getServices = async (req, res) => {
    const barberId = req.barber;

    if (!barberId) {
        return res.status(400).json({
            message: "Barber ID is required",
        });
    }

    try {
        const services = await getServiceByBarberId(barberId);

        if (!services) {
            return res.status(404).json({
                message: "No services found",
            });
        }

        return res.status(200).json({
            message: "Services fetched successfully",
            services,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const getServiceByServiceId = async (req, res) => {
    const serviceId = req.params.serviceId;

    if (!serviceId) {
        return res.status(400).json({
            message: "Service ID are required",
        });
    }

    try {
        const service = await getServiceById(serviceId);

        if (!service) {
            return res.status(404).json({
                message: "Service not found",
            });
        }

        return res.status(200).json({
            message: "Service fetched successfully",
            service,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const getBarberServicesByIDs = async (req, res) => {
    const serviceIds = req.body;

    if (!serviceIds) {
        return res.status(400).json({
            message: "Service IDs are required",
        });
    }

    try {
        const services = await getServicesByIDs(serviceIds);

        if (!services) {
            return res.status(404).json({
                message: "No services found",
            });
        }

        return res.status(200).json({
            message: "Services fetched successfully",
            services,
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
    getServices,
    getServiceByServiceId,
    getBarberServicesByIDs
};