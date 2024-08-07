import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Task Buddy Application</h1>
      <p>Welcome to the Task Buddy Application!</p>
      <p>
        Our mission is to help individuals enhance their productivity and organization by providing a simple yet powerful tool to manage tasks and to-do items effectively.
      </p>
      
      <h2>The Problem</h2>
      <p>
        In today's fast-paced world, many people find it challenging to keep track of their tasks and to-do items. This often leads to decreased productivity and missed deadlines. Without a structured system in place, it becomes difficult to prioritize and complete tasks efficiently.
      </p>

      <h2>Our Solution</h2>
      <p>
        The Task Buddy Application is designed to tackle this problem head-on. Our web-based application offers a user-friendly interface that allows you to easily add, manage, and track your tasks. Whether you're a busy professional, a student, or someone who just wants to stay organized, our application is here to help.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Add New Tasks:</strong> Create new tasks with a title and task description to ensure you have all the information you need at your fingertips.</li>
        <li><strong>Mark Tasks as Complete/Incomplete:</strong> Easily mark tasks as complete or incomplete to keep track of your progress.</li>
        <li><strong>Remove Tasks:</strong> Delete tasks from the list once they are no longer needed to maintain a clutter-free task list.</li>
        <li><strong>Task Overview:</strong> View the total number of tasks and the number of completed tasks to get a clear overview of your workload.</li>
        </ul>
    </div>
  );
};

export default About;
