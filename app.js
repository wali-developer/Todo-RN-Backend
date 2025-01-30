require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const indexRoutes = require("./routes/index");
require("./config/db");
const PORT = process.env.PORT || 8009;

// importan middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routes
app.use("/api", indexRoutes);

app.get("/", (req, res) => {
  res.send("Server is running - Wali ULlah:)");
});

app.get("/*", async (req, res) => {
  res.status(404).json({ Success: false, error: "No Route Found !" });
});

app.listen(PORT, () => {
  console.log(`Server is running  on :  http://localhost:${PORT}`);
});
