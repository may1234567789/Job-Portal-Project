import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

function Browse() {
  return (
    <div>
      <Navbar />
      <div className="browse-container">
        <h1>Browse Jobs</h1>
        <p>Browse all available jobs coming soon...</p>
      </div>
      <Footer />
    </div>
  )
}

export default Browse
