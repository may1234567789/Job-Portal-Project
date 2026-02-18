import React from 'react'
import Filter from './filter'
import SingleJob from './singlejob'
import './css/job.css'
import { useSelector } from 'react-redux';
import Navbar from './navbar';

const jobArray = [1,2,3,4,5,6,7,8,9];

const Job = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
     <div><Navbar/>
    <div className="job-container">
      <div className="filter-section">
        <Filter />
      </div>
      <div className="jobs-section">
        {allJobs.length > 0 ? (
          allJobs.map((job) =>
            <SingleJob key={job._id} job={job} />
          )
        ) : (
          <div className="no-jobs-message">
            <p>No job found</p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Job