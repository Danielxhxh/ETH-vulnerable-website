var express = require("express");
const AuthController = require("../controllers/AuthController");
const jwt = require("jsonwebtoken");
var router = express.Router();

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  try {
    const decoded = jwt.verify(token, "gk7PYgMEiMZNn");
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", verifyToken, AuthController.getUser);
router.get("/checktoken", verifyToken, AuthController.checkToken);

// It should be added in the products controller, not here. But i dont want to add the jwt at products controller
// router.post("/add-product", verifyToken, AuthController.addProduct);

module.exports = router;
