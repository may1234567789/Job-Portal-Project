import React, { useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Shared/navbar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { setSingleCompany } from '@/Redux/companyslice';

function CompanySetup() {
    const [input, setInput] = React.useState({
        companyName: "",
        description: "",
        location: "",
        website: "",
        file:null
    });
    const { singleCompany } = useSelector(store=> store.company);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();
    useGetCompanyById(params.id);
    const companyId = params.id;

    const changeHandler = (e) => {
        setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0] || null;
        setInput((prev) => ({...prev, file}));

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!companyId) {
            toast.error("Company id is missing. Please reopen the company from the companies list.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("companyName", input.companyName);
        formData.append("description", input.description);
        formData.append("location", input.location);
        formData.append("website", input.website);
        if (input.file) {
            formData.append("file", input.file);
        }
        try{
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    useEffect( ()=>{
        setInput({
            companyName: singleCompany?.companyName || singleCompany?.name || "",
            description: singleCompany?.description || "",
            location: singleCompany?.location || "",
            website: singleCompany?.website || "",
            file: null
        })
    },[singleCompany])


  return (
    <div>
        <Navbar />
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                <Button type="button" onClick={() => navigate("/admin/companies")} className="px-4 py-2 bg-blue-500 text-white rounded">
                    <ArrowLeft />
                    <span>Back to Companies</span>
                </Button>
                <div>
                    <Label className='text-2xl font-bold mb-4'>Company Name</Label>
                <input 
                type="text" 
                className="w-full p-2 border rounded mb-4" 
                placeholder="Enter company name" 
                value={input.companyName} 
                onChange={changeHandler} 
                name="companyName"
                />
                </div>

                <div>
                <Label className='text-2xl font-bold mb-4'>Description</Label>
                <input 
                type="text" 
                className="w-full p-2 border rounded mb-4" 
                placeholder="Enter company description" 
                value={input.description} 
                onChange={changeHandler} 
                name="description"
                />
                </div>
                <div>
                <Label className='text-2xl font-bold mb-4'>Location</Label>
                <input 
                type="text" 
                className="w-full p-2 border rounded mb-4" 
                placeholder="Enter company location" 
                value={input.location} 
                onChange={changeHandler} 
                name="location"
                />
                </div>
                <div>
                <Label className='text-2xl font-bold mb-4'>Website</Label>
                <input 
                type="text" 
                className="w-full p-2 border rounded mb-4" 
                placeholder="Enter company website" 
                value={input.website} 
                onChange={changeHandler} 
                name="website"
                />
                </div>

                <div>
                <Label className='text-2xl font-bold mb-4'>Logo</Label>
                <input 
                type="file" 
                accept="image/*"
                onChange={changeFileHandler} 
                name="file"
                />
                </div>

                </div>
                <Button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">
                    {loading ? "Updating..." : "Update"}
                </Button>
            </form>
            </div>
        
    </div>
  )
}

export default CompanySetup
