const {
  ErrorResponse,
  SuccessResponse,
} = require("../helpers/responseService");
const Todo = require("../models/todo");

module.exports.getTodos = async (req, res) => {
  try {
    const { search, limit = 10 } = req.query;

    const query = {
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { periority: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const todos = await Todo.find(query).limit(limit);
    return SuccessResponse(res, todos);
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, error.message, 500);
  }
};

module.exports.AddTodo = async (req, res) => {
  try {
    const titleText = req.body.title ? `^${req.body.title}` : "";
    const exist = await Todo.findOne({
      title: { $regex: new RegExp(titleText.trim(), "i") },
    });
    if (exist) {
      return ErrorResponse(res, "The given todo is already exist.", 422);
    }

    const todo = Todo(req.body);
    await todo.save();

    return SuccessResponse(res, { todo });
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, error.message, 500);
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Todo.findById(id);
    if (!isExist) {
      return ErrorResponse(res, "Todo not found", 404);
    }

    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return ErrorResponse(res, "Failed to add todo", 500);
    }

    return SuccessResponse(res, {
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    return ErrorResponse(res, error.message);
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return ErrorResponse(res, "Failed to delete todo");
    }
    return SuccessResponse(res, `Todo deleted successfully`);
  } catch (error) {
    console.log(error);
    return ErrorResponse(res, error.message, 500);
  }
};
