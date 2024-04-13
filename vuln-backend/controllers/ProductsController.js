const mysql = require("mysql2/promise");

let connection;

async function connectDatabase() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "7even6ix",
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

// EX:  http://localhost:3000/articles/smth%27%20UNION%20SELECT%20%2A%2CNULL%20from%20users%20where%20%271%27%3D%271
// https://www.urlencoder.org/
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
