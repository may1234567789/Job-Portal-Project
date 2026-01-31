import React, { useState } from 'react'
import Navbar from './navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import './css/signup.css'
import axios from "axios"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

function signUp() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password : "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username",input.username);
    formData.append("email",input.email);
    formData.append("password",input.password);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try{
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers:{
          "content-type" : "multipart/form-data"
        },
        withCredentials:true,
      });
      if(res.data.sucess){
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error){
        console.log(error)
        toast.error(error.response.data.message)
    }
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
              value={input.username}
              name="username"
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