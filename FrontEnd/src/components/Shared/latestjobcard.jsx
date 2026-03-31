import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';

function LatestJobCard({ job }) {
  const navigate = useNavigate();
  const companyName = job?.company?.name || 'Company Name';
  const place = job?.company?.location || job?.location || 'Place';
  const title = job?.title || 'Job Title';
  const desc = job?.description || '';
  const jobType = job?.jobType || '';
  const position = job?.position || '';
  const salary = job?.salary || '';
  return (
    <div onClick={() => navigate(`/job/${job._id}`)}>
    <article className="latestjob-card">
      <header className="latestjob-card-header">
        <div className="latestjob-company">
          <p className="latestjob-company-name">{companyName}</p>
          <p className="latestjob-company-place">{place}</p>
        </div>
        <h3 className="latestjob-title">{title}</h3>
      </header>

      <p className="latestjob-desc">{desc.length > 120 ? desc.slice(0, 120) + '...' : desc}</p>

      <footer className="latestjob-card-footer">
        <div className="latestjob-badges">
          <Badge variant="outline">{jobType}</Badge>
          <Badge variant="outline">{position}</Badge>
          <Badge variant="outline">{salary}</Badge>
        </div>
        <button className="latestjob-apply">Apply</button>
      </footer>
    </article>
    </div>
  )
}

export default LatestJobCard