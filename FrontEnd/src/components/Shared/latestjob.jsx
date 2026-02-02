import React from 'react'
import LatestJobCard from './latestjobcard'
import './css/latestjob.css'

const job = [1, 2, 3, 4, 5, 6, 7, 8]
function LatestJob() {
    return (
        <div class='latestjob-content'>
            <p class='latestjob-p'>Latest & Top Job Opening</p>
            <div id="cssportal-grid">
            {
                job.map((items, index) => <LatestJobCard />)
            }
            </div>

        </div>
    )
}

export default LatestJob