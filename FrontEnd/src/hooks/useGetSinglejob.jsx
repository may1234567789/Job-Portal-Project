import { setAllJobs } from '@/Redux/jobslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();
  
}

export default useGetSingleJob