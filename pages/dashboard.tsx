// pages/dashboard.js
import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import getCompletion from "./getCompletion";
import { config } from "dotenv";
config();

const Home = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString();

  type Choice = {
    text: string;
    // other properties of a choice object
  };
  useEffect(() => {
    async function fetchAiSuggestions() {
      try {
        const response = await getCompletion("suggest some random tasks");
        if (response && response.choices) {
          const suggestions = response.choices.map(
            (choice: Choice) => choice.text
          );
          setAiSuggestions(suggestions);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Failed to fetch AI suggestions:", error);
      }
    }

    fetchAiSuggestions();
  }, []);

  const [taskDescription, setTaskDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [aiAssist, setAiAssist] = useState(false);
  const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (aiAssist) {
      try {
        const response = await getCompletion(
          `Suggest a plan to complete a task with the following details: Task Description - ${taskDescription}, Estimated Time - ${estimatedTime}, Deadline - ${deadline}`
        );
        if (response && response.choices) {
          const suggestions = response.choices.map(
            (choice: Choice) => choice.text
          );
          setAiSuggestions(suggestions);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Failed to fetch AI suggestions:", error);
      }
    }
    // Here you can add code to add the task to your todoList or do anything else you need with the task
  };

  // This could be data fetched from a backend or local state
  const todoList = ["Task 1", "Task 2", "Task 3"];

  const [aiSuggestions, setAiSuggestions] = React.useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2>Add Your Task</h2>

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
            placeholder="Estimated Time"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <input
            type="checkbox"
            id="aiAssist"
            name="aiAssist"
            checked={aiAssist}
            onChange={(e) => setAiAssist(e.target.checked)}
          />
          <label htmlFor="aiAssist">Want AI assistance?</label>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className={styles.centerPanel}>
        <h2>AI Suggestions</h2>
        {aiSuggestions &&
          aiSuggestions.map((suggestion, index) => (
            <div key={index} className={styles.suggestion}>
              <p>{suggestion}</p>
              <button>Add to my tasks</button>
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
