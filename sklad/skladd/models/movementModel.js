// models/stockLogModel.js
const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema({
    user: {
        id: mongoose.Schema.Types.ObjectId,
        username: String,
        role: String
    },
    product: {
        id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    action: {
        type: String,
        enum: ["Vytvořit", "Odebrat", "Přidat", "Smazat"]
    },
    quantity: Number,
    previousQuantity: Number,
    newQuantity: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Movement", movementSchema);
