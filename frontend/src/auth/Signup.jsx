import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="
            w-full 
            max-w-md 
            sm:max-w-lg 
            md:w-1/2 
            border border-gray-200 
            rounded-md 
            p-4 
            my-10
          "
        >
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="fullname"
              value={input.fullName}
              name="fullName"
              onChange={changeHandler}
            />
          </div>

          {/* Email */}
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="email address"
              value={input.email}
              name="email"
              onChange={changeHandler}
            />
          </div>

          {/* Phone Number */}
          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="phone number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeHandler}
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeHandler}
            />
          </div>

          {/* Role + File Inputs */}
          <div className="flex flex-col sm:flex-row justify-between gap-5 my-4">
            {/* Role */}
            <RadioGroup className="flex flex-row items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            {/* File Upload */}
            <div className="flex flex-col">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Button */}
          {loading ? (
            <Button className="w-full my-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-3">
              Signup
            </Button>
          )}

          {/* Link */}
          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
