import React from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../images/233377451.png'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Navbar() {
  const user = false;
  return (
    <div className="navbar">

      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* Nav options */}
      <div className="options">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>

      {/* Right side */}
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
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="user"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent align="start">
                <div className="user-content flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>

                  <PopoverHeader>
                    <PopoverTitle>User Profile</PopoverTitle>
                    <PopoverDescription>
                      Manage your account
                    </PopoverDescription>
                  </PopoverHeader>
                </div>

                <div className="user-buttons flex flex-col gap-2 mt-4">
                  <Button variant="link">View Profile</Button>
                  <Button variant="destructive">Logout</Button>
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