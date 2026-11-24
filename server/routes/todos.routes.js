import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  listTodos,
  getTodo,
  createTodo,
  updateTodo,
  replaceTodo,
  deleteTodo,
} from "../controllers/todos.controllers.js";

const router = Router();

//Every route below this line requires a valid JWT!
router.use(protect);

router.get("/", listTodos);
router.post("/", createTodo);
router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.put("/:id", replaceTodo);
router.delete("/:id", deleteTodo);
export default router;
