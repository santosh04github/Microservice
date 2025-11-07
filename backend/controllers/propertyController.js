import { addProperty as addPropertyModel, getProperties as getPropertiesModel, getPropertyById as getPropertyByIdModel } from "../models/Property.js";

import s3 from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";
// import addProperty from "../models/Property.js"; 

export const addProperty = async (req, res) => {
  try {
    const { area, details, price, photo } = req.body;

    let photoUrl = null;

    if (photo) {
      // Decode base64
      const matches = photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid base64 string" });
      }

      const buffer = Buffer.from(matches[2], "base64");
      const fileName = uuidv4() + ".png"; // unique file name

      // Upload to S3
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: "image/png",
      };

      const uploadResult = await s3.upload(params).promise();
      console.log("File uploaded to S3:", uploadResult.Location);

      photoUrl = uploadResult.Location; // store this URL in DB
    }

    // Save property to DB
    const result = await addPropertyModel({
      area,
      details,
      price,
      photo: photoUrl
    });

    res.json({
      message: "Property added successfully",
      propertyId: result.insertId,
      photo: photoUrl
    });

  } catch (err) {
    console.error("Add Property Error:", err);
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
