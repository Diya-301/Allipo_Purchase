const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
const purchaseRoutes = require("./routes/purchases");

app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

