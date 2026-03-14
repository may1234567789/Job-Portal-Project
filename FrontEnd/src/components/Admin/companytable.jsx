import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setCompanies, setSingleCompany } from '@/Redux/companyslice'

function ComapniesTable() {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companyList = Array.isArray(companies) ? companies : [];
  const [filterCompany, setFilterCompany] = React.useState(companyList);

  useEffect(() => {
    const searchText = typeof searchCompanyByText === 'string' ? searchCompanyByText.toLowerCase() : '';
    const filtered = companyList.filter(company =>
      (company?.companyName || company?.name || '').toLowerCase().includes(searchText)
    );
    setFilterCompany(filtered);
  }, [companyList, searchCompanyByText]);

  const handleEdit = (company) => {
    dispatch(setSingleCompany(company));
    navigate(`/admin/companies/${company._id}`);
  };

  const handleDelete = async (companyId) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true
      });

      if (res?.data?.success) {
        const updatedCompanies = companyList.filter(company => company._id !== companyId);
        dispatch(setCompanies(updatedCompanies));
        toast.success(res.data.message || 'Company deleted successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to delete company');
    }
  };

  const getInitials = (name) => {
    return (name || 'NA')
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (companyList.length === 0) {
    return (
      <div className="w-full">
        <Table>
          <TableCaption className="py-8 text-gray-500">No companies found. Create your first company to get started!</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Logo</TableHead>
              <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Date Created</TableHead>
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
            <TableCaption className="py-4 text-gray-500">List of companies</TableCaption>
            <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Logo</TableHead>
                    <TableHead className="font-semibold text-gray-700">Company Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date Created</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterCompany.map((company) => (
                  <TableRow key={company._id} className="hover:bg-gray-50 border-b transition-colors">
                    <TableCell>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={company.logo} alt={company.companyName}/>
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(company?.companyName || company?.name)}
                            </AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">{company?.companyName || company?.name || 'Unnamed Company'}</TableCell>
                    <TableCell className="text-gray-600">{formatDate(company.createdAt)}</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="h-5 w-5 text-gray-600 hover:text-gray-900"/>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                                <div className="space-y-1">
                                    <button 
                                      onClick={() => handleEdit(company)}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                        <Edit2 className="h-4 w-4"/>
                                        <span>Edit</span>
                                    </button>
                                    <button
                                      onClick={() => handleDelete(company._id)}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                                        <Trash2 className="h-4 w-4"/>
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
  )
}

export default ComapniesTable
