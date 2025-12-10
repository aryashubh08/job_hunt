import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <Table className="min-w-full table-auto">
        <TableCaption className="text-gray-500 mt-4">
          A list of your applied jobs
        </TableCaption>

        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-100/80">
            <TableHead className="font-semibold text-sm sm:text-base">
              Date
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base">
              Job Role
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base">
              Company
            </TableHead>
            <TableHead className="font-semibold text-sm sm:text-base text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <TableCell className="text-sm sm:text-base">17-07-2025</TableCell>
              <TableCell className="font-medium text-sm sm:text-base">
                Frontend Developer
              </TableCell>
              <TableCell className="text-sm sm:text-base">Microsoft</TableCell>
              <TableCell className="text-right text-sm sm:text-base">
                <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full shadow-sm">
                  Selected
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
