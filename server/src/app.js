const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const { v1Router } = require("./routes/versionControl");

const app = express();

app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/v1", v1Router);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
