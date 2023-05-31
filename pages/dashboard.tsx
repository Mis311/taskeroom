// pages/index.js
import React from 'react';
import styles from './dashboard.module.css';

const Home = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // month is zero-indexed
  const day = date.getDate();
  const time = date.toLocaleTimeString();

  // This could be data fetched from a backend or local state
  const todoList = ['Task 1', 'Task 2', 'Task 3'];
  const aiSuggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2>Add Your Task</h2>
        <form>
          <input type="text" placeholder="Task Description" />
          <input type="text" placeholder="Estimated Time" />
          <input type="text" placeholder="Deadline" />
          <input type="checkbox" id="aiAssist" name="aiAssist" />
          <label htmlFor="aiAssist">Want AI assistance?</label>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className={styles.centerPanel}>
        <h2>AI Suggestions</h2>
        {aiSuggestions.map((suggestion, index) => (
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
