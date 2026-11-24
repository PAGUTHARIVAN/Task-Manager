import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  registerThunk,
  clearAuthError,
} from "../redux/authSlice.js";

export const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";

  const handleToggleMode = () => {
    setIsSignup((prev) => !prev);
    dispatch(clearAuthError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(registerThunk({ name, email, password }));
    } else {
      dispatch(loginThunk({ email, password }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-scale-400 text-center mb-6">
          {isSignup
            ? "Sign up to manage your private todos"
            : "Log in to view your todos"}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border-red-500/40 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 font-semibold transition"
          >
            {isLoading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={handleToggleMode}
            className="text-indigo-400 hover:undlerline font-medium"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};
