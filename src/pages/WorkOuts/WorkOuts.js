import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkOutItems from "../WorkOutItems/WorkOutItems";

export default function WorkOuts({ user }) {
  return (
    <>
      <h1>View your workout:</h1>
      <div className="workout">

        <WorkOutItems user={user} />
      </div>
    </>
  );
}
