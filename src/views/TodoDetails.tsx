import React from "react";
import { useParams } from "react-router";
import { useTodos } from "../hooks/useTodos";

export type TodoDetailsProps = {
  loading: boolean;
};

export const TodoDetails: React.FC<TodoDetailsProps> = ({ loading }) => {
  const { id } = useParams();
  const { todos } = useTodos();

  const todo = todos.find((todo) => String(todo.id) === id);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!todo) {
    return <h1>No todo found.</h1>;
  }

  return <h1>{todo.title}</h1>;
};
