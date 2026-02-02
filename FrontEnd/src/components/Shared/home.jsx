import React from 'react'
import Navbar from './navbar'
import HeroSection from './herosection'
import CategoryCarousel from './categorycarousel'
import LatestJob from './latestjob'
import Footer from './footer'


function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </div >
  )
}

export default Home