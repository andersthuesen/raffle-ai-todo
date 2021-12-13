import React from "react";
import type { Todo } from "../types";

export type LoadingTodoItem = {
  loading: true;
};

export type LoadedTodoItem = {
  loading: false;
  todo: Todo;
};

export type TodoItemProps = {
  loading: boolean;
  todo?: Todo;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (todo: Todo) => void;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  loading,
  todo,
  onUpdateTodo,
  onDeleteTodo,
  onSelectTodo,
}) => {
  // Render placeholder UI if loading.
  if (loading || !todo) {
    return (
      <div className="p-2">
        <span className="block h-6 w-100 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="p-2 flex items-center">
      <input
        name="completed"
        type="checkbox"
        checked={todo.completed}
        className="grow-0"
        onChange={(e) => {
          onUpdateTodo({
            ...todo,
            completed: e.target.checked,
          });
        }}
      />
      <input
        name="title"
        type="text"
        value={todo.title}
        className={
          "grow flex-1 outline-none mx-2" +
          " " +
          (todo.completed ? "line-through" : "")
        }
        onChange={(e) => {
          onUpdateTodo({
            ...todo,
            title: e.target.value,
          });
        }}
      />
      <button onClick={() => onDeleteTodo(todo)}>❌</button>
      <button onClick={() => onSelectTodo(todo)}>➡️</button>
    </div>
  );
};
