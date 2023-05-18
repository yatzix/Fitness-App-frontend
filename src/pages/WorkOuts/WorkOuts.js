import React, { useState } from 'react';
import WorkOutItems from "../WorkOutItems/WorkOutItems";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

export default function WorkOuts({ user }) { // WorkOuts function component defined and passed 'user' prop
  const [workouts, setWorkouts] = useState(user.workouts); // state variable declared name 'workouts' with corresponding 'setWorkouts' setter function; initial value set to user.workouts, which comes from the 'user' prop

  const handleAddExercise = (exercise) => { // helper function that takes exercise as a parameter; when called, it updates the 'workouts' state using setter function
    setWorkouts((prevWorkouts) => [...prevWorkouts, exercise]); // previous 'workouts' value spread into new array, and the new exercise is added to the end of the array
  };

  return ( 
    // WorkOutItems component rendered w/user and onAddExercise props
    // ExerciseList component rendered w/workouts prop
    <>
      <h1>View your workout:</h1>
      <div className="workout">
        <WorkOutItems user={user} onAddExercise={handleAddExercise} /> 
        <ExerciseList workouts={workouts} />
      </div>
    </>
  );
}
