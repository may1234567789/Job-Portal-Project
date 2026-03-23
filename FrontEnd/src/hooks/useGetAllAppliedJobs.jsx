import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '@/Redux/applicationslice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
const useGetAllAppliedJobs = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllApplicants = async () => {
        try{
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials: true});
            dispatch(setAllApplicants(res.data.job))
        } catch (error) {
            console.error('Error fetching applicants:', error)
        }
        }
    },[dispatch, jobId])
}
export default useGetAllAppliedJobs