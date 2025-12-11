import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((state) => state.job);
  console.log(allAdminJobs);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    console.log("called");
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full">
      {/* Desktop/Table View */}
      <div className="hidden md:block">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 mt-4">
            A list of your recent posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-gray-500"
                >
                  You haven't registered any company yet.
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((item, index) => (
                <TableRow key={item._id || index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {item?.company?.name}
                  </TableCell>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>
                    {item?.createdAt ? item.createdAt.split("T")[0] : "No date"}
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${item._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid md:hidden gap-4">
        {filterJobs.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven't registered any company yet.
          </p>
        ) : (
          filterJobs.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center border hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-base">
                    {item?.company?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item?.createdAt ? item.createdAt.split("T")[0] : "No date"}
                  </p>
                </div>
              </div>

              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>

                <PopoverContent className="w-32">
                  <div
                    onClick={() => navigate(`/admin/companies/${item._id}`)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminJobsTable;
