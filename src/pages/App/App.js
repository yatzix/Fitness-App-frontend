import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import MainPage from "../MainPage/MainPage";
import WorkOuts from "../WorkOuts/WorkOuts";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<WorkOuts user={user} />} />
          </Routes>
        </>
      ) : (
        <AuthPage path="/" setUser={setUser} user={user} />
      )}
    </main>
  );
}

export default App;
//useparams
// HOME PAGE CODE:
{
  /* <Route path="/" element={<MainPage user={user} />} /> */
}
