//Temp Database
let todos = [
  {
    id: 1,
    text: "Learn ExpressJs",
    done: false,
  },
];
let nextId = 2;

export const getAll = () => {
  return todos;
};

export const findById = (id) => {
  return todos.find((t) => t.id === id);
};

export const create = (text) => {
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  return todo;
};

export const remove = (id) => {
  return todos.filter((t) => t.id !== id);
};
