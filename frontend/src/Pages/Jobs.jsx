import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useSelector } from "react-redux";

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  return (
    <>
      <Navbar />
      {/* filter page */}

      {/* job card */}
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-2 md:gap-5">
          <div className="w-[25%] md:w-[20%]">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>No job found.</span>
          ) : (
            <div className="flex-1 h-[84vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:col-end-3 xl:grid-cols-3 gap-4">
                {allJobs.map((item, index) => (
                  <div key={index}>
                    <Job job={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
