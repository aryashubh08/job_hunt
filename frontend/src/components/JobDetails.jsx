import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOBS_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/store/slices/jobSlice";
import { toast } from "sonner";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const { data } = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const { data } = await axios.get(`${JOBS_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (data.success) {
          dispatch(setSingleJob(data.job));
          setIsApplied(
            data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getSingleJob();
  }, [id, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 md:px-0">
      {/* Header Card */}
      <div
        className="bg-gradient-to-r from-indigo-500/80 to-purple-600/80 
        text-white p-7 md:p-10 rounded-3xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {singleJob?.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
                📌 {singleJob?.position} Positions
              </span>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
                🧳 {singleJob?.jobType}
              </span>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
                💰 {singleJob?.salary} LPA
              </span>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-3 text-sm md:text-md font-semibold shadow-md transition 
              ${
                isApplied
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white text-indigo-700 hover:bg-gray-100"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Details Card */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          📝 Job Description
        </h2>

        <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
          {singleJob?.description}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "🎯", label: "Role", value: singleJob?.title },
            { icon: "📍", label: "Location", value: singleJob?.location },
            {
              icon: "⚡",
              label: "Experience",
              value: `${singleJob?.experienceLevel} yrs`,
            },
            { icon: "💼", label: "Salary", value: `${singleJob?.salary} LPA` },
            {
              icon: "👥",
              label: "Applicants",
              value: singleJob?.applications.length,
            },
            {
              icon: "📅",
              label: "Posted On",
              value: singleJob?.createdAt?.split("T")[0],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
