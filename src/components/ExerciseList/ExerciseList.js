import React, { useState } from 'react';

export default function ExerciseList({ workouts }) {
  const [showDetails, setShowDetails] = useState([]);

  const toggleDetails = (index) => {
    setShowDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = !prevDetails[index];
      return updatedDetails;
    });
  };

  return (
    <>
      <h1>Exercise List</h1>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <h3>{workout.name}</h3>
            <button onClick={() => toggleDetails(index)}>
              {showDetails[index] ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails[index] && (
              <div style={{ marginLeft: '20px' }}>
                <h3>{workout.type}</h3>
                <h3>{workout.muscle}</h3>
                <h3>{workout.equipment}</h3>
                <h3>{workout.difficulty}</h3>
                <h3>{workout.instructions}</h3>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
