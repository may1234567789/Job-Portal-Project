import React, { useState } from 'react'
import Navbar from './navbar'
import { Label } from '@radix-ui/react-label'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import './css/signup.css'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={submitHandler}>
        <div className="signup-form">
          <h1 className=''>Log In</h1>
          <Field>
            <FieldLabel >Email</FieldLabel>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
            <FieldLabel >Password</FieldLabel>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <RadioGroup defaultValue="comfortable" className="w-fit flex flex-row gap-6">
              <FieldLabel >Role</FieldLabel>
              <div className="flex flex-row gap-6">
                <div className="flex items-center gap-3">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role == 'student'}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="r2">Student</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={input.role == 'admin'}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="r3">Admin</Label>
                </div>
              </div>
            </RadioGroup>
            <Button>Log In</Button>
          </Field>
          <span>Don't have account? <Link to="/signup">Register Now</Link></span>
        </div>
      </form >
    </div>
  )
}

export default Login