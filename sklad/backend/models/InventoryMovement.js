const mongoose = require('mongoose');

const InventoryMovementSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  movementType: {
    type: String,
    enum: ['in', 'out'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('InventoryMovement', InventoryMovementSchema);