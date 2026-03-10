import React from 'react'
import './css/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/233377451.png'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/Redux/authslice'
import axios from 'axios'
import { toast } from 'sonner'


function Navbar() {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true })
      const ok = res?.data?.success || res?.data?.sucess

      if (ok) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res?.data?.message || 'Logged out successfully')
      } else {
        toast.error(res?.data?.message || 'Logout failed')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Logout failed')
    }
  }


  return (
    <div className="navbar">

      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="options">
        {
          user && user?.role === 'admin' ? (
            <>
            <ul>
              <li><Link to='/admin/companies'>Companies</Link></li>
            </ul>
            </>
          ) : (
            <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/browse'>Browse</Link></li>
          <li><Link to='/job'>Job</Link></li>
        </ul>
          )
        }
        
      </div>

      <div className="auth-section">
        {!user ? (
          <>
            <Link to="/login"><Button variant="outline" className="login-button">Login</Button></Link>
            <Link to="/signup"><Button className="signup-button">Sign Up</Button></Link>
          </>
        ) : (
          <div className="user-logo">
            <Popover>
                <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePicture
                    ? <AvatarImage src={user.profile.profilePicture} alt="user" />
                    : <AvatarFallback>{(user?.username || 'U')[0].toUpperCase()}</AvatarFallback>
                  }
                </Avatar>
              </PopoverTrigger>

              <PopoverContent align="start">
                <div className="user-content flex gap-3">
                  <Avatar>
                    {user?.profile?.profilePicture
                      ? <AvatarImage src={user.profile.profilePicture} />
                      : <AvatarFallback>{(user?.username || 'U')[0].toUpperCase()}</AvatarFallback>
                    }
                  </Avatar>

                  <PopoverHeader>
                    <PopoverTitle>{user?.username}</PopoverTitle>
                    <PopoverDescription>
                      {user?.email}
                    </PopoverDescription>
                  </PopoverHeader>
                </div>

                <div className="user-buttons flex flex-col gap-2 mt-4">
                  <Button asChild variant="link" className="cursor-pointer">
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button variant="destructive" onClick={logoutHandler} className="cursor-pointer">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar



