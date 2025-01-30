// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(401).json({
            message: "Failed to authenticate token.",
          });
        }

        const userExists = await User.findById(user.id).select("-password");
        if (!userExists) {
          return res.status(401).json({
            message: "Authorization token is invalid, No User found!",
          });
        }
        req.user = userExists;
        next();
      });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
