const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const Order = require("../models/Order");

const router = express.Router();

/**
 * GET /transactions
 * Query params: page, limit, sort, order, status, school_id, from, to
 * Returns aggregated data combining orders + order_status
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "payment_time",
      order = "desc",
      status,
      school_id,
      from,
      to,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build $match filters for aggregation
    const match = {};
    if (school_id) match["order.school_id"] = String(school_id);
    if (status) match["order_status.status"] = String(status);
    if (from || to) {
      match["order_status.payment_time"] = {};
      if (from) match["order_status.payment_time"].$gte = new Date(from);
      if (to) match["order_status.payment_time"].$lte = new Date(to);
    }

    const pipeline = [
      {
        $lookup: {
          from: "orderstatuses",
          localField: "collect_id",
          foreignField: "collect_id",
          as: "order_status",
        },
      },
      { $unwind: { path: "$order_status", preserveNullAndEmptyArrays: true } },
      { $match: match },
      {
        $project: {
          collect_id: 1,
          school_id: 1,
          gateway: "$gateway_name",
          order_amount: 1,
          transaction_amount: "$order_status.transaction_amount",
          status: "$order_status.status",
          custom_order_id: "$collect_id",
          payment_time: "$order_status.payment_time",
        },
      },
      { $sort: { [sort]: order === "asc" ? 1 : -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
    ];

    const data = await Order.aggregate(pipeline);

    // total count with same filters
    const countPipeline = [
      {
        $lookup: {
          from: "orderstatuses",
          localField: "collect_id",
          foreignField: "collect_id",
          as: "order_status",
        },
      },
      { $unwind: { path: "$order_status", preserveNullAndEmptyArrays: true } },
      { $match: match },
      { $count: "count" },
    ];

    const countRes = await Order.aggregate(countPipeline);
    const total = countRes[0]?.count || 0;

    return res.json({ total, page: Number(page), limit: Number(limit), data });
  } catch (err) {
    console.error("transactions fetch error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: err.message });
  }
});

/**
 * GET /transactions/school/:schoolId
 */
router.get("/school/:schoolId", verifyToken, async (req, res) => {
  try {
    const { schoolId } = req.params;
    const results = await Order.aggregate([
      { $match: { school_id: String(schoolId) } },
      {
        $lookup: {
          from: "orderstatuses",
          localField: "collect_id",
          foreignField: "collect_id",
          as: "order_status",
        },
      },
      { $unwind: { path: "$order_status", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          collect_id: 1,
          school_id: 1,
          gateway: "$gateway_name",
          order_amount: 1,
          transaction_amount: "$order_status.transaction_amount",
          status: "$order_status.status",
          custom_order_id: "$collect_id",
        },
      },
    ]);

    return res.json(results);
  } catch (err) {
    console.error("transactions by school error:", err);
    return res.status(500).json({
      message: "Failed to fetch transactions for school",
      error: err.message,
    });
  }
});

module.exports = router;
