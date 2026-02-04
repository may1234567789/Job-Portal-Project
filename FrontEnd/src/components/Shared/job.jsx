import React from 'react'
import Filter from './filter'
import SingleJob from './singlejob'
import './css/job.css'

const jobArray = [1,2,3,4,5,6,7,8,9];

const Job = () => {
  return (
    <div className="job-container">
      <div className="filter-section">
        <Filter />
      </div>
      <div className="jobs-section">
        {jobArray.length > 0 ? (
          jobArray.map((item, index) =>
            <SingleJob key={index} />
          )
        ) : (
          <div className="no-jobs-message">
            <p>No job found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Job