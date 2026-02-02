import React from 'react'
import { Badge } from "@/components/ui/badge"

function LatestJobCard() {
  return (
    <article className="latestjob-card">
      <header className="latestjob-card-header">
        <div className="latestjob-company">
          <p className="latestjob-company-name">Company Name</p>
          <p className="latestjob-company-place">Place</p>
        </div>
        <h3 className="latestjob-title">Job Title</h3>
      </header>

      <p className="latestjob-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, at vel! Minus quod officiis voluptates pariatur minima quasi aliquid soluta.</p>

      <footer className="latestjob-card-footer">
        <div className="latestjob-badges">
          <Badge>Remote</Badge>
          <Badge>Full-time</Badge>
          <Badge>Senior</Badge>
        </div>
        <button className="latestjob-apply">Apply</button>
      </footer>
    </article>
  )
}

export default LatestJobCard