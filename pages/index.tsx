import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Home.module.css";
import MyCalendarComponent from "@/components/MyCalendar";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]); // This would initially be fetched from your backend
  const [newTask, setNewTask] = useState<string>("");
  const [aiSuggestions, setAISuggestions] = useState<string[]>([]); // This would be fetched from your AI service

  // Add state for rewards and booked sessions
  const [rewards, setRewards] = useState<string[]>([]);
  const [bookedSessions, setBookedSessions] = useState<Date[]>([]);

  // Function to fetch AI suggestions
  const fetchAISuggestions = () => {
    // Fetch AI suggestions and update aiSuggestions state
  };

  // Function to automate everything
  const automateEverything = () => {
    // Set the state of the goal, to-do list, rewards, and booked sessions
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleTaskSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here is where you would make a call to your backend to add the new task
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const handleSuggestionAccept = (suggestion: string) => {
    // Here is where you would make a call to your backend to accept the suggestion
    // You would also want to remove the accepted suggestion from your list
  };

  const handleSuggestionReject = (suggestion: string) => {
    // Here is where you would make a call to your backend to reject the suggestion
    // You would also want to remove the rejected suggestion from your list
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <form onSubmit={handleTaskSubmit}>
        <input type="text" value={newTask} onChange={handleTaskChange} />
        <button type="submit">Add Task</button>
      </form>

      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

     
      <h2>Rewards</h2>
      <ul>
        {rewards.map((reward, index) => (
          <li key={index}>{reward}</li>
        ))}
      </ul>

      <h2>Booked Sessions</h2>
      <MyCalendarComponent sessions={bookedSessions} />

      <button onClick={automateEverything}>Automate Everything</button>

      <h2>AI Suggestions</h2>
      <ul>
        {aiSuggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion}
            <button onClick={() => handleSuggestionAccept(suggestion)}>
              Accept
            </button>
            <button onClick={() => handleSuggestionReject(suggestion)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
