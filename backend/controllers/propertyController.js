import { addProperty as addPropertyModel, getProperties as getPropertiesModel, getPropertyById as getPropertyByIdModel } from "../models/Property.js";

import fs from "fs";
import path from "path";

export const addProperty = async (req, res) => {
  try {
    console.log("=== Request received ===");
    console.log("Request headers:", req.headers);

    // Log the entire body
    console.log("Request body:", req.body);

    const { area, details, price, photo } = req.body;

    let photoName = null;
    if (photo) {
      // Decode base64
      const matches = photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid base64 string" });
      }

      const imageBuffer = Buffer.from(matches[2], "base64");
      photoName = Date.now() + ".png";

      // Save locally (optional) or upload to S3
      const filePath = path.join("uploads", photoName);
      fs.writeFileSync(filePath, imageBuffer);
      console.log("Saved photo as:", filePath);
    }

    // Save to DB only photo name
    const result = await addPropertyModel({
      area,
      details,
      price,
      photo: photoName
    });

    res.json({ message: "Property added successfully", propertyId: result.insertId, photoName });
  } catch (err) {
    console.error("Add Property Base64 Error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await getPropertiesModel();
    res.json(properties);
  } catch (err) {
    console.error("Get Properties Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await getPropertyByIdModel(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property); // Includes S3 photo link in `photo` field
  } catch (err) {
    console.error("Get Property By ID Error:", err);
    res.status(500).json({ error: err.message });
  }
};
