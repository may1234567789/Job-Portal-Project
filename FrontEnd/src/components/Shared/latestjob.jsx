import React from 'react'
import LatestJobCard from './latestjobcard'
import './css/latestjob.css'
import { useSelector } from 'react-redux'

function LatestJob() {
    const {allJobs} = useSelector(store=>store.job)
    return (
        <div className='latestjob-content'>
            <p className='latestjob-p'>Latest & Top Job Opening</p>
            <div id="cssportal-grid">
            {
                allJobs.length <= 0 ? <span>No Job</span> : allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job ={job}/>)
            }
            </div>

        </div>
    )
}

export default LatestJob