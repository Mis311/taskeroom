// pages/taskMaker.tsx
import React, { useState } from "react";
import getCompletion from "./getCompletion";
import { config } from "dotenv";
config();
import styles from "./taskMaker.module.css";


const TaskMaker = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [milestones, setMilestones] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  type Choice = {
    text: string;
    // other properties of a choice object
  };
  const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await getCompletion(
        `Task Description - ${taskDescription}, Deadline - ${deadline}, Milestones - ${milestones}`
      );
      if (response && response.choices) {
        const suggestions = response.choices.map((choice: Choice) => choice.text);
        setAiSuggestions(suggestions);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Failed to fetch AI suggestions:", error);
    }
    // Add code to add the task to your dashboard or whatever else you need to do with the task
  };

  return (
    <div className={styles.container}>
      <h2>Add Your Task</h2>
      <form className={styles.form}  onSubmit={handleTaskSubmit}>
        <input
        className={styles.input}
          type="text"
          placeholder="What is your goal/todo?"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
        className={styles.input}
          type="text"
          placeholder="When is the deadline?e.g. 1month, July 3rd 2023..."
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
        className={styles.input}
          type="text"
          placeholder="What are the major milestones for this task? "
          value={milestones}
          onChange={(e) => setMilestones(e.target.value)}
        />
        <button type="submit">Confirm Task</button>
      </form>

      <h2>AI Suggestions</h2>
      <div className={styles.suggestions}>
      {aiSuggestions &&
        aiSuggestions.map((suggestion, index) => (
          <div key={index}>
            <p>{suggestion}</p>
          </div>
          
        ))}
    </div>
    </div>
  );
};

export default TaskMaker;