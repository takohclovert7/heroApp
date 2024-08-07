import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import CircularProgress from '@mui/material/CircularProgress';
const formatDateTime = (date) => {
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

  return `${formattedDate} at ${formattedTime}`;
};
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
   const [isAdding,setIsAdding]=useState(false)
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState(null)
  const [dateTime, setDateTime] = useState('');
  const [dateTimeValue, setDateTimeValue] = useState('');
  const handleChange = (event) => {
    setDateTimeValue(event.target.value)
    const selectedDateTime = new Date(event.target.value);
    const formattedDateTime = formatDateTime(selectedDateTime);
    setDateTime(formattedDateTime);
};
 

  const handleSubmit = async (e) => {
    setError('')
    e.preventDefault()
    if (title === '' || load === '' || dateTimeValue === '') {
      setError('One or more input fields are empty');
      return true;
    }
    setIsAdding(true)
    const workout = {title, load ,dateTime:dateTime.toString()}
    console.log({dateTimeValue})
    const response = await fetch('https://taskbuddy-1aez.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsAdding(false)
    }
    if (response.ok) {
      setError(null)
     
      setTitle('')
      setLoad('')
      setDateTimeValue('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      setIsAdding(false)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}  style={{paddingRight:"2%",paddingLeft:"2%"}}> 
      <h3>Add a New Tasks</h3>

      <label>Tasks Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        placeholder='enter title of your task'
        disable={isAdding}
      />

      <label>Tasks Description:</label>
      <textarea
  onChange={(e) => setLoad(e.target.value)}
  value={load}
  disable={isAdding}
/>

<label htmlFor="datetimeInput">Select task deadline:</label>
            <input
                type="datetime-local"
                id="datetimeInput"
                name="datetimeInput"
                value={dateTimeValue}
                onChange={handleChange}
                disable={isAdding}
                
            />
      <button
       style={{width:"100px"}}
        disable={isAdding}>
      {isAdding ? <CircularProgress size={24} sx={{ color: 'red' }} />:" Add Task"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm