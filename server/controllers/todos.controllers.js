import mongoose from "mongoose";
import { Todo } from "../models/todo.model.js";
import { AppError } from "../errors.js";
import { parseText, parseDone } from "../validators/todos.validators.js";

//Helper function
export const findTodoOrThrow = async (idParam, userId) => {
  if (!mongoose.isValidObjectId(idParam)) {
    throw new AppError(400, "Invalid todo Id format.");
  }
  const todo = await Todo.findOne({ _id: idParam, user: userId });
  if (!todo) {
    throw new AppError(404, "Todo not found");
  }
  return todo;
};

//GET: listTodos
export const listTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(todos);
};

//Get: GetTodo
export const getTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id, req.userId);
  res.json(todo);
};

//POST: createTodo
export const createTodo = async (req, res) => {
  const text = parseText(req.body?.text);
  const todo = await Todo.create({ text, user: req.userId });
  res.status(201).json(todo);
};

//PATCH: updateTodo
export const updateTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id, req.userId);
  const { text: rawText, done: rawDone } = req.body ?? {};

  if (rawText === undefined && rawDone === undefined) {
    throw new Error(400, "Provide Text or Done to update todo.");
  }

  const text = rawText === undefined ? todo.text : parseText(rawText);
  const done = rawDone === undefined ? todo.done : parseDone(rawDone);

  todo.text = text;
  todo.done = done;
  await todo.save();

  res.json(todo);
};
//PUT: replaceTodo
export const replaceTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id, req.userId);
  const text = parseText(req.body?.text);
  const done = parseDone(req.body?.done);

  todo.text = text;
  todo.done = done;
  await todo.save();

  res.json(todo);
};

//DELETE: deleteTodo
export const deleteTodo = async (req, res) => {
  const todo = await findTodoOrThrow(req.params.id, req.userId);
  await todo.deleteOne();
  res.status(204).end();
};
