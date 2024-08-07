import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
const TaskcompletedDetails = ({ workout }) => {
    const [isDeleting ,setIsDeleting]=useState(false)

  const handleClick = async () => {
    setIsDeleting(true)
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    if (response.ok) {
      window.location.reload()
    }
  }

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
     <span onClick={handleClick}>
     {!isDeleting &&( <DeleteIcon />)}
     {isDeleting &&(<CircularProgress size={24} sx={{ color: 'red' }} />)}
        </span>
    </div>
  )
}

export default TaskcompletedDetails