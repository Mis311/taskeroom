import React, { useState, useEffect } from "react";
import axios from "axios";
//mockup data
const taskOptions = [
  "Inventory Check",
  "Product Quality Assurance",
  "Sales Reporting",
  "Customer Feedback Collection",
  "Product Restock",
  "Promotion Planning",
];

const descriptionOptions = [
  "Check and update the current inventory status for all products.",
  "Perform a quality check on incoming products from suppliers.",
  "Create a comprehensive sales report for this month.",
  "Collect and summarize customer feedback on newly released products.",
  "Manage the restocking of products that are low in inventory.",
  "Plan a promotion for slow-moving products to boost their sales.",
];

// Example deadlines (modifiable)
const taskDeadlines = [
  "2023-05-20",
  "2023-05-25",
  "2023-05-28",
  "2023-05-30",
  "2023-06-01",
  "2023-06-05",
];

// Example prices (modifiable)
const prices = [100, 200, 150, 120, 180, 210];

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(taskOptions[0]);
  const [selectedDescription, setSelectedDescription] = useState(
    descriptionOptions[0]
  );
  const [taskDeadline, setTaskDeadline] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("not completed");

  const userId = "manager1"; //  manager's user_id 

  const handleCreateTask = async () => {
    try {
      await axios.post(`/create_task/${userId}`, {
        task_name: selectedTask,
        task_description: selectedDescription,
        task_deadline: taskDeadline,
        price: price,
        status: status,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/task/${userId}`);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="container mx-auto my-5 p-5">
      <h1 className="text-2xl font-bold mb-5">Manager Dashboard</h1>

      <div className="mb-5">
        <label className="block mb-2">Select Task</label>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          {taskOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2">Select Description</label>
        <select
          value={selectedDescription}
          onChange={(e) => setSelectedDescription(e.target.value)}
        >
          {descriptionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2">Task Deadline</label>
        <input
          type="date"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="not completed">Not Completed</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        onClick={handleCreateTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default Dashboard;