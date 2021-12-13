import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodosOverview, TodoDetails } from "./views";
import { useTodos } from "./hooks/useTodos";
import { Todo } from "./types";
import { usePromise } from "./hooks/usePromise";
import { getTodos } from "./todo-api";

function App() {
  const [loading, setLoading] = useState(true);
  const { addTodos } = useTodos();
  const data = usePromise<Todo[]>(getTodos);

  useEffect(() => {
    if (data.type === "resolved") addTodos(data.data);
    setLoading(false);
  }, [data, addTodos]);

  return (
    <div className="shadow-lg align-center my-16 m-auto w-96 bg-white p-8 rounded">
      <Router>
        <Routes>
          <Route path="/todo/:id" element={<TodoDetails loading={loading} />} />
          <Route path="/" element={<TodosOverview loading={loading} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
