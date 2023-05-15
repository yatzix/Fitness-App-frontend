import React, { useEffect, useState } from "react";
export default function WorkOutItems() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = "PbrAGLyYmEF6NQNL0Gg45L3xZVCJtUBGTm6GFpFW";
        const api_url = "https://api.api-ninjas.com/v1/exercises/";

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
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Exercises:</h1>
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
          </li>
        ))}
      </ol>
    </div>
  );
}
