import React from 'react'
import Navbar from '../Shared/navbar'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/Redux/companyslice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function CreateCompany() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const registerCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }

        setLoading(true);
        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {
                companyName: companyName},
            {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company));
                toast.success("Company created successfully!");
                const companyId = res?.data?.companyId || res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
            
        }catch(error){
            console.error("Error creating company:", error);
            toast.error("Failed to create company. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Company</h1>
                    <p className="text-gray-600 mb-8">Add a new company to your portfolio</p>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <Input 
                                type="text" 
                                placeholder="Enter company name" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button 
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={registerCompany}
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? "Creating..." : "Create Company"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany
