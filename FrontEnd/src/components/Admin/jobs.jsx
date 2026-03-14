import React from 'react'
import Navbar from '../Shared/navbar'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

function AdminJobs() {
    useGetAllAdminJobs();
    const [input, setInput] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [dispatch, input])
  return (
    <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
            <p className="text-gray-600">Manage all your jobs in one place</p>
            <Input 
                className = "w-full mt-4"
                placeholder="Search jobs by title..."
                onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/admin/job/create")} className="mt-4">
                + Add Job
            </Button>
        </div>
        <AdminJobsTable />
    </div>
  )
}

export default AdminJobs