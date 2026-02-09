import React from 'react'
import { Button } from '../ui/button'

const JobDescription = () => {
  const isApplied = true;
  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">

 
    <div class="border-b pb-4 mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Frontend Developer</h1>
      <p class="text-gray-600 mt-1">ABC Technologies Pvt Ltd</p>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <div>
        <p class="font-semibold">📍 Location</p>
        <p>Bangalore, India</p>
      </div>

      <div>
        <p class="font-semibold">💰 Package</p>
        <p>₹6 – ₹10 LPA</p>
      </div>

      <div>
        <p class="font-semibold">👥 Total Positions</p>
        <p>5</p>
      </div>

      <div>
        <p class="font-semibold">🕒 Job Type</p>
        <p>Full Time</p>
      </div>
    </div>


    <div class="mt-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Job Description</h2>
      <p class="text-gray-600 leading-relaxed">
        We are looking for a skilled Frontend Developer with experience in HTML,
        CSS, JavaScript, and modern frameworks. The candidate should be passionate
        about building responsive and user-friendly web applications.
      </p>
    </div>
      <Button
        disabled={isApplied}
        className={"bg-blue-600 text-white px-6 py-2 rounded-lg font-medium "}
      >
        {isApplied ? 'Already Applied' : 'Apply Now'}
      </Button>
      </div>
    </div>
  )
}

export default JobDescription