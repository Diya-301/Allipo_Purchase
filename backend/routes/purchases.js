const express = require("express");
const Purchase = require("../models/Purchase");
const Counter = require("../models/Counter");
const router = express.Router();

async function getNextSequenceValue(sequenceName) {
    const counter = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    return counter.sequence_value;
}

router.get("/", async (req, res) => {
    try {
        const purchases = await Purchase.find({});
        const formattedPurchases = purchases.map(purchase => {
            let purchaseObject = purchase.toObject();
            Object.keys(purchaseObject).forEach(key => {
                if (purchaseObject[key] && purchaseObject[key]._bsontype === "Decimal128") {
                    purchaseObject[key] = parseFloat(purchaseObject[key].toString());
                }
            });
            return purchaseObject;
        });
        res.json(formattedPurchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/count", async (req, res) => {
    try {
        const counter = await Counter.findOne({ _id: "purchaseId" });

        const currentId = counter ? counter.sequence_value + 1 : 1;

        res.status(200).json({ nextId: currentId });
    } catch (error) {
        console.error("Error fetching next ID:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nextId = await getNextSequenceValue("purchaseId");

        const newPurchase = new Purchase({
            id: nextId,
            ...req.body,
        });

        const savedPurchase = await newPurchase.save();

        res.status(201).json(savedPurchase);
    } catch (error) {
        console.error("Error creating purchase:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const requestedId = parseInt(req.params.id);

        const purchase = await Purchase.findOne({ id: requestedId });

        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        let purchaseObject = purchase.toObject();
        Object.keys(purchaseObject).forEach(key => {
            if (purchaseObject[key] && purchaseObject[key]._bsontype === "Decimal128") {
                purchaseObject[key] = parseFloat(purchaseObject[key].toString());
            }
        });

        res.json(purchaseObject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const requestedId = parseInt(req.params.id);

        if (isNaN(requestedId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedPurchase = await Purchase.findOneAndUpdate(
            { id: requestedId },
            req.body,
            { new: true }
        );

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        let purchaseObject = updatedPurchase.toObject();
        Object.keys(purchaseObject).forEach(key => {
            if (purchaseObject[key] && purchaseObject[key]._bsontype === "Decimal128") {
                purchaseObject[key] = parseFloat(purchaseObject[key].toString());
            }
        });

        res.json(purchaseObject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const requestedId = parseInt(req.params.id);

        if (isNaN(requestedId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedPurchase = await Purchase.findOneAndDelete({ id: requestedId });

        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all vendor details by vendorName
router.get("/vendor/:vendorName", async (req, res) => {
    try {
      const { vendorName } = req.params;
  
      // Query the database for all matching vendors
      const vendors = await Purchase.find({ vendorName });
  
      if (vendors.length === 0) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      res.json(vendors); // Return all matching vendors
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;