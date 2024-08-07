import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

 
const formatDateTime = (date) => {
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

  return `${formattedDate} at ${formattedTime}`;
};



function parseDateTime(input) {
    const dateParts = input.match(/(\d{1,2}) (\w+) (\d{4}) at (\d{2}):(\d{2}):(\d{2}) (\w{2})/);

    if (!dateParts) return 'Invalid Date Format';

    const [, day, month, year, hours, minutes, seconds, ampm] = dateParts;
    
    // Convert month name to month number
    const monthNames = {
        January: '01', February: '02', March: '03', April: '04',
        May: '05', June: '06', July: '07', August: '08',
        September: '09', October: '10', November: '11', December: '12'
    };
    const monthNumber = monthNames[month];
    
    // Convert hours to 24-hour format
    let adjustedHours = parseInt(hours, 10);
    if (ampm === 'pm' && adjustedHours < 12) {
        adjustedHours += 12;
    }
    if (ampm === 'am' && adjustedHours === 12) {
        adjustedHours = 0;
    }
    adjustedHours = adjustedHours.toString().padStart(2, '0');

    // Format the date into YYYY-MM-DDTHH:MM
    return `${year}-${monthNumber}-${day.padStart(2, '0')}T${adjustedHours}:${minutes}`;
}

const EditWorkoutForm = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const { task } = location.state || {};
const [isSaving,setIsSaving]=useState(false)
  const [title, setTitle] = useState(task.title)
  const [load, setLoad] = useState(task.load)
  const [error, setError] = useState(null)
  const [dateTime, setDateTime] = useState(task.deadLine);
  const [dateTimeValue, setDateTimeValue] = useState(parseDateTime(task.deadLine));
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
    setIsSaving(true)
    const workout = {title, load ,dateTime:dateTime.toString()}
    const response = await fetch('https://taskbuddy-1aez.onrender.com/api/workouts/' + task._id, {
    
        method: 'PATCH',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsSaving(false)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setIsSaving(false)
      setLoad('')
      setDateTimeValue('')
      setIsSaving(false)
      navigate("/")
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit} style={{paddingRight:"2%",paddingLeft:"2%"}}> 
      <h3> Tasks Edit </h3>

      <label>Tasks Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        placeholder='enter title of your task'
      />

      <label>Tasks Description:</label>
      <textarea
  onChange={(e) => setLoad(e.target.value)}
  value={load}
/>

<label htmlFor="datetimeInput">Select task deadline:</label>
            <input
                type="datetime-local"
                id="datetimeInput"
                name="datetimeInput"
                value={dateTimeValue}
                onChange={handleChange}
            />
      <button
       style={{width:"150px"}}
      disable={isSaving}>
 
      {isSaving ? <CircularProgress size={24} sx={{ color: 'red' }} />:" Save changes"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EditWorkoutForm