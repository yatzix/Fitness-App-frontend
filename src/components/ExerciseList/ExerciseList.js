import React from 'react';

export default function ExerciseList({ user }) {
  const workouts = user.workouts;

  return (
    <>
      <h1>Exercise List</h1>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <h3>{workout.name}</h3>
            {/* <p>{workout.type}</p>
            <p>{workout.instructions}</p> */}
            {/* Display other workout properties as needed */}
          </li>
        ))}
      </ul>
    </>
  );
}
