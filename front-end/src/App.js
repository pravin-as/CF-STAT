import "./App.css";
import React from "react";
import Login from "./Individual.js";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Competitive from "./Competitive";
import Contact from "./Contact"
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/individual" />} />
          <Route path="/individual" element={<Login />} />
          <Route path="/compare" element={<Competitive />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
