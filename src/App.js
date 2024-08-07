import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the import path as needed
import Home from './pages/Home'; // Example component
import TaskCompleted from "./pages/taskCompleted"
import EditWorkoutForm from "./pages/editTaskPage"
import TaskUncompleted from "./pages/taskUncompleted"
import About from './pages/about'
import SearchPage from './pages/search'
const App = () => {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Full viewport height
  };

  const contentStyle = {
    flex: 1, // Allow content to expand and fill available space
    padding: '20px', // Optional padding around content
  };

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        <main style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/task/completed" element={<TaskCompleted />} />
            <Route path="/task/uncompleted" element={<TaskUncompleted />} />
            <Route path="/edit/task" element={<EditWorkoutForm />} />
            <Route path="/search/task" element={<SearchPage />} />
          </Routes>
        </main>
        <footer style={footerStyle}>
          <p style={{color:"white"}}>&copy; 2024 Task Buddy. All rights reserved.</p>
          <nav>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'inline', margin: '0 10px', backgroundColor:"#333",border:'none' ,color:"white"}}>
                <a href="/task/uncompleted" style={{ color: '#fff', textDecoration: 'none' }}>Task uncompleted</a>
              </li>
              <li style={{ display: 'inline', margin: '0 10px' ,backgroundColor:"#333",border:'none' ,color:"white"}}>
                <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
              </li>
             
              <li style={{ display: 'inline', margin: '0 10px',backgroundColor:"#333",border:'none' ,color:"white" }}>
                <a href="/task/completed" style={{ color: '#fff', textDecoration: 'none' }}>Task completed</a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </Router>
  );
};

export default App;
