import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function AdminJobsTable() {
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { searchCompanyByText = '' } = useSelector((store) => store.company);
  const [filterJobs, setFilterJobs] = React.useState(Array.isArray(allAdminJobs) ? allAdminJobs : []);

  useEffect(() => {
    const jobsList = Array.isArray(allAdminJobs) ? allAdminJobs : [];
    const searchText = typeof searchCompanyByText === 'string' ? searchCompanyByText.toLowerCase().trim() : '';

    const filtered = jobsList.filter((job) => {
      if (!searchText) {
        return true;
      }

      const title = job?.title || '';
      const companyName = job?.company?.name || job?.company?.companyName || '';

      return `${title} ${companyName}`.toLowerCase().includes(searchText);
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchCompanyByText]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
