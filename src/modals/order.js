const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: {type: ObjectId,ref:"User", required: true},  
  orderId: String,
  senderName: String,
  senderPhoneNumber: String,
  receiverName: String,
  receiverPhoneNumber: String,
  shippingAddress: String,
  shippingInfo: String,
  cakeName: String,
  flavor: String,
  cakeType: String,
  weight: String,
  messageOnCard: String,
  specialInstructions: String,
  time: String, // Time of delivery
  quantity: Number, // If you still want to keep quantity
  price: Number,
  advance_payment: Number,
  balance_payment: Number,
  paymentType: String,
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when a document is created
  },
  status: String,
  order_date: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  agentName: {
    type: String,
    required: true
  }
  // createdBy: String,
});

module.exports = mongoose.model("Order", orderSchema);
