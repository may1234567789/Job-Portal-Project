import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setAllAdminJobs } from '@/Redux/jobslice';

function AdminJobsTable() {
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { searchJobByText = '' } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = React.useState(Array.isArray(allAdminJobs) ? allAdminJobs : []);

  useEffect(() => {
    const jobsList = Array.isArray(allAdminJobs) ? allAdminJobs : [];
    const searchText = typeof searchJobByText === 'string' ? searchJobByText.toLowerCase().trim() : '';

    const filtered = jobsList.filter((job) => {
      if (!searchText) {
        return true;
      }

      const title = job?.title || '';
      const companyName = job?.company?.name || job?.company?.companyName || '';

      return `${title} ${companyName}`.toLowerCase().includes(searchText);
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleEdit = (job) => {
    navigate(`/admin/jobs/${job._id}/edit`, { state: { job } });
  };

  const handleDelete = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true
      });

      if (res?.data?.success) {
        dispatch(setAllAdminJobs(allAdminJobs.filter((job) => job._id !== jobId)));
        toast.success(res?.data?.message || 'Job deleted successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to delete job');
    }
  };

  if (filterJobs.length === 0) {
    return (
      <div className="w-full">
        <Table>
          <TableCaption className="py-8 text-gray-500">
            No jobs found. Create your first job to get started!
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Job Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Company</TableHead>
              <TableHead className="font-semibold text-gray-700">Location</TableHead>
              <TableHead className="font-semibold text-gray-700">Type</TableHead>
              <TableHead className="font-semibold text-gray-700">Posted On</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption className="py-4 text-gray-500">List of posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Job Title</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="font-semibold text-gray-700">Location</TableHead>
            <TableHead className="font-semibold text-gray-700">Type</TableHead>
            <TableHead className="font-semibold text-gray-700">Posted On</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id} className="border-b transition-colors hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{job?.title || 'Untitled Job'}</TableCell>
              <TableCell className="text-gray-700">
                {job?.company?.name || job?.company?.companyName || 'N/A'}
              </TableCell>
              <TableCell className="text-gray-600">{job?.location || 'N/A'}</TableCell>
              <TableCell className="text-gray-600">{job?.jobType || 'N/A'}</TableCell>
              <TableCell className="text-gray-600">{formatDate(job?.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="space-y-1">
                      <button
                        onClick={() => handleEdit(job)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
