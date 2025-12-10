import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { MailIcon, Contact, PenIcon } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfilePopUp from "./UpdateProfilePopUp";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const isHaveResume = user?.profile?.resume;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl mt-6 mb-6 p-6 sm:p-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* LEFT USER INFO */}
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-gray-300">
              <AvatarImage
                src={user?.profile?.profileImage}
                alt="profile"
                className="object-cover"
              />
            </Avatar>

            <div>
              <h1 className="font-bold text-2xl">{user?.fullName}</h1>
              <p className="text-gray-600 text-sm mt-1">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PenIcon size={18} /> Edit Profile
          </Button>
        </div>

        {/* CONTACT INFO */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg mb-2">Contact Information</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <MailIcon size={20} className="text-gray-500" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Contact size={20} className="text-gray-500" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg">Skills</h2>

          <div className="flex flex-wrap gap-2 mt-3">
            {user?.profile?.skills?.length ? (
              user?.profile?.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-800 text-sm shadow-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* RESUME SECTION */}
        <div className="mt-8 max-w-sm">
          <Label className="text-md font-semibold">Resume</Label>

          {isHaveResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-1 text-sm"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* APPLIED JOBS */}
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-6 mb-10">
        <h1 className="text-xl font-semibold mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* POPUP */}
      <UpdateProfilePopUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
