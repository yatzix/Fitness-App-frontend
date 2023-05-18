import React, { useEffect, useState } from "react";
import WorkoutList from "../../components/WorkoutList/WorkoutList";

const WorkOutItems = ({ user }) => {
  const [data, setData] = useState(null);
  const [fetchedData, setFetchedData] = useState("");
  const [muscle, setMuscle] = useState("");
  const [workout, setWorkout] = useState();
  const [workoutList, setWorkoutList] = useState([]);

  console.log("user present", user);
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

  useEffect(() => {
    fetchData();
  }, [muscle]);

  const handleMuscleChange = (event) => {
    setMuscle(event.target.value);
  };

  if (!data) {
    return <p>Loading...</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ body: JSON.stringify(e.target[0].value) });
    fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: user._id,
      },
      //   body: "Rickshaw Carry",

      body: JSON.stringify({
        exercise: e.target[0].value,
      }),
    })
      .then((response) => {
        // console.log(JSON.stringify.data);
        if (response.ok) {
          console.log("Data submitted to MongoDB");
        } else {
          console.error("Error submitting data to MongoDB:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error submitting data to MongoDB:", error);
      });

    const userWorkout = e.target[0].value;
    setWorkout(userWorkout);
    setWorkoutList(function (workoutList) {
      return [...workoutList, workout];
    });
  };

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
                <form autoComplete="off" onSubmit={handleSubmit}>
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
        <div>
          <h1 className="display-txt">Your workout list</h1>
          <ul>
            {workoutList.map((workout, index) => (
              <li key={index}>{workout}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkOutItems;

//  <button type="submit" onClick={handleSubmit(exercise) => onSubmit(exercise)}
