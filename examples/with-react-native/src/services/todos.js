export const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return todos;
};

export const setCompleted = async (id, completed) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'PATCH',
      body: {completed},
    },
  );

  const updatedTodo = await response.json();
  updatedTodo.completed = completed; // NOTE: because stub placeholder API returns the same object
  return updatedTodo;
};
