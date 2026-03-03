import React from 'react'
import Navbar from '../Shared/navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './companytable'

function Companies() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Companies</h1>
                <Input
                    className="w-full mt-4"
                    placeholder="Search companies..."
                />
                <Button className="mt-4" onClick={() => navigate("/admin/company/create")}>Add Company</Button>
            </div>
            <CompaniesTable />
        </div>
    )
}

export default Companies