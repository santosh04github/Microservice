import db from "../config/db.js";

export const createUser = (data, callback) => {
  const sql = "INSERT INTO users (name, mobile, area, type, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [data.name, data.mobile, data.area, data.type, data.password], callback);
};

export const getUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};
