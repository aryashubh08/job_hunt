import { setSingleCompany } from "@/store/slices/companySlice";
import { setAllJobs } from "@/store/slices/jobSlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const { data } = await axios.get(
          `${COMPANY_API_END_POINT}/getCompany/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          dispatch(setSingleCompany(data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyById();
  }, [id, dispatch]);
};

export default useGetCompanyById;
