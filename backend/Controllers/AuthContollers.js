const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can't signup again",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || "school", // default role if not given
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", success: true });
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`,
      success: false,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  const errorMessage = `Auth failed as email or password is wrong`;

  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }

    // check password
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMessage, success: false });
    }

    // generate JWT with role also included
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      name: user.name,
      email: user.email,
      role: user.role,
      jwtToken,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: ${err}`,
      success: false,
    });
  }
};

module.exports = { signup, login };
