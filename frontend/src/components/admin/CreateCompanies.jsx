import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/store/slices/companySlice";
import { Building2 } from "lucide-react";

const CreateCompanies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const { data } = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(setSingleCompany(data.company));
        toast.success(data.message);

        const companyId = data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* OUTER WRAPPER */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-72 py-12">
        {/* PAGE HEADER */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-3">
            <Building2 className="w-8 h-8 text-gray-700" />
            Create Your Company
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl">
            Start by giving your company a name. You can change this anytime
            later.
          </p>
        </div>

        {/* MODERN CARD */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-10">
          <Label className="text-gray-700 text-sm md:text-base">
            Company Name
          </Label>

          <Input
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            className="my-3 h-12 text-base"
            placeholder="JobHunt, Microsoft, Google etc."
          />

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="w-full sm:w-auto rounded-xl"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto rounded-xl"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanies;
