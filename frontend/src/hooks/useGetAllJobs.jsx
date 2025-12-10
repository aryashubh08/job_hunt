import { setAllJobs } from "@/store/slices/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.get(`${JOBS_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {}
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
