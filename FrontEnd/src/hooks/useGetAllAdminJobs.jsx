import { setAllJobs } from '@/Redux/jobslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllJobs = async () => {
        try{
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
            console.log('Jobs API Response:', res.data);
            const ok = res.data.success || res.data.sucess;
            if (ok) {
              console.log('Setting jobs:', res.data.jobs);
              dispatch(setAllJobs(res.data.jobs || []));
            } else {
              console.log('API returned false success');
              dispatch(setAllJobs([]));
            }
        } catch (e) {
          console.log('Error fetching jobs:', e);
          dispatch(setAllJobs([]));
        }
    }
    fetchAllJobs();
  },[dispatch])
}

export default useGetAllAdminJobs