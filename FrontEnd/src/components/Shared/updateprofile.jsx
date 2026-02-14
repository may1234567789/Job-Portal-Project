import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/Redux/authslice'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)
  const [input, setInput] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: '',
  })

  const dispatch = useDispatch()

  // Update form when user data loads from Redux
  useEffect(() => {
    if (user) {
      setInput({
        username: user?.username || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: Array.isArray(user?.profile?.skills)
          ? user.profile.skills.join(', ')
          : user?.profile?.skills || '',
      })
    }
  }, [user, open])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      username: input.username,
      email: input.email,
      phoneNumber: input.phoneNumber,
      bio: input.bio,
      skills: input.skills,
    }
    
    setLoading(true)

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      

      if (res?.data?.success || res?.data?.sucess) {
        dispatch(setUser(res.data.user))
        toast.success('Profile updated successfully!')
        setOpen(false)
      } else {
        console.log('Error:', res?.data?.message)
        toast.error('Failed to update profile. Please try again.')
      }
    } catch (error) {
      console.log('Error updating profile:', error)
      toast.error(error?.response?.data?.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <form id="update-profile-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={input.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                type="text"
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleInputChange}
                placeholder="Enter your bio"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleInputChange}
                placeholder="Enter skills separated by comma (e.g. React, Node.js, MongoDB)"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="file">Resume</Label>
              <Input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0]
                  setInput({ ...input, file })
                }}
              />
            </div>
          </form>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            form="update-profile-form"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
