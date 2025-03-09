import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayPlants from "./pages/DisplayPlants";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Register from "./pages/Register";
import SiteMap from "./pages/SiteMap";
import Map from "./pages/Map";
import About from "./pages/About";
import PlantDetails from "./pages/PlantDetails";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/display-plants" element={<DisplayPlants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/map" element={<Map />} />
        <Route path="/plant/:plantId" element={<PlantDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;