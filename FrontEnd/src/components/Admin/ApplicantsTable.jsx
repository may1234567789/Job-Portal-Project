import React from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '../ui/table' 
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setAllApplicants } from '@/Redux/applicationslice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCheck, ChevronDown, CircleOff, Download, Mail, Phone } from 'lucide-react'

const statusOptions = [
  { label: 'Under Process', value: 'under-process', icon: CheckCheck },
  { label: 'Rejected', value: 'rejected', icon: CircleOff },
]

const ApplicantsTable = () => {
  const dispatch = useDispatch()
  const { applications = [] } = useSelector((state) => state.application ?? {})

  const getStatusClasses = (status) => {
    switch (status) {
      case 'under-process':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
      case 'rejected':
        return 'border-rose-200 bg-rose-50 text-rose-700'
      default:
        return 'border-sky-200 bg-sky-50 text-sky-700'
    }
  }

  const getApplicantName = (applicant) => applicant?.username || applicant?.fullname || applicant?.name || 'Unknown Applicant'

  const statusHandler = async (status,id) => {
    try{
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials: true})
      if(res.data.success){
        const updatedApplications = applications.map((item) =>
          item._id === id ? { ...item, status } : item
        )
        dispatch(setAllApplicants(updatedApplications))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error updating shortlisting status:', error)
      toast.error(error?.response?.data?.message || 'Failed to update applicant status')
    }
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Mail className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">No applicants yet</h3>
        <p className="mt-2 text-sm text-slate-500">
          New candidates will appear here as soon as they apply for this role.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      <Table>
        <TableCaption className="pb-4">Applicants for this job</TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="px-5 py-4">Candidate</TableHead>
            <TableHead className="px-5 py-4">Contact</TableHead>
            <TableHead className="px-5 py-4">Resume</TableHead>
            <TableHead className="px-5 py-4">Applied</TableHead>
            <TableHead className="px-5 py-4">Status</TableHead>
            <TableHead className="px-5 py-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((item) => {
            const applicant = item?.applicant || {}
            const applicantName = getApplicantName(applicant)
            const resumeUrl = applicant?.profile?.resume
            const resumeName = applicant?.profile?.resumeOriginalName || 'Resume'

            return (
              <TableRow key={item._id} className="border-slate-200 hover:bg-slate-50/70">
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg" className="h-11 w-11 border border-slate-200">
                      <AvatarImage src={applicant?.profile?.profilePicture} alt={applicantName} />
                      <AvatarFallback className="bg-slate-100 font-semibold text-slate-700">
                        {applicantName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{applicantName}</p>
                      <p className="text-sm text-slate-500">Applicant ID: {item?._id?.slice(-6) || 'N/A'}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-5 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{applicant?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{applicant?.phoneNumber || 'N/A'}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-5 py-4">
                  {resumeUrl ? (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
                    >
                      <Download className="h-4 w-4" />
                      <span className="max-w-[160px] truncate">{resumeName}</span>
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400">No resume uploaded</span>
                  )}
                </TableCell>

                <TableCell className="px-5 py-4 text-sm text-slate-600">
                  {item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }) : 'N/A'}
                </TableCell>

                <TableCell className="px-5 py-4">
                  <Badge variant="outline" className={getStatusClasses(item?.status)}>
                    {item?.status || 'applied'}
                  </Badge>
                </TableCell>

                <TableCell className="px-5 py-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="rounded-full border-slate-200 bg-white px-4">
                        Update
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-52 rounded-2xl border-slate-200 p-2">
                      <div className="space-y-1">
                        {statusOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <button
                              type="button"
                              onClick={() => statusHandler(option.value, item._id)}
                              key={option.value}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              <span className="rounded-lg bg-slate-100 p-2 text-slate-600">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span>{option.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
