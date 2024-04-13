const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var apiRouter = require("./routes/api.js");
//Route Prefixes
app.use("/api", apiRouter);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
