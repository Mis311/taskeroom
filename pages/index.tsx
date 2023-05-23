import React from 'react';
import Layout from '@/components/layouts/layout';
// import MyCalendarComponent from '../components/MyCalendar';
import styles from './index.module.css';

const LandingPage: React.FC = () => {
  return (
    <Layout noLayout={true}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Taskeroom</h1>
          <div>Login</div>
        </header>
        
        <div className={styles.section}>
          <section>
            <h2>Automate and go ahead of your life</h2>
            <p style={{color: 'grey'}}>Optimize</p>
            <p>Let's get things done and complete your life together with AI and automate execution sessions with your new friends.</p>
            
            <input className={styles.inputGoal} placeholder="Input Your Goal" />
            <button className={styles.automateButton}>Automate</button>
          </section>

          <section>
            <div className={styles.imgContainer}>
              <img src="https://via.placeholder.com/200" alt="React" />
            </div>
            {/* <MyCalendarComponent sessions={[]} /> */}
          </section>

          <section>
            <h2 style={{textAlign: 'right'}}>May <span style={{fontSize: '2em'}}>23rd</span> 2023</h2>
            
            <ul className={styles.todoList}>
              <li>todo1</li>
              <li>todo2</li>
              <li>todo3</li>
            </ul>
            
            <button className={styles.arrowButton}>➡</button>
            <p>Automate</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
