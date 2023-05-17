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

  // const handleMuscleChange = (event) => {
  //   setMuscle(event.target.value);
  // };

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
    setWorkoutList([workout]);
  };
  console.log(data);

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
      <div class="workoutList">
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
      <h1>Your workout list</h1>
      <div>
        <ul>
          {workoutList.map((workout, index) => (
            <li key={index}>{workout}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkOutItems;

//  <button type="submit" onClick={handleSubmit(exercise) => onSubmit(exercise)}
