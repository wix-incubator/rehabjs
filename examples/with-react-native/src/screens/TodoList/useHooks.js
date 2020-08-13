import {useCallback, useEffect, useState} from 'react';
import {getTodos, setCompleted} from '../../services/todos';

export const useHooks = (callback, deps) => {
  const [todos, setTodos] = useState([]);

  const load = useCallback(async () => {
    const newTodos = await getTodos();
    setTodos(newTodos.slice(0, 5));
  }, [setTodos]);

  const toggleTodo = useCallback(
    async (item) => {
      const newTodos = todos.slice();
      newTodos[todos.indexOf(item)] = await setCompleted(
        item.id,
        !item.completed,
      );
      setTodos(newTodos);
    },
    [todos, setTodos],
  );

  const completeAll = useCallback(() => {
    const newTodos = todos.map((todo) => setCompleted(todo.id, true));
    return Promise.all(newTodos).then(setTodos);
  }, [todos]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    todos,

    reload: load,
    completeAll,
    toggleTodo,
  };
};
