import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice.js";
import { fetchTodosAsync } from "./redux/todosSlice.js";
import { AuthForm } from "./components/AuthForm.jsx";
import { TodoApp } from "./components/Todo.jsx";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  // Only fetch private todos after the user is authenticated
  useEffect(() => {
    if (token) {
      dispatch(fetchTodosAsync());
    }
  }, [dispatch, token]);

  //GateKeeper: show Login/Signup if no JWT token
  if (!token) {
    return <AuthForm />;
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
      {/* Top User Header */}
      <header className="max-w-xl mx-auto flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <p className="text-xs text-slate-400">Signed in as</p>
          <p className="font-semibold text-indigo-400">{user?.name}</p>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-1.5 text-sm rounded-lg bg-slate-800 hover:bg-red-600/80 border border-slate-700 transition"
        >
          Logout
        </button>
      </header>

      <TodoApp />
    </div>
  );
}

export default App;
