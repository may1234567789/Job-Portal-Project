import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../Shared/navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './companytable'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

function Companies() {
    const navigate = useNavigate();
    useGetAllCompanies();
    const { companies } = useSelector(store => store.company);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
                    <p className="text-gray-600">Manage all your companies in one place</p>
                </div>

                {/* Controls Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="w-full sm:flex-1">
                            <Input
                                className="w-full"
                                placeholder="Search companies by name..."
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/company/create")}
                            className="w-full sm:w-auto"
                        >
                            + Add Company
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies