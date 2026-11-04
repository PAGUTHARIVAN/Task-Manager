import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppError } from "./errors.js";

//App Creation
const app = express();
app.disable("x-powered-by");

//CORS - Allowed origins
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((o) => o.trim());
//middlewares
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));

//PORT
const PORT = process.env.PORT || 5001;

//Temp Database
let todos = [{ id: 1, text: "Learn Express", done: false }];
let nextId = 2;

//Helperfunctions//
//findTodoOrThrow
const findTodoOrThrow = (idParam) => {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(400, "Invalid todo id");
  }
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new AppError(404, "Todo not found");
  }
  return todo;
};
//parseText
const parseText = (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new AppError(400, "Text is required");
  }
  if (text.length > 200) {
    throw new AppError(400, "Text must be 200 characters or less");
  }
  return text;
};
//parseDone
const parseDone = (value) => {
  if (typeof value !== "boolean") {
    throw new AppError(400, "Done must be true or false");
  }
  return value;
};

//Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});
//GET - request
app.get("/api/todos/:id", (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  res.json(todo);
});

//POST - request
app.post("/api/todos", (req, res) => {
  const text = parseText(req.body?.text);
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});
//PATCH - request
app.patch("/api/todos/:id", (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  const { text: rawText, done: rawDone } = req.body ?? {};

  if (rawText === undefined && rawDone === undefined) {
    throw new AppError(400, "Provide text or done to update");
  }

  const text = rawText === undefined ? todo.text : parseText(rawText);
  const done = rawDone === undefined ? todo.done : parseDone(rawDone);

  todo.text = text;
  todo.done = done;
  res.json(todo);
});
//PUT - request
app.put("/api/todos/:id", (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  const text = parseText(req.body?.text);
  const done = parseDone(req.body?.done);

  todo.text = text;
  todo.done = done;
  res.json(todo);
});
//DELETE - request
app.delete("/api/todos/:id", (req, res) => {
  const todo = findTodoOrThrow(req.params.id);
  todos = todos.filter((t) => t.id !== todo.id);
  res.status(204).end();
});

//404 - error handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//Central error handler
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) {
    console.error(err);
  }
  if (res.headersSent) {
    return next(err);
  }
  const isBadJson = err.type === "entity.parse.failed";
  const message = isBadJson
    ? "Json request body is invalid"
    : err instanceof AppError || status < 500
      ? err.message
      : "Internal server error";
  res.status(status).json({ error: message });
});

//PORT starting
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
