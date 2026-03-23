import React, { use } from 'react'
import Navbar from '../Shared/navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '@/Redux/applicationslice'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applications} = useSelector((state) => state.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
        try{
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.jobId}/applicants`,{withCredentials: true});
            dispatch(setAllApplicants(res.data.job))
        } catch (error) {
            console.error('Error fetching applicants:', error)
        }
    }
    fetchAllApplicants()
    }, [])
  return (
    <div>
        <Navbar />
        <div>
            <h1 className='text-2xl font-bold mb-4'>Applicants {applicants?.length || 0}</h1>
            <p className='text-gray-600 mb-6'>Review and manage applicants for your job postings.</p>
            <ApplicantsTable />
        </div>
    </div>
  )
}

export default Applicants