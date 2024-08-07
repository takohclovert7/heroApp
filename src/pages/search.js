import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchPage.css';
import TaskUncompletedDetails  from './taskUncompletedDetails'
import CircularProgress from '@mui/material/CircularProgress';
const SearchPage = () => {
    const [isSearching ,setIsSearching]=useState(false)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState("")
  const  handleSearch = async () => {
    setIsSearching(true)
    const workout = {title:query}
    const response = await fetch('/api/workouts/search/task', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsSearching(false)
    }
    if (response.ok) {
        setIsSearching(false)
        setResults(json)
        setError("No result found")
     setQuery('')
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h2>Search for a task</h2>
      <div className="search-container">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="Search by task title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-box"
            disable={isSearching}
          />
          <div className="search-icon">
            <SearchIcon />
          </div>
          <button  
          disable={isSearching}
          className="search-button" onClick={handleSearch}>
            {/* Search */}
            {isSearching? <CircularProgress size={24} sx={{ color: 'red' }} />:" Search"}
          </button>
        </div>
      </div>
      <h2>Results from search</h2>
      <div className="results-container" >
      {results.length === 0 ? (
        <h4  style={{color:"red",fontWeight:"bold",textAlign:"center"}}>{error}</h4>
      ) : (
        results.map(workout => (
          <TaskUncompletedDetails workout={workout} key={workout._id} />
        ))
      )}
      </div>
    </div>
  );
};

export default SearchPage;
