const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
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
const backupRoutes = require("./routes/backup");
const backupService = require("./services/backupService");

app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/backup", backupRoutes);

// Schedule automatic backup every 15 days at midnight
cron.schedule('0 0 */15 * *', async () => {
    try {
        await backupService.createBackup();
        console.log('Automatic backup completed successfully');
    } catch (error) {
        console.error('Automatic backup failed:', error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

