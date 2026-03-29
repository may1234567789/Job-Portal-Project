import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAppliedJobs } from '@/Redux/jobslice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
const useGetAllAppliedJobs = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllApplicants = async () => {
        try{
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials: true});
            if(res.data.applications){
                dispatch(setAllAppliedJobs(res.data.applications))
            }
        } catch (error) {
            console.error('Error fetching applicants:', error)
        }
        }
        fetchAllApplicants();
    },[dispatch, jobId])
};
export default useGetAllAppliedJobs
