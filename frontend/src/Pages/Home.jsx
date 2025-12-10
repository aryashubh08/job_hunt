import CategoryCarousel from "@/components/CategoryCarousel";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LatestJobs from "@/components/LatestJobs";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
