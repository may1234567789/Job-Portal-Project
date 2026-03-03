import React from 'react'
import Navbar from '../Shared/navbar'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../config';

function CreateCompany() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = React.useState("");
    const registerCompany = async () => {
        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {
                companyName: companyName
        });
        }catch(error){
            console.error("Error creating company:", error);
            toast.error("Failed to create company. Please try again.");
        }
    }
  return (
    <div>
        <Navbar />
        <h1 className="text-2xl font-bold p-4">Create Company</h1>
        <div className="p-4">
            <label className="block mb-2">Company Name</label>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter company name" onChange={(e) => setCompanyName(e.target.value)}/>
            {/* <label className="block mb-2">Company Logo URL</label>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter logo URL"/> */}
            <Button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/admin/companies")}>Create Company</Button>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => registerCompany()}>Continue</Button>
        </div>
    </div>
  )
}

export default CreateCompany