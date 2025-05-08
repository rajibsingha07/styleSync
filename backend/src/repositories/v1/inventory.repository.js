const supabase = require("../../config/supabase.config");
const Inventory = require("../../models/inventory.model");

const addBarberInventory = async (barberId, products) => {
  const barberInventory = await Inventory.create({
    barber_id: barberId,
    products,
  });
  return barberInventory;
};

const pushNewInventory = async (barberId, updatedInventory) => {
  try {
    const result = await Inventory.findOneAndUpdate(
      { barber_id: barberId },
      {
        $push: {
          products: updatedInventory,
        },
      },
      { new: true, upsert: true }
    );

    return result;
  } catch (error) {
    throw new Error(`Failed to push new inventory: ${error.message}`);
  }
};

const getInventoryByBarberId = async (barberId) => {
  const { data, error } = await supabase
      .from("barbers")
      .select("inventories")
      .eq("barberId", barberId);
  
    if (error) {
      console.error("Error fetching inventories:", error);
      throw new Error(error.message);
    }

    const findInventories = await Inventory.findById(data[0].inventories);
    if (!findInventories) {
      return []
    }

    return findInventories;
}

const editInventoryReference = async (barberId, InventoryID) => {
  const { data, error } = await supabase
    .from("barbers")
    .update({ inventories: InventoryID })
    .eq("barberId", barberId)
    .select(); // If you want to return the updated row(s)

  if (error) {
    console.error("Error updating Inventory reference:", error);
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  addBarberInventory,
  pushNewInventory,
  editInventoryReference,
  getInventoryByBarberId,
};
