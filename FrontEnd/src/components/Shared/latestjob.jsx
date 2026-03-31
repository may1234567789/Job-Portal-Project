import React from 'react'
import LatestJobCard from './latestjobcard'
import './css/latestjob.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function LatestJob() {
    const navigate = useNavigate();
    const {allJobs} = useSelector(store=>store.job)
    return (
        <div className='latestjob-content'>
            <p className='latestjob-p'>Latest & Top Job Opening</p>
            <div id="cssportal-grid">
            {
                allJobs.length <= 0 ? <span>No Job</span> : allJobs?.slice(0,6).map((job) => <LatestJobCard onClick={() => navigate(`/job/${job._id}`)} key={job._id} job ={job}/>)
            }
            </div>

        </div>
    )
}

export default LatestJob