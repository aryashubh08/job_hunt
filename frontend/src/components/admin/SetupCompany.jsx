import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const SetupCompany = () => {
  const { singleCompany } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${COMPANY_API_END_POINT}/updateCompany/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        navigate("/admin/companies");
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="font-bold text-xl sm:text-2xl">Company Setup</h1>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="font-medium">Company Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter company name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-medium">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Short description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-medium">Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-medium">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="City, Country"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="font-medium">Company Logo</Label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />

                {input.file ? (
                  <span className="text-sm text-green-600">
                    File selected: {input.file.name}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    No file selected
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-10">
            {loading ? (
              <Button className="w-full py-6 text-lg" disabled>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full py-6 text-lg">
                Update Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupCompany;
