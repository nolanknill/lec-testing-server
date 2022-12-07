const express = require("express");
const app = express();

const warehouseRoutes = require("./routes/warehouseRoute");

app.use(express.json());
app.use("/warehouses", warehouseRoutes);

module.exports = app;
