import React, { useState, useEffect } from 'react';

const CategoryList = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const api_url = `https://api.api-ninjas.com/v1/exercises`;

      const response = await fetch(api_url, {
        headers: {
          "X-Api-Key": api_key,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      } else {
        console.error("Failed to fetch exercises");
      }
    };

    fetchExercises();
  }, []);

  // Get a list of unique muscle names
  const muscles = [...new Set(exercises.map(exercise => exercise.muscle))];

  // Filter the exercises based on the selected muscle
  const filteredExercises = exercises.filter(exercise => exercise.muscle === selectedMuscle);

  return (
    <div>
      <ul>
        {muscles.map((muscle, index) => (
          <li key={index} onClick={() => setSelectedMuscle(muscle)}>
            {muscle}
          </li>
        ))}
      </ul>
      {selectedMuscle && (
        <div>
          <h2>Exercises for {selectedMuscle}:</h2>
          <ul>
            {filteredExercises.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;