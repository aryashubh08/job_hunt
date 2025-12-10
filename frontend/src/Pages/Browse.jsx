import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// const randomJobs = [1, 2, 3];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSearchedQuery(""));
  //   };
  // }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-0">
        <h1 className="font-bold text-lg sm:text-xl">
          Search Results ({allJobs.length})
        </h1>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {allJobs.map((item, index) => (
            <Job key={index} job={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
