const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const priceList = require("./routes/priceList");
dotenv.config({ path: "./congig/config.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/price-list", priceList);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
