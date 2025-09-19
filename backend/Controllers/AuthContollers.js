const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User");


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can't signup again",
        success: false,
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: role || "school",
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


const login = async (req, res) => {
  const errorMessage = `Auth failed as email or password is wrong`;

  try {
    const { email, password } = req.body;


    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }


    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMessage, success: false });
    }

   
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
