const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  collect_id: { type: String, index: true }, 
  school_id: { type: String, index: true, required: true },
  trustee_id: { type: String },
  student_info: {
    name: String,
    id: String,
    email: String,
  },
  gateway_name: { type: String },
  order_amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
