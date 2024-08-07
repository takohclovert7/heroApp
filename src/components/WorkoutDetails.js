import React, { useState, useRef, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Import the EditIcon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import the CheckCircleIcon
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {
  const navigate = useNavigate();
  const { dispatch } = useWorkoutsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingOption, setLoadingOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = async (option) => {
    if (loadingOption === null) {
      setLoadingOption(option);
      try {
        switch (option) {
          case 'Edit':
            navigate('/edit/task', { state: { task: workout } });
            break;
          case 'Delete':
            const responseDelete = await fetch('/api/workouts/' + workout._id, {
              method: 'DELETE',
            });
            const jsonDelete = await responseDelete.json();
            if (responseDelete.ok) {
              dispatch({ type: 'DELETE_WORKOUT', payload: jsonDelete });
            }
            break;
          case 'Update':
            const responseMark = await fetch('/api/workouts/markascompleted/' + workout._id, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ isCompleted: true }),
            });
            if (responseMark.ok) {
              // Handle successful update
              window.location.reload()
            }
            break;
          default:
            throw new Error('Unknown action');
        }
        setLoadingOption(null);
        setIsOpen(false);
        console.log(`${option} clicked`);
      } catch (error) {
        console.error('Error:', error);
        setLoadingOption(null);
      }
    }
  };

  const isDisabled = (option) => {
    return loadingOption !== null && loadingOption !== option;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    const day = format(date, 'd');
    const dayWithSuffix = `${day}${getOrdinalSuffix(Number(day))}`;
    const formattedDate = `${format(date, "EEEE")} the ${dayWithSuffix} ${format(date, "MMMM yyyy")}`;
    const formattedTime = format(date, "hh:mm:ss a");
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Description: </strong>{workout.load}</p>
      <p><strong>Added on: </strong>{formatDate(workout.createdAt)}</p>
      <p><strong>Deadline: </strong>{workout.deadLine}</p>
      <p><strong>Status: </strong>{workout.isCompleted ? 'Completed' : 'Incomplete'}</p>

      <div className="dropdown-container" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="dropdown-button">
          <MoreHorizIcon sx={{ fontSize: 40}}/>
        </button>
        <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          <button
            onClick={() => handleButtonClick('Edit')}
            className="dropdown-item"
            disabled={isDisabled('Edit')}
          >
            {loadingOption === 'Edit' ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} sx={{ color: 'red' }} />
                <Box sx={{ ml: 2 ,color:"green",fontWeight:"bold",fontSize:14}}>Loading...</Box>
              </Box>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EditIcon style={{ marginRight: 8 }} />
                Edit Task
              </div>
            )}
          </button>
          <button
            onClick={() => handleButtonClick('Delete')}
            className="dropdown-item"
            disabled={isDisabled('Delete')}
          >
            {loadingOption === 'Delete' ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} sx={{ color: 'red' }} />
                <Box sx={{ ml: 2 ,color:"green",fontWeight:"bold",fontSize:14}}>Deleting...</Box>
              </Box>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DeleteIcon style={{ marginRight: 8 }} />
                Delete Task
              </div>
            )}
          </button>
          <button
            onClick={() => handleButtonClick('Update')}
            className="dropdown-item"
            disabled={isDisabled('Update')}
          >
            {loadingOption === 'Update' ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} sx={{ color: 'red' }} />
                <Box sx={{ ml: 2 ,color:"green",fontWeight:"bold",fontSize:14}}>Marking...</Box>
              </Box>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ marginRight: 8 }} />
                Mark as Completed
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
