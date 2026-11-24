import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AppError } from "../errors.js";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body ?? {};
  if (!name?.trim() || !email?.trim() || !password) {
    throw new AppError(400, "Name, email and password are required.");
  }
  if (password.length < 6) {
    throw new AppError(400, "Password must be atleast 6 characters.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AppError(409, "Email is already registered.");
  }
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });
  const token = signToken(user.id);
  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email?.trim() || !password) {
    throw new AppError(400, "Email and password are required.");
  }
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(401, "Invalid email or password.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid email or password.");
  }
  const token = signToken(user._id);
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
