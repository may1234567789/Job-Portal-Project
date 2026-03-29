import React, { useEffect } from 'react'
import Navbar from '../Shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/Redux/applicationslice'
import axios from 'axios'
import { BriefcaseBusiness, Clock3, FileUser, ShieldCheck } from 'lucide-react'

const Applicants = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { applications = [] } = useSelector((state) => state.application ?? {})

    const inProcessCount = applications.filter((item) => item?.status === 'under-process').length
    const rejectedCount = applications.filter((item) => item?.status === 'rejected').length
    const withResumeCount = applications.filter((item) => item?.applicant?.profile?.resume).length

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job || []))
            } catch (error) {
                console.error('Error fetching applicants:', error)
            }
        }

        fetchAllApplicants()
    }, [dispatch, id])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_26%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_42%,_#f8fafc_100%)]">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                <div className="bg-[linear-gradient(135deg,_rgba(14,165,233,0.28),_rgba(15,23,42,0.88)_45%,_rgba(30,41,59,1)_100%)] px-6 py-8 sm:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                                Hiring Dashboard
                            </span>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Applicants Overview
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                                Review candidates, open resumes, and update progress for this job posting from one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 inline-flex rounded-xl bg-sky-400/15 p-2 text-sky-300">
                                    <FileUser className="h-4 w-4" />
                                </div>
                                <p className="text-2xl font-semibold">{applications.length}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Total</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 inline-flex rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
                                    <Clock3 className="h-4 w-4" />
                                </div>
                                <p className="text-2xl font-semibold">{inProcessCount}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">In Process</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 inline-flex rounded-xl bg-amber-400/15 p-2 text-amber-300">
                                    <BriefcaseBusiness className="h-4 w-4" />
                                </div>
                                <p className="text-2xl font-semibold">{withResumeCount}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">With Resume</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                <div className="mb-3 inline-flex rounded-xl bg-rose-400/15 p-2 text-rose-300">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <p className="text-2xl font-semibold">{rejectedCount}</p>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Rejected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Candidate pipeline</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Keep track of applicant details, resumes, and decision status.
                    </p>
                </div>
                
                <ApplicantsTable />
            </div>
        </div>
    </div>
  )
}

export default Applicants
