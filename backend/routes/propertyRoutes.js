import express from "express";
import { addProperty, getProperties, getPropertyById } from "../controllers/propertyController.js";

const router = express.Router();

console.log("Property router file loaded");
// Add property via JSON
router.post("/add", (req, res, next) => {
    console.log("POST /add route called"); // 3️⃣ Route called
    addProperty(req, res);
}); 

// Get all properties
router.get("/", getProperties);

// Get property by ID
router.get("/:id", getPropertyById);

export default router;
