import React from "react";
import { TodosProvider } from "./context/TodoContext";
import TodosApp from "./TodosApp";

function App() {
  return (
    <TodosProvider>
      <TodosApp />
    </TodosProvider>
  );
}

export default App;
