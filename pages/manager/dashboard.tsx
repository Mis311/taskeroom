import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../firebase/AuthContext";
import Modal from "react-modal";
import { FaEnvelope } from "react-icons/fa";
import { config } from "dotenv";
config();

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
  const { currentUser } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [taskResult, setTaskResult] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(taskOptions[0]);
  const [selectedDescription, setSelectedDescription] = useState(
    descriptionOptions[0]
  );

  const [taskDeadline, setTaskDeadline] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("not completed");

  const userId = "currentUser?.uid"; //  manager's user_id

  const handleCreateTask = async () => {
    try {
      let res = await fetch(
        `http://taskeroom.akubuezeernest.com/create_task/${currentUser?.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_name: selectedTask,
            task_description: selectedDescription,
            task_deadline: taskDeadline,
            price: parseInt(price),
            status: status,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // AI making feedback

  const handleFeedback = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskResult: taskResult,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.headers.get("Content-Type") !== "application/json") {
        throw new Error("Unexpected API response format");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      } else if (data.feedback) {
        setFeedback(data.feedback);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Failed to fetch AI feedback:", error);
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState(null);

  const openModal = async () => {
    setIsOpen(true);
    try {
      const response = await axios.get(
        "http://taskeroom.akubuezeernest.com/task/report"
      );
      setReport(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const processPayment = async () => {
    type ReportType = {
      price: number;
      userId: string;
      taskId: string;
    };

    let report: ReportType | null = null;
    report = { price: 100, userId: "someUserId", taskId: "someTaskId" };

    if (report !== null) {
      try {
        await axios.post("http://squareapi.com/payment/process", {
          // Use report properties directly, as we know they exist
          price: report.price,
          userId: report.userId,
          taskId: report.taskId,
        });
      } catch (error) {
        console.error("Error processing payment:", error);
      } finally {
        closeModal();
      }
    } else {
      console.error("Report object is null");
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(
        `http://taskeroom.akubuezeernest.com/task/${currentUser?.uid}`
      );
      const data = await res.json();
      if (data["All Tasks"]) {
        setTodos(data["All Tasks"]);
      }
      console.log(data["All Tasks"]);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://taskeroom.akubuezeernest.com/task/${currentUser?.uid}`
        );
        const data = await res.json();
        if (data["All Tasks"]) {
          setTodos(data["All Tasks"]);
        }
        console.log(data["All Tasks"]);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="absolute right-0 top-0 mr-8 mt-8 w-6 h-6">
        <FaEnvelope
          onClick={openModal}
          className="text-gray-500 cursor-pointer w-12 h-12 p-2 absolute right-0 mr-4 "
        />
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Manager Task Modal"
        className="w-1/2 mx-auto"
      >
        <h2>Reports</h2>
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 bg-gray-500 text-white p-2 rounded-bl"
        >
          X
        </button>
        <input
          type="text"
          value={taskResult}
          onChange={(e) => setTaskResult(e.target.value)}
        />
        <button onClick={handleFeedback}>Generate Feedback</button>
        {feedback && <p>{feedback}</p>}

        <button
          onClick={processPayment}
          className="bg-purple-200 rounded-lg p-2 mb-4 flex justify-between items-center cursor-pointer"
        >
          Confirm Payment
        </button>
      </Modal>

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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
