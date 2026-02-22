import React from 'react'
import Navbar from './navbar'
import HeroSection from './herosection'
import CategoryCarousel from './categorycarousel'
import LatestJob from './latestjob'
import Footer from './footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'


function Home() {
  useGetAllJobs();
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