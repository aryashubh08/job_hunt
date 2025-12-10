import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Browse from "./Pages/Browse";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDetails />} />
      </Routes>
    </>
  );
};

export default App;
