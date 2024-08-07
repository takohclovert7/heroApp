import { useEffect, useState } from "react"
import TaskUncompletedDetails from "./taskUncompletedDetails"
const TaskUncompleted = () => {
  const [taskCompleted ,setTaskcompleted]=useState([])
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://taskbuddy-1aez.onrender.com/api/workouts/task/uncompleted')
      const json = await response.json()
      if (response.ok) {
        setTaskcompleted(json)
      }
      
    }

    fetchWorkouts()
  })

  return (
    <div className="">
        <h3 style={{color:"gray",fontWeight:"bolder"}}>These are tasks you haven't completed.<span style={{
            color:"red",fontWeight:"bolder",
        }}>
           ({taskCompleted.length})
            </span></h3>
      <div className="workouts" style={{paddingRight:"2%",paddingLeft:"2%"}}>
      {taskCompleted.length === 0 ? (
        <h4  style={{color:"gray"}}>You have no tasks uncompleted.</h4>
      ) : (
        taskCompleted.map(workout => (
          <TaskUncompletedDetails workout={workout} key={workout._id} />
        ))
      )}
        
      </div>
     
    </div>
  )
}

export default TaskUncompleted