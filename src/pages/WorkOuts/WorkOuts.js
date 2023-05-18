import React, { useState } from "react";
import { useParams } from "react-router-dom";
import WorkOutItems from "../WorkOutItems/WorkOutItems";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

export default function WorkOuts({ user }) {
  const [workouts, setWorkouts] = useState(user.workouts);

  const handleAddExercise = (exercise) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, exercise]);
  };

  return (
    <>
      <h1 className="display-txt">The time is NOW </h1>
      <div className="workout">
        <WorkOutItems
          user={user}
          onAddExercise={handleAddExercise}
          workouts={workouts}
        />
      </div>
    </>
  );
}
