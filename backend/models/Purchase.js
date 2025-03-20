const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    contactPerson: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true }
});

const purchaseSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    industries: { type: String, required: false },
    type: { type: String, required: false },
    product: { type: String, required: true },
    vendorName: { type: String, required: true },
    businessType: {
        type: String,
        required: true,
        enum: ["Manufacturer", "Importer", "Distributor", "Trader"]
    },
    sourceType: {
        type: String,
        default: "",
        validate: {
            validator: function (value) {
                if (this.businessType === "Manufacturer") {
                    return !value;
                }
                return true;
            },
            message: "sourceType must be empty if businessType is Manufacturer"
        }
    },
    country: {
        type: String,
        default: "",
        validate: {
            validator: function (value) {
                if (this.businessType === "Manufacturer") {
                    return !value;
                }
                return true;
            },
            message: "country must be empty if businessType is Manufacturer"
        }
    },
    make: { type: String, required: false },
    address: { type: String, required: false },
    contacts: { 
        type: [contactSchema], 
        validate: [arrayLimit, '{PATH} exceeds the limit of 1 contact']
    },
    date: { type: Date, default: Date.now },

    TECH: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    LR: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    AR: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    ACS: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    FOOD: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    COSMETIC: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    IH: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    IP: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    BP: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    USP: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    PHARMA: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    ELECTROPLATING: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    FEED: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    AGRI: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    IMPORTED: { type: mongoose.Schema.Types.Decimal128, default: 0 },

    remarks: { type: String, required: false },
});

function arrayLimit(val) {
    return val.length >= 1;
}

module.exports = mongoose.model("Purchase", purchaseSchema);