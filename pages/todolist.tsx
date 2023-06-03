import React, { useState } from "react";

type Todo = {
  task: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input !== "") {
      setTodos((prevTodos) => [...prevTodos, { task: input, completed: false }]);
      setInput("");
    }
  };

  const handleToggleComplete = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, todoIndex) =>
        todoIndex === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTask = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.filter((_, todoIndex) => todoIndex !== index)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Seller's Todo List</h1>
      <div className="mb-4">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new task"
        />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {todos.map((todo, index) => (
        <div className="flex items-center justify-between w-full mb-2" key={index}>
          <p className={`w-1/2 ${todo.completed ? "line-through text-green-500" : ""}`}>
            {todo.task}
          </p>
          <div className="space-x-2">
            <button 
              className={`bg-${todo.completed ? "yellow" : "green"}-500 hover:bg-${todo.completed ? "yellow" : "green"}-700 text-white font-bold py-1 px-2 rounded`}
              onClick={() => handleToggleComplete(index)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleRemoveTask(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
