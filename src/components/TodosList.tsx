import React from "react";
import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type TodosListProps = {
  loading: boolean;
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
  onSelectTodo: (todo: Todo) => void;
};

// Render to empty todos if loading.
const emptyTodos = Array(10).fill(null);

export const TodosList: React.FC<TodosListProps> = ({
  todos,
  loading,
  onUpdateTodo,
  onDeleteTodo,
  onSelectTodo,
}) => {
  return (
    <ul>
      {loading
        ? emptyTodos.map((_, i) => (
            <TodoItem
              key={`loading-${i}`}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
              onSelectTodo={onSelectTodo}
              loading
            />
          ))
        : todos.map((todo) => (
            <TodoItem
              key={todo.id}
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
              onSelectTodo={onSelectTodo}
              loading={false}
              todo={todo}
            />
          ))}
    </ul>
  );
};
