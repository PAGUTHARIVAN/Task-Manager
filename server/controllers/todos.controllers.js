import { AppError } from "../errors.js";
import * as store from "../data/todos.store.js";
import {
  parseId,
  parseText,
  parseDone,
} from "../validators/todos.validators.js";

export const findTodoOrThrow = (idParam) => {
  const id = Number(idParam);
  const todo = store.findById(id);
  if (!todo) {
    throw new AppError(404, "Todo not found");
  }
  return todo;
};

export const listTodos = (req, res) => {
  res.json(store.getAll());
};

export const getTodo = (req, res) => {
  res.json(findTodoOrThrow(req.params.id));
};

export const createTodo = (req, res) => {
  const text = parseText(req.body?.text);
  const todo = store.create(text);
  res.status(201).json(todo);
};

export const updateTodo = (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  const { text: rawText, done: rawDone } = req.body ?? {};

  if (rawText === undefined && rawDone === undefined) {
    throw new AppError(400, "Provide Text or Done to update");
  }

  const text = rawText === undefined ? todo.text : parseText(rawText);
  const done = rawDone === undefined ? todo.done : parseDone(rawDone);

  todo.text = text;
  todo.done = done;
  res.json(todo);
};

export const replaceTodo = (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  const text = parseText(req.body?.text);
  const done = parseDone(req.body?.done);

  todo.text = text;
  todo.done = done;
  res.json(todo);
};

export const deleteTodo = (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  store.remove(todo.id);
  res.status(204).end();
};
