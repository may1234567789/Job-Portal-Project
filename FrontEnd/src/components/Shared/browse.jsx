import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import SingleJob from './singlejob';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <h1>Searching Results ({allJobs.length})</h1>
        
        <div className='max-w-7xl mx-20 my-10'>
          {allJobs && allJobs.length > 0 ? (
            allJobs.map((job, index) => (
              <SingleJob key={job._id || index} job={job} />
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse
