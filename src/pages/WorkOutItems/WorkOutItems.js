import React, { useEffect, useState } from "react";

const WorkOutItems = ({ user, onAddExercise }) => { // Function component that takes 'user' and 'onAddExercise' props
  const [data, setData] = useState(null); // State variable created named 'data' and initial value set to null

  useEffect(() => { // useEffect hook to implement side effect; takes 2 parameters: 1. a callback function and 2. a dependency array
    const fetchData = async () => { // 1. async function that makes an API request to retrieve exercise data from API and update the 'data' state with the fetched data
      try {
        const api_key = process.env.REACT_APP_API_KEY; // API key is stored in .env file in variable named 'REACT_APP_API_KEY'
        const api_url = "https://api.api-ninjas.com/v1/exercises?muscle=biceps"; // API endpoint hardcoded to 'biceps' to test fetch functionality
 
        const response = await fetch(api_url, { 
          headers: {
            "X-Api-Key": api_key, // API key is passed in the request header
          },
        });

        if (response.ok) { // If request is successful
          const responseData = await response.json(); // Response data is parsed as JSON using response.json() method, which returns a promise, and the parsed JSON data is stored in the 'responseData' variable
          setData(responseData); // setData function is called and the 'responseData' is passed as an argument, updating the data state with the fetchex exercise data
        } else {
          throw new Error("Request failed"); // If API request fails, error is thrown stating 'Request failed'
        }
      } catch (error) { // Any errors that occur during the API request or parsing are caught 
        console.error(error); // And the error is logged to the console
      }
    };

    fetchData(); // fetchData invoked
  }, []); // 2. Dependency array to ensure effect runs only once 

  const handleSubmit = async (e, exercise) => { // async function that is triggered when a form is submitted; takes 2 parameters: 1. event object (e) and exercise data (exercise);
    // handleSubmit is responsible for making a POST request to submit exercise data to server route
    e.preventDefault(); // preventDefault called to prevent default form submission behavior (page reload)

    try {
      const response = await fetch("/api/data", { // POST request is made to the server route /api/data with method, headers, and body properties
        method: "POST", // POST request
        headers: { // Object containing request headers
          "Content-Type": "application/json",
          user: user._id, // Includes user id in request headers
        },
        body: JSON.stringify({ // 'exercise' object converted to JSON string using JSON.stringify()
          name: exercise.name,
          type: exercise.type,
          muscle: exercise.muscle,
          equipment: exercise.equipment,
          difficulty: exercise.difficulty,
          instructions: exercise.instructions,
        }),
      });

      if (response.ok) { // If rqequest is successful
        console.log("Data submitted to MongoDB"); // Confirmation is provided 
        onAddExercise(exercise); // onAddExercise function that is passed as a prop from parent component is called with 'exercise' object as an argument to add exercise to the parent component's workouts state
      } else {
        console.error("Error submitting data to MongoDB:", response.status); // If request is unsuccessful, error message logged to console with response status
      }
    } catch (error) { // Any errors that occuring during the API request is caught 
      console.error("Error submitting data to MongoDB:", error); // And the error is logged to the console
    }
  };

  if (!data) { // If data state is 'null' (still being fetched, simple loading message is displayed)
    return <p>Loading...</p>;
  }

  return ( 
    // Code is rendered in an ordered list
    // data.map() function is used to iterate over the 'data' array and render an <li> for each exercise
      // Each exercise item is assigned unique key attribute based on its exercise id value
      // Auto complete is turned off to turn off suggestions, and readOnly set so users cannot edit input
      // On submit calls handleSubmit, passing the event object and current exercise
      // Button added to allow user to submit form
        // When button is clicked, it triggers handleSubmit()
    // Details of the exercise object are displayed using its properties 
    
    <div>
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
