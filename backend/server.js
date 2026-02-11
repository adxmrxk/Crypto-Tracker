require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const usersRoutes = require("./routes/usersRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const serverListsRoutes = require("./routes/serverListsRoutes");
const watchListRoutes = require("./routes/watchListsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");

app.use("/", usersRoutes);
app.use("/", settingsRoutes);
app.use("/", serverListsRoutes);
app.use("/", watchListRoutes);
app.use("/", postsRoutes);
app.use("/", transactionsRoutes);
app.use("/", notificationsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cryptoApp";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.error("Failed to connect to database"));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
