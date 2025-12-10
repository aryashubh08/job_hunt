import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "jdkje8orejlkjlgd";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src="/assets/logo.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg ">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-gray-600 text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, deserunt
          obcaecati eius suscipit ipsa atque nihil enim perferendis assumenda
          quisquam.
        </p>
      </div>
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="bg-white text-blue-700 font-bold border border-blue-200"
          variant="ghost"
        >
          12 Positions
        </Badge>
        <Badge
          className="bg-white text-[#f83002] font-bold border border-red-200"
          variant="ghost"
        >
          Part Time
        </Badge>
        <Badge
          className="bg-white text-[#7209b7] font-bold border border-purple-200"
          variant="ghost"
        >
          12 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          className="cursor-pointer"
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] cursor-pointer">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
