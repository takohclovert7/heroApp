import { useEffect, useState } from "react"
import TaskcompletedDetails from "./taskCompletedDetails"
const TaskCompleted = () => {
  const [taskCompleted ,setTaskcompleted]=useState([])
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts/task/completed')
      const json = await response.json()
      if (response.ok) {
        setTaskcompleted(json)
      }
      
    }

    fetchWorkouts()
  })

  return (
    <div >
        <h3 className="task" style={{color:"gray",fontWeight:"bolder"}}>These are tasks you've completed <span style={{
            color:"red",fontWeight:"bolder",
        }}>
           ({taskCompleted.length})
            </span></h3>
      <div className="workouts" style={{paddingRight:"2%",paddingLeft:"2%"}}>
      {taskCompleted.length === 0 ? (
        <h4  style={{color:"gray"}}>You have no task completed</h4>
      ) : (
        taskCompleted.map(workout => (
          <TaskcompletedDetails workout={workout} key={workout._id} />
        ))
      )}
        
      </div>
     
    </div>
  )
}

export default TaskCompleted