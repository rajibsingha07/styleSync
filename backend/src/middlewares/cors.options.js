const corsOptions = {
  origin: (origin, callback) => {
      const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://127.0.0.1:7860",
          "http://192.168.188.252:5173",
        "https://style-sync-delta.vercel.app"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

module.exports = corsOptions;
