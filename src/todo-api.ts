import ky from "ky";
import { Todo } from "./types";
const API_ENDPOINT = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  return ky.get(API_ENDPOINT).json<Todo[]>();
};
