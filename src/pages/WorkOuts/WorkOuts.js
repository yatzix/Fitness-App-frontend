import React, { useState } from "react";
import "./WorkOuts.css";
import WorkOutItems from "../../components/WorkOutItems/WorkOutItems";

export default function WorkOuts({ user }) {
  const [workouts, setWorkouts] = useState(user.workouts);

  const handleAddExercise = (exercise) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, exercise]);
  };

  return (
    <>
      <h1 className="display-txt">Make Your Initial Commit </h1>
      <p className="app-info">Welcome to your very own fitness hub!</p>
      <p className="app-info">Create a personalized workout plan that best fits your needs.</p>
      <div className="workout">
        <WorkOutItems
          user={user}
          onAddExercise={handleAddExercise}
          workouts={workouts}
        />
        <footer>
          
        </footer>
      </div>
    </>
  );
}
