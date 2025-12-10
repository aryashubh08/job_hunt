import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FIXED: Corrected Selector
  const { loading, user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      dispatch(setLoading(true));

      const { data } = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // optional if you use cookies
      });

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
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
          className="w-full max-w-md sm:max-w-lg md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Log In</h1>

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

          <RadioGroup className="flex items-center gap-4 my-3">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                className="cursor-pointer"
                onChange={changeHandler}
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                className="cursor-pointer"
                onChange={changeHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-3" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-3"
              disabled={!input.role}
            >
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
