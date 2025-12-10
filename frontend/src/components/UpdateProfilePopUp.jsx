import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/store/slices/authSlice";
import { toast } from "sonner";

const UpdateProfilePopUp = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    resume: user?.profile?.resume || null,
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    // Handle skills specially (convert text → array)
    if (name === "skills") {
      return setInput({
        ...input,
        skills: value.split(",").map((s) => s.trim()),
      });
    }

    setInput({ ...input, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("resume", input.file);
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${USER_API_END_POINT}/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        console.log("submit");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false); // Close the popup on success
    console.log(input);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Full Name */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="fullName" className="text-left md:text-right">
                Name
              </Label>
              <Input
                type="text"
                value={input.fullName}
                onChange={changeEventHandler}
                id="fullName"
                name="fullName"
                className="md:col-span-3"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="email" className="text-left md:text-right">
                Email
              </Label>
              <Input
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                id="email"
                name="email"
                className="md:col-span-3"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Number */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="phoneNumber" className="text-left md:text-right">
                Number
              </Label>
              <Input
                type="text"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                id="phoneNumber"
                name="phoneNumber"
                className="md:col-span-3"
                placeholder="Phone number"
              />
            </div>

            {/* Bio */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="bio" className="text-left md:text-right">
                Bio
              </Label>
              <Input
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                id="bio"
                name="bio"
                className="md:col-span-3"
                placeholder="Short bio"
              />
            </div>

            {/* Skills */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="skills" className="text-left md:text-right">
                Skills
              </Label>
              <Input
                type="text"
                value={input.skills.join(", ")}
                onChange={changeEventHandler}
                id="skills"
                name="skills"
                className="md:col-span-3"
                placeholder="HTML, CSS, JS..."
              />
            </div>

            {/* Resume File */}
            <div className="grid gap-2 md:grid-cols-4 md:items-center">
              <Label htmlFor="file" className="text-left md:text-right">
                Resume
              </Label>
              <Input
                type="file"
                onChange={fileChangeHandler}
                id="file"
                name="resume"
                className="md:col-span-3"
                accept="application/pdf"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-3" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-3">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePopUp;
