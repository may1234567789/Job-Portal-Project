import React, { useEffect } from 'react'
import Navbar from './navbar'
import HeroSection from './herosection'
import CategoryCarousel from './categorycarousel'
import LatestJob from './latestjob'
import Footer from './footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
      if(user && user.role === 'admin'){
        navigate('/admin/companies')
      }
  }, []);
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