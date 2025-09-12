const mongoose = require("mongoose");

const WebhookLogSchema = new mongoose.Schema({
  payload: { type: Object },
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WebhookLog", WebhookLogSchema);
