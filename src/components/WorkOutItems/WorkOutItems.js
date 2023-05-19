import React, { useEffect, useState } from "react";
import ExerciseList from "../ExerciseList/ExerciseList";

const WorkOutItems = ({ user, onAddExercise, workouts }) => {
  const [data, setData] = useState(null);

  const [muscle, setMuscle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = process.env.REACT_APP_API_KEY;
        const api_url =
          "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle;
        const response = await fetch(api_url, {
          headers: {
            "X-Api-Key": api_key,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [muscle]);

  const handleMuscleChange = (event) => {
    setMuscle(event.target.value);
  };

  const handleSubmit = async (e, exercise) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user: user._id,
        },
        body: JSON.stringify({
          name: exercise.name,
          type: exercise.type,
          muscle: exercise.muscle,
          equipment: exercise.equipment,
          difficulty: exercise.difficulty,
          instructions: exercise.instructions,
        }),
      });

      if (response.ok) {
        console.log("Data submitted to MongoDB");
        onAddExercise(exercise); // Add the exercise to the parent component's workouts state
      } else {
        console.error("Error submitting data to MongoDB:", response.status);
      }
    } catch (error) {
      console.error("Error submitting data to MongoDB:", error);
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div id="main-container">
        <div id="search-bar">
          <label htmlFor="muscle-input" className="display-txt">
            Search by muscle:
          </label>

          <input
            id="muscle-input"
            type="text"
            value={muscle}
            onChange={handleMuscleChange}
          />
          <h4 className="display-txt">Muscle groups:</h4>
          <ul>
            <li>abdominals</li>
            <li>abductors</li>
            <li>adductors</li>
            <li>biceps</li>
            <li>calves</li>
            <li>chest</li>
            <li>forearms</li>
            <li>glutes</li>
            <li>hamstrings</li>
            <li>lats</li>
            <li>lower_back</li>
            <li>middle_back</li>
            <li>neck</li>
            <li>quadriceps</li>
            <li>traps</li>
            <li>triceps</li>
          </ul>
        </div>

        <div className="scroll">
          <h1 className="display-txt">Exercises:</h1>
          <ol>
            {data.map((exercise) => (
              <li key={exercise.id}>
                <h3>{exercise.name}</h3>
                <p>
                  <strong>Type:</strong> {exercise.type}
                </p>
                <p>
                  <strong>Muscle:</strong> {exercise.muscle}
                </p>
                <p>
                  <strong>Equipment:</strong> {exercise.equipment}
                </p>
                <p>
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </p>
                <p>
                  <strong>Instructions:</strong> {exercise.instructions}
                </p>
                <form
                  autoComplete="off"
                  onSubmit={(e) => handleSubmit(e, exercise)}
                >
                  <input
                    type="submit"
                    name="workouts"
                    value="Add Exercise"
                    readOnly
                  />
                </form>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <ExerciseList workouts={workouts} />
        </div>
      </div>
    </div>
  );
};

export default WorkOutItems;
