import { setCompanies } from "@/store/slices/companySlice";
import { setAllAdminJobs, setAllJobs } from "@/store/slices/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const { data } = await axios.get(`${JOBS_API_END_POINT}/getAdminJobs`, {
          withCredentials: true,
        });
        if (data.success) {
          console.log("API Response:", data);
          dispatch(setAllAdminJobs(data.jobs));
        }
      } catch (error) {}
    };
    fetchAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
