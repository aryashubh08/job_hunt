import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center px-4 md:px-6 lg:px-0">
      <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
        {/* Small Highlight Badge */}
        <span className="px-4 py-2 mx-auto rounded-full bg-gray-100 font-medium text-[#f83002] text-sm md:text-base">
          Opportunities Don’t Wait — Grab Yours Now
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, veniam
          saepe et repudiandae expedita laboriosam?
        </p>

        {/* Responsive Search Bar */}
        <div className="flex w-full md:w-[70%] lg:w-[70%] mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none w-full bg-transparent text-sm md:text-base"
          />
          <Button className="rounded-r-full bg-[#6a38c2] px-4 py-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
