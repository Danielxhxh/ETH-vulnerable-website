const mysql = require("mysql2/promise");
require("dotenv").config();

let connection;

async function connectDatabase() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: "eth",
    });

    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the application on connection error
  }
}

connectDatabase();

exports.productsList = async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM products ");
    res.json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.productDetail = async (req, res) => {
  try {
    var name = req.params.name;
    const [results] = await connection.query(
      `SELECT * FROM products WHERE name='${name}' `
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
};
