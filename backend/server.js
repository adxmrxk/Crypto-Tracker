const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const port = 5000;

app.use(cors());
app.use(express.json());

const usersRoutes = require("./routes/usersRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const serverListsRoutes = require("./routes/serverListsRoutes");
const watchListRoutes = require("./routes/watchListsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");

app.use("/", usersRoutes);
app.use("/", settingsRoutes);
app.use("/", serverListsRoutes);
app.use("/", watchListRoutes);
app.use("/", postsRoutes);
app.use("/", transactionsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.get("/api/coin/:id/market_chart", async (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range`,
      {
        params: {
          vs_currency: "usd",
          from,
          to,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch data from CoinGecko" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/cryptoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.error("Failed to connect to database"));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
