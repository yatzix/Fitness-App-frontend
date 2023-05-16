import React, { useEffect, useState } from "react";
import './BicepsPage.css'

export default function Biceps() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = process.env.REACT_APP_API_KEY;
        const api_url = `https://api.api-ninjas.com/v1/exercises?muscle=biceps`;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const workoutName = e.target[0].value;

    fetch("/api/data/WorkOuts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workout: workoutName }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data submitted to MongoDB");
        } else {
          console.error(
            "Error submitting data to MongoDB:",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("Error submitting data to MongoDB:", error);
      });
  };

  return (
    <div className='Biceps'>
      <h1>Biceps:</h1>
      <ul>
        {data.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
