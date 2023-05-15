import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import HomePage from "../HomePage/HomePage";
import MainPage from "../MainPage/MainPage";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          {/* <NavBar user={user} /> */}
          <Routes>
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </>
      ) : (
        <HomePage path="/" setUser={setUser} />
      )}
    </main>
  );
}

export default App;
