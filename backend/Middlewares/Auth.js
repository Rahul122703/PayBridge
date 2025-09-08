const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuthenticated = (req, res, next) => {
  console.log("------LOGGED IN USER DETAILS------\n", req.user);

  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT tsken is required" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "The JWT token is either wrong or expired" });
  }
};

module.exports = ensureAuthenticated;
