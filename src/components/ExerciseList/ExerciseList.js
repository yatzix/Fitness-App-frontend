import React, { useState } from 'react'; 

export default function ExerciseList({ workouts }) { // Function component named ExerciseList
  const [showDetails, setShowDetails] = useState([]); // Declare showDetails state variable and setShowDetails function to update it; initialized as an empty array

  const toggleDetails = (index) => { // toggleDetails arrow function, which takes an index as a parameter (toggles visibility of details for a specific workout)
    setShowDetails((prevDetails) => { // setShowDetails invoked and provided a function that receives the previous state value (prevDetails) as a parameter
      const updatedDetails = [...prevDetails]; // Create a copy of the previous state array
      updatedDetails[index] = !prevDetails[index]; // Toggle the value at the given index in the updatedDetails array
      return updatedDetails; // Return the updatedDetails array as the new state value for showDetails
    });
  };

  return (
    <>
      <h1>Exercise List</h1>
      <ul>
        {workouts.map((workout, index) => ( 
        // Map over the workouts array, providing workout and index as arguments to the arrow function 
        // For each workout object and its index, an <li> is rendered with the key attribute set to the index
        // An <h3> is also rendered with the value of the name property from the workout object
        // Button is rendered for each li with an onClick event handler; when clicked, it calls the toggleDetails helper function with the current index as an argument
        // If showDetails at the current index is true, the text is set to "Hide Details", otherwise it is set to "Show Details"
        // Conditional logic: if if showDetails at the current index is true, the content will be visible; the content renders properties of the workout object 
          <li key={index}> 
            <h3>{workout.name}</h3>
            <button onClick={() => toggleDetails(index)}>
              {showDetails[index] ? 'Hide Details' : 'Show Details'} 
            </button>
            {showDetails[index] && (
              <div style={{ marginLeft: '20px' }}>
                <h3>{workout.type}</h3>
                <h3>{workout.muscle}</h3>
                <h3>{workout.equipment}</h3>
                <h3>{workout.difficulty}</h3>
                <h3>{workout.instructions}</h3>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
