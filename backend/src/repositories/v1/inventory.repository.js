const Inventory = require("../../models/inventory.model");

const addBarberInventory = async (barberId, products) => {
  const barberInventory = await Inventory.create({
    barber_id: barberId,
    products,
  });
  return barberInventory;
};

module.exports = {
  addBarberInventory,
};
