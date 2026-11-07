import { Router } from "express";

import {
  listTodos,
  createTodo,
  getTodo,
  updateTodo,
  replaceTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";

const router = Router();

router.use((req, res, next) => {
  next();
});

router.get("/", listTodos);
router.post("/", createTodo);
router.get("/:id", getTodo);
router.patch("/:id", updateTodo);
router.put("/:id", replaceTodo);
router.delete("/:id", deleteTodo);

export default router;
