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
import Companies from "./components/admin/Companies";
import CreateCompanies from "./components/admin/CreateCompanies";
import SetupCompany from "./components/admin/SetupCompany";

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

        {/* admin */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CreateCompanies />} />
        <Route path="/admin/companies/:id" element={<SetupCompany />} />
      </Routes>
    </>
  );
};

export default App;
