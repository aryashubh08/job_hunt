import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/store/slices/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async (e) => {
    try {
      const { data } = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white p-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <Link to="/" className="cursor-pointer">
          {" "}
          <img src="/assets/logo.png" className="h-12  bg-cover" alt="" />
        </Link>
        <div className="flex items-center justify-center gap-12">
          <div className="flex font-medium gap-4 items-center justify-center">
            {user && user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}
          </div>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button
                  className="bg-[#6a38c2] hover:bg-black  text-white hover:text-white"
                  variant="outline"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profileImage} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-70">
                <div className="flex  gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profileImage} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-slate-600">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 gap-2 my-2">
                  {user && user?.role === "student" && (
                    <div className="flex w-fit items-center gap-6 cursor-pointer">
                      <User2 className="text-lg" />
                      <Link to="/profile" className="border-none">
                        View Profile
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-6 cursor-pointer">
                    <LogOut className="text-lg" />
                    <Link onClick={logoutHandler} className="border-none">
                      Logout
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
