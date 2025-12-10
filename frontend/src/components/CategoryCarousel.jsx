import React from "react";
import { Button } from "./ui/button";

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Machine Learning",
    "Shopify Developer",
    "Wordpress Developer",
    "Quality Analyst",
  ];

  return (
    <div className="my-10 w-[90%] sm:w-[80%] mx-auto">
      {/* Natural Flow Buttons */}
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {category.map((cat, idx) => (
          <Button
            key={idx}
            className="
              rounded-full 
              px-5 
              py-2
              whitespace-nowrap
            "
            variant="outline"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
