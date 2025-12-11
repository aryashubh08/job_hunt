import { setCompanies } from "@/store/slices/companySlice";
import { setAllJobs } from "@/store/slices/jobSlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get(
          `${COMPANY_API_END_POINT}/getCompany`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          console.log("API Response:", data);
          dispatch(setCompanies(data.companies));
        }
      } catch (error) {}
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
