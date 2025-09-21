const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const Order = require("../Models/Order");

const router = express.Router();

/**
 * GET /transactions
 * Query params: page, limit, sort, order, school_id
 * Returns data directly from Order collection
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "createdAt",
      order = "desc",
      school_id,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build filter
    const filter = {};
    if (school_id) filter.school_id = String(school_id);

    // Fetch data from Order collection
    const data = await Order.find(filter)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit))
      .select("collect_id school_id gateway_name order_amount createdAt");

    // total count
    const total = await Order.countDocuments(filter);

    return res.json({ total, page: Number(page), limit: Number(limit), data });
  } catch (err) {
    console.error("transactions fetch error:", err);
    return res.status(500).json({
      message: "Failed to fetch transactions",
      error: err.message,
    });
  }
});

module.exports = router;

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
