import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "../redux/todosSlice.js";

export const TodoApp = () => {
  const {
    items: todos,
    isLoading,
    error,
  } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [err, setErr] = useState({});
  const taskRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
    setErr({});
  };

  const handleAddTodo = (e) => {
    e.preventDefault(); // Allows pressing Enter key to submit
    const text = newTodo.trim();
    if (!text) {
      setErr({ inputFail: "Empty field! Please enter a task before adding." });
      return;
    }
    dispatch(addTodoAsync(text));
    setNewTodo("");
    taskRef.current?.focus();
  };

  const handleRemoveTodo = (taskId) => {
    dispatch(removeTodoAsync(taskId));
  };

  const handleToggleDone = (taskId) => {
    const taskToUpdate = todos.find((t) => t.id === taskId);
    if (!taskToUpdate) return;
    dispatch(toggleTodoAsync({ id: taskId, done: !taskToUpdate.done }));
  };

  const visibleTodos = todos.filter((t) => {
    if (filter === "done") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  const doneCount = todos.filter((t) => t.done).length;

  // Loading & Error Screens
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-emerald-400 text-xl font-semibold animate-pulse">
          Loading todos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-red-950/50 border border-red-500/40 text-red-300 px-6 py-4 rounded-xl">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Simple Task Manager
          </h1>
          <span className="text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
            {doneCount} / {todos.length} done
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            ref={taskRef}
            type="text"
            value={newTodo}
            name="newtodo"
            id="input-field"
            onChange={handleChange}
            placeholder="Add a new task..."
            autoFocus
            className="flex-1 bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {/* Validation Error */}
        {err.inputFail && (
          <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
            {err.inputFail}
          </p>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["all", "done", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition cursor-pointer ${
                filter === f
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div>
          {todos.length === 0 ? (
            <p className="text-center text-slate-500 py-8 text-sm">
              No todos yet! Add your first task above.
            </p>
          ) : visibleTodos.length === 0 ? (
            <p className="text-center text-slate-500 py-8 text-sm">
              No {filter} tasks yet!
            </p>
          ) : (
            <ul className="space-y-2.5">
              {visibleTodos.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 transition"
                >
                  <span
                    onClick={() => handleToggleDone(task.id)}
                    className={`flex-1 cursor-pointer select-none text-sm transition ${
                      task.done
                        ? "line-through text-slate-500"
                        : "text-slate-100"
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() => handleRemoveTodo(task.id)}
                    className="text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-600/80 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
