import React from "react";
import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className="my-20 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest </span> Job Openings
      </h1>

      {/* Responsive Grid */}
      <div
        className="
        grid 
        grid-cols-1        
        md:grid-cols-3     
        lg:grid-cols-3    
        gap-4 
        my-5
      "
      >
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
