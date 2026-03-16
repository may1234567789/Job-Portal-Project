import React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../Shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { JOB_API_END_POINT } from '@/utils/constant'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

function CreateJob() {
    useGetAllCompanies();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { companies = [] } = useSelector((store) => store.company);
    const companyList = Array.isArray(companies) ? companies : [];
    const isEditMode = Boolean(params.id);
    const [loading, setLoading] = React.useState(false);
    const [input, setInput] = React.useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "Full-Time",
        experience: "",
        position: "",
        companyId: "",
    });

    React.useEffect(() => {
        const stateJob = location.state?.job;

        if (stateJob && params.id) {
            setInput({
                title: stateJob?.title || "",
                description: stateJob?.description || "",
                requirements: Array.isArray(stateJob?.requirements) ? stateJob.requirements.join(', ') : (stateJob?.requirements || ""),
                salary: stateJob?.salary || "",
                location: stateJob?.location || "",
                jobType: stateJob?.jobType || "Full-Time",
                experience: stateJob?.experience || "",
                position: stateJob?.position || "",
                companyId: stateJob?.company?._id || stateJob?.company || "",
            });
            return;
        }

        if (!params.id) {
            return;
        }

        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, { withCredentials: true });
                if (res?.data?.success) {
                    const job = res.data.job;
                    setInput({
                        title: job?.title || "",
                        description: job?.description || "",
                        requirements: Array.isArray(job?.requirements) ? job.requirements.join(', ') : (job?.requirements || ""),
                        salary: job?.salary || "",
                        location: job?.location || "",
                        jobType: job?.jobType || "Full-Time",
                        experience: job?.experience || "",
                        position: job?.position || "",
                        companyId: job?.company?._id || job?.company || "",
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Failed to load job");
            }
        };

        fetchJob();
    }, [location.state, params.id]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const createJobHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company");
            return;
        }

        setLoading(true);
        try {
            const selectedCompany = companyList.find((company) => company._id === input.companyId);
            const payload = {
                ...input,
                companyId: input.companyId,
                company: selectedCompany?.name || ""
            };

            const requestConfig = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            };

            const res = isEditMode
                ? await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, payload, requestConfig)
                : await axios.post(`${JOB_API_END_POINT}/post`, payload, requestConfig);

            if (res?.data?.success) {
                toast.success(res?.data?.message || (isEditMode ? "Job updated successfully" : "Job created successfully"));
                navigate("/admin/jobs");
            } else {
                toast.error(res?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} job`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} job`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditMode ? 'Edit Job' : 'Create Job'}</h1>
                    <p className="text-gray-600 mb-8">
                        {isEditMode ? 'Update your job opening details' : 'Add a new job opening for one of your companies'}
                    </p>

                    <form onSubmit={createJobHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={changeEventHandler}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                >
                                    <option value="">Select company</option>
                                    {companyList.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company?.name || company?.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job location"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="Enter salary package"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                >
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 2 years"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Position <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="Enter open positions count"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Requirements <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Separate requirements with commas"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Write the job description"
                                rows={6}
                                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/jobs")}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Job" : "Create Job")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateJob
