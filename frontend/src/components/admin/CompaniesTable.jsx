import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  const companies = [1, 2, 3, 4];

  return (
    <div className="w-full">
      {/* Desktop/Table View */}
      <div className="hidden md:block">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 mt-4">
            A list of your recent registered companies
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companies.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <Avatar>
                    <AvatarImage src="/assets/logo.png" />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">Google</TableCell>

                <TableCell>18-07-2025</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="grid md:hidden gap-4">
        {companies.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center border hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/assets/logo.png" />
              </Avatar>

              <div>
                <h3 className="font-semibold text-base">Google</h3>
                <p className="text-sm text-gray-500">18-07-2025</p>
              </div>
            </div>

            <Popover>
              <PopoverTrigger>
                <MoreHorizontal className="cursor-pointer" />
              </PopoverTrigger>

              <PopoverContent className="w-32">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Edit2 className="w-4" />
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesTable;
