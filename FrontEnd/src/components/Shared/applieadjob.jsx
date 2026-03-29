import React from 'react'
import { useSelector } from 'react-redux'
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
  const { allAppliedJobs } = useSelector(store => store.job)
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
        {allAppliedJobs.map((job, index) => (
          <TableRow
            key={job._id}
            className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <TableCell className="font-medium text-slate-700 dark:text-slate-200">
              {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
            </TableCell>
            <TableCell className="text-slate-700 dark:text-slate-200">
              {job?.job?.title || "N/A"}
            </TableCell>
            <TableCell className="text-slate-700 dark:text-slate-200">
              {job?.job?.company?.name || "N/A"}
            </TableCell>
            <TableCell className="">
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                {job.status || "N/A"}
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
