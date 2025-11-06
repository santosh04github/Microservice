import express from "express";
import { addProperty, getProperties, getPropertyById } from "../controllers/propertyController.js";

const router = express.Router();

// Add property via JSON
router.post("/add", addProperty);  

// Get all properties
router.get("/", getProperties);

// Get property by ID
router.get("/:id", getPropertyById);

export default router;
