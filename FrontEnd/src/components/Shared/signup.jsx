import React, { useState } from 'react'
import Navbar from './navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import './css/signup.css'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function signUp() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password : "",
    role: "",
    file: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
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
          <h1 className=''>Sign Up</h1>
          <Field>
            <FieldLabel >Name</FieldLabel>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Enter your username"
            />
            <FieldLabel >Email</FieldLabel>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
            <FieldLabel >Phone Number</FieldLabel>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your Phone Number"
            />
            <FieldLabel >Password</FieldLabel>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <FieldLabel>Picture</FieldLabel>
            <Input
              id="picture"
              type="file"
              onChange={changeFileHandler}
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

            <Button>Sign Up</Button>
            <span>Already have an account <Link to="/login" >Login Now</Link></span>
          </Field>
        </div>
      </form >
    </div>
  )
}

export default signUp