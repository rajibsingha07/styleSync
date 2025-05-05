// db.js or mongoose.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,           // 🧠 Limit concurrent connections
            serverSelectionTimeoutMS: 5000, // 💣 Timeout after 5s if DB is unreachable
        });

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
