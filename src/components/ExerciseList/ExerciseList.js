import React, { useState } from "react";

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
      <h1 className="display-txt">Your Current Workout:</h1>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <button onClick={() => toggleDetails(index)}>
              {showDetails[index] ? "Hide Details" : workout.name}
            </button>
            {showDetails[index] && (
              <div style={{ marginLeft: "20px" }}>
                <h3>{workout.name}</h3>
                <p>
                  <strong>Type:</strong> {workout.type}
                </p>
                <p>
                  <strong>Workout:</strong> {workout.muscle}
                </p>
                <p>
                  <strong>Equipment:</strong>
                  {workout.equipment}
                </p>
                <p>
                  <strong>Difficulty</strong> {workout.difficulty}
                </p>
                <p>
                  <strong>Instructions</strong>
                  {workout.instructions}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
