import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayPlants from "./pages/DisplayPlants";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Register from "./pages/Register";
import SiteMap from "./pages/SiteMap";
import Map from "./pages/Map";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SiteMap />} />
        <Route path="/display-plants" element={<DisplayPlants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;