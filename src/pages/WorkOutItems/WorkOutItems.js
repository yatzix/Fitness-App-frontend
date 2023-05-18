import React, { useEffect, useState } from "react";
import WorkoutList from "../../components/WorkoutList/WorkoutList";

const WorkOutItems = ({ user }) => {
  const [data, setData] = useState(null);
  const [fetchedData, setFetchedData] = useState("");
  const [muscle, setMuscle] = useState("");
  const [workout, setWorkout] = useState("");
  const [workoutList, setWorkoutList] = useState([]);

  console.log("user present", user);
  
  const fetchData = async () => {
    try {
      const api_key = process.env.REACT_APP_API_KEY;
      const api_url = "https://api.api-ninjas.com/v1/exercises?muscle=biceps";
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  
  const handleSubmit = async (e, exercise) => {
    e.preventDefault();
    const userWorkout = exercise.name;

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
        setWorkoutList((prevWorkoutList) => [...prevWorkoutList, userWorkout]);
      } else {
        console.error("Error submitting data to MongoDB:", response.status);
      }
    } catch (error) {
      console.error("Error submitting data to MongoDB:", error);
    }
  };

  return (
    <div>
      <label htmlFor="muscle-input">Search by muscle:</label>
      <button onClick={() => setFetchedData({ fetchData })}>Biceps</button>
      {/* <input
        id="muscle-input"
        type="text"
        value={muscle}
        onChange={handleMuscleChange}
      /> */}
      <h1>Exercises:</h1>
      <div className="workoutList">
        <ol>
          {data.map((exercise) => (
            <li key={exercise.id}>
              <form autoComplete="off" onSubmit={(e) => handleSubmit(e, exercise)}>
                <input
                  type="text"
                  name="workouts"
                  value={exercise.name}
                  readOnly
                />

                <button type="submit">Add Exercise</button>
              </form>
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
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default WorkOutItems;
