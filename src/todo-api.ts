import ky from "ky";
import { Todo } from "./types";
const API_ENDPOINT = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  return ky.get(API_ENDPOINT).json<Todo[]>();
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  return ky.post(API_ENDPOINT, { json: todo }).json<Todo>();
};

export const deleteTodo = async (id: number): Promise<void> => {
  return ky.delete(`${API_ENDPOINT}/${id}`).json<void>();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  return ky.patch(`${API_ENDPOINT}/${todo.id}`, { json: todo }).json<Todo>();
};
