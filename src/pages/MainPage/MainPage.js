import ExerciseList from "../../components/ExerciseList/ExerciseList";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Component } from "react";

export default function MainPage({ user, setUser }) {
  const [workouts, setWorkouts] = useState(user.workouts);

  const handleAddExercise = (exercise) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, exercise]);
  };

  return (
    <>
      <p>Welcome to your very own fitness hub.</p>
      <p>Create a personalized workout plan that best fits your needs.</p>
      <Link class="link" to="/WorkOuts">
        Start your journey here
      </Link>
      <ExerciseList workouts={workouts} onAddExercise={handleAddExercise} />
    </>
  );
}
