import React, { useState } from "react";
import styles from "./WorkOuts.css";
import WorkOutItems from "../../components/WorkOutItems/WorkOutItems";

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
