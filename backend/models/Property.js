// Add new property
export const addProperty = async (data) => {
  const sql = "INSERT INTO properties (area, details, price, photo) VALUES (?, ?, ?, ?)";
  const [result] = await global.db.query(sql, [data.area, data.details, data.price, data.photo]);
  return result;
};

// Get all properties
export const getProperties = async () => {
  const [rows] = await global.db.query("SELECT * FROM properties ORDER BY created_at DESC");
  return rows;
};

// Get property by ID
export const getPropertyById = async (id) => {
  const [rows] = await global.db.query("SELECT * FROM properties WHERE id = ?", [id]);
  return rows[0]; // return single property
};