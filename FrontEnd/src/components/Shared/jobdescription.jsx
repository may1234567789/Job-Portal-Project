import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom';
import useGetSingleJob from '@/hooks/useGetSinglejob';
import { setSingleJob } from '@/Redux/jobslice';
import {setIsApplied} from '@/Redux/jobslice'
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {SingleJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth);
  const [isApplying, setIsApplying] = useState(false);
  
  const jobId = params.id;
  useGetSingleJob(jobId);
  
  const isApplied = SingleJob?.applications?.some(application => application.applicant === user?._id) || false;

  const applyJobHandler = async () => {
    if(isApplying) return;
    setIsApplying(true);
    try{
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials : true});
      if(res.data.success || res.data.sucess){
        // Refetch the job data to get updated applications from server
        const jobResponse = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials: true});
        if(jobResponse.data.success) {
          dispatch(setSingleJob(jobResponse.data.job));
        }
        toast.success(res.data.message || 'Applied successfully')
      }
    } catch(e){
      console.log(e)
      toast.error(e?.response?.data?.message || 'Error applying for job')
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">

 
    <div className="border-b pb-4 mb-4">
      <h1 className="text-2xl font-bold text-gray-800">{SingleJob?.title}</h1>
      <p className="text-gray-600 mt-1">{SingleJob?.company?.name}</p>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <div>
        <p className="font-semibold">📍 Location</p>
        <p>{SingleJob?.location}</p>
      </div>

      <div>
        <p className="font-semibold">💰 Package</p>
        <p>{SingleJob?.salary}</p>
      </div>

      <div>
        <p className="font-semibold">👥 Total Positions</p>
        <p>{SingleJob?.position}</p>
      </div>

      <div>
        <p className="font-semibold">🕒 Job Type</p>
        <p>{SingleJob?.jobType}</p>
      </div>
    </div>


    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h2>
      <p className="text-gray-600 leading-relaxed">
        {SingleJob?.description}
      </p>
    </div>
      <Button
        onClick={applyJobHandler}
        disabled={isApplied || isApplying}
        className={`px-6 py-2 rounded-lg font-medium transition ${
          isApplied 
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isApplied ? 'Already Applied' : isApplying ? 'Applying...' : 'Apply Now'}
      </Button>
      </div>
    </div>
  )
}

export default JobDescription