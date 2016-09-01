import React from 'react'

export default ({
  params: {userID, taskID}
}) => (
  <div className="Task">
    <h2>User ID: {userID}</h2>
    <h3>Task ID: {taskID}</h3>
  </div>
)