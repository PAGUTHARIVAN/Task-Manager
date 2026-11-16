import mongoose from "mongoose";
import { AppError } from "../errors.js";
import { Todo } from "../models/todo.model.js";
import { parseText, parseDone } from "../validators/todos.validators.js";

//Helper: Validate MongoDB ID and find document
export const findTodoOrThrow = async (idParam) => {
  if (!mongoose.isValidObjectId(idParam)) {
    throw new AppError(400, "Invalid Todo ID format");
  }
  const todo = await Todo.findById(idParam);
  if (!todo) {
    throw new AppError(404, "Todo not found");
  }
  return todo;
};

// GET /api/todos
export const listTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// GET /api/todos/id
export const getTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id);
  res.json(todo);
};

// POST /api/todos
export const createTodo = async (req, res) => {
  const text = parseText(req.body?.text);
  const todo = await Todo.create({ text });
  res.status(201).json(todo);
};

// PATCH /api/todos/:id
export const updateTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id);
  const { text: rawText, done: rawDone } = req.body ?? {};

  if (rawText === undefined && rawDone === undefined) {
    throw new AppError(400, "Provide Text or Done to update");
  }

  const text = rawText === undefined ? todo.text : parseText(rawText);
  const done = rawDone === undefined ? todo.done : parseDone(rawDone);

  todo.text = text;
  todo.done = done;
  await todo.save(); //Saves updated changes back to MongoDB

  res.json(todo);
};

export const replaceTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id);
  const text = parseText(req.body?.text);
  const done = parseDone(req.body?.done);

  todo.text = text;
  todo.done = done;
  await todo.save();
  res.json();
};

export const deleteTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id);
  await todo.deleteOne();
  res.status(204).end();
};
