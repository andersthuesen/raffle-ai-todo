import React, { useCallback, useState } from "react";
import type { Todo } from "../types";

type TodoContextType = {
  todos: Todo[];
  addTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  addTodos: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (todo: Todo) => {
      setTodos((todos) => [todo, ...todos]);
    },
    [setTodos]
  );

  const addTodos = useCallback(
    (newTodos: Todo[]) => {
      setTodos((todos) => [...newTodos, ...todos]);
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (todo: Todo) => {
      setTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (todo: Todo) => {
      setTodos((todos) => todos.filter((t) => t.id !== todo.id));
    },
    [setTodos]
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        addTodos,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
