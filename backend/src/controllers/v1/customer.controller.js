const { create } = require("../../models/services.model");
const { addBarbersCustomer, getBarbersCustomer, getBarbersCustomerById } = require("../../repositories/v1/customer.repository");
const { getServicesByIDs } = require("../../repositories/v1/services.repository");

const addCustomer = async (req, res) => {
    const barberId = req.barber;
    const customer = req.body;

    try {
        const data = await addBarbersCustomer(barberId, customer);
        res.status(201).json({
            message: "Customer added successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add customer",
            error: error.message,
        });
    }
}

const getCustomer = async (req, res) => {
    const barberId = req.barber;
    if (!barberId) {
        return res.status(400).json({
            message: "Barber ID is required",
        });
    }

    try {
        const customers = await getBarbersCustomer(barberId);

        if (!customers) {
            return res.status(404).json({
                message: "No customers found",
            });
        }

        return res.status(200).json({
            message: "Customers fetched successfully",
            customers,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const getCustomerById = async (req, res) => {
    const customerId = req.params.customerId;

    if (!customerId) {
        return res.status(400).json({
            message: "Customer ID is required",
        });
    }

    try {
        const findCustomer = await getBarbersCustomerById(customerId);

        if (!findCustomer) {
            return res.status(404).json({
                message: "No customer found",
            });
        }

        const services = await getServicesByIDs(findCustomer.Services);

        const customer = {
            id: findCustomer.id,
            createdAt: findCustomer.created_at,
            gender: findCustomer.Gender,
            services: services
        }

        return res.status(200).json({
            message: "Customer fetched successfully",
            customer,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    addCustomer,
    getCustomer,
    getCustomerById,
};