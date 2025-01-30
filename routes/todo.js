const { todoController } = require("../controlers");

const router = require("express").Router();

router.get("/list", todoController.getTodos);
router.post("/add", todoController.AddTodo);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
