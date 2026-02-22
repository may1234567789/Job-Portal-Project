import { setSingleJob } from '@/Redux/jobslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        const ok = res.data.success || res.data.sucess;
        if (ok) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch]);
}

export default useGetSingleJob