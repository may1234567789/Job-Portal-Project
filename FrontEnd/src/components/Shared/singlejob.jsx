import React from 'react'
import { Badge } from 'lucide-react';
import './css/singlejob.css'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const SingleJob = () => {
  const navigate = useNavigate();
  const jobId = "ewhfwwef"
  return (
    <div>
    <article className="job-card">
      {/* Left Section */}
      <div className="job-main">
        <div className="job-company">
          <p className="company-name">Company Name</p>
          <p className="company-location">Bangalore, India</p>
        </div>

        <h3 className="job-title">Frontend Developer</h3>

        <p className="job-desc">
          We are looking for a skilled frontend developer to build modern,
          responsive web applications.
        </p>
      </div>

      {/* Right Section */}
      <div className="job-meta">
        <div className="job-info">
          <span className="label">Job Type</span>
          <span className="value">Full Time</span>
        </div>

        <div className="job-info">
          <span className="label">Salary</span>
          <span className="value">₹8 LPA</span>
        </div>

        <div className="job-badges">
          <Badge>Remote</Badge>
          <Badge>Senior</Badge>
        </div>

        <Button onClick={() => navigate(`/description/${jobId}`)}>Details</Button>
      </div>
    </article>

    </div>
  )
}

export default SingleJob;