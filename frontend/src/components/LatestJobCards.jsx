import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-4 md:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition hover:shadow-2xl max-w-full">
      {/* Top Section */}
      <div>
        <h1 className="text-base md:text-lg font-semibold">
          {job?.company?.name}
        </h1>
        <p className="text-xs md:text-sm text-gray-500">{job?.location}</p>
      </div>

      {/* Job Title + Description */}
      <div>
        <h1 className="font-bold text-lg md:text-xl my-2">{job?.title}</h1>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="bg-white text-blue-700 font-bold border border-blue-200"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="bg-white text-[#f83002] font-bold border border-red-200"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-white text-[#7209b7] font-bold border border-purple-200"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
