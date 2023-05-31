// pages/index.js
import React from 'react';
import styles from './dashboard.module.css';

const Home = () => {
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
        {/* Here, you could map through your array of AI suggestions */}
        <div className={styles.suggestion}>
          <p>Suggestion 1</p>
          <button>Add to my tasks</button>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <h2>Your Schedule</h2>
        {/* Here, you could map through your array of scheduled tasks */}
        <p>Task 1</p>
      </div>
    </div>
  );
};

export default Home;
