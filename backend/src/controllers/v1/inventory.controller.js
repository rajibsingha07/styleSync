const { getBarberById } = require("../../repositories/v1/auth.repository");
const { addBarberInventory, pushNewInventory, editInventoryReference, getInventoryByBarberId } = require("../../repositories/v1/inventory.repository");

const addInventory = async (req, res) => {
    try {
        const barberId = req.barber;
        const products = req.body;

        // Validate input
        if (!barberId || !products) {
            return res.status(400).json({ message: "Barber ID and products are required." });
        }

        // Check if the barber already has an inventory
        const existingInventory = await getBarberById(barberId);
        if (existingInventory.inventories) {
            // If inventory exists, push new products to the existing inventory
            const updatedInventory = await pushNewInventory(barberId, products);
            if (!updatedInventory) {
                return res.status(404).json({ message: "Inventory not found." });
            }
            return res.status(200).json({
                message: "Inventory updated successfully.",
                inventory: updatedInventory,
            });
        }

        // Call the repository function to add inventory
        const newInventory = await addBarberInventory(barberId, products);
        if (!newInventory) {
            return res.status(500).json({ message: "Failed to add inventory." });
        }
        // Update the barber's reference to the inventory
        await editInventoryReference(barberId, newInventory._id);

        return res.status(201).json({
            message: "Inventory added successfully.",
            inventory: newInventory,
        });
    } catch (error) {
        console.error("Error adding inventory:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

const getInventory = async (req, res) => {
    const barberId = req.barber;

    if (!barberId) {
        return res.status(400).json({
            message: "Barber ID is required",
        });
    }

    try {
        const inventories = await getInventoryByBarberId(barberId);

        if (!inventories) {
            return res.status(404).json({
                message: "No inventories found",
            });
        }

        return res.status(200).json({
            message: "Inventories fetched successfully",
            inventories,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    } 
}

module.exports = {
    addInventory,
    getInventory
};