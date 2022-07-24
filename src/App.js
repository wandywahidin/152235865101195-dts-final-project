import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home2 from "./pages/Home2";
import ProtectedComponent from "./components/ProtectedComponent";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route
          path="/login"
          element={
            <ProtectedComponent isLoggin={false}>
              <Login />
            </ProtectedComponent>
          }
        />
        <Route path="/register" element={
          <ProtectedComponent isLoggin={false}>
            <Register />
          </ProtectedComponent>
        } />
      </Routes>
    </>
  );
};

export default App;
