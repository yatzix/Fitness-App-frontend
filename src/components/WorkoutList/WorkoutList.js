// import React, { useState, useEffect } from "react";

// const WorkoutList = () => {
//   const Workoutlist = ({ user }) => {
//     const [data, setData] = useState(null);
//     const [workout, setWorkout] = useState("");
//     const [workoutList, setWorkoutList] = useState([]);
  
//     console.log("user present", user);
//     const fetchData = async () => {
//       try {
//         const api_key = process.env.REACT_APP_API_KEY;
//         const api_url = "https://api.api-ninjas.com/v1/exercises?muscle=biceps";
//         const response = await fetch(api_url, {
//           headers: {
//             "X-Api-Key": api_key,
//           },
//         });
  
//         if (response.ok) {
//           const responseData = await response.json();
//           setData(responseData);
//         } else {
//           throw new Error("Request failed");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, []);
  
  
//     if (!data) {
//       return <p>Loading...</p>;
//     }
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log({ body: JSON.stringify(e.target[0].value) });
//       fetch("/api/data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           user: user._id,
//         },
  
//         body: JSON.stringify({
//           exercise: e.target[0].value,
//         }),
//       })
//         .then((response) => {
//           // console.log(JSON.stringify.data);
//           if (response.ok) {
//             console.log("Data submitted to MongoDB");
//           } else {
//             console.error("Error submitting data to MongoDB:", response.status);
//           }
//         })
//         .catch((error) => {
//           console.error("Error submitting data to MongoDB:", error);
//         });
  
//       const userWorkout = e.target[0].value;
//       setWorkout(userWorkout);
//       setWorkoutList([workout]);
//     };
//     console.log(data);
  
//   return(
//     <div>
//       <h1>Your workout list</h1>
//       <div>
//         <ul>
//           {workoutList.map((workout, index) => (
//             <li key={index}>{workout}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// };

// export default WorkoutList;
