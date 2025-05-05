const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  barberId: {
    type: String, // Supabase UUID is a string
    required: true,
  },
  services: [
    {
      serviceName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Service", serviceSchema);
