const { addBarberInventory } = require("../../repositories/v1/inventory.repository");

const addInventory = async (req, res) => {
    try {
        const barberId = req.barber;
        const products = req.body;
    
        // Validate input
        if (!barberId || !products) {
        return res.status(400).json({ message: "Barber ID and products are required." });
        }
    
        // Call the repository function to add inventory
        const newInventory = await addBarberInventory(barberId, products);
    
        return res.status(201).json({
        message: "Inventory added successfully.",
        inventory: newInventory,
        });
    } catch (error) {
        console.error("Error adding inventory:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
    }

module.exports = {
    addInventory,
};