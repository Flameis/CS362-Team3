import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayPlants from "./pages/DisplayPlants";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Register from "./pages/Register"; // Import Register page

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/display-plants" element={<DisplayPlants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} /> {/* Add Register route */}
      </Routes>
    </div>
  );
}

export default App;