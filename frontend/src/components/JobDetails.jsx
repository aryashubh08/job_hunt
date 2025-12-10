import React from "react";
import { Button } from "./ui/button";

const JobDetails = () => {
  const isApplied = true;

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white shadow-md rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-gray-900">
            Frontend Developer
          </h1>

          {/* Job Tags */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-200 shadow-sm">
              12 Positions
            </div>

            <div className="px-3 py-1 text-sm font-semibold text-red-600 bg-red-50 rounded-full border border-red-200 shadow-sm">
              Part Time
            </div>

            <div className="px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-50 rounded-full border border-purple-200 shadow-sm">
              12 LPA
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-md font-semibold transition-all ${
            isApplied
              ? "bg-gray-400 text-white cursor-not-allowed shadow-sm"
              : "bg-[#7209b7] text-white hover:bg-[#5c0795] shadow-md"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Section Header */}
      <h1 className="border-b border-gray-300 font-semibold text-lg mt-8 pb-3 text-gray-700">
        Job Description
      </h1>

      {/* Job Details */}
      <div className="my-6 space-y-3 text-gray-800">
        <p>
          <span className="font-semibold">Role:</span>
          <span className="ml-3 text-gray-700">Frontend Developer</span>
        </p>

        <p>
          <span className="font-semibold">Location:</span>
          <span className="ml-3 text-gray-700">Hyderabad</span>
        </p>

        <p>
          <span className="font-semibold">Description:</span>
          <span className="ml-3 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            quasi laborum doloremque dolorem repellendus et nobis.
          </span>
        </p>

        <p>
          <span className="font-semibold">Experience:</span>
          <span className="ml-3 text-gray-700">2 yrs</span>
        </p>

        <p>
          <span className="font-semibold">Salary:</span>
          <span className="ml-3 text-gray-700">12 LPA</span>
        </p>

        <p>
          <span className="font-semibold">Total Applicants:</span>
          <span className="ml-3 text-gray-700">4</span>
        </p>

        <p>
          <span className="font-semibold">Posted Date:</span>
          <span className="ml-3 text-gray-700">17-07-2025</span>
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
