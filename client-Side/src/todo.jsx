import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "./redux/todosSlice.js";

export const TodoApp = () => {
  //1. Read from Redux Store (Replaces useState)
  const {
    items: todos,
    isLoading,
    error,
  } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  //Local UI state (No need  to put simple inputs in Redux)
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [err, setErr] = useState({});
  const taskRef = useRef(null);

  // 2. Fetch on Load via Dispatch
  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  //handleInputChange
  const handleChange = (e) => {
    setNewTodo(e.target.value);
    setErr({});
  };

  //2. POST: Add Todo
  const handleAddTodo = () => {
    const text = newTodo.trim();
    if (!text) {
      setErr({ inputFail: "Empty field, Please add task before you add!" });
      return;
    }
    dispatch(addTodoAsync(text));
    setNewTodo("");
    taskRef.current.focus();
  };

  //3. DELETE: Remove Todo
  const handleRemoveTodo = (taskId) => {
    dispatch(removeTodoAsync(taskId));
  };

  //4. PATCH: Toggle Done
  const handleToggleDone = (taskId) => {
    const taskToUpdate = todos.find((t) => t.id === taskId);
    dispatch(toggleTodoAsync({ id: taskId, done: !taskToUpdate.done }));
  };

  //Filter Logic
  const visibleTodos = todos.filter((t) => {
    if (filter === "done") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  const doneCount = todos.filter((t) => t.done).length;

  if (isLoading) return <h2 style={{ color: "Green" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "Red" }}>Error: {error}</h2>;

  return (
    <div className="todo-container">
      <h1 className="title">Todo App</h1>
      <div className="inputs-container">
        <input
          ref={taskRef}
          type="text"
          value={newTodo}
          name="newtodo"
          id="input-field"
          onChange={handleChange}
          placeholder="Add Task..."
          autoFocus
        />
        <button onClick={handleAddTodo}>Add Task</button>
      </div>

      <div className="filter-container">
        {["all", "done", "pending"].map((f) => (
          <button
            className={filter === f ? "filter-btn active" : "filter-btn"}
            key={f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {err.inputFail && <p style={{ color: "red" }}>{err.inputFail}</p>}

      <div className="list-container">
        {todos.length === 0 ? (
          <p className="no-todo">No todos yet!</p>
        ) : visibleTodos.length === 0 ? (
          <p className="filter-sign">No {filter} yet!</p>
        ) : (
          <ul>
            {visibleTodos.map((task) => (
              <li key={task.id}>
                <span
                  onClick={() => handleToggleDone(task.id)}
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => handleRemoveTodo(task.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p style={{ color: "greenyellow", fontWeight: "bold" }}>
        {todos.length} total, {doneCount} done
      </p>
    </div>
  );
};
