import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chandigarh",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "DevOps",
      "Quality Analyst",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 sm:p-4 rounded-md shadow-md">
      <h1 className="font-bold text-base sm:text-lg">Filter Jobs</h1>
      <hr className="mt-2 sm:mt-3" />
      <RadioGroup className="mt-2 sm:mt-3">
        {filterData.map((data, idx) => (
          <div key={idx} className="mb-3 sm:mb-4">
            <h2 className="font-semibold text-sm sm:text-base mb-1">
              {data.filterType}
            </h2>
            {data.array.map((item, index) => (
              <div key={index} className="flex items-center gap-2 my-1 sm:my-2">
                <RadioGroupItem
                  value={item}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
                <Label className="text-xs sm:text-sm">{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
