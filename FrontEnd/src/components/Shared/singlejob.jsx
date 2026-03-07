import React from 'react'
import { Badge } from '../ui/badge';
import './css/singlejob.css'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SingleJob = ({job}) => {
  const navigate = useNavigate();

  return (
    
    <div>
     
    <article className="job-card">
      {/* Left Section */}
      <div className="job-main">
        <div className="job-company">
          <p className="company-name">{job?.company?.name || 'Company Name'}</p>
          <p className="company-location">{job?.company?.location || 'Bangalore, India'}</p>
        </div>

        <h3 className="job-title">{job?.title || 'Frontend Developer'}</h3>

        <p className="job-desc">
          {job?.description || 'We are looking for a skilled frontend developer to build modern, responsive web applications.'}
        </p>
      </div>

      {/* Right Section */}
      <div className="job-meta">
        <div className="job-info">
          <span className="label">Job Type</span>
          <span className="value">{job?.jobType || 'Full Time'}</span>
        </div>

        <div className="job-info">
          <span className="label">Salary</span>
          <span className="value">₹{job?.salary || '8 LPA'}</span>
        </div>

        <Button className="apply-btn" onClick={() => navigate(`/description/${job?._id}`)}>Apply</Button>

        <Button onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>

      </div>
    </article>

    </div>
  )
}

export default SingleJob;