import React, { useCallback } from "react";
import { TodosList } from "../components/TodosList";
import type { Todo } from "../types";
import { useNavigate } from "react-router";
import { useTodos } from "../hooks/useTodos";
import * as API from "../todo-api";

type TodosOverviewProps = {
  loading: boolean;
};

export const TodosOverview: React.FC<TodosOverviewProps> = ({ loading }) => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();

  const handleSubmitTodo = useCallback(
    async (e) => {
      e.preventDefault();

      const todo = {
        title: e.target.title.value,
        completed: false,
        userId: 0,
        id: Date.now(),
      };

      // Warning naive implementation. Might lead to data races.

      // Optimistically add the todo to the list.
      addTodo(todo);

      // Clean input text.
      e.target.title.value = "";

      // Actually send the todo to the server.
      const returnedTodo = await API.updateTodo(todo);

      // Update the todo with the returned data.
      updateTodo(returnedTodo);
    },
    [addTodo, updateTodo]
  );

  const handleUpdateTodo = useCallback(
    async (todo: Todo) => {
      updateTodo(todo);
      await API.updateTodo(todo);
    },
    [updateTodo]
  );

  const handleDeleteTodo = useCallback(
    async (todo: Todo) => {
      deleteTodo(todo);
      await API.deleteTodo(todo.id);
    },
    [deleteTodo]
  );

  const handleSelectTodo = useCallback(
    (todo: Todo) => {
      navigate(`todo/${todo.id}`);
    },
    [navigate]
  );

  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmitTodo} className="mb-4">
        <input
          className="text-xl outline-none w-64"
          name="title"
          type="text"
          placeholder="What do you want to do?"
        />
        <input
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Add"
        />
      </form>
      <TodosList
        todos={todos}
        loading={loading}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
        onSelectTodo={handleSelectTodo}
      />
    </>
  );
};
