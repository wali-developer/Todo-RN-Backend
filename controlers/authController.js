const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  SuccessResponse,
  ErrorResponse,
} = require("../helpers/responseService");
const { generateToken } = require("../helpers/generateToken");
require("dotenv").config();

// User registration
exports.registerUser = async (req, res) => {
  const { fullName, email, password, phone, profile } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return ErrorResponse(res, "User already exists", 422);
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      profile,
      status: "active",
    });

    if (user) {
      SuccessResponse(res, {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        status: user.status,
        token: generateToken(user._id),
      });
    } else {
      return ErrorResponse(res, "Field to create user.", 422);
    }
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, error.message, 500);
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return ErrorResponse("User not found", 404);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return ErrorResponse("Invalid email or password", 422);
    }

    return SuccessResponse(res, {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, error.message, 500);
  }
};
