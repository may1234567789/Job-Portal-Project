import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const AppliedJobs = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
    <Table>
      <TableCaption className="py-4 text-sm text-slate-500 dark:text-slate-400">
        List of your applied jobs
      </TableCaption>

      <TableHeader>
        <TableRow className="bg-slate-50 dark:bg-slate-800">
          <TableHead className="w-[140px] text-slate-600 dark:text-slate-300 font-semibold">
            Date
          </TableHead>
          <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
            Job Role
          </TableHead>
          <TableHead className="text-slate-600 dark:text-slate-300 font-semibold">
            Company
          </TableHead>
          <TableHead className="text-right text-slate-600 dark:text-slate-300 font-semibold">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {[1, 2, 3, 4].map((item, index) => (
          <TableRow
            key={index}
            className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <TableCell className="font-medium text-slate-700 dark:text-slate-200">
              17-07-2024
            </TableCell>
            <TableCell className="text-slate-700 dark:text-slate-200">
              Web Developer
            </TableCell>
            <TableCell className="text-slate-700 dark:text-slate-200">
              Google
            </TableCell>
            <TableCell className="">
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Selected
      </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>
  )
}

export default AppliedJobs
