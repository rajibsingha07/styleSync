const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const inventorySchema = new mongoose.Schema({
  barber_id: { type: String, required: true }, // Supabase UUID stored as string
  products: [productSchema],
});

module.exports = mongoose.model("Inventory", inventorySchema);
