const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
  collect_id: { type: String, index: true, required: true }, // matches Order.collect_id
  order_amount: Number,
  transaction_amount: Number,
  payment_mode: String,
  payment_details: String,
  bank_reference: String,
  payment_message: String,
  status: String,
  error_message: String,
  payment_time: Date,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderStatus", OrderStatusSchema);
