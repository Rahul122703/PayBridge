const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const verifyToken = require("../Middlewares/verifyToken");
const Order = require("../Models/Order");
const OrderStatus = require("../Models/OrderStatus");
const WebhookLog = require("../Models/WebhookLog");

const router = express.Router();

router.post("/create-payment", verifyToken, async (req, res) => {
  try {
    const { school_id, amount, callback_url, trustee_id, student_info } =
      req.body;
    if (!school_id || !amount || !callback_url) {
      return res
        .status(400)
        .json({ message: "school_id, amount and callback_url required" });
    }

    const payload = {
      school_id: String(school_id),
      amount: String(amount),
      callback_url: String(callback_url),
    };

    const sign = jwt.sign(payload, process.env.PG_SECRET);

    const requestBody = { ...payload, sign };

    const response = await axios.post(
      "https://dev-vanilla.edviron.com/erp/create-collect-request",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    const collectId = data.collect_request_id;
    const paymentUrl =
      data.Collect_request_url || data.collect_request_url || data.payment_url;

    const newOrder = new Order({
      collect_id: collectId,
      school_id: payload.school_id,
      trustee_id: trustee_id || null,
      student_info: student_info || {},
      gateway_name: "Edviron",
      order_amount: Number(amount),
    });

    await newOrder.save();

    return res.json({ url: paymentUrl, collect_id: collectId, raw: data });
  } catch (err) {
    console.error("create-payment error:", err.response?.data || err.message);
    return res.status(500).json({
      message: "Payment creation failed",
      error: err.response?.data || err.message,
    });
  }
});

router.post("/webhook", async (req, res) => {
  try {
    const payload = req.body;

    await WebhookLog.create({ payload, source: "webhook-post" });

    const info = payload.order_info || payload.data || {};
    const collect_id = info.order_id;
    if (!collect_id) {
      return res
        .status(400)
        .json({ message: "Missing order_id in webhook payload" });
    }

    const update = {
      collect_id,
      order_amount: info.order_amount,
      transaction_amount: info.transaction_amount,
      payment_mode: info.payment_mode,
      payment_details: info.payment_details || info.payemnt_details,
      bank_reference: info.bank_reference,
      payment_message: info.Payment_message || info.payment_message,
      status: info.status,
      error_message: info.error_message,
      payment_time: info.payment_time ? new Date(info.payment_time) : undefined,
      updatedAt: new Date(),
    };

    await OrderStatus.findOneAndUpdate({ collect_id }, update, {
      upsert: true,
      new: true,
    });

    return res.status(200).json({ message: "Webhook processed" });
  } catch (err) {
    console.error("webhook error:", err);
    return res
      .status(500)
      .json({ message: "Webhook failed", error: err.message });
  }
});

router.get("/callback", async (req, res) => {
  try {
    const { EdvironCollectRequestId, status, reason } = req.query;

    if (!EdvironCollectRequestId) {
      return res.status(400).send("Missing EdvironCollectRequestId");
    }

    await WebhookLog.create({
      payload: req.query,
      source: "callback-get",
    });

    const update = {
      collect_id: EdvironCollectRequestId,
      status: status || "unknown",
      error_message: reason || null,
      updatedAt: new Date(),
    };

    await OrderStatus.findOneAndUpdate(
      { collect_id: EdvironCollectRequestId },
      update,
      { upsert: true, new: true }
    );

    return res.send(`
      <html>
        <head><title>Payment Status</title></head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h1>Payment ${status}</h1>
          <p>Order ID: ${EdvironCollectRequestId}</p>
          <p>${reason || ""}</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("callback error:", err);
    return res.status(500).send("Error displaying callback page");
  }
});

router.get("/transaction-status/:collect_id", verifyToken, async (req, res) => {
  try {
    const { collect_id } = req.params;
    if (!collect_id)
      return res.status(400).json({ message: "collect_id required" });

    const payload = {
      school_id: process.env.SCHOOL_ID,
      collect_request_id: String(collect_id),
    };

    const sign = jwt.sign(payload, process.env.PG_SECRET);

    const url = `https://dev-vanilla.edviron.com/erp/collect-request/${collect_id}?school_id=${process.env.SCHOOL_ID}&sign=${sign}`;
    const response = await axios.get(url, { timeout: 10000 });

    return res.json(response.data);
  } catch (err) {
    console.error(
      "transaction-status error:",
      err.response?.data || err.message
    );
    return res.status(500).json({
      message: "Status check failed",
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;
