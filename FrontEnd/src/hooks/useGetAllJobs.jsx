import { setAllJobs } from '@/Redux/jobslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllJobs = async () => {
        try{
            const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
            if(res.data.sucess){
                dispatch(setAllJobs(res.data.jobs))
            }
        }catch(e){
            console.log(error);
        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs