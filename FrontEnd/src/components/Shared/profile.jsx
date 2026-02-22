<<<<<<< HEAD

import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Label } from 'radix-ui'
import AppliedJobs from './applieadjob'

const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;
const Profile = () => {
    return (
        <div>
=======
import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import AppliedJobs from './applieadjob'
import UpdateProfileDialog from './updateprofile'
import Navbar from './navbar'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    const skills = Array.isArray(user?.profile?.skills)
        ? user.profile.skills
        : typeof user?.profile?.skills === 'string'
            ? user.profile.skills.split(',').map(skill => skill.trim()).filter(Boolean)
            : []

    const isResume = Boolean(user?.profile?.resume)

    return (
        <div>
            <Navbar />
>>>>>>> fix-job-portal
            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">


                <div className="bg-indigo-600 p-6 text-white">
                    <Avatar className="h-24 w-24">
<<<<<<< HEAD
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                    </Avatar>
                    <h2 className="text-2xl font-bold mt-4">Mayank Bhardwaj</h2>
=======
                        <AvatarImage src={user?.profile?.profilePicture || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                    </Avatar>
                    <h2 className="text-2xl font-bold mt-4">{user?.username}</h2>
>>>>>>> fix-job-portal
                    <p className="text-indigo-200">Frontend Developer</p>
                </div>


                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">


                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-3">Personal Details</h3>

                        <ul className="space-y-2 text-gray-600">
<<<<<<< HEAD
                            <li><strong>Email:</strong> mayank@gmail.com</li>
                            <li><strong>Phone:</strong> +91 98765 43210</li>
                            <li><strong>Location:</strong> New Delhi, India</li>
                            <li><strong>Experience:</strong> Fresher</li>
=======
                            <li><strong>Email:</strong>{user?.email}</li>
                            <li><strong>Phone:</strong> {user?.phoneNumber}</li>
                            <li><strong>Location:</strong> New Delhi, India</li>
                            <li><strong>Experience:</strong> Fresher</li>
                            <li><Label><strong>Resume</strong></Label></li>
                            {
                                isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                            }

>>>>>>> fix-job-portal
                        </ul>
                    </div>


                    <div className="md:col-span-2 space-y-6">


                        <div>
                            <h3 className="text-lg font-semibold mb-2">About Me</h3>
                            <p className="text-gray-600">
<<<<<<< HEAD
                                I am a passionate frontend developer learning React, Tailwind CSS,
                                and building responsive job portal applications. Looking for
                                opportunities to grow and contribute.
=======
                                {user?.profile?.bio || "No bio available."}
>>>>>>> fix-job-portal
                            </p>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {
                                    skills.length !== 0
                                        ? skills.map((item, index) => (
                                            <Badge key={index}>{item}</Badge>
                                        ))
                                        : <span>NA</span>
                                }
                            </div>
                        </div>
<<<<<<< HEAD
                        {/* <div>
                        <Label>Resume</Label>
                        {
                            isResume ? <a>Resume</a> : <span>None</span>
                        }
                    </div> */}


                        <div>
                            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
=======


                        <div>
                            <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
>>>>>>> fix-job-portal
                                Edit Profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <h1>Applied Jobs</h1>
                <AppliedJobs />
            </div>
<<<<<<< HEAD
=======
            <UpdateProfileDialog open={open} setOpen={setOpen} />
>>>>>>> fix-job-portal

        </div>
    )
}

export default Profile
