import React from "react";
import { useData } from "./hooks/useData";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const data = useData<Todo[]>("https://jsonplaceholder.typicode.com/todos");
  return (
    <div className="App">
      {data.type === "loading" ? (
        <h1>Loading</h1>
      ) : data.type === "error" ? (
        <h1>Error</h1>
      ) : (
        <ul>
          {data.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
