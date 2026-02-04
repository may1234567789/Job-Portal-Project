import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import SingleJob from './singlejob';

const randomJobs = [1,2,3,4,5,6,7];

function Browse() {
  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <h1>Searching Results ({randomJobs.length})</h1>
        
        <div className='max-w-7xl mx-20 my-10'>{
          randomJobs.map((data,index) =>{
            return(
              <SingleJob />
            )
          })
        }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse
