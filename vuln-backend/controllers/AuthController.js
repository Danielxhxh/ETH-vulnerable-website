const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const bcrypt = require("bcrypt");
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

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Email, username, and password are required" });
  }

  try {
    bcrypt.hash(password, 0, async function (err, hash) {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        const [rows] = await connection.execute(
          `INSERT INTO users (email, username, password) VALUES ('${email}', '${username}', '${hash}')`
        );

        const userId = rows.insertId;
        const token = jwt.sign({ id: userId }, "gk7PYgMEiMZNn");

        return res
          .status(200)
          .json({ message: "Registration successful", accessToken: token });
      }
    });
  } catch (err) {
    console.error("Error registering:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// IDEA: SQL Injection in the body of the login request using burp suite
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    bcrypt
      .compare(password, rows[0].password)
      .then((result) => {
        if (result) {
          const user = rows[0];
          const token = jwt.sign({ id: user.id }, "gk7PYgMEiMZNn");
          return res
            .status(200)
            .json({ message: "Login successful", accessToken: token });
        } else {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
      })
      .catch((err) => {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id = '${userId}'`
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let user = rows[0];

    // Remove password from user object before sending it to the client
    let { password, ...newUser } = user;
    user = newUser;

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkToken = async (req, res) => {
  return res.status(200).json({ message: "Token is valid" });
};

exports.getLogsNames = async (req, res) => {
  try {
    const userId = req.decoded.id;
    if (userId == 1) {
      const command = `ls /var/log/nginx`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to list log files", stderr });
        }
        const logFiles = stdout.trim().split("\n");
        res.status(200).send({ logFiles });
      });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error" });
  }
};

exports.checkLogs = async (req, res) => {
  try {
    const userId = req.decoded.id;

    if (userId !== 1) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const logFile = req.body.logFile;

    if (!logFile) {
      return res.status(400).json({ error: "Log file path is required" });
    }

    const command = `tail -n 10 /var/log/nginx/${logFile}`; // Display last 10 lines of the log file

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error tailing log file: ${error.message}`);
        return res.status(500).json({ error: "Failed to tail log file" });
      }

      if (stderr) {
        console.error(`Error tailing log file: ${stderr}`);
        return res.status(500).json({ error: "Failed to tail log file" });
      }

      res.status(200).json({ logContent: stdout });
    });
  } catch (err) {
    console.error(`Error in checkLogs: ${err.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
