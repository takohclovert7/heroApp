import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
   
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" style={{fontWeight:"bolder"}}>
         Task Buddy
        </Link>
        <button className="navbar-toggler" onClick={toggleNavbar}>
          &#9776;
        </button>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-item" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/task/completed" className="navbar-item" onClick={() => setIsOpen(false)}>Task completed</Link>
          <Link to="/about" className="navbar-item" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/" className="navbar-item" onClick={() => setIsOpen(false)}>Add Task</Link>
          <Link to="/task/uncompleted" className="navbar-item" onClick={() => setIsOpen(false)}>Task uncompleted</Link>
          <Link to="/search/task" className="navbar-item" onClick={() => setIsOpen(false)}>Search task</Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
