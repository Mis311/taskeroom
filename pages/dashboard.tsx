import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { config } from "dotenv";
config();

const Home = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString();

  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [milestones, setMilestones] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const [aiSuggestSchedule, setAISuggestSchedule] = useState(false);
  const [aiSuggestAction, setAISuggestAction] = useState(false);

  const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        body: JSON.stringify({
          taskDescription: taskDescription,
          deadline: deadline,
          milestones: milestones,
          aiSuggestSchedule: aiSuggestSchedule,
          aiSuggestAction: aiSuggestAction,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data && data.result) {
        setAiSuggestions([data.result]);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error);
    }
    // Add code to add the task to your dashboard or whatever else you need to do with the task
  };

  const todoList = ["Task 1", "Task 2", "Task 3"]; // This could be data fetched from a backend or local state

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2>Add Your Task</h2>
        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={milestones}
              onChange={(e) => setMilestones(e.target.checked)}
            />
            Include Milestones
          </label>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className={styles.centerPanel}>
        <h2>AI Suggestions</h2>
        {aiSuggestions &&
          aiSuggestions.map((suggestion, index) => (
            <div key={index} className={styles.suggestion}>
              <p>{suggestion}</p>
            </div>
          ))}
      </div>

      <div className={styles.rightPanel}>
        <h2>Your Schedule</h2>
        {todoList.map((task, index) => (
          <p key={index}>{task}</p>
        ))}
        <div>
          <p>Current Time:</p>
          <h3>{time}</h3>
          <small>{`${month}/${day}/${year}`}</small>
        </div>
      </div>
    </div>
  );
};

export default Home;
