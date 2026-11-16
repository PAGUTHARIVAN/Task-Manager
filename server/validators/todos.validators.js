import { AppError } from "../errors.js";

export const parseText = (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new AppError(400, "Text is required");
  }
  if (text.length > 200) {
    throw new AppError(400, "Text must be 200 characters or less");
  }
  return text;
};

export const parseDone = (value) => {
  if (typeof value !== "boolean") {
    throw new AppError(400, "Done must be true or false");
  }
  return value;
};
