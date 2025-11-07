import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, mobile, area, type, password } = req.body;

    // Check if user already exists
    const [existingUser] = await global.db.query(
      "SELECT * FROM users WHERE mobile = ?",
      [mobile]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await global.db.query(
      "INSERT INTO users (name, mobile, area, type, password) VALUES (?, ?, ?, ?, ?)",
      [name, mobile, area, type, hashedPassword]
    );

    res.json({ message: "User registered successfully", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error in registerUser" });
  }
};

// Login user
// export const loginUser = async (req, res) => {
//   try {
//     const { mobile, password } = req.body;
//     console.log("📩 Received login request:", req.body);

//     // // Find user
//     const [rows] = await global.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
//     console.log("🔍 DB rows:", rows);

//     if (rows.length === 0) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const user = rows[0];
//     console.log("👤 Found user:", user);

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("🔑 Password match:", isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid password" });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user.id, mobile: user.mobile },
//       process.env.JWT_SECRET || "secretkey",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("🔥 Server error during login:", error);
//     res.status(500).json({ error: "Server error during login" });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Find user
    const [rows] = await global.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // ✅ Remove password before sending response
    const { password: _, ...userData } = user;

    // Send response with token + user details
    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get user
    const [rows] = await global.db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in DB
    await global.db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error while changing password" });
  }
};


