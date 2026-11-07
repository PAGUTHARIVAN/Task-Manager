import { AppError } from "../errors.js";

export const errorHandler = (err, req, res, next) => {
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
};
