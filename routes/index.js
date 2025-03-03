const router = require("express").Router();
const { protect } = require("../middlewares/auth");
const authRouter = require("./auth");
const todoRouter = require("./todo");

router.use("/auth", authRouter);
router.use("/todo", todoRouter);

module.exports = router;
