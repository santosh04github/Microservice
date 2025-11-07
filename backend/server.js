import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connect
let db;
const startServer = async () => {
  try {
    db = await connectDB(); 
    global.db = db;

    await connectDB();

    // app.use("/api/auth", authRoutes);
  app.use(express.json({ limit: "10mb" })); 
  console.log("Express JSON middleware loaded");
    app.use("/api/properties", propertyRoutes);
    console.log("Property routes loaded");

    app.get("/api/test", (req, res) => {
    res.json({ message: "✅ API working fine!" });
    });


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
