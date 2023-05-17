import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkOutItems from "../WorkOutItems/WorkOutItems";
import CategoryList from "../../components/CategoryList/CategoryList";

export default function WorkOuts({ user }) {
  return (
    <>
      <h1>View your workout:</h1>

      <WorkOutItems user={user} />
    </>
  );
}
