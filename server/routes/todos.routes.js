import { Router } from "express";
import {
  listTodos,
  getTodo,
  createTodo,
  updateTodo,
  replaceTodo,
  deleteTodo,
} from "../controllers/todos.controllers.js";

const router = Router();

router.get("/", listTodos);
router.post("/", createTodo);
router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.put("/:id", replaceTodo);
router.delete("/:id", deleteTodo);
export default router;
