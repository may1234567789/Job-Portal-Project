import React, { useEffect } from 'react'
import Navbar from '../Shared/navbar'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { setSearchJobByText } from '@/Redux/jobslice';

function AdminJobs() {
    useGetAllAdminJobs();
    const [input, setInput] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [dispatch, input]);
    return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
                <p className="text-gray-600">Manage all your jobs in one place</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="w-full sm:flex-1">
                        <Input
                            className="w-full"
                            placeholder="Search jobs by title..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => navigate("/admin/job/create")}
                        className="w-full sm:w-auto"
                    >
                        + Add Job
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <AdminJobsTable />
            </div>
        </div>
    </div>
    )
}

export default AdminJobs
